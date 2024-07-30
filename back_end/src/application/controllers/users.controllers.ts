import { injectable, inject } from "inversify";
import "reflect-metadata";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import IUsersController from "src/interface/controllers/users.controllers.js";
import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";
import TYPES from "../config/types.js";
import { container } from "../config/dependencies.config.js";
import ICreateUserMapper from "src/interface/mappers/create_user.mappers.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";

@injectable()
export default class UsersController implements IUsersController {
    @inject(TYPES.useCases.ICreateUserUseCase) private createUserUseCase: ICreateUserUseCases;

    async create(request: CreateUserDto): Promise<NetworkResponse<CreateUserDto>> {
        try {
            const user = await this.createUserUseCase.execute(request);
            const response = container.get<ICreateUserMapper>(TYPES.mappers.CreateUserMapper).toResponse(user);
            return NetworkResponse.success<CreateUserDto>(response);
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'create_user_error');
        }
    }
}