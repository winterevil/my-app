import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Lưu vào PostgreSQL
        const result = await query(
            'INSERT INTO messages (email, subject, messages) VALUES ($1, $2, $3) RETURNING *',
            [email, subject, message]
        );

        return NextResponse.json({ message: 'Message sent successfully', data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error saving message:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
