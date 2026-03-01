const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

// Supplier analytics
router.get("/supplier", async (req, res) => {
  try {
    const supplierId = req.user.id;

    // Total Orders
    const orders = await Order.find({ vendorId: supplierId });

    // Total Revenue
    const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Monthly revenue
    const monthly = {};
    orders.forEach((o) => {
      const month = new Date(o.createdAt).toLocaleString("en", {
        month: "short",
      });
      monthly[month] = (monthly[month] || 0) + o.totalAmount;
    });

    // Most sold products
    const allProducts = await Product.find({ supplier: supplierId });
    const topProducts = allProducts.slice(0, 5);

    res.json({
      totalOrders: orders.length,
      revenue,
      monthlyRevenue: monthly,
      topProducts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
