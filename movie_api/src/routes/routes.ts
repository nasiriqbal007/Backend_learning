import { Router } from "express";
import {
  getMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";
import {
  validateMovieData,
  validateMovieId,
} from "../middleware/movieMiddleware";

const movieRouter = Router();

movieRouter.get("/", getMovies);

movieRouter.post("/", validateMovieData, addMovie);

movieRouter.get("/:id", validateMovieId, getMovieById);

movieRouter.patch("/:id", validateMovieId, validateMovieData, updateMovie);

movieRouter.delete("/:id", validateMovieId, deleteMovie);

export default movieRouter;
