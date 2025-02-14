import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, subject, message, honeypot } = await req.json();

        if (honeypot) {
            return NextResponse.json({ error: 'Spam detected!' }, { status: 400 });
        }

        const containsURL = (text: string) => /(https?:\/\/[^\s]+)/.test(text);
        if (containsURL(message)) {
            return NextResponse.json({ error: "Spam detected!" }, { status: 400 });
        }

        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USERNAME, 
        //         pass: process.env.EMAIL_PASSWORD  
        //     }
        // });

        // await transporter.sendMail({
        //     from: `"No Reply" <${process.env.EMAIL_USERNAME}>`,
        //     to: email,
        //     subject: `Re: ${subject}`,
        //     html: `
        //         <p>Thank you for reaching out!</p>
        //         <p>I have received your message and will get back to you soon.</p>
        //         <p><strong>Your message:</strong></p>
        //         <blockquote>${message}</blockquote>
        //         <br />
        //         <p>Best regards,<br/>Your Name</p>
        //     `
        // });

        return NextResponse.json({ message: 'Message sent successfully', data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}



