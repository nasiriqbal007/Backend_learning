import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import type { Task } from "../../types/Task.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/tasks.json");

export const readTasks = async (): Promise<Task[]> => {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
};

export const writeTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error while writing:", error);
    throw new Error("failed to write task");
  }
};
