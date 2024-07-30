import { injectable, inject} from "inversify";
import "reflect-metadata";

import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import {User, CreateUserDto} from "src/domain/mappers/create_user.mappers.js";
import TYPES from "src/application/config/types.js";

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCases {
    @inject(TYPES.repositories.IUsersRepository) repository: IUsersRepository;

    async execute(request: CreateUserDto): Promise<User> {
        return this.repository.create(request);
    }
}