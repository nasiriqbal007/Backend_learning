import { type Response } from "express";
export const handleResponse = <T>(
  res: Response,
  status: number,
  data: T,
  message: string = "success",
) => {
  return res.status(status).json({
    message,
    data,
  });
};

export const handleError = (
  res: Response,
  status: number,
  message = "server internal error",
) => {
  return res.status(status).json({
    message,
  });
};
