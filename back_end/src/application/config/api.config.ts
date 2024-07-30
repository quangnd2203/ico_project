import express, { Application } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import Routers from "../routers/routes.js";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import accessInfoMiddleware from "../middlewares/accessInfo.middlewares.js";
import responseInfoMiddleware from "../middlewares/responseInfo.middlewares.js";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation with Swagger'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/application/routers/*.ts']
};

export default function createAPI(): Application {
    const api: Application = express();
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    api.use(express.json());
    api.use(express.urlencoded({ extended: true }));
    api.use(cors());
    api.options('*', cors());
    api.use(accessInfoMiddleware);
    api.use(responseInfoMiddleware);
    api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    api.use('/api', new Routers().getRouters());
    api.use((req, res, next) => {
        next(NetworkResponse.fromErrors(STATUS_CODE.not_found, 'not_found'));
    });
    return api;
}