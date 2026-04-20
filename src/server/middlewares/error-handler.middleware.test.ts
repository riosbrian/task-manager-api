import express from "express";
import request from "supertest";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";
import { AppError } from "@/shared/custom-error.js";

const app = express();

describe("Global Error Handler Middleware", () => {
  it("should capture errors", async () => {
    app.get("/error", (req, res) => {
      throw new Error("Internal Server Error");
    });

    app.use(errorHandler);

    const response = await request(app).get("/error");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: "error",
      message: "Internal Server Error",
    });
  });

  it("should capture custom erros", async () => {
    app.get("/custom-error", (req, res) => {
      throw new AppError("Custom App Error", 400);
    });

    app.use(errorHandler);

    const response = await request(app).get("/custom-error");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: "fail",
      message: "Custom App Error",
    });
  });

  it("should capture mongodb errors", async () => {
    app.get("/mongodb-error", (req, res) => {
      const mongoerror = new Error("MongoDb error");
      mongoerror.name = "CastError";
      throw mongoerror;
    });

    app.use(errorHandler);

    const response = await request(app).get("/mongodb-error");
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Invalid");
  });
});
