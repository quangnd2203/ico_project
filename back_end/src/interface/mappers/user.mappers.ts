import User from "src/domain/entities/user.entities.js";
import Mapper from "./mapper.js";
import UserDto from "src/domain/dtos/user.dtos.js";

export default interface IUserMapper extends Mapper<User, UserDto> {
    toResponse(entity: User): UserDto;

    toDomain(dto: UserDto): User;
}