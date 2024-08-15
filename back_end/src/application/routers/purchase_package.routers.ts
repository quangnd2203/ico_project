import IPurchasePackageController from "src/interface/controllers/purchase_package.controller.js";
import TYPES from "../config/types.js";
import * as express from 'express';
import { container } from "../config/dependencies.config.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";

export default class PurchasePackageRouters {
    private controller: IPurchasePackageController = container.get<IPurchasePackageController>(TYPES.controller.IPurchasePackageController);

    public router = express.Router();

    public getRouters() {
        this.createRoutes();
        return this.router;
    }

    private createRoutes() {
        this.router.post('/', async (req, res) => {
            const query = new PurchasePackageDto(
                null,
                req.body.name,
                req.body.value,
                req.body.tokenReceive,
                req.body.bonus,
                req.body.type,
                null,
                null,
            );
            this.controller.create(query).then((value) => {
                res.status(value.code).send(value);
            });
        });
        this.router.get('/', async (req, res) => {
            res.set('Content-Range', `purchase_package 2`);
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
