import express from "express";
import request from "supertest";
import { z } from "zod";
import { schemaValidator } from "@/server/middlewares/schema-validator.middleware.js";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";

const schema = z.object({
  name: z.string().min(3, "name must be > than 3 characters"),
});

const app = express();
app.use(express.json());
app.post("/schema", schemaValidator(schema), (req, res) => {
  res.status(200).json({
    data: req.data,
  });
});

app.use(errorHandler);

describe("Schema Validator Middleware (zod)", () => {
  it("should throw with status 400 if schema is invalid", async () => {
    const response = await request(app).post("/schema").send({ name: "jo" });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("name must be > than 3 characters");
  });

  it("should pass to the next middleware if schema is valid", async () => {
    const response = await request(app)
      .post("/schema")
      .send({ name: "jonh doe" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { name: "jonh doe" } });
  });
});
