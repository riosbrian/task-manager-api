import taskRouter from "@/server/routes/task.router.js";
import { Router } from "express";

const appRouter: Router = Router();

appRouter.use("/task", taskRouter);

export default appRouter;
