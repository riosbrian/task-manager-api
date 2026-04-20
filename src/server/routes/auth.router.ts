import {
  loginSchema,
  registerSchema,
} from "@/modules/accounts/schemas/auth.schema.js";
import { login, register } from "@/server/controllers/auth.controller.js";
import { schemaValidator } from "@/server/middlewares/schema-validator.middleware.js";
import { Router } from "express";

const authRouter: Router = Router();

authRouter
  .post("/register", schemaValidator(registerSchema), register)
  .post("/login", schemaValidator(loginSchema), login);

export default authRouter;
