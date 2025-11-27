require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB Atlas
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());

// Allow requests from your front-end (Live Server)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// simple root
app.get('/', (req, res) => res.send('VendorLink backend running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
