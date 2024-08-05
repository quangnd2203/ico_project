import User from "src/domain/entities/user.entities.js";
import Mapper from "./mapper.js";
import CreateUserDto from "src/domain/dtos/create_user.dtos.js";

export default interface ICreateUserMapper extends Mapper<User, CreateUserDto> {
    toResponse(entity: User): CreateUserDto;

    toDomain(dto: CreateUserDto): User;
}