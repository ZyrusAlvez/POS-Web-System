import userModel from '../model/userModel.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = process.env.JWT_EXPIRY

const userController = {
  registerUser : async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if user already exists
      const existingUser = await userModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists', data : username  });
      }
  
      // Create new user
      const newUser = await userModel.create({ username, password });
  
      res.status(201).json({ message: 'User registered successfully', data : newUser.username });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  loginUser : async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const accessToken = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  
      // Send token as HttpOnly cookie
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'strict',
          maxAge: 3600000 * 24, // 24 hour
        })
        .json({ message: 'Login successful', accessToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

}

export default userController
