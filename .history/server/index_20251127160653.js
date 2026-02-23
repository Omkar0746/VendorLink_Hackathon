// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => res.send("VendorLink Backend Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));
