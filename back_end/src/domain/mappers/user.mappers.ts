import IUserMapper from 'src/interface/mappers/user.mappers.js';
import User from '../entities/user.entities.js';
import { injectable } from 'inversify';
import UserDto from '../dtos/user.dtos.js';

@injectable()
export default class UserMapper implements IUserMapper {

    toResponse(entity: User): UserDto {
        return new UserDto(
            entity.id,
            entity.name,
            entity.createdAt,
            entity.updatedAt,
        );
    }

    toDomain(dto: UserDto): User {
        return new User(
            dto.id,
            dto.name,
            dto.createdAt,
            dto.updatedAt,
        );
    }

}