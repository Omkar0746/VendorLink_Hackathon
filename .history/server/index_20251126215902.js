require("dotenv").config(); // <-- VERY IMPORTANT

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MONGO CONNECTION
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  res.send("API Working");
});

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
