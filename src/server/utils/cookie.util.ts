import type { Request, Response } from "express";
import type { CookieOptions } from "express";

const TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
};

const ACCESS_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  ...TOKEN_COOKIE_OPTIONS,
  maxAge: 15 * 60 * 1000,
};

const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  ...TOKEN_COOKIE_OPTIONS,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth/refresh",
};

const ACCESS_TOKEN_NAME = "accessToken";
const REFRESH_TOKEN_NAME = "refreshToken";

export function getCookie(req: Request, name: string): string | undefined {
  return req.cookies[name];
}

export function setCookie(
  res: Response,
  name: string,
  value: string,
  options?: CookieOptions,
): Response {
  return res.cookie(name, value, options ?? TOKEN_COOKIE_OPTIONS);
}

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
): Response {
  res
    .cookie(ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS)
    .cookie(REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
  return res;
}

export function clearCookie(res: Response, name: string): Response {
  return res.clearCookie(name, TOKEN_COOKIE_OPTIONS);
}

export function clearAuthCookies(res: Response): Response {
  res.clearCookie(ACCESS_TOKEN_NAME, TOKEN_COOKIE_OPTIONS);
  res.clearCookie(REFRESH_TOKEN_NAME, TOKEN_COOKIE_OPTIONS);
  return res;
}
