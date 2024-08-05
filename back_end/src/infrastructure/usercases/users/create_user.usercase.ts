import { injectable, inject} from "inversify";
import "reflect-metadata";

import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import TYPES from "src/application/config/types.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import User from "src/domain/entities/user.entities.js";

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCases {
    @inject(TYPES.repositories.IUsersRepository) repository: IUsersRepository;

    async execute(request: CreateUserDto): Promise<User> {
        return this.repository.create(request);
    }
}