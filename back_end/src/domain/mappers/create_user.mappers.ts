import ICreateUserMapper from 'src/interface/mappers/create_user.mappers.js';
import CreateUserDto from '../dtos/create_user.dtos.js';
import User from '../entities/user.entities.js';
import { injectable } from 'inversify';

@injectable()
export default class CreateUserMapper implements ICreateUserMapper {

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