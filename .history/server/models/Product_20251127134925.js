const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  qty: Number,
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
