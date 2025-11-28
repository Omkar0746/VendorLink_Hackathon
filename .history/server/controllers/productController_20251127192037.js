const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const newProduct = await Product.create({
      supplier: req.user.id,
      name,
      price,
      image,
      category,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const all = await Product.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSupplierProducts = async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
