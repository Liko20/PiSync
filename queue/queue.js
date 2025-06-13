const Queue = require("bull");

const syncQueue = new Queue("syncQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

module.exports = syncQueue;
