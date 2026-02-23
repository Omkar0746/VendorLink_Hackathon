// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getProducts,
  getProductById,
  addProduct,
  getSupplierProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// 🔹 Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🔹 Supplier-only routes
router.get("/me/list", auth, getSupplierProducts);
router.post("/", auth, addProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
