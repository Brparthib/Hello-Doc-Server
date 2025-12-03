// prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import config from "../../config";

const connectionString = config.database_url;

if (!connectionString) {
  throw new Error('DB_URL environment variable is required');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter: adapter,
});