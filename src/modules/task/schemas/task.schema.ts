import { z } from "zod";
import { TASK_PRIORITIES } from "../types/task.js";

const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(TASK_PRIORITIES).default("low"),
  completed: z.boolean().default(false),
});

const taskParams = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Id"),
});

export const createTaskSchema = z.object({
  body: taskSchema,
});

export const updateTaskSchema = z.object({
  params: taskParams,
  body: taskSchema.partial(),
});

export const deleteSchema = z.object({
  params: taskParams,
});

export type CreateTaskInput = z.infer<typeof taskSchema>;
export type UpdateTaskInput = typeof taskSchema.partial;
