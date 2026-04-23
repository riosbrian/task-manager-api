import { AuthError } from "@/modules/accounts/errors/auth.errors.js";
import type { Request, Response, NextFunction } from "express";

export function isGuest(req: Request, res: Response, next: NextFunction) {
  if (res.locals.validated.user) throw AuthError.alreadyLogin();
  next();
}
