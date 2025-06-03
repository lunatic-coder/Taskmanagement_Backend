import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/error.middleware';

import authRoutes from './routes/auth.routes';
import taskRouter from './routes/task.routes';
import userRouter from './routes/user.routes';

dotenv.config();
const app = express();

// Configure CORS to allow credentials
app.use(cors({
origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);


app.use(globalErrorHandler);

export default app;

