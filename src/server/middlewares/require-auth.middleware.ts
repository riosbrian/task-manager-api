import { AuthError } from "@/modules/accounts/errors/auth.errors.js";
import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw AuthError.requireAuth();
  next();
}
