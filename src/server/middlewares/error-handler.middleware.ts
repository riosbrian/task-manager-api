import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/custom-error.js";
import { handleMongoDbErrors } from "@/server/db/mongodb.errors.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const mongoDbError = handleMongoDbErrors(err);
  if (mongoDbError) {
    return res.status(mongoDbError.statusCode).json({
      status: mongoDbError.status,
      message: mongoDbError.message,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
