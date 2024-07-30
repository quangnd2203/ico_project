import express, { Application } from "express";
import cors from 'cors';
import Routers from "../routers/routes.js";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import accessInfoMiddleware from "../middlewares/accessInfo.middlewares.js";
import responseInfoMiddleware from "../middlewares/responseInfo.middlewares.js";

export default function createAPI(): Application{
    const api: Application = express();
    api.use(express.json());
    api.use(express.urlencoded({ extended: true }));
    api.use(cors());
    api.options('*', cors());
    api.use(accessInfoMiddleware);
    api.use(responseInfoMiddleware);
    api.use('/api', new Routers().getRouters());
    api.use((req, res, next) => {
        next(NetworkResponse.fromErrors(STATUS_CODE.not_found, 'not_found'));
    });
    return api;
}