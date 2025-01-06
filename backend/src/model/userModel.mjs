import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cashSales: {
    type: Number,
    default: 0,
  },
  gcashSales: {
    type: Number,
    default: 0,
  },
  fullname: {
    type: {
      surname: { type: String, required: true },
      firstname: { type: String, required: true },
      middleInitial: { type: String, required: false },
    },
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10); // Salt rounds
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
