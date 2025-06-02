import { z } from "zod";

// Signup request DTO + validation
export const SignupRequestSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "user"]).optional().default("user"),
});

// Login request DTO + validation
export const LoginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript types inferred from Zod schemas
export type SignupRequestDTO = z.infer<typeof SignupRequestSchema>;
export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
