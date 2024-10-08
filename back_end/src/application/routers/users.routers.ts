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
            res.set('Content-Range', `users 2`);
            const query = new SearchRequestDto(
                req.query.keyword as string,
                parseInt(req.query.page as unknown as string) || 1,
                parseInt(req.query.limit as unknown as string) || 10,
                req.query.sortField as unknown as string,
                req.query.sortOrder as string
            );
            this.controller.getAll(query).then((value) => {
                res.status(value.code).send(value);
            });  
        })
        this.router.get('/:id', async (req, res) => {
            this.controller.get(req.params.id).then((value) => {
                res.status(value.code).send(value);
            });
        });
        this.router.delete('/:id', async (req, res) => {
            this.controller.delete(req.params.id).then((value) => {
                res.status(value.code).send(value);
            });
        });
        this.router.put('/:id', async (req, res) => {
            this.controller.update(req.params.id, req.body).then((value) => {
                res.status(value.code).send(value);
            });
        });
    }
}
