const mongoose = require("mongoose");
require("dotenv").config();
let isConnected = false;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const dotenv = require("dotenv");
dotenv.config();

const connectWithRetry = async (retries = MAX_RETRIES) => {
  try {
    console.log("Connecting to MongoDB Atlas...", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "pySyncDb",
    });

    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (error) {
    const errorMessage =
      error?.message || (typeof error === "string" ? error : "Unknown error");

    console.error(`MongoDB connection failed: ${errorMessage}`);

    if (retries > 0) {
      console.log(`Retrying in ${RETRY_DELAY / 1000}s... (${retries} left)`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
      return connectWithRetry(retries - 1);
    } else {
      console.error(" All retries failed. Exiting...");
      process.exit(1);
    }
  }
};

module.exports = async () => {
  if (!isConnected) {
    await connectWithRetry();
  }
};
