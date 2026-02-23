const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// PLACE ORDER
router.post("/", auth, async (req, res) => {
  try {
    const { supplierId, items, totalAmount } = req.body;

    const newOrder = await Order.create({
      vendorId: req.user.id,
      supplierId,
      items,
      totalAmount,
    });

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ORDERS FOR VENDOR
router.get("/vendor", auth, async (req, res) => {
  try {
    const orders = await Order.find({ vendorId: req.user.id })
      .populate("supplierId", "name shopName location contactNumber")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ORDERS FOR SUPPLIER
router.get("/supplier", auth, async (req, res) => {
  try {
    const orders = await Order.find({ supplierId: req.user.id })
      .populate("vendorId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
