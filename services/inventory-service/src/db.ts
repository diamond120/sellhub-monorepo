import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const client = postgres(process.env.DB_URL!);

export const db = drizzle(client);