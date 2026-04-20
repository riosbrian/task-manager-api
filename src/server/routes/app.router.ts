import authRouter from "@/server/routes/auth.router.js";
import taskRouter from "@/server/routes/task.router.js";
import { Router } from "express";

const appRouter: Router = Router();

appRouter.use("/task", taskRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
