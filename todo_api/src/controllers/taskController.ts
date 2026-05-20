import { type Request, type Response } from "express";
import { readTasks, writeTasks } from "../services/dbService.js";
import type { Task } from "../../types/Task.js";
import { handleResponse, handleError } from "../utils/response.js";
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    if (tasks.length === 0) {
      return handleResponse(res, 200, [], "No tasks found");
    }
    handleResponse(res, 200, tasks, "Tasks found");
  } catch (error) {
    return handleError(res, 500);
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, priority, completed } = req.body;

    const tasks = await readTasks();

    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title,
      priority,
      completed,
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    handleResponse(res, 201, newTask, "Task created");
  } catch (error) {
    handleError(res, 500);
  }
};
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const id = Number(req.params.id);
    const findTask = tasks.find((t) => t.id === id);
    if (!findTask) {
      return handleError(res, 404, "Task not found");
    } else {
      return handleResponse(res, 200, findTask, "Task found");
    }
  } catch (error) {
    handleError(res, 500);
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const { title, priority, completed } = req.body;
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return handleError(res, 404, "Task not found");
    }
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      id,
      title,
      priority,
      completed,
    };
    await writeTasks(tasks);
    return handleResponse(res, 200, tasks[taskIndex], "Task updated");
  } catch {
    return handleError(res, 500);
  }
};
export const updateTaskPartial = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return handleError(res, 404, "Task not found");
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
    };

    await writeTasks(tasks);
    return handleResponse(res, 200, tasks[taskIndex], "Task updated");
  } catch (error) {
    handleError(res, 500);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const id = Number(req.params.id);
    const findIndex = tasks.findIndex((i) => i.id === id);
    if (findIndex == -1) {
      return handleError(res, 404, "Task not found");
    }
    tasks.splice(findIndex, 1);
    await writeTasks(tasks);
    return handleResponse(res, 204, "task deleted");
  } catch (error) {
    return handleError(res, 500);
  }
};
