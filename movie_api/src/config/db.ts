import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { pool, port, NODE_ENV };
