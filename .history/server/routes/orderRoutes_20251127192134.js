const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { createOrder, supplierAnalytics } = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/supplier/analytics", auth, supplierAnalytics);

module.exports = router;
