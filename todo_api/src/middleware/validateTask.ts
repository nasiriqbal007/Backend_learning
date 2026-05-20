import type { Request, Response, NextFunction } from "express";
export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, priority, completed } = req.body;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Title required" });
  }
  if (typeof priority !== "string" || priority.trim() === "") {
    return res.status(400).json({ message: "Priority is required" });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "Completed must be boolean" });
  }

  next();
};
