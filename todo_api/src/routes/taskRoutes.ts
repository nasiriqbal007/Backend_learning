import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTask,
  updateTaskPartial,
  deleteTask,
} from "../controllers/taskController.js";
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API" });
});
router.get("/", getAllTasks);
router.post("/", addTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskPartial);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
