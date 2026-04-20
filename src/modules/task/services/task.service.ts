import {
  TaskModel,
  type TaskDocument,
} from "@/modules/task/models/task-mongo.model.js";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/modules/task/schemas/task.schema.js";
import { TaskError } from "@/modules/task/types/task.errors.js";
import type { Task, TaskRepository } from "@/modules/task/types/task.js";

function mapToResponse(doc: TaskDocument) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description ?? null,
    priority: doc.priority,
    completed: doc.completed,
  };
}

export function taskService(): TaskRepository {
  return {
    async create(input: CreateTaskInput & { userId: string }): Promise<Task> {
      const newTask = await TaskModel.create({
        ...input,
        description: input.description || null,
      });
      return mapToResponse(newTask);
    },

    async find(userId: string): Promise<Task[]> {
      const tasks = await TaskModel.find({ userId });
      return tasks.length > 0 ? tasks.map((task) => mapToResponse(task)) : [];
    },

    async findByIdAndUpdate(id: string, input: UpdateTaskInput): Promise<Task> {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        { _id: id },
        input,
        {
          returnDocument: "after",
        },
      );
      if (!updatedTask) throw TaskError.notFound();
      return mapToResponse(updatedTask);
    },

    async findByIdAndDelete(id: string): Promise<Task> {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) throw TaskError.notFound();
      return mapToResponse(deletedTask);
    },
  };
}
