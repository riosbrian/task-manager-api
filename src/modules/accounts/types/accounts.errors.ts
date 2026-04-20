import { AppError } from "@/shared/custom-error.js";

export class AccountError extends AppError {
  private constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
    super(message, statusCode);
  }

  static notFoundUser() {
    return new AccountError("User not found", 400);
  }

  static userAlreadyRegistered() {
    return new AccountError("User already registered", 400);
  }

  static invalidCredentials() {
    return new AccountError("Invalid credentials", 400);
  }
}
