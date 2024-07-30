import IUsersRepository from "src/interface/repositories/users.repositories.js";

import { injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import { container } from "src/application/config/dependencies.config.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import User from "src/domain/entities/user.entities.js";
import ICreateUserMapper from "src/interface/mappers/create_user.mappers.js";

@injectable()
export default class UsersRepository implements IUsersRepository {
    async create(request: CreateUserDto): Promise<User> {
        const user = container.get<ICreateUserMapper>(TYPES.mappers.CreateUserMapper).toDomain(request);
        return user;
    }
}