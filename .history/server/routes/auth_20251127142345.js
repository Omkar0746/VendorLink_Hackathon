const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// SIGNUP
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields required" });
        }

        const user = new User({ name, email, password });

        await user.save();

        res.json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    res.json({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email }
    });
});

module.exports = router;
