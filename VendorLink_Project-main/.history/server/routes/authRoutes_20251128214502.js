// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);


// GET all suppliers
router.get("/all-suppliers", async (req, res) => {
  try {
    const suppliers = await User.find({ role: "supplier" }).select("-password");
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
