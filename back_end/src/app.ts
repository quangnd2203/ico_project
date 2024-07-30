import * as dotenv from 'dotenv';
import { inject } from './application/config/dependencies.config.js';
import createAPI from './application/config/api.config.js';
import connectDatabase from './application/config/database.config.js';
import logger from './application/config/logger.config.js';

inject();

dotenv.config();

connectDatabase();

createAPI().listen(process.env.SERVER_PORT, () => {
    logger.info(`Server running on port ${process.env.SERVER_PORT}`);
});