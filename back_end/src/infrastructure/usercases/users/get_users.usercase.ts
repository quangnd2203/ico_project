import { inject, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import User from "src/domain/entities/user.entities.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import IGetUsersUseCase from "src/interface/usercases/users/get_users.usecase.js";

@injectable()
export default class GetUsersUseCase implements IGetUsersUseCase {
    @inject(TYPES.repositories.IUsersRepository) repository: IUsersRepository;
    
    async execute(request: SearchRequestDto): Promise<[User[], number]> {
        return this.repository.getAll(request);
    }
}