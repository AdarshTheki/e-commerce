import server from './app.js';
import { logger } from './middlewares/logger.middleware.js';
import { connectDB } from './config/connectDB.js';
import { env } from './config/constant.js';

connectDB()
  .then(() => {
    server.listen(env.port, env.host, () => {
      logger.info(`Running PORT >> http://localhost:${env.port}`);
    });
  })
  .catch((err) => logger.error(`Server Failed On >> ${err.message}`));
