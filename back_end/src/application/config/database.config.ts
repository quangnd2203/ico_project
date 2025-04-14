import mongoose from 'mongoose'
import logger from './logger.config.js';

export default async function connectDatabase(){
    mongoose.connect(process.env.DB_URL, {
        pass: 'password',
        user: 'root',
    }).then(() => {
        logger.info('Connected to mongoDB');
    }).catch(() => {
        logger.error('Error connecting to mongoDB');
    });
}