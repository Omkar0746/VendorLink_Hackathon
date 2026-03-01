const express = require("express");
const router = express.Router();
const Requirement = require("../models/Requirement");
const Proposal = require("../models/Proposal");

// --- Requirement Routes ---

// Get all requirements
router.get("/requirements", async (req, res) => {
    try {
        const requirements = await Requirement.find({ status: "open" }).sort({ createdAt: -1 });
        res.json(requirements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a requirement
router.post("/requirements", async (req, res) => {
    try {
        const requirement = new Requirement(req.body);
        await requirement.save();

        // Broadcast new requirement via Socket.IO
        const io = req.app.get("io");
        if (io) {
            io.emit("new_requirement", {
                requirement,
                title: "New Opportunity!",
                message: `New requirement: ${requirement.title} from ${requirement.vendorName}`,
                timestamp: new Date()
            });
        }

        res.status(201).json({ message: "Requirement created", requirement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Proposal Routes ---

// Submit a proposal
router.post("/proposals", async (req, res) => {
    try {
        const proposal = new Proposal(req.body);
        await proposal.save();

        // Notify Vendor of new proposal
        const requirement = await Requirement.findById(req.body.requirementId);
        if (requirement) {
            const { notifyUser } = require("../config/notifications");
            notifyUser(requirement.vendorId, "new_proposal", {
                title: "New Proposal!",
                message: `${proposal.supplierName} submitted a proposal for "${requirement.title}"`,
                type: "requirement",
                requirementId: requirement._id,
                proposalId: proposal._id
            });
        }

        res.status(201).json({ message: "Proposal submitted successfully", proposal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get proposals for a requirement
router.get("/proposals/requirement/:id", async (req, res) => {
    try {
        const proposals = await Proposal.find({ requirementId: req.params.id });
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get proposals by a supplier
router.get("/proposals/supplier/:id", async (req, res) => {
    try {
        const proposals = await Proposal.find({ supplierId: req.params.id });
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
