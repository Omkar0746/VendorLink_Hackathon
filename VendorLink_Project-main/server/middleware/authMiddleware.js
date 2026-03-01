// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mockDB = require("../config/mockDB");
const mongoose = require("mongoose");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) return res.status(401).json({ error: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "1234abcd");
    let user = null;

    try {
      if (mongoose.connection.readyState === 1) {
        user = await User.findById(decoded.id).select("-password");
      }
    } catch (dbErr) {
      console.log("[Auth] DB lookup failed, trying mock DB", dbErr.message);
    }

    // Fallback to mock DB if real user not found or DB not connected
    if (!user) {
      user = await mockDB.findUserById(decoded.id);
    }

    if (!user) {
      // Also check vendors occasionally in mock auth
      user = await mockDB.findVendorById(decoded.id);
    }

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("[Auth] Token failed:", err.message);
    res.status(401).json({ error: "Token failed" });
  }
};

exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }
  next();
};
