const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(config.MONGODB_URI);
    if (db.connection.readyState === 1) {
      logger.info("Connected to MongoDB");
    }
  } catch (error) {
    logger.error("Error connecting to MongoDB");
  }
};

module.exports = dbConnect;
