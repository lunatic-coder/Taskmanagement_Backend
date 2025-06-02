import { z } from "zod";

// User info in response
export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "user"]),
});

// Auth response DTO with JWT token and user info
export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserResponseSchema,
});

// TypeScript type inferred
export type AuthResponseDTO = z.infer<typeof AuthResponseSchema>;
