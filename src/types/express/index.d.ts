// src/types/express/index.d.ts
import { Request } from "express";
import {User} from "../../models/user.model";

declare global {
  namespace Express {
    interface UserPayload {
      _id: string;
      role: "user" | "admin"
    }

    interface Request {
      user: UserPayload;
    }
  }
}
