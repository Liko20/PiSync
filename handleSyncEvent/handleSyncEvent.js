const SyncEvent = require("../models/syncDevice/model");

module.exports = async function (job) {
  const {
    device_id,
    timestamp,
    total_files_synced,
    total_errors,
    internet_speed,
  } = job.data;

  await SyncEvent.create({
    device_id,
    timestamp,
    total_files_synced,
    total_errors,
    internet_speed,
  });

  if (total_errors > 0) {
    const recentFails = await SyncEvent.find({ device_id })
      .sort({ timestamp: -1 })
      .limit(3);

    const allFailed =
      recentFails.length === 3 && recentFails.every((e) => e.total_errors > 0);
    if (allFailed) {
      console.log(`⚠️ Device ${device_id} failed 3 times in a row`);
    }
  }
};
