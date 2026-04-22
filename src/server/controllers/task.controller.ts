import { TaskMongoRepository } from "@/modules/task/repositories/task-mongo.repository.js";
import { TaskServiceImpl } from "@/modules/task/services/task.service.js";
import type { Request, Response } from "express";

const taskRepository = new TaskMongoRepository();
const taskService = new TaskServiceImpl(taskRepository);

export async function getTask(req: Request, res: Response) {
  const taks = await taskService.getUserTasks(req.user.userId);
  res.status(200).json({
    status: "success",
    data: taks,
  });
}

export async function addTask(req: Request, res: Response) {
  const newTask = await taskService.createNewTask(req.user.userId, req.body);
  res.status(201).json({
    status: "success",
    data: newTask,
  });
}

export async function updateTask(req: Request, res: Response) {
  const updatedTask = await taskService.updateTask(req.data, req.body);
  res.status(200).json({
    status: "success",
    data: updatedTask,
  });
}

export async function deleteTask(req: Request, res: Response) {
  const deleteTask = await taskService.deleteTask(req.data);
  res.status(200).json({
    status: "success",
    data: deleteTask,
  });
}
