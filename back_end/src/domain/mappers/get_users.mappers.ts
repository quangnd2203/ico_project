import IGetUsersMapper from 'src/interface/mappers/get_users.mappers.js';
import User from '../entities/user.entities.js';
import CreateUserDto from '../dtos/create_user.dtos.js';
import { injectable } from 'inversify';

@injectable()
export default class GetUsersMapper implements IGetUsersMapper {

    toResponse(entity: User[]): CreateUserDto[] {
        return entity.map((user) => {
            return new CreateUserDto(
                user.id,
                user.name,
                user.createdAt,
                user.updatedAt,
            );
        });
    }

    toDomain(dto: CreateUserDto[]): User[] {
        return dto.map((user) => {
            return new User(
                user.id,
                user.name,
                user.createdAt,
                user.updatedAt,
            );
        });
    }

}