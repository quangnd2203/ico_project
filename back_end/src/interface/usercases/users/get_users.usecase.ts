import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import User from "src/domain/entities/user.entities.js";

export default interface IGetUsersUseCase {
    execute(request: SearchRequestDto): Promise<User[]>;
}