import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError";

export const signup = async (data:any) => {


  const existingUser = await User.findOne({ email:data.email });

  if (existingUser) throw new ApiError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ name: data.name, email: data.email, password: hashedPassword,role: data.role });
  await user.save();
  return user;
};

export const login = async ({ email, password }) => {

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return {
    token: jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    ),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  };
};
