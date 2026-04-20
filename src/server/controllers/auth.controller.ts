import type { Request, Response } from "express";
import { authService } from "@/modules/accounts/services/auth.service.js";
import { userService } from "@/modules/accounts/services/user.service.js";

const service = authService(userService());

export async function register(req: Request, res: Response) {
  await service.register(req.data);

  res.status(201).json({
    status: "success",
  });
}

export async function login(req: Request, res: Response) {
  const tokens = await service.login(req.data);

  res.status(200).json({
    status: "success",
    data: tokens,
  });
}
