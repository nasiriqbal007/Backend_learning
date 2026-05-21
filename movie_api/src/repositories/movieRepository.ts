import { pool } from "../config/db";
import type { Movie } from "../models/movieModel";

export const getAllMovies = async () => {
  const res = await pool.query("SELECT * FROM movies");
  return res.rows;
};

export const getMovieById = async (id: number) => {
  const res = await pool.query("SELECT * FROM movies WHERE id=$1", [id]);
  return res.rows[0];
};

export const addMovie = async (movie: Movie): Promise<Movie> => {
  const movieData = [
    movie.title,
    movie.description,
    movie.releaseDate,
    movie.ratings,
  ];
  const res = await pool.query(
    "INSERT INTO movies (title, description, releaseDate, ratings) VALUES ($1, $2, $3, $4) RETURNING *",
    movieData,
  );
  return res.rows[0];
};

export const updateMovie = async (
  id: number,
  title: string,
  description: string,
  rating: number,
  releaseYear: string,
): Promise<Movie> => {
  const res = await pool.query(
    " UPDATE movies SET title=$1, description=$2, ratings=$3, releaseDate=$4 WHERE id=$5, RETURNING *",
    [title, description, rating, releaseYear, id],
  );
  return res.rows[0];
};
export const deleteMovie = async (id: number) => {
  await pool.query("DELETE FROM movies WHERE id=$1", [id]);
};
