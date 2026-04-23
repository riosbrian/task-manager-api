import { taskService } from "@/server/di.js";
import type { Request, Response } from "express";

export async function getTask(req: Request, res: Response) {
  const taks = await taskService.getUserTasks(req.user.userId);
  res.status(200).json({
    status: "success",
    data: taks,
  });
}

export async function addTask(req: Request, res: Response) {
  const { user, body } = res.locals.validated;
  const newTask = await taskService.createNewTask(user.userId, body);
  res.status(201).json({
    status: "success",
    data: newTask,
  });
}

export async function updateTask(req: Request, res: Response) {
  const { params, body } = res.locals.validated;
  const updatedTask = await taskService.updateTask(params.id, body);
  res.status(200).json({
    status: "success",
    data: updatedTask,
  });
}

export async function deleteTask(req: Request, res: Response) {
  const { params } = res.locals.validated;
  const deleteTask = await taskService.deleteTask(params.id);
  res.status(200).json({
    status: "success",
    data: deleteTask,
  });
}
