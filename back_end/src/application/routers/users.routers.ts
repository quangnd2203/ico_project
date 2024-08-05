import * as express from 'express';
import IUsersController from 'src/interface/controllers/users.controllers.js';
import TYPES from '../config/types.js';
import { container } from '../config/dependencies.config.js';
import SearchRequestDto from 'src/domain/dtos/search_request.dtos.js';

export default class UsersRouters {
    private controller: IUsersController = container.get<IUsersController>(TYPES.controller.IUsersController);

    public router = express.Router();

    public getRouters() {
        this.createRoutes();
        return this.router;
    }

    private createRoutes() {
        this.router.post('/', async (req, res) => {
            this.controller.create(req.body).then((value) => {
                res.status(value.code).send(value);
            });
        });
        this.router.get('/', async (req, res) => {
            this.controller.getAll(req.query as unknown as SearchRequestDto).then((value) => {
                res.status(value.code).send(value);
            });  
        })
    }
}
