const connectDB = require("./config");
const syncQueue = require("./queue/queue");
const handleSyncEvent = require("./handleSyncEvent/handleSyncEvent");
connectDB();
syncQueue.process(handleSyncEvent);

console.log("Worker is listening for jobs");
