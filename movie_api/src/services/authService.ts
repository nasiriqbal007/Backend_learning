import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User, JwtPayload } from "../models/User";
import { createUser, getUserByEmail } from "../repositories/authRepository";
import { BadRequestError } from "../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret-key";

export const registerUser = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new BadRequestError("Email already registered");
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(email, hashedPassword);

  
  const token = jwt.sign(
    { id: user.id, email: user.email } as JwtPayload,
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user, token };
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {

  const user = await getUserByEmail(email);
  if (!user) {
    throw new BadRequestError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError("Invalid email or password");
  }

  
  const token = jwt.sign(
    { id: user.id, email: user.email } as JwtPayload,
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user, token };
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new BadRequestError("Invalid or expired token");
  }
};
