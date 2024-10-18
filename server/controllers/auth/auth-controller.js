import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// Register user
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // Simple validation
  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();

    res.status(201).json({
      message: 'Registration successful',
      user: newUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// Export the registerUser function
export { registerUser };
