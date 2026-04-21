import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/shared/utils/jwt.util.js";
import { getCookie } from "@/server/utils/cookie.util.js";
import { AppError } from "@/shared/custom-error.js";

export async function refreshTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const refreshToken = getCookie(req, "refreshToken");
  if (!refreshToken) {
    throw new AppError("Refresh token required", 400);
  }

  const payload = await verifyToken(refreshToken);

  req.user = {
    userId: (payload as { userId: string }).userId,
    refreshToken,
  };

  next();
}
