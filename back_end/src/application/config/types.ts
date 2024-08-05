import GetUsersMapper from "src/domain/mappers/get_users.mappers.js";

const TYPES = {
    controller: {
        IUsersController: Symbol.for('IUsersController'),
    },
    useCases: {
        ICreateUserUseCase: Symbol.for('ICreateUserUseCase'),
        IGetUsersUseCase: Symbol.for('IGetUsersUseCase'),
    },
    repositories: {
        IUsersRepository: Symbol.for('IUsersRepository'),
    },
    mappers: {
        CreateUserMapper: Symbol.for('CreateUserMapper'),
        GetUsersMapper: Symbol.for('GetUsersMapper'),
    },
};

export default TYPES;