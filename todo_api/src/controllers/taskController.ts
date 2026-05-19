import { type Request, type Response } from "express";
import { readTasks, writeTasks } from "../services/dbService.js";
import type { Task } from "../../types/Task.js";
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, priority, completed } = req.body;
    if (!title || !priority) {
      return res
        .status(400)
        .json({ message: "Title and priority are required" });
    }
    const tasks = await readTasks();
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      priority,
      completed,
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const id = Number(req.params.id);
    const findTask = tasks.find((t) => t.id === id);
    if (findTask) {
      res.json(findTask);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const { title, priority, completed } = req.body;
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex == -1) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      id,
      title,
      priority,
      completed,
    };
    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch {
    res.status(500).json({ message: "server internal error" });
  }
};
export const updateTaskPartial = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
    };

    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    const id = Number(req.params.id);
    const findIndex = tasks.findIndex((i) => i.id === id);
    if (findIndex == -1) {
      res.status(404).json({ message: "not found" });
      return;
    }
    tasks.splice(findIndex, 1);
    await writeTasks(tasks);
    res.json({ message: `task deleted ${findIndex}` });
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};
