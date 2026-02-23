// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, requireRole } = require("../middleware/authMiddleware");

// public
router.get("/", getProducts);
router.get("/:id", getProductById);

// supplier only
router.post("/", protect, requireRole("supplier"), addProduct);
router.get("/me/list", protect, requireRole("supplier"), getMyProducts);
router.put("/:id", protect, requireRole("supplier"), updateProduct);
router.delete("/:id", protect, requireRole("supplier"), deleteProduct);

module.exports = router;
