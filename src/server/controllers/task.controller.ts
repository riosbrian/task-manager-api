import type { Request, Response } from "express";
import { taskService } from "@/modules/task/services/task.service.js";

const service = taskService();

export async function getTask(req: Request, res: Response) {
  const taks = await service.find();
  res.status(200).json({
    status: "success",
    data: taks,
  });
}

export async function addTask(req: Request, res: Response) {
  const newTask = await service.create(req.body);
  res.status(201).json({
    status: "success",
    data: newTask,
  });
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const updatedTask = await service.findByIdAndUpdate(id as string, req.body);
  res.status(200).json({
    status: "success",
    data: updatedTask,
  });
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const deleteTask = await service.findByIdAndDelete(id as string);
  res.status(200).json({
    status: "success",
    data: deleteTask,
  });
}
