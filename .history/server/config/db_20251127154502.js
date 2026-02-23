// server/config/db.js

const mongoose = require("mongoose");

const connectDB = () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ ERROR: MONGODB_URI is missing in .env file");
    process.exit(1);
  }

  return mongoose
    .connect(uri)
    .then(() => {
      console.log("✔ MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
