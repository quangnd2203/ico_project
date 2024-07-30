import * as dotenv from 'dotenv';
import { inject } from './application/config/dependencies.config.js';
import createAPI from './application/config/api.config.js';

inject();

dotenv.config();

createAPI().listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});