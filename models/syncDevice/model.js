const mongoose = require("mongoose");

const syncDeviceSchema = new mongoose.Schema(
  {
    device_id: { type: String, index: true, required: true },
    timestamp: { type: Date, default: Date.now },
    total_files_synced: { type: Number, default: 0 },
    total_errors: { type: Number, index: true, default: 0 },
    internet_speed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SyncDevice", syncDeviceSchema);
