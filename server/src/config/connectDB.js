import mongoose from 'mongoose';
import { logger } from '../middlewares/logger.middleware.js';
import { env } from './constant.js';

async function connectDB() {
  try {
    const { connection } = await mongoose.connect(env.mongodbURI);
    const { host, name } = connection;
    logger.info(`MongoDb On >> ${host} - ${name}`);
  } catch (error) {
    logger.error(`MongoDb Failed On >> ${error.message}`);
    process.exit(1);
  }
}

export { connectDB };
