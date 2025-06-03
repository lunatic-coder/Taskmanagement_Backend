import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import mongoose from 'mongoose';

export const getAllUsers = async () => {
  return await User.find().select('-password'); // Exclude passwords
};

export const getTasksByUserId = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const tasks = await Task.find({ owner: userId });
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tasks,
  };
};
