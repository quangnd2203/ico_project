import { NextFunction, Request, Response } from 'express';
import logger from "../config/logger.config.js";

export default async function accessInfoMiddleware(req: Request, res: Response, next: NextFunction) {
    logger.info(`Access from ${req.ip} - ${req.method} - ${req.originalUrl} - body: ${JSON.stringify(req.body)}`);
    next();
}