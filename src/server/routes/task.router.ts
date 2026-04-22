import {
  createTaskSchema,
  updateTaskSchema,
} from "@/modules/task/schemas/task.schema.js";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "@/server/controllers/task.controller.js";
import { authentication } from "@/server/middlewares/authentication.middleware.js";
import { requireAuth } from "@/server/middlewares/require-auth.middleware.js";
import { schemaValidator } from "@/server/middlewares/schema-validator.middleware.js";
import { Router } from "express";

const taskRouter: Router = Router();

taskRouter.use(authentication, requireAuth);

taskRouter
  .route("/")
  .get(getTask)
  .post(schemaValidator(createTaskSchema), addTask);

taskRouter
  .route("/:id")
  .patch(schemaValidator(updateTaskSchema), updateTask)
  .delete(deleteTask);

export default taskRouter;
