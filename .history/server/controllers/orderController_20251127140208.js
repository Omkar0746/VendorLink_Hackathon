const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, vendorId, items, totalAmount, status } = req.body;

    const order = await Order.create({
      userId,
      vendorId,
      items,
      totalAmount,
      status: status || "pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("vendorId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
