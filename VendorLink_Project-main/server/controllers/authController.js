// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check mock DB if enabled
    if (global.useMockDB) {
      const existing = global.mockDB.users.find(u => u.email === email);
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = {
        _id: `user_${Date.now()}`,
        name,
        email,
        password,
        role,
        createdAt: new Date()
      };
      global.mockDB.users.push(newUser);

      return res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    }

    // Use real database
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check mock DB if enabled
    if (global.useMockDB) {
      const user = global.mockDB.users.find(u => u.email === email && u.role === role);
      if (!user) {
        return res.status(400).json({ message: "Invalid email or role" });
      }

      // Simple password check for mock DB (no bcrypt)
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "test-secret",
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login success",
        token,
        user: {
          _id: user._id,
          name: user.name || user.username,
          email: user.email,
          role: user.role
        },
      });
    }

    // Use real database
    const user = await User.findOne({ email, role });
    if (!user)
      return res.status(400).json({ message: "Invalid email or role" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login success",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
