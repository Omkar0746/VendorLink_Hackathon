const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      category,
    });

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
