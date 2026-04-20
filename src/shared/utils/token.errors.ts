import { AppError } from "@/shared/custom-error.js";

export class TokenError extends AppError {
  private constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
    super(message, statusCode);
  }

  static invalidToken() {
    return new TokenError("Invalid token", 401);
  }

  static tokenExpired() {
    return new TokenError("Token expired", 401);
  }
}