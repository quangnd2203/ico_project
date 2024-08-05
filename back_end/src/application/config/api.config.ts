import express, { Application } from "express";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import Routers from "../routers/routes.js";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import accessInfoMiddleware from "../middlewares/accessInfo.middlewares.js";
import responseInfoMiddleware from "../middlewares/responseInfo.middlewares.js";

import swaggerDefinition from 'swagger/combined.json';

export default function createAPI(): Application {
    const api: Application = express();
    api.use(express.json());
    api.use(express.urlencoded({ extended: true }));
    api.use(cors());
    api.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        next();
    });
    api.options('*', cors());
    api.use(accessInfoMiddleware);
    api.use(responseInfoMiddleware);
    api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
    api.use('/api', new Routers().getRouters());
    api.use((req, res, next) => {
        next(NetworkResponse.fromErrors(STATUS_CODE.not_found, 'not_found'));
    });
    return api;
}