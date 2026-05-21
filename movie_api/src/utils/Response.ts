import { type Response } from "express";
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message: string = "success",
) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

export const handleError = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  res.status(statusCode).json({ error: message });
};
