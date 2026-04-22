import type { Request, Response } from "express";
import { AuthService } from "@/modules/accounts/services/auth.service.js";
import {
  clearAuthCookies,
  setAuthCookies,
} from "@/server/utils/cookie.util.js";

const userRepository = createUserRepository();
const authService = new AuthService(userRepository);

export async function register(req: Request, res: Response) {
  await authService.register(req.data);

  res.status(201).json({
    status: "success",
  });
}

export async function login(req: Request, res: Response) {
  const { accessToken, refreshToken } = await authService.login(req.data);
  setAuthCookies(res, accessToken, refreshToken).json({
    status: "success",
  });
}

export async function logout(req: Request, res: Response) {
  clearAuthCookies(res).json({
    status: "success",
  });
}
