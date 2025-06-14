const express = require("express");
const router = express.Router();
const SyncEvent = require("../models/syncDevice/model");
router.get("/:id/sync-history", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    console.log("Fetching sync history for device:", req.params.id);
    const logs = await SyncEvent.find({ device_id: req.params.id })
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(logs);
  } catch (err) {
    console.error("error", err.message || err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "internal server error" });
  }
});

router.get("/repeated-failures", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const results = await SyncEvent.aggregate([
      { $match: { total_errors: { $gt: 0 } } },
      { $group: { _id: "$device_id", count: { $sum: 1 } } },
      { $match: { count: { $gt: 3 } } },
      { $skip: (page - 1) * limit },
      { $limit: Number(limit) },
    ]);

    res.json(results.map((r) => r._id));
  } catch (err) {
    console.error("error", err.message || err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "internal server error" });
  }
});

module.exports = router;
