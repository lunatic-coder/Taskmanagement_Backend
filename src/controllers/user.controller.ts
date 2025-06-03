import { Request, Response } from 'express';
import { getAllUsers, getTasksByUserId } from '../services/user.service';


export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserTasksController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const tasks = await getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
