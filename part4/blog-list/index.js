const config = require("./utils/config");
const logger = require("./utils/logger");
const app = require("./app");
const dbConnect = require("./databases/db");

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server");
    process.exit(1);
  }
};

startServer();
