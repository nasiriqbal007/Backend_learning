import {
  getAllMovies,
  addMovie,
  getMovieById,
  deleteMovie,
} from "../repositories/movieRepository";

export const fetchAllMovies = async () => {
  const getMovies = await getAllMovies();
  if (!getMovies) {
    throw new Error("Failed to fetch movies");
  } else if (getMovieById.length === 0) {
    throw new Error("No movies found");
  }

  return await getAllMovies();
};
export const createMovie = async (movie: any) => {
  if (!movie) {
    throw new Error("Movie data is required");
  }
  return await addMovie(movie);
};

export const fetchMovieById = async (id: number) => {
  return await getMovieById(id);
};
export const removeMovie = async (id: number) => {
  return await deleteMovie(id);
};
