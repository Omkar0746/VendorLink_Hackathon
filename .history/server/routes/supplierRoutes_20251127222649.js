const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

// GET supplier profile + products
router.get("/:id", async (req, res) => {
  try {
    const supplier = await User.findById(req.params.id).select("-password");

    if (!supplier || supplier.role !== "supplier") {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const products = await Product.find({ supplier: req.params.id });

    res.json({
      supplier,
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
