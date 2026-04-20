import { AppError } from "@/shared/custom-error.js";

export class AuthError extends AppError {
  private constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
    super(message, statusCode);
  }

  static notFoundUser() {
    return new AuthError("User not found", 404);
  }

  static userAlreadyRegistered() {
    return new AuthError("User already registered", 409);
  }

  static invalidCredentials() {
    return new AuthError("Invalid credentials", 401);
  }

  static alreadyLogin() {
    return new AuthError("You are already logged in", 400);
  }

  static requireAuth() {
    return new AuthError("Access denied. Authentication required", 401);
  }
}
