import router from "express";
import { fetchAllMovies } from "../services/movieService";
import { validateMovieData } from "../middleware/movieMiddleware";
import { addMovie } from "../controllers/movieController";
const movieRouter = router();

movieRouter.get("/", fetchAllMovies);
movieRouter.post("/", validateMovieData, addMovie);
