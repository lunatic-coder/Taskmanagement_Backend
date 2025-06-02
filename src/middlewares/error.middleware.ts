// src/middlewares/error.middleware.ts
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";
import { formatZodError } from "../utils/errorFormatter";

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json(formatZodError(err));
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error("💥 Unhandled error:", err);
  return res.status(500).json({ message: "Internal Server Error" });
};
