import CreateUserDto from "src/domain/dtos/create_user.dtos.js"
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js"
import User from "src/domain/entities/user.entities.js"

export default interface IUsersRepository {
    create(request: CreateUserDto): Promise<User>
    getAll(request: SearchRequestDto): Promise<[User[], number]>
    get(userId: string): Promise<User>
    delete(userId: string): Promise<void>
    update(userId: string, request: CreateUserDto): Promise<User>
}