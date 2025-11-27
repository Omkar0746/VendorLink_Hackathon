const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public: list products
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected: suppliers for create/update/delete
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
