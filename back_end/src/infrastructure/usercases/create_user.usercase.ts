import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import {User, CreateUserDto} from "src/domain/mappers/create_user.mappers.js";

export default class CreateUserUseCase implements ICreateUserUseCases {
    repository: IUsersRepository;

    constructor(repository: IUsersRepository) {
        this.repository = repository;
    }

    async execute(request: CreateUserDto): Promise<User> {
        return this.repository.create(request);
    }
}