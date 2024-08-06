import CreateUserDto from "src/domain/dtos/create_user.dtos.js";
import PageResponseDto from "src/domain/dtos/page_response.dtos.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import { NetworkResponse } from "src/domain/entities/network_response.entities.js";

export default interface IUsersController {
    create: (request: CreateUserDto) => Promise<NetworkResponse<CreateUserDto>>;
    getAll: (request: SearchRequestDto) => Promise<NetworkResponse<CreateUserDto[]>>;
}