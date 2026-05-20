import express from "express";
import taskRoutes from "./routes/taskRoutes";
import { handleError } from "./utils/response";
const app = express();
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  handleError(res, 404, "Route not found");
});
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  handleError(res, 500);
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
