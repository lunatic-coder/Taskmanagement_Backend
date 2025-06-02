import { LoginRequestSchema, SignupRequestSchema } from "../dto/AuthDto/auth.request.dto";
import { AuthResponseSchema } from "../dto/AuthDto/auth.response.dto";
import { login, signup } from "../services/auth.service";
import jwt from 'jsonwebtoken';


export const handleSignup = async (req, res) => {
  try {
    // ✅ Validate request
    const validatedData = SignupRequestSchema.parse(req.body);

    // 🧠 Call service logic
    const user = await signup(validatedData);

    // ✅ Prepare response
    const tokenPayload = {
      token: generateToken(user),
      user,
    };

    const response = AuthResponseSchema.parse(tokenPayload); // Validates the response shape

    return res.status(201).json(response);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return res.status(400).json({ message: errorMessage });
  }
};

export const handleLogin = async (req, res) => {
  try {
    // ✅ Validate request
    const validatedData = LoginRequestSchema.parse(req.body);

    // 🧠 Call service logic
    const result = await login(validatedData);

    // ✅ Validate response
    const response = AuthResponseSchema.parse(result);

    return res.status(200).json(response);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return res.status(401).json({ message: errorMessage });
  }
};

// 🔐 Token generation utility (could be moved to a separate helper file)
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}
