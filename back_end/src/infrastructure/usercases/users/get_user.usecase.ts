import { injectable, inject } from "inversify";
import TYPES from "src/application/config/types.js";
import User from "src/domain/entities/user.entities.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import IGetUserUseCase from "src/interface/usercases/users/get_user.usecase.js";

@injectable()
export default class GetUserUsecase implements IGetUserUseCase{
    @inject(TYPES.repositories.IUsersRepository) repository: IUsersRepository;

    execute(id: string): Promise<User> {
        return this.repository.get(id);
    }
}