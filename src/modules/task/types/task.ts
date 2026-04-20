import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/modules/task/schemas/task.schema.js";

export const TASK_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type TaskPriority =
  (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];

export type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  completed: boolean;
};

export interface TaskRepository {
  create: (input: CreateTaskInput & { userId: string }) => Promise<Task>;
  find: (userId: string) => Promise<Task[]>;
  findByIdAndUpdate: (id: string, input: UpdateTaskInput) => Promise<Task>;
  findByIdAndDelete: (id: string) => Promise<Task>;
}
