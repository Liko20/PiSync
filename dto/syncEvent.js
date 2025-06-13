const { isDate, isString } = require("class-validator");

async function validateSyncEventInput(data) {
  const errors = [];
  console.log("Validating sync event input:", data);

  if (!isString(data.device_id)) {
    errors.push("device_id must be a valid string");
  }

  if (data.timestamp && !isDate(new Date(data.timestamp))) {
    errors.push("timestamp must be a valid date");
  }

  if (
    !Number.isInteger(data.total_files_synced) ||
    data.total_files_synced < 0
  ) {
    errors.push("total_files_synced must be a non-negative integer");
  }

  if (!Number.isInteger(data.total_errors) || data.total_errors < 0) {
    errors.push("total_errors must be a non-negative integer");
  }

  if (!Number.isInteger(data.internet_speed) || data.internet_speed < 0) {
    errors.push("internet_speed must be a non-negative integer");
  }

  if (errors.length > 0) {
    const err = new Error("Validation failed: " + errors.join(", "));
    err.status = 400;
    throw err;
  }

  return data;
}

module.exports = { validateSyncEventInput };
