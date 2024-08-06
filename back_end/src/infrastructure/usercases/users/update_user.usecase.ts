import { inject, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import User from "src/domain/entities/user.entities.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import IUpdateUserUseCases from "src/interface/usercases/users/update_user.usecase.js";

@injectable()
export default class UpdateUserUsecase implements IUpdateUserUseCases {

    @inject(TYPES.repositories.IUsersRepository) repository: IUsersRepository;

    async execute(userId: string, request: CreateUserDto): Promise<User> {
        return this.repository.update(userId, request);
    }
}