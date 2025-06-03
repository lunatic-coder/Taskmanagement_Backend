// src/dtos/task/task.response.dto.ts

export type TASK_RESPONSE = {
  _id: string;
  title: string;
  owner: string; // userId as string
  createdAt: Date;
  updatedAt: Date;
};
