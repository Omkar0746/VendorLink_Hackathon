const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER USER
// =========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, shopName, contactNumber, location } =
      req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and role are required" });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // "vendor" or "supplier"
      shopName: role === "supplier" ? shopName : null,
      contactNumber: role === "supplier" ? contactNumber : null,
      location: role === "supplier" ? location : null,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// =========================
// LOGIN USER
// =========================
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password & role required" });
    }

    // User exists?
    let user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found, register first" });

    // Role must match
    if (user.role !== role) {
      return res.status(400).json({
        message: `Incorrect role selected — You registered as: ${user.role}`,
      });
    }

    // Password check
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        shopName: user.shopName,
        contactNumber: user.contactNumber,
        location: user.location,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
};
