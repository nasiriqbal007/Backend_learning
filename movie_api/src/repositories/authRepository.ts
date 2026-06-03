import { pool } from "../config/db";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import type { User } from "../models/User";

export const createUser = async (
  email: string,
  hashedPassword: string,
  name: string,
): Promise<User> => {
  const res = await pool.query(
    "INSERT INTO users (email, password,name) VALUES ($1, $2, $3) RETURNING *",
    [email, hashedPassword, name],
  );
  return res.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return res.rows[0] || null;
  } catch (error) {
    throw new NotFoundError(error as string);
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0] || null;
};
