import User from "src/domain/entities/user.entities.js";

export default interface IGetUserUseCase{
    execute(id: string): Promise<User>;
}