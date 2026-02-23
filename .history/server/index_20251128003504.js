require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Middlewares
const auth = require("./middleware/auth");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("VendorLink Backend Running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Protected Route (Supplier Analytics)
app.use("/api/analytics", auth, analyticsRoutes);

app.use("/api/invoice", require("./routes/invoiceRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));



// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✔ Server running on port ${PORT}`)
);
