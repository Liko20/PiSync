const express = require("express");
const setupMiddleware = require("./middleware/config");
const connectDB = require("./config");

const app = express();
connectDB();
setupMiddleware(app);

app.use("/sync-event", require("./routes/syncEvent"));
app.use(("/devices"), require("./routes/devices"));

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
