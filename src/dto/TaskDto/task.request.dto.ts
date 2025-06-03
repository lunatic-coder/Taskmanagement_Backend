// src/dtos/task/task.request.dto.ts
import { z } from "zod";

export const CREATE_TASK_REQUEST_SCHEMA = z.object({
  title: z.string().min(1, "Title is required"),
});

export type CREATE_TASK_REQUEST = z.infer<typeof CREATE_TASK_REQUEST_SCHEMA>;
