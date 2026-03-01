const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// Add Vendor
router.post("/add", async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.json({ message: "Vendor added successfully", vendor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all vendors
router.get("/all", async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete vendor
router.delete("/:id", async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.json({ message: "Vendor deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
