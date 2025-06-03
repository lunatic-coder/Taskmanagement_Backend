// src/middlewares/authentication.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(decoded.id).select("_id role");
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = { _id: user._id.toString(), role: user.role }; // 👈 ensure this aligns with your declared type
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
