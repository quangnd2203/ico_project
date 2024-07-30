import * as express from 'express';
import IUsersController from 'src/interface/controllers/users.controllers.js';
import TYPES from '../config/types.js';
import { container } from '../config/dependencies.config.js';
import logger from '../config/logger.config.js';

export default class UsersRouters {
    // RUN not OK
    private controller: IUsersController = container.get<IUsersController>(TYPES.controller.IUsersController);

    public router = express.Router();

    public getRouters() {
        this.createRoutes();
        return this.router;
    }

    private createRoutes() {
        this.router.post('/create', async (req, res) => {
            this.controller.create(req.body).then((value) => {
                res.status(value.code).send(value);
            });
        });
    }
}
