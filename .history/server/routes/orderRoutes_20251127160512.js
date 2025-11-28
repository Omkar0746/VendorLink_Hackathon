// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrdersAsVendor,
  getOrdersForSupplier,
  getSupplierAnalytics
} = require("../controllers/orderController");
const { protect, requireRole } = require("../middleware/authMiddleware");

// vendor
router.post("/", protect, requireRole("vendor"), placeOrder);
router.get("/me", protect, requireRole("vendor"), getMyOrdersAsVendor);

// supplier
router.get("/supplier", protect, requireRole("supplier"), getOrdersForSupplier);
router.get("/supplier/analytics", protect, requireRole("supplier"), getSupplierAnalytics);

module.exports = router;
