import * as express from 'express';
import IUsersController from 'src/interface/controllers/users.controllers.js';
import UsersController from '../controllers/users.controllers.js';
import CreateUserUseCase from 'src/infrastructure/usercases/create_user.usercase.js';
import UsersRepository from 'src/infrastructure/repositories/users.repositories.js';
// // import * as controller from '../controllers/vault.controller.js';


// const userRouters = express.Router();

// userRouters.post('/', async (req, res) => {
//     // controller.withdraw(req).then((value) => res.status(value.code).send(value));
// });

// export default userRouters;

class UsersRouters {
    private router: express.Router;
    private controller: IUsersController;

    constructor() {
        this.router = express.Router();
        this.controller = new UsersController(
            new CreateUserUseCase(
                new UsersRepository(),
            ),
        );
    }

    public init(): void {
        this.router.post('/', async (req, res) => {
            await this.controller.create(req.body);
            res.status(201).send();
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}