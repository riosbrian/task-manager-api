import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/shared/utils/jwt.util.js";
import { getCookie } from "@/server/utils/cookie.util.js";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = getCookie(req, "accessToken");
  if (accessToken) {
    const decoded = await verifyToken(accessToken);
    req.user = decoded;
  }
  next();
}
