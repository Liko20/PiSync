const express = require("express");
const connectDB = require("./config");
const setupMiddleware = require("./middleware/config/config");
const syncQueue = require("./queue/queue");
const handleSyncEvent = require("./handleSyncEvent/handleSyncEvent");

const app = express();
setupMiddleware(app);
connectDB();
app.use("/sync-event", require("./routes/syncEvent"));
app.use("/devices", require("./routes/devices"));

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
