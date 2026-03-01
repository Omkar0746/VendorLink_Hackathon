// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// PLACE ORDER (Vendor)
router.post("/", auth, async (req, res) => {
  try {
    const { supplierId, items, totalAmount } = req.body;

    if (!supplierId || !items || !items.length) {
      return res
        .status(400)
        .json({ message: "supplierId and at least one item are required" });
    }

    const order = await Order.create({
      vendorId: req.user.id,
      supplierId,
      items,
      totalAmount,
    });

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order place error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET ORDERS FOR VENDOR (My Orders page)
router.get("/vendor", auth, async (req, res) => {
  try {
    const orders = await Order.find({ vendorId: req.user.id })
      .populate("supplierId", "name shopName location")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Vendor orders error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET ORDERS FOR SUPPLIER (Supplier Order Dashboard)
router.get("/supplier", auth, async (req, res) => {
  try {
    const orders = await Order.find({ supplierId: req.user.id })
      .populate("vendorId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Supplier orders error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ORDER STATUS (Supplier only)
router.patch("/:id/status", auth, async (req, res) => {
  try:
    const { status } = req.body;

    if (
      !["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Only supplier who owns this order can update status
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (String(order.supplierId) !== String(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this order" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Update status error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
