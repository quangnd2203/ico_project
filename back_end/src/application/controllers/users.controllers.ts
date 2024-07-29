import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import IUsersController from "src/interface/controllers/users.controllers.js";
import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";

export default class UsersController implements IUsersController {
    createUserUseCase: ICreateUserUseCases;

    constructor(createUserUseCase: ICreateUserUseCases) {
        this.createUserUseCase = createUserUseCase;
    }

    async create(request: CreateUserDto): Promise<void> {
        await this.createUserUseCase.execute(request);
    }
}