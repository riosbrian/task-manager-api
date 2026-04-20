import { envs } from "@/config/envs.js";
import { AuthError } from "@/modules/accounts/types/auth.errors.js";
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
  const token = jwt.sign(payload, envs.MONGO_DB_NAME, options);
  return token;
}

export async function verifyToken(token: string): Promise<JwtPayload | string> {
  try {
    const payload = jwt.verify(token, envs.MONGO_DB_NAME);
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") throw AuthError.tokenExpired();
      if (error.name === "JsonWebTokenError") throw AuthError.invalidToken();
    }

    throw AuthError.invalidToken();
  }
}
