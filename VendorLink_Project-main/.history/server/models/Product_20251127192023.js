const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  price: Number,
  image: String,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
