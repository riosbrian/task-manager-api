import { authService } from "@/server/di.js";
import {
  clearAuthCookies,
  setAuthCookies,
} from "@/server/utils/cookie.util.js";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  await authService.register(req.data);

  res.status(201).json({
    status: "success",
  });
}

export async function login(req: Request, res: Response) {
  const { accessToken, refreshToken } = await authService.login(req.data);
  setAuthCookies(res, accessToken, refreshToken!).json({
    status: "success",
  });
}

export async function logout(req: Request, res: Response) {
  clearAuthCookies(res).json({
    status: "success",
  });
}