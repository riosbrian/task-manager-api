import {
  TaskModel,
  type TaskDocument,
} from "@/modules/task/models/task-mongo.model.js";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/modules/task/schemas/task.schema.js";
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
    async create(input: CreateTaskInput): Promise<Task> {
      const newTask = await TaskModel.create(input);
      return mapToResponse(newTask);
    },

    async find(): Promise<Task[]> {
      return await TaskModel.find({});
    },

    async findByIdAndUpdate(id: string, input: UpdateTaskInput): Promise<Task> {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        { _id: id },
        input,
        {
          returnDocument: "after",
        },
      ).lean();
      if (!updatedTask) throw new Error("Not found task error");
      return mapToResponse(updatedTask);
    },

    async findByIdAndDelete(id: string): Promise<void> {
      const deletedTask = await TaskModel.findByIdAndDelete(id).lean();
      if (!deletedTask) throw new Error("Not found task error");
    },
  };
}
