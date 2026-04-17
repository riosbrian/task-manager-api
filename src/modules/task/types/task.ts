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
  description?: string;
  priority: TaskPriority;
  completed: boolean;
};
