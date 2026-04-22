import { AppError } from "@/shared/custom-error.js";

export class TaskError extends AppError {
  private constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
    super(message, statusCode);
  }

  static notFound() {
    return new TaskError("Not Found Id", 400);
  }
}
