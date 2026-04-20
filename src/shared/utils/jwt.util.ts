import { envs } from "@/config/envs.js";
import { TokenError } from "./token.errors.js";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const TOKEN_TYPES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES];

function getSignOptions(type: TokenType): SignOptions {
  switch (type) {
    case "accessToken":
      return { expiresIn: "15m" };
    case "refreshToken":
      return { expiresIn: "30d" };
    default:
      return { expiresIn: "3h" };
  }
}

export async function signToken<T extends object>(
  payload: T,
  type: TokenType,
): Promise<string> {
  const options = getSignOptions(type);
  return new Promise((resolve, reject) => {
    jwt.sign(payload, envs.JWT_SECRET, options, (err, token) => {
      if (err) return reject(err);
      resolve(token as string);
    });
  });
}

export async function verifyToken(token: string): Promise<JwtPayload | string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, envs.JWT_SECRET, (error, payload) => {
      if (error) {
        if (error.name === "TokenExpiredError")
          return reject(TokenError.tokenExpired());
        if (error.name === "JsonWebTokenError")
          return reject(TokenError.invalidToken());
        return reject(TokenError.invalidToken());
      }
      resolve(payload!);
    });
  });
}
