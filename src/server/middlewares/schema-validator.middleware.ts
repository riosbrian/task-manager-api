import { AppError } from "@/shared/custom-error.js";
import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export function schemaValidator(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `[${String(issue.path[0])}] - ${issue.message}`)
        .join(". ");
      throw new AppError(message, 400);
    }
    req.data = result.data;
    next();
  };
}
