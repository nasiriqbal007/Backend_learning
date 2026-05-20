import { type Response, type Request, type NextFunction } from "express";
import { handleError } from "../utils/response";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return handleError(res, 400, "Invalid ID");
  }
  next();
};
