// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },

    category: { type: String, required: true },

    price: { type: Number, required: true },

    image: { type: String, default: "" },

    inStock: { type: Boolean, default: true },

    tags: [{ type: String }],

    rating: { type: Number, default: 0 },       // for future use
    ratingCount: { type: Number, default: 0 },  // for future use
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
