import { CreateUserDto, User } from "src/domain/mappers/create_user.mappers.js";
import Mapper from "./mapper.js";

export default interface ICreateUserMapper extends Mapper<User, CreateUserDto> {
    toResponse(entity: User): CreateUserDto;

    toDomain(dto: CreateUserDto): User;
}