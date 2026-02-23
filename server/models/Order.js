// server/models/Order.js
const mongoose = require("mongoose");

// One line item in an order
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1,
    },
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // Who placed the order (vendor)
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Which supplier will fulfil the order
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Order items
    items: [orderItemSchema],

    // Total amount of this order
    totalAmount: {
      type: Number,
      required: true,
    },

    // Status managed by supplier
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
