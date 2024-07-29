import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import { NetworkResponse } from "src/domain/entities/network_response.entities.js";

export default interface IUsersController {
    create: (request: CreateUserDto) => Promise<NetworkResponse<CreateUserDto>>;
}