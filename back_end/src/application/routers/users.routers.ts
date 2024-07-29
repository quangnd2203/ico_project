import * as express from 'express';
import IUsersController from 'src/interface/controllers/users.controllers.js';
import UsersController from '../controllers/users.controllers.js';
import CreateUserUseCase from 'src/infrastructure/usercases/create_user.usercase.js';
import UsersRepository from 'src/infrastructure/repositories/users.repositories.js';

const userRouters = express.Router();

const controller: IUsersController = new UsersController(
    new CreateUserUseCase(
        new UsersRepository(),
    ),
);

userRouters.post('/', async (req, res) => {
    controller.create(req.body).then((value) => res.status(value.code).send(value));
});

export default userRouters;