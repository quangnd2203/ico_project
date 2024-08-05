import IUsersRepository from "src/interface/repositories/users.repositories.js";

import { injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import { container } from "src/application/config/dependencies.config.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import User from "src/domain/entities/user.entities.js";
import UserModel from "../models/user.models.js";
import ICreateUserMapper from "src/interface/mappers/create_user.mappers.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";

@injectable()
export default class UsersRepository implements IUsersRepository {

    async create(request: CreateUserDto): Promise<User> {
        const user = container.get<ICreateUserMapper>(TYPES.mappers.CreateUserMapper).toDomain(request);
        const userModel = new UserModel(user);
        await userModel.save();
        return userModel.toObject();
    }

    async getAll(request: SearchRequestDto): Promise<User[]> {
        const query = {};
        if (request.keyword) {
            query['name'] = {
                $regex: request.keyword,
                $options: 'i'
            }
        }
        const sort = {};
        if (request.sortField) {
            sort[request.sortField] = request.sortOrder === 'ASC' ? 1 : -1;
        }
        const listUsers = await UserModel.find(query)
            .skip((request.page - 1) * request.limit)
            .limit(request.limit)
            .sort(sort);
        return listUsers;
    }
}