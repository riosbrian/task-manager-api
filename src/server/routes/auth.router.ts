import {
  loginSchema,
  registerSchema,
} from "@/modules/accounts/schemas/auth.schema.js";
import {
  login,
  logout,
  register,
} from "@/server/controllers/auth.controller.js";
import { authentication } from "@/server/middlewares/authentication.middleware.js";
import { isGuest } from "@/server/middlewares/is-guest.middleware.js";
import { requireAuth } from "@/server/middlewares/require-auth.middleware.js";
import { schemaValidator } from "@/server/middlewares/schema-validator.middleware.js";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.use(authentication);
authRouter
  .post("/register", isGuest, schemaValidator(registerSchema), register)
  .post("/login", isGuest, schemaValidator(loginSchema), login)
  .post("/logout", requireAuth, schemaValidator(loginSchema), logout);

export default authRouter;
