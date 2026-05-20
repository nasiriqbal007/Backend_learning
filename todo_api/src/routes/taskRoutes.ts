import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTask,
  updateTaskPartial,
  deleteTask,
} from "../controllers/taskController.js";
import { Router } from "express";
import { validateTask } from "../middleware/validateTask.js";
import { validateId } from "../middleware/validateId.js";
const router = Router();

router.get("/", getAllTasks);
router.post("/", validateTask, addTask);
router.get("/:id", validateId, getTaskById);
router.patch("/:id", validateId, updateTaskPartial);
router.put("/:id", validateId, validateTask, updateTask);
router.delete("/:id", validateId, deleteTask);

export default router;
