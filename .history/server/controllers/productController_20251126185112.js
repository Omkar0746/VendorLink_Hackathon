const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    // req.user.id set by auth middleware
    const { title, description, price, stock, images } = req.body;
    const product = new Product({
      supplierId: req.user.id,
      title, description, price, stock, images
    });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId', 'name email');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.supplierId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.supplierId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
