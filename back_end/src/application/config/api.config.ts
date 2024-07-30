import express, { Application } from "express";
import cors from 'cors';
import Routers from "../routers/routes.js";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";

export default function createAPI(): Application{
    console.log('createAPI');
    const api: Application = express();
    api.use(express.json());
    api.use(express.urlencoded({ extended: true }));
    api.use(cors());
    api.options('*', cors());
    api.use('/api', new Routers().getRouters());
    api.use((req, res, next) => {
        next(NetworkResponse.fromErrors(STATUS_CODE.not_found, 'not_found'));
    });
    return api;
}