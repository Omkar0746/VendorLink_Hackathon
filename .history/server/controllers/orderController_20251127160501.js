// server/controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const order = await Order.create({
      vendor: req.user._id,
      supplier: product.supplier,
      item: {
        product: product._id,
        quantity: quantity || 1,
        price: product.price
      }
    });

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyOrdersAsVendor = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user._id })
      .populate("item.product", "name price")
      .populate("supplier", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersForSupplier = async (req, res) => {
  try {
    const orders = await Order.find({ supplier: req.user._id })
      .populate("item.product", "name price")
      .populate("vendor", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// simple analytics: total orders & revenue
exports.getSupplierAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ supplier: req.user._id });
    const totalOrders = orders.length;
    const revenue = orders.reduce(
      (sum, o) => sum + o.item.price * o.item.quantity,
      0
    );
    res.json({ totalOrders, revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
