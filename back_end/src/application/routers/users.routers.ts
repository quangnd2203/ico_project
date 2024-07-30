import * as express from 'express';
import IUsersController from 'src/interface/controllers/users.controllers.js';
import TYPES from '../config/types.js';
import { container } from '../config/dependencies.config.js';

export default class UsersRouters {
    private controller: IUsersController = container.get<IUsersController>(TYPES.controller.IUsersController);

    public router = express.Router();

    public getRouters() {
        this.createRoutes();
        return this.router;
    }

/**
 * @swagger
 * /api/v1/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the given name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid input
 */
    private createRoutes() {
        this.router.post('/create', async (req, res) => {
            this.controller.create(req.body).then((value) => {
                res.status(value.code).send(value);
            });
        });
    }
}
