// server/controllers/productController.js
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      category,
      supplier: req.user._id
    });

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplier", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate("supplier", "name email");
    if (!p) return res.status(404).json({ error: "Product not found" });
    res.json(p);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, supplier: req.user._id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found or unauthorized" });
    res.json({ message: "Updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      supplier: req.user._id
    });
    if (!product) return res.status(404).json({ error: "Product not found or unauthorized" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
