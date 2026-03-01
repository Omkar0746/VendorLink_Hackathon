const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL SUPPLIERS
router.get("/", async (req, res) => {
  try {
    const suppliers = await User.find({ role: "supplier" });

    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SUPPLIER BY ID
router.get("/:id", async (req, res) => {
  try {
    const supplier = await User.findById(req.params.id);

    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
