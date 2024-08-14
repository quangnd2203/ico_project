import * as express from 'express';
import UsersRouters from './users.routers.js';
import PurchasePackageRouters from './purchase_package.routers.js';

export default class Routes {
    public router = express.Router();

    constructor() {
        this.router.use('/users', new UsersRouters().getRouters());
        this.router.use('/purchase_packages', new PurchasePackageRouters().getRouters());
    }

    public getRouters() {
        return this.router;
    }
}