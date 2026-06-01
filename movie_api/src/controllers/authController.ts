import { type Request, type Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { handleError, sendResponse } from "../utils/Response";
import { AppError, BadRequestError } from "../errors/AppError";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (name === undefined || name.trim() === "") {
      throw new BadRequestError("Name is required");
    }
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const { user, token } = await registerUser(email, password, name);

    sendResponse(res, 201, { user, token });
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const { user, token } = await loginUser(email, password);

    sendResponse(res, 200, { user, token });
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};
