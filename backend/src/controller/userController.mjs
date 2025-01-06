import userModel from '../model/userModel.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, sales, fullname } = req.body;

      // Check if user already exists
      const existingUser = await userModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists', data: username });
      }

      // Create new user
      const newUser = await userModel.create({ username, password, sales, fullname });

      res.status(201).json({ message: 'User registered successfully', data: newUser.username });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  loginUser: async (req, res) => {
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
          maxAge: 3600000 * 24, // 24 hours
        })
        .json({ message: 'Login successful', accessToken, user: username });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  checkAuth: async (req, res) => {
    try {
      // Ensure cookies are present
      const token = req.cookies?.accessToken;
      if (!token) {
        console.log("No token provided in cookies");
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Send response with user details (customize as needed)
      res.status(200).json({ message: 'Access granted', user: { id: decoded.id, username: decoded.username } });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
  },

  logout: (req, res) => {
    try {
      // Clear the accessToken cookie
      res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'strict',
        })
        .status(200)
        .json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getUser: async (req, res) => { 
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  resetSales: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndUpdate(id, { gcashSales: 0, cashSales: 0 }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Sales reset successfully' });
    } catch (error) { 
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  addGcashSales: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body; // Get the amount to add from the request body
      const user = await userModel.findByIdAndUpdate(
        id,
        { $inc: { gcashSales: amount } }, // Increment the sales field by the specified amount
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Sales added successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  addCashSales: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body; // Get the amount to add from the request body
      const user = await userModel.findByIdAndUpdate(
        id,
        { $inc: { cashSales: amount } }, // Increment the sales field by the specified amount
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Sales added successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

export default userController;
