import * as express from 'express';
import UsersRouters from './users.routers.js';

export default class Routes {
    public router = express.Router();

    constructor() {
        this.router.use('/users', new UsersRouters().getRouters());
    }

    public getRouters() {
        return this.router;
    }
}