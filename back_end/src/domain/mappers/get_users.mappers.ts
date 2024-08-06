import IGetUsersMapper from 'src/interface/mappers/get_users.mappers.js';
import User from '../entities/user.entities.js';
import { injectable } from 'inversify';
import UserDto from '../dtos/user.dtos.js';

@injectable()
export default class GetUsersMapper implements IGetUsersMapper {

    toResponse(entity: User[]): UserDto[] {
        return entity.map((user) => {
            return new UserDto(
                user.id,
                user.name,
                user.createdAt,
                user.updatedAt,
            );
        });
    }

    toDomain(dto: UserDto[]): User[] {
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