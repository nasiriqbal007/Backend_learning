import express from "express";
import { port, NODE_ENV } from "./config/db";
import movieRouter from "./routes/routes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/movies", movieRouter);

const globalErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Running in ${NODE_ENV} mode on port ${port}`);
});
