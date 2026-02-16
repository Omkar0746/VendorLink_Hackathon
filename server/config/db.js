// config/db.js
const mongoose = require("mongoose");
const mockDB = require("./mockDB");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("⚠️  MONGODB_URI missing in .env, using mock database");
      global.useMockDB = true;
      global.mockDB = mockDB;
      console.log("✔ Mock database initialized with sample data");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    console.log("✔ MongoDB connected successfully");
    global.useMockDB = false;
  } catch (err) {
    console.log("⚠️  MongoDB connection failed:", err.message);
    console.log("📦 Falling back to mock database for demonstration");
    global.useMockDB = true;
    global.mockDB = mockDB;
    console.log("✔ Mock database initialized with sample data");
  }
};

module.exports = connectDB;
