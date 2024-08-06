import IUsersRepository from "src/interface/repositories/users.repositories.js";

import { id, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import { container } from "src/application/config/dependencies.config.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import User from "src/domain/entities/user.entities.js";
import UserModel from "../models/user.models.js";
import IUserMapper from "src/interface/mappers/user.mappers.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import UserDto from "src/domain/dtos/user.dtos.js";

@injectable()
export default class UsersRepository implements IUsersRepository {

    async create(request: CreateUserDto): Promise<User> {
        const user = container.get<IUserMapper>(TYPES.mappers.IUserMapper).toDomain(request as UserDto);
        const userModel = new UserModel(user);
        await userModel.save();
        return userModel.toObject();
    }

    async getAll(request: SearchRequestDto): Promise<[User[], number]> {
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
        const [listUsers, total] = await Promise.all([
            UserModel.find(query)
                .skip((request.page - 1) * request.limit)
                .limit(request.limit)
                .sort(sort),
            UserModel.countDocuments(query)
        ]);
        return [listUsers, total];
    }

    async get(userId: string): Promise<User> {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('user_not_found');
            }
            return user;
        } catch (e) {
            throw new Error('user_not_found');
        }
    }

    async delete(userId: string): Promise<void> {
        await UserModel.findByIdAndDelete(userId);
    }

    async update(userId: string, request: CreateUserDto): Promise<User> {
        const user = container.get<IUserMapper>(TYPES.mappers.IUserMapper).toDomain(request as UserDto);
        const userModel = await UserModel.findById(userId);
        if (!userModel) {
            throw new Error('user_not_found');
        }
        userModel.set(user);
        await userModel.save();
        return userModel.toObject();
    }
}