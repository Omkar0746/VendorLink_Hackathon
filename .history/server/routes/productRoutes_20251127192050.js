// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addProduct,
  getProducts,
  getSupplierProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/me/list", auth, getSupplierProducts);
router.post("/", auth, addProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
