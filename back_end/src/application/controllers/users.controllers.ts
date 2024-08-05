import { injectable, inject } from "inversify";
import "reflect-metadata";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import IUsersController from "src/interface/controllers/users.controllers.js";
import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";
import TYPES from "../config/types.js";
import { container } from "../config/dependencies.config.js";
import ICreateUserMapper from "src/interface/mappers/create_user.mappers.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import IGetUsersUseCase from "src/interface/usercases/users/get_users.usecase.js";
import IGetUsersMapper from "src/interface/mappers/get_users.mappers.js";
import PageResponseDto from "src/domain/dtos/page_response.dtos.js";

@injectable()
export default class UsersController implements IUsersController {
    @inject(TYPES.useCases.ICreateUserUseCase) private createUserUseCase: ICreateUserUseCases;
    @inject(TYPES.useCases.IGetUsersUseCase) private getUsersUseCase: IGetUsersUseCase;

    async create(request: CreateUserDto): Promise<NetworkResponse<CreateUserDto>> {
        try {
            const user = await this.createUserUseCase.execute(request);
            const response = container.get<ICreateUserMapper>(TYPES.mappers.CreateUserMapper).toResponse(user);
            return NetworkResponse.success<CreateUserDto>(response);
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'create_user_error');
        }
    }

    async getAll(request: SearchRequestDto): Promise<NetworkResponse<PageResponseDto<CreateUserDto>>>{
        try{
            const users = await this.getUsersUseCase.execute(request);
            const response = container.get<IGetUsersMapper>(TYPES.mappers.GetUsersMapper).toResponse(users);
            return NetworkResponse.success<PageResponseDto<CreateUserDto>>(
                new PageResponseDto<CreateUserDto>(response, request.page, request.limit, response.length)
            );
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'get_users_error');
        }
    }
}