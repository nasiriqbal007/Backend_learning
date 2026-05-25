import { type Request, type Response, type NextFunction } from "express";
import { BadRequestError } from "../errors/AppError";

export const validateMovieId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);
  if (!id) {
    throw new BadRequestError("Invalid movie ID");
  }
  next();
};

export const validateMovieData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, releaseDate, ratings } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new BadRequestError("Title is required");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    throw new BadRequestError("Description is required");
  }

  if (
    !releaseDate ||
    typeof releaseDate !== "string" ||
    isNaN(Date.parse(releaseDate))
  ) {
    throw new BadRequestError("Release date is required and must be valid");
  }

  if (
    ratings === undefined ||
    typeof ratings !== "number" ||
    ratings < 0 ||
    ratings > 10
  ) {
    throw new BadRequestError("Ratings must be a number between 0 and 10");
  }

  next();
};
export const validateMovieUpdateData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, releaseDate, ratings } = req.body;
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new BadRequestError("Title must be a non-empty string");
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      throw new BadRequestError("Description must be a non-empty string");
    }
  }

  if (releaseDate !== undefined) {
    if (typeof releaseDate !== "string" || isNaN(Date.parse(releaseDate))) {
      throw new BadRequestError("Release date must be valid");
    }
  }

  if (ratings !== undefined) {
    if (typeof ratings !== "number" || ratings < 0 || ratings > 10) {
      throw new BadRequestError("Ratings must be a number between 0 and 10");
    }
  }

  next();
};
