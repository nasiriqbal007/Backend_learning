import type { Movie } from "../models/movieModel";
import {
  getAllMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../repositories/movieRepository";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export const fetchAllMovies = async () => {
  const movies = await getAllMovies();
  if (!movies || movies.length === 0) {
    throw new NotFoundError("No movies found");
  }
  return movies;
};
export const createMovie = async (movie: Movie) => {
  if (!movie) {
    throw new BadRequestError("Movie data is required");
  }
  return await addMovie(movie);
};

export const fetchMovieById = async (id: number) => {
  const movie = await getMovieById(id);
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }
  return movie;
};

export const editMovie = async (
  id: number,
  title: string,
  description: string,
  rating: number,
  releaseDate: string,
) => {
  if (!title || !description) {
    throw new BadRequestError("Title and description are required");
  }
  return await updateMovie(id, title, description, rating, releaseDate);
};

export const removeMovie = async (id: number) => {
  const movie = await getMovieById(id);
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }
  return await deleteMovie(id);
};
