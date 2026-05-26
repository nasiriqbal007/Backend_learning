import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../services/authService";
import { BadRequestError } from "../errors/AppError";
import { handleError } from "../utils/Response";

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new BadRequestError("No token provided");
    }

    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    handleError(res, 500, "Internal server error");
    
  }
};
