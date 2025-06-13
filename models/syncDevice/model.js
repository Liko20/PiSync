const mongoose = require("mongoose");

const syncDeviceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SyncDevice", syncDeviceSchema);
