const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  items: [],
  totalAmount: Number,
  status: String,
});

module.exports = mongoose.model("Order", orderSchema);
