import type { Task } from "@/modules/task/types/task.js";
import type { TaskRepository } from "@/modules/task/types/task.js";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/modules/task/schemas/task.schema.js";
import {
  TaskModel,
  type TaskDocument,
} from "@/modules/task/models/task-mongo.model.js";

const mapToResponse = (doc: TaskDocument): Task => ({
  id: doc._id.toString(),
  title: doc.title,
  description: doc.description ?? null,
  priority: doc.priority,
  completed: doc.completed,
  userId: doc.userId.toString(),
});

export class TaskMongoRepository implements TaskRepository {
  async findById(id: string): Promise<Task | null> {
    const doc = await TaskModel.findById(id);
    return doc ? mapToResponse(doc) : null;
  }

  async save(data: CreateTaskInput): Promise<Task> {
    const doc = await new TaskModel(data).save();
    return mapToResponse(doc);
  }

  async findAllByUserId(userId: string): Promise<Task[]> {
    const docs = await TaskModel.find({ userId });
    return docs.map(mapToResponse);
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task | null> {
    const doc = await TaskModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    return doc ? mapToResponse(doc) : null;
  }

  async delete(id: string): Promise<Task | null> {
    const doc = await TaskModel.findByIdAndDelete(id);
    return doc ? mapToResponse(doc) : null;
  }
}
