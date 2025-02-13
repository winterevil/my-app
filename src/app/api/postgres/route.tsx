import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
    try {
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: `Re: ${subject}`,
            html: `
                <p>Thank you for reaching out!</p>
                <p>I have received your message and will get back to you soon.</p>
                <p><strong>Your message:</strong></p>
                <blockquote>${message}</blockquote>
                <br />
                <p>Best regards,<br/>Your Name</p>
            `,
        });

        return NextResponse.json({ message: 'Message sent successfully', data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
