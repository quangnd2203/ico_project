import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.config.js';

export default async function responseInfoMiddleware(req: Request, res: Response, next: NextFunction){
    const originalSend = res.send;

    res.send = function (body?: any) {
        logger.warn(`Response to ${req.ip} - ${req.method} - ${req.originalUrl} - ${res.statusCode} - message: ${body.message}`);
        res.send = originalSend
        return res.send(body);
    };

    next();
};