import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';

const emailHistory = new Map(); // Lưu lịch sử gửi email

export async function POST(req: Request) {
    try {
        const { email, subject, message } = await req.json();

        // Kiểm tra dữ liệu đầu vào
        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Chặn email chứa link (tránh bot spam)
        if (message.includes("http://") || message.includes("https://")) {
            return NextResponse.json({ error: "Spam detected!" }, { status: 400 });
        }

        const now = Date.now();

        // Kiểm tra nếu email đã gửi trong vòng 1 giờ trước đó
        if (emailHistory.has(email) && now - emailHistory.get(email) < 120000) {
            return NextResponse.json({ error: "Too many requests, try again later" }, { status: 429 });
        }

        // Lưu thời gian gửi email vào danh sách
        emailHistory.set(email, now);

        // Lưu vào database
        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

        // Cấu hình Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, // Gmail của bạn
                pass: process.env.EMAIL_PASSWORD  // App Password của Gmail
            }
        });

        // Gửi email auto-reply
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
