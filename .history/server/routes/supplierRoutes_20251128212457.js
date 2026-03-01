const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await User.find({ role: "supplier" })
      .select("name shopName location contactNumber image rating");

    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
