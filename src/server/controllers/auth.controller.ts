import type { Request, Response } from "express";
import { authService } from "@/modules/accounts/services/auth.service.js";
import { userService } from "@/modules/accounts/services/user.service.js";
import {
  clearAuthCookies,
  setAuthCookies,
} from "@/server/utils/cookie.util.js";

const service = authService(userService());

export async function register(req: Request, res: Response) {
  await service.register(req.data);

  res.status(201).json({
    status: "success",
  });
}

export async function login(req: Request, res: Response) {
  const { accessToken, refreshToken } = await service.login(req.data);
  setAuthCookies(res, accessToken, refreshToken).json({
    status: "success",
  });
}

export async function logout(req: Request, res: Response) {
  clearAuthCookies(res).json({
    status: "success",
  });
}
