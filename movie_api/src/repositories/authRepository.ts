import { pool } from "../config/db";
import type { User } from "../models/User";

export const createUser = async (
  email: string,
  hashedPassword: string,
): Promise<User> => {
  const res = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword],
  );
  return res.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0] || null;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0] || null;
};
