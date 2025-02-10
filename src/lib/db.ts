import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config(); 

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD as string, 
  database: process.env.DB_NAME,
});

export const query = async (text: string, params?: unknown[]): Promise<QueryResult> => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};
