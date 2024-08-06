import { injectable, inject } from "inversify";
import "reflect-metadata";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import IUsersController from "src/interface/controllers/users.controllers.js";
import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecase.js";
import TYPES from "../config/types.js";
import { container } from "../config/dependencies.config.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import IGetUsersUseCase from "src/interface/usercases/users/get_users.usecase.js";
import IGetUsersMapper from "src/interface/mappers/get_users.mappers.js";
import PageResponseDto from "src/domain/dtos/page_response.dtos.js";
import IGetUserUseCase from "src/interface/usercases/users/get_user.usecase.js";
import UserDto from "src/domain/dtos/user.dtos.js";
import IUserMapper from "src/interface/mappers/user.mappers.js";
import IDeleteUserUsecase from "src/interface/usercases/users/delete_user.usecase.js";
import IUpdateUserUsecase from "src/interface/usercases/users/update_user.usecase.js";

@injectable()
export default class UsersController implements IUsersController {
    @inject(TYPES.useCases.ICreateUserUseCase) private createUserUseCase: ICreateUserUseCases;
    @inject(TYPES.useCases.IGetUsersUseCase) private getUsersUseCase: IGetUsersUseCase;
    @inject(TYPES.useCases.IGetUserUseCase) private getUserUsecase: IGetUserUseCase;
    @inject(TYPES.useCases.IDeleteUserUsecase) private deleteUserUsecase: IDeleteUserUsecase;
    @inject(TYPES.useCases.IUpdateUserUsecase) private updateUserUsecase: IUpdateUserUsecase;

    async create(request: CreateUserDto): Promise<NetworkResponse<UserDto>> {
        try {
            const user = await this.createUserUseCase.execute(request);
            const response = container.get<IUserMapper>(TYPES.mappers.IUserMapper).toResponse(user);
            return NetworkResponse.success<UserDto>(response);
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'create_user_error');
        }
    }

    async getAll(request: SearchRequestDto): Promise<NetworkResponse<PageResponseDto<UserDto>>>{
        try{
            const [users,total] = await this.getUsersUseCase.execute(request);
            const response = container.get<IGetUsersMapper>(TYPES.mappers.IGetUsersMapper).toResponse(users);
            return NetworkResponse.success<PageResponseDto<UserDto>>(
                new PageResponseDto<UserDto>(response, total, request.page, request.limit)
            );
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'get_users_error');
        }
    }

    async get(request: string): Promise<NetworkResponse<UserDto>>{
        try{
            const user = await this.getUserUsecase.execute(request);
            const response = container.get<IUserMapper>(TYPES.mappers.IUserMapper).toResponse(user);
            return NetworkResponse.success<UserDto>(response);
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'get_user_error');
        }
    }

    async delete(request: string): Promise<NetworkResponse<null>>{
        try{
            await this.deleteUserUsecase.execute(request);
            return NetworkResponse.success<null>(null);
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'delete_user_error');
        }
    }

    async update(userId: string, request: CreateUserDto): Promise<NetworkResponse<UserDto>>{
        try{
            const user = await this.updateUserUsecase.execute(userId, request);
            const response = container.get<IUserMapper>(TYPES.mappers.IUserMapper).toResponse(user);
            return NetworkResponse.success<UserDto>(response);
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'update_user_error');
        }
    }
}