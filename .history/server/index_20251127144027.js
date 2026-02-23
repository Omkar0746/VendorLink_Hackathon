require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Debug log – to verify routes are loaded
console.log("Loading routes...");

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
    res.send("VendorLink Backend Running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));
