const express = require("express");
const RepairRequest = require("../models/RepairRequest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    console.log("Received repair request:");
    console.log(data);

    const job = new RepairRequest({
      jobId: data.id,
      customerName: data.client,
      customerPhone: data.contact,
      equipment: data.eq,
      equipmentType: data.type,
      problem: data.desc,
      images: data.media || [],
      status: data.phase || "New",
    });

    console.log("Converted MongoDB data:");
    console.log(job);

    await job.save();

    console.log("Repair request saved successfully!");

    res.status(201).json(job);
  } catch (error) {
    console.error("CREATE JOB ERROR:");
    console.error(error);

    res.status(500).json({
      message: "Failed to create repair request",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await RepairRequest.find().sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch repair requests",
      error: error.message,
    });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const job = await RepairRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Repair request not found",
      });
    }

    res.json(job);
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      message: "Failed to update status",
      error: error.message,
    });
  }
});

module.exports = router;