import { AppError } from "@/shared/custom-error.js";
import type { Request, Response, NextFunction } from "express";
import { type ZodObject } from "zod";

export function schemaValidator<T extends ZodObject>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `[${issue.path.join(".")}] - ${issue.message}`)
        .join(". ");

      throw new AppError(message, 400);
    }

    res.locals.validated = result.data;
    next();
  };
}
