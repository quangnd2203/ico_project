import IUsersRepository from "src/interface/repositories/users.repositories.js";
import CreateUserMapper, {
    User,
    CreateUserDto,
} from "src/domain/mappers/create_user.mappers.js";

export default class UsersRepository implements IUsersRepository {
    async create(request: CreateUserDto): Promise<User> {
        const user = new CreateUserMapper().toDomain(request);
        // save user to database
        return user;
    }
}