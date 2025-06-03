import express from 'express';
import {
  getAllUsersController,
  getUserTasksController
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.use(authenticate); // ✅ Now Express understands it's a middleware

router.get('/', getAllUsersController);
router.get('/:userId/tasks', getUserTasksController);

export default router;
