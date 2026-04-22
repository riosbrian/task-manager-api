import { TaskError } from "@/modules/task/errors/task.errors.js";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/modules/task/schemas/task.schema.js";
import type {
  Task,
  TaskRepository,
  TaskService,
} from "@/modules/task/types/task.js";

export class TaskServiceImpl implements TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async createNewTask(userId: string, input: CreateTaskInput): Promise<Task> {
    const newTask = await this.repository.save({ ...input, userId });
    return newTask;
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    const tasks = await this.repository.findAllByUserId(userId);
    return tasks;
  }

  async updateTask(taskId: string, data: UpdateTaskInput): Promise<Task> {
    const updatedTask = await this.repository.update(taskId, data);
    if (!updatedTask) throw TaskError.notFound();
    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<Task> {
    const deletedTask = await this.repository.delete(taskId);
    if (!deletedTask) throw TaskError.notFound();
    return deletedTask;
  }
}
