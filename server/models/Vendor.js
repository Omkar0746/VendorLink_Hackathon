const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    vendorName: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true }
});

module.exports = mongoose.model("Vendor", vendorSchema);
