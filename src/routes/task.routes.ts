// src/routes/task.routes.ts
import { Router } from "express";
import * as TaskController from "../controllers/task.controller";
import { authenticate } from "../middlewares/authentication";


const router = Router();

router.use(authenticate); // ✅ Now Express understands it's a middleware

router.post("/", TaskController.createTask);
router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById as unknown as import("express").RequestHandler);// getting type issue with getTaskById
router.put("/:id", TaskController.updateTask as unknown as import("express").RequestHandler); // getting type issue with updateTask


export default router;
