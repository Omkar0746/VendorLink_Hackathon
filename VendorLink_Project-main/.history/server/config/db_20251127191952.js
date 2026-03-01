// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("❌ ERROR: MONGODB_URI missing in .env");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✔ MongoDB connected successfully");
  } catch (err) {
    console.log("❌ Database Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
