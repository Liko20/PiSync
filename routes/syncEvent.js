const express = require("express");
const router = express.Router();
const syncQueue = require("../queue/queue");

router.post("/sync-event", async (req, res) => {
  const {
    device_id,
    timestamp,
    total_files_synced,
    total_errors,
    internet_speed,
  } = req.body;

  if (!device_id)
    return res.status(400).json({ error: "device_id is required" });

  await syncQueue.add({
    device_id,
    timestamp,
    total_files_synced,
    total_errors,
    internet_speed,
  });
  res.status(202).json({ message: "Sync event queued" });
});
