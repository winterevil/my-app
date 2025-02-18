import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import dns from 'dns';
import disposableDomains from 'disposable-email-domains';
import nodemailer from 'nodemailer';

const emailHistory = new Map();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function isValidEmail(email: string): Promise<boolean> {
    if (!emailRegex.test(email)) return false;
    
    const domain = email.split('@')[1];
    
    return new Promise((resolve) => {
        dns.resolveMx(domain, (err, addresses) => {
            resolve(!err && addresses && addresses.length > 0);
        });
    });
}

function isDisposableEmail(email: string): boolean {
    const domain = email.split('@')[1].toLowerCase();
    return disposableDomains.includes(domain);
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (message.includes("http://") || message.includes("https://")) {
            return NextResponse.json({ error: "Spam detected!" }, { status: 400 });
        }

        if (isDisposableEmail(email)) {
            return NextResponse.json({ error: "Temporary email addresses are not allowed" }, { status: 400 });
        }

        const emailValid = await isValidEmail(email);
        if (!emailValid) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        const now = Date.now();
        if (emailHistory.has(email) && now - emailHistory.get(email) < 120000) {
            return NextResponse.json({ error: "Too many requests, try again later" }, { status: 429 });
        }
        emailHistory.set(email, now);

        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

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
            html: `
                <p>Thank you for reaching out!</p>
                <p>I have received your message and will get back to you soon.</p>
                <p><strong>Your message:</strong></p>
                <blockquote>${message}</blockquote>
                <br />
                <p>Best regards,<br/>Your Name</p>
            `
        });

        return NextResponse.json({ message: 'Message sent successfully', data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
