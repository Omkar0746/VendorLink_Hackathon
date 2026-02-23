require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("VendorLink Backend Running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));
