
// src/services/task.service.ts
import { CREATE_TASK_REQUEST } from "../dto/TaskDto/task.request.dto";
import { TASK_RESPONSE } from "../dto/TaskDto/task.response.dto";
import { Task } from "../models/task.model";

import { Types } from "mongoose";

export const createTask = async (
  data: CREATE_TASK_REQUEST,
  userId: string
): Promise<TASK_RESPONSE> => {
  const task = await Task.create({
    ...data,
    owner: new Types.ObjectId(userId),
  });

  return formatTask(task);
};

export const getTasks = async (user: { _id: string; role: string }): Promise<TASK_RESPONSE[]> => {
  const filter = user.role === "admin" ? {} : { owner: user._id };
  const tasks = await Task.find(filter);
  return tasks.map(formatTask);
};

export const getTaskById = async (
  taskId: string,
  user: { _id: string; role: string }
): Promise<TASK_RESPONSE | null> => {
  const task = await Task.findById(taskId);
  if (!task) return null;

  if (user.role !== "admin" && task.owner.toString() !== user._id.toString()) {
    return null;
  }

  return formatTask(task);
};

export const updateTask = async (
  taskId: string,
  data: Partial<CREATE_TASK_REQUEST>,
  user: { _id: string; role: string }
): Promise<TASK_RESPONSE | null> => {
  const task = await Task.findById(taskId);
  if (!task) return null;

  const isOwner = task.owner.toString() === user._id.toString();
  if (user.role !== "admin" && !isOwner) return null;

  if (data.title) task.title = data.title;

  await task.save();
  return formatTask(task);
};

// Utility
const formatTask = (task: any): TASK_RESPONSE => ({
  _id: task._id.toString(),
  title: task.title,
  owner: task.owner.toString(),
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});
