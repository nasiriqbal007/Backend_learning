import { type Request, type Response, type NextFunction } from "express";
import { handleError } from "../utils/Response";

export const validateMovieData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, releaseDate, ratings } = req.body;
  if ((!title && typeof title !== "string") || title.trim() === "") {
    return handleError(res, 400, "Title is required");
  }
  if (
    (!description && typeof description !== "string") ||
    description.trim() === ""
  ) {
    return handleError(res, 400, "Description  is required");
  }
  if (
    (!releaseDate && typeof isNaN(Date.parse(releaseDate))) ||
    title.trim() === "" ||
    typeof releaseDate !== "string"
  ) {
    return handleError(res, 400, "Release dates is required");
  }
  if (
    ratings === undefined ||
    typeof ratings !== "number" ||
    ratings < 0 ||
    ratings > 10
  ) {
    return handleError(res, 400, "Ratings must be a number between 1 and 10");
  }
  next();
};
