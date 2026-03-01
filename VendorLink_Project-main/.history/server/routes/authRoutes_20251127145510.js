const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup API
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ message: "Signup Successful!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login API
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.password !== password)
            return res.status(400).json({ message: "Wrong password" });

        res.json({ message: "Login Successful!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
