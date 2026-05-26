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
import { authMiddleware } from "../middleware/authMiddleware";

const movieRouter = Router();

movieRouter.get("/", getMovies);

movieRouter.get("/:id", validateMovieId, getMovieById);

movieRouter.post("/", authMiddleware, validateMovieData, addMovie);

movieRouter.patch(
  "/:id",
  authMiddleware,
  validateMovieId,
  validateMovieData,
  updateMovie,
);

movieRouter.delete("/:id", authMiddleware, validateMovieId, deleteMovie);

export default movieRouter;
