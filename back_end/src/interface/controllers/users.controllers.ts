import CreateUserDto from "src/domain/dtos/create_user.dtos.js";

export default interface IUsersController {
    create: (request: CreateUserDto) => Promise<void>;
}