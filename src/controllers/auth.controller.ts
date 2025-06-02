import { LoginRequestSchema, SignupRequestSchema } from "../dto/AuthDto/auth.request.dto";
import { AuthResponseSchema } from "../dto/AuthDto/auth.response.dto";
import { login, signup } from "../services/auth.service";
import jwt from 'jsonwebtoken';
import { formatZodError } from '../utils/errorFormatter'; // 👈 Import formatter
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";
import { log } from "node:console";

// ✅ Signup handler
export const handleSignup = async (req, res) => {
  try {


    const validatedData = SignupRequestSchema.parse(req.body);


    const user = await signup(validatedData);

    const tokenPayload = {
      token: generateToken(user),
      user,
    };


    const response = AuthResponseSchema.parse(tokenPayload);
    return res.status(201).json(response);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json(formatZodError(err));
    }

    if (err instanceof ApiError) {
      // ✅ Send the correct status and message
      return res.status(err.statusCode).json({ message: err.message });
    }

    console.error("Unexpected error during signup:", err); // helpful for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Login handler
export const handleLogin = async (req, res, next) => {
  try {
    const validatedData = LoginRequestSchema.parse(req.body);

    const result = await login(validatedData);


 // ✅ Convert _id (ObjectId) to id (string)
    const userWithId = {
      id: result.user.id.toString(), // 👈 Fix here
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    const response = AuthResponseSchema.parse({
      token: result.token,
      user: userWithId,
    });



    return res.status(200).json(response);
  } catch (err) {
    next(err); // Pass to global error handler
  }
};

// 🔐 Token generation utility
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}