import express from "express";
import TYPES from "../config/types.js";
import IFaucetController from "src/interface/controllers/faucet.controller.js";
import { container } from "../config/dependencies.config.js";

export default class FaucetRouters {
    public router = express.Router();

    private faucetController: IFaucetController = container.get<IFaucetController>(TYPES.controller.IFaucetController);

    public getRouters() {
        this.createRoutes();
        return this.router;
    }

    private createRoutes() {
        this.router.post('/', async (req, res) => {
            this.faucetController.receiveFaucet(req.body.address).then((value) => {
                res.status(value.code).send(value);  
            })
        });
    }
}