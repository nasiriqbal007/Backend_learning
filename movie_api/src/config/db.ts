import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const port = parseInt(process.env.PORT || "8000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { pool, port, NODE_ENV };
