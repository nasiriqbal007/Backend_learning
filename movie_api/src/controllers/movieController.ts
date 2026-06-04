import { type Request, type Response } from "express";
import {
  fetchAllMovies,
  createMovie,
  fetchMovieById,
  editMovie,
  removeMovie,
} from "../services/movieService";
import { handleError, sendResponse } from "../utils/Response";
import { AppError } from "../errors/AppError";

export const getMovies = async (_: Request, res: Response) => {
  try {
    const movies = await fetchAllMovies();
    sendResponse(res, 200, movies);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const movie = req.body;
    const userId = (req as any).userId;
    const newMovie = await createMovie(movie, userId);
    sendResponse(res, 201, newMovie);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const movie = await fetchMovieById(id);
    sendResponse(res, 200, movie);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, ratings, releaseDate } = req.body;
    const ratingValue = typeof ratings === "number" ? ratings : req.body.rating;
    const userId = (req as any).userId;
    const updatedMovie = await editMovie(
      id,
      title,
      description,
      ratingValue,
      releaseDate,
      userId,
    );

    sendResponse(res, 200, updatedMovie);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).userId;

    
    await removeMovie(id, userId);
    sendResponse(res, 200, "movie deleted");
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message);
    }
    handleError(res, 500, "Internal server error");
  }
};
