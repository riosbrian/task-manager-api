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
  userId: string;
};

export interface TaskRepository {
  save(data: CreateTaskInput & { userId: string }): Promise<Task>;
  findAllByUserId(userId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, data: UpdateTaskInput): Promise<Task | null>;
  delete(id: string): Promise<Task | null>;
}

export interface TaskService {
  createNewTask(userId: string, input: CreateTaskInput): Promise<Task>;
  getUserTasks(userId: string): Promise<Task[]>;
  updateTask(taskId: string, data: UpdateTaskInput): Promise<Task>;
  deleteTask(taskId: string): Promise<Task>;
}
