// controllers/productController.js
const Product = require("../models/Product");
const mongoose = require("mongoose");
const mockDB = require("../config/mockDB");

// 🔹 Public: get all products
exports.getProducts = async (req, res) => {
  try {
    // If MongoDB is not connected, return mock data for development/demo
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.json(mockDB.products || []);
    }

    const products = await Product.find()
      .populate("supplier", "name email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Public: get one product by id
exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate(
      "supplier",
      "name email"
    );
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Supplier-only: add product
exports.addProduct = async (req, res) => {
  try {
    if (req.user.role !== "supplier") {
      return res.status(403).json({ message: "Only suppliers can add products" });
    }

    const { name, price, image, category, inStock, tags } = req.body;

    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      const newProduct = {
        _id: "prod_" + Date.now(),
        supplier: req.user.id,
        name,
        price: parseFloat(price),
        image,
        category,
        inStock: inStock !== undefined ? inStock : true,
        tags: Array.isArray(tags) ? tags : [],
        createdAt: new Date()
      };
      mockDB.products.push(newProduct);
      return res.status(201).json(newProduct);
    }

    const product = await Product.create({
      supplier: req.user.id,
      name,
      price,
      image,
      category,
      inStock: inStock !== undefined ? inStock : true,
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Supplier-only: get own products
exports.getSupplierProducts = async (req, res) => {
  try {
    if (req.user.role !== "supplier") {
      return res
        .status(403)
        .json({ message: "Only suppliers can view their products" });
    }

    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      const products = mockDB.products.filter(p => p.supplier === req.user.id);
      return res.json(products);
    }

    const products = await Product.find({ supplier: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Supplier-only: update own product
exports.updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "supplier") {
      return res
        .status(403)
        .json({ message: "Only suppliers can update products" });
    }

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, supplier: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Product not found or not owned by you" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Supplier-only: delete own product
exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "supplier") {
      return res
        .status(403)
        .json({ message: "Only suppliers can delete products" });
    }

    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      const index = mockDB.products.findIndex(p => p._id === req.params.id && p.supplier === req.user.id);
      if (index === -1) return res.status(404).json({ message: "Product not found or not owned by you" });

      const deleted = mockDB.products.splice(index, 1);
      return res.json({ message: "Product deleted" });
    }

    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      supplier: req.user.id,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Product not found or not owned by you" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
