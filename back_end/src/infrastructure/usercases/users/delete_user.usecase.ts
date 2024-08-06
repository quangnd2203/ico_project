import { inject, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import IUsersRepository from "src/interface/repositories/users.repositories.js";
import IDeleteUserUsecase from "src/interface/usercases/users/delete_user.usecase.js";

@injectable()
export default  class DeleteUserUsecase implements IDeleteUserUsecase {
    @inject(TYPES.repositories.IUsersRepository) repository: IUsersRepository;

    async execute(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}