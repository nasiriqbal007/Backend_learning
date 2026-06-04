import type { Movie } from "../models/movieModel";
import {
  getAllMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../repositories/movieRepository";
import { NotFoundError, BadRequestError } from "../errors/AppError";
import { insertAuditAction } from "../repositories/auditRepo";

export const fetchAllMovies = async () => {
  const movies = await getAllMovies();
  if (!movies || movies.length === 0) {
    throw new NotFoundError("No movies found");
  }
  return movies;
};
export const createMovie = async (movie: Movie, userId: number) => {
  if (!movie) {
    throw new BadRequestError("Movie data is required");
  }
  const newMovie = await addMovie(movie);

  insertAuditAction({
    userId,
    movieId: newMovie.id ?? 0,
    action: "CREATE",
    beforeData: null,
    afterData: newMovie,
  });

  return newMovie;
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
  ratings: number,
  releaseDate: string,
  userId: number,
) => {
  const oldMovie = await getMovieById(id);
  const updatedMovie = await updateMovie(
    id,
    title,
    description,
    ratings,
    releaseDate,
  );
  await insertAuditAction({
    userId,
    movieId: id,
    action: "UPDATE",
    beforeData: oldMovie,
    afterData: updatedMovie,
  });
  return updatedMovie;
};

export const removeMovie = async (id: number, userId: number) => {
  const findMovie = await getMovieById(id);
  if (!findMovie) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }

  await insertAuditAction({
    userId,
    movieId: id,
    action: "DELETE",
    beforeData: findMovie,
    afterData: null,
  });

  console.log("About to delete movie with id:", id);
  const deletedMovie = await deleteMovie(id);
  console.log("Delete result:", deletedMovie);
  return deletedMovie;
};
