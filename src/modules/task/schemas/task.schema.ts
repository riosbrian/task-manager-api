import { z } from "zod";
import { TASK_PRIORITIES } from "../types/task.js";

const taskBody = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(TASK_PRIORITIES).default("low"),
  completed: z.boolean().default(false),
});

const taskParams = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Id"),
});

export const createTaskSchema = z.object({
  body: taskBody,
});

export const updateTaskSchema = z.object({
  params: taskParams,
  body: taskBody.partial(),
});

export type CreateTaskInput = z.infer<typeof taskBody>;
export type UpdateTaskInput = z.infer<typeof taskBody.partial>;
