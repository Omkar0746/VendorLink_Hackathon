// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { auth } = require("../middleware/auth");

// -------------------------------------------------------------
// PLACE ORDER (Vendor)
// -------------------------------------------------------------
router.post("/", auth, async (req, res) => {
  try {
    const { supplierId, items, totalAmount } = req.body;

    if (!supplierId || !items || !items.length) {
      return res
        .status(400)
        .json({ message: "supplierId and at least one item are required" });
    }

    // If using mock DB just push to in-memory store
    if (global.useMockDB) {
      const order = {
        _id: `order_${Date.now()}`,
        vendorId: req.user.id,
        supplierId,
        items,
        totalAmount,
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      global.mockDB.orders = global.mockDB.orders || [];
      global.mockDB.orders.push(order);
      return res.json({ message: "Order placed successfully", order });
    }

    const order = await Order.create({
      vendorId: req.user.id,
      supplierId,
      items,
      totalAmount,
    });

    // Notify Supplier of new order
    const { notifyUser } = require("../config/notifications");
    notifyUser(supplierId, "new_order", {
      title: "New Order Received!",
      message: `You have a new order from ${req.user.name || "a Vendor"} for ₹${totalAmount}`,
      type: "order",
      orderId: order._id
    });

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order place error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// GET ORDERS FOR VENDOR (My Orders page)
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// GET ORDERS FOR SUPPLIER (Supplier Dashboard)
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// UPDATE ORDER STATUS (Supplier only)
// -------------------------------------------------------------
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (
      !["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Get the order
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Supplier validation
    if (String(order.supplierId) !== String(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this order" });
    }

    // Update status
    order.status = status;
    await order.save();

    // Notify Vendor of status change
    const { notifyUser } = require("../config/notifications");
    notifyUser(order.vendorId, "order_status_updated", {
      title: "Order Update",
      message: `Your order #${order._id.toString().slice(-6)} is now ${status}`,
      type: "order",
      orderId: order._id
    });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Update status error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
