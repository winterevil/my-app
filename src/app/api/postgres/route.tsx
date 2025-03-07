import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';
import dns from 'dns';
import util from 'util';

const emailHistory = new Map();
const ipHistory = new Map();

function isValidEmailFormat(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

async function isDomainValid(domain: string): Promise<boolean> {
    const resolveMx = util.promisify(dns.resolveMx);
    try {
        const mxRecords = await resolveMx(domain);
        return mxRecords.length > 0;
    } catch {
        return false;
    }
}

async function isRealEmail(email: string): Promise<boolean> {
    return isValidEmailFormat(email) && await isDomainValid(email.split('@')[1]);
}

export async function POST(req: Request) {
    try {
        const { email, subject, message } = await req.json();
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        const userAgent = req.headers.get("user-agent") || "";

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (/https?:\/\//i.test(message)) {
            return NextResponse.json({ error: "Spam detected!" }, { status: 400 });
        }

        if (!userAgent || /postman|curl|wget/i.test(userAgent)) {
            return NextResponse.json({ error: "Invalid User-Agent" }, { status: 400 });
        }

        if (!(await isRealEmail(email))) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        const now = Date.now();
        if (emailHistory.has(email) && now - emailHistory.get(email) < 120000) {
            return NextResponse.json({ error: "Too many requests, try again later" }, { status: 429 });
        }
        emailHistory.set(email, now);

        if (ip !== "unknown") {
            const ipRequests = ipHistory.get(ip) || [];
            ipRequests.push(now);
            ipHistory.set(ip, ipRequests.filter((t: number) => now - t < 300000));
            if (ipHistory.get(ip).length > 5) {
                return NextResponse.json({ error: "Too many requests from this IP" }, { status: 429 });
            }
        }

        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

        setTimeout(async () => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            await transporter.sendMail({
                from: `"No Reply" <${process.env.EMAIL_USERNAME}>`,
                to: email,
                subject: `Re: ${subject}`,
                headers: {
                    "Reply-To": "",
                    "Auto-Submitted": "auto-generated",
                    "X-Auto-Response-Suppress": "All"
                },
                html: `
                    <p>Thank you for reaching out!</p>
                    <p>I have received your message and will get back to you soon.</p>
                    <p><strong>Your message:</strong></p>
                    <blockquote>${message}</blockquote>
                    <br />
                    <p>Best regards,<br/>Long Le</p>
                `
            });
        }, 1000);

        return NextResponse.json({ message: 'Message sent successfully', data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
