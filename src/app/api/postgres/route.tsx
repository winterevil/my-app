import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, subject, message, honeypot } = await req.json();

        // Nếu honeypot có giá trị => Đây là bot, từ chối request
        if (honeypot) {
            console.log("Spam detected!", honeypot);
            return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
        }

        // Kiểm tra dữ liệu hợp lệ
        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Lưu vào database
        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

        // Gửi email xác nhận
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Re: ${subject}`,
            text: `Thank you for reaching out!\n\nWe have received your message:\n"${message}"\n\nWe will get back to you as soon as possible.\n\nBest regards!`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Message sent successfully', data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
