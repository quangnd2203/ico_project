import Mapper from './mapper.js';
import CreateUserDto from '../dtos/create_user.dtos.js';
import User from '../entities/user.entities.js';

export default class CreateUserMapper implements Mapper<User, CreateUserDto> {

    toResponse(entity: User): CreateUserDto {
        return new CreateUserDto(
            entity.id,
            entity.name,
        );
    }

    toDomain(dto: CreateUserDto): User {
        return new User(
            dto.id,
            dto.name,
        );
    }

}

export {CreateUserDto, User};