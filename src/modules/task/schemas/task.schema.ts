import { z } from "zod";
import { TASK_PRIORITIES } from "../types/task.js";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  priority: z.enum(TASK_PRIORITIES).default("low"),
  completed: z.boolean().default(false),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
