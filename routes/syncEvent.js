const express = require("express");
const router = express.Router();
const syncQueue = require("../queue/queue");
const { validateSyncEventInput } = require("../dto/syncEvent");
router.post("/", async (req, res) => {
  try {
    console.log("Received sync event:", req.body);
    await validateSyncEventInput(req.body);
    const {
      device_id,
      timestamp,
      total_files_synced,
      total_errors,
      internet_speed,
    } = req.body;

    if (!device_id)
      return res.status(400).json({ error: "deviceId is required" });

    await syncQueue.add({
      device_id,
      timestamp,
      total_files_synced,
      total_errors,
      internet_speed,
    });
    res.status(202).json({ message: "Sync event queued" });
  } catch (err) {
    console.error("error", err.message || err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "internal server error" });
  }
});

module.exports = router;
