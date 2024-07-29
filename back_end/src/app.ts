import * as dotenv from 'dotenv';
import apiService from './services/api.service.js';
import {connect as connectDatabase} from './services/database.service.js';


dotenv.config();

connectDatabase().then((connected) => {
    if(connected){
        apiService.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is up and running on port: ${process.env.SERVER_PORT}`);
        });
    }
});