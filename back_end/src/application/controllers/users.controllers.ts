import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import CreateUserMapper from "src/domain/mappers/create_user.mappers.js";
import IUsersController from "src/interface/controllers/users.controllers.js";
import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";

export default class UsersController implements IUsersController {
    createUserUseCase: ICreateUserUseCases;

    constructor(createUserUseCase: ICreateUserUseCases) {
        this.createUserUseCase = createUserUseCase;
    }

    async create(request: CreateUserDto): Promise<NetworkResponse<CreateUserDto>> {
        try{
            const user = await this.createUserUseCase.execute(request);
            return NetworkResponse.success<CreateUserDto>(new CreateUserMapper().toResponse(user));
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'create_user_error');
        }
    }
}