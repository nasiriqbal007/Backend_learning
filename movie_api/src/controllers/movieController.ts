import { type Request, type Response } from "express";
import { fetchAllMovies, createMovie } from "../services/movieService";
import { handleError, sendResponse } from "../utils/Response";

export const getMovies = async (_: Request, res: Response) => {
  try {
    const movies = await fetchAllMovies();
    sendResponse(res, 200, movies);
  } catch (error) {
    handleError(res, 500, (error as Error).message);
  }
};
export const addMovie = async (req: Request, res: Response) => {
  try {
    const movie = await req.body;
    createMovie(movie);
    return sendResponse(res, 201, "movie created");
  } catch (error) {
    handleError(res, 500, (error as Error).message);
  }
};
