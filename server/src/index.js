import mongoose from "mongoose";
import server from "./app.js";
import { logger } from "./middlewares/logger.middleware.js";

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";

async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    const { host, name } = connection;
    logger.info(`MongoDb On >> ${host} - ${name}`);
  } catch (error) {
    logger.error(`MongoDb Failed On >> ${error.message}`);
    process.exit(1);
  }
}

connectDB()
  .then(() => {
    server.listen(PORT, HOST, () => {
      logger.info(`Running PORT >> http://localhost:${PORT}`);
    });
  })
  .catch((err) => logger.error(`Server Failed On >> ${err.message}`));
