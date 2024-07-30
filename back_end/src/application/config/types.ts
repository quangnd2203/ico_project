const TYPES = {
    controller: {
        IUsersController: Symbol.for('IUsersController'),
    },
    useCases: {
        ICreateUserUseCase: Symbol.for('ICreateUserUseCase'),
    },
    repositories: {
        IUsersRepository: Symbol.for('IUsersRepository'),
    },
    mappers: {
        CreateUserMapper: Symbol.for('CreateUserMapper'),
    },
};

export default TYPES;