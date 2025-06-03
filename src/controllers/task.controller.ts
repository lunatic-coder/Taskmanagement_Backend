// src/controllers/task.controller.ts
import { Request, Response } from "express";
import * as TaskService from "../services/task.service";
import { CREATE_TASK_REQUEST_SCHEMA } from "../dto/TaskDto/task.request.dto";


export const createTask = async (req: Request, res: Response) => {
  try {
    const data = CREATE_TASK_REQUEST_SCHEMA.parse(req.body);
    const task = await TaskService.createTask(data, req.user._id);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskService.getTasks(req.user);
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  const task = await TaskService.getTaskById(req.params.id, req.user);
  if (!task) {
    return res.status(404).json({ message: "Task not found or access denied" });
  }
  return res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.updateTask(req.params.id, req.body, req.user);
    if (!task) {
      return res.status(404).json({ message: "Task not found or access denied" });
    }
    return res.json(task); // ✅ Return here
  } catch (err: any) {
    return res.status(400).json({ message: err.message }); // ✅ Return here
  }
};
