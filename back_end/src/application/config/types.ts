const TYPES = {
    controller: {
        IUsersController: Symbol.for('IUsersController'),
    },
    useCases: {
        ICreateUserUseCase: Symbol.for('ICreateUserUseCase'),
        IGetUsersUseCase: Symbol.for('IGetUsersUseCase'),
        IGetUserUseCase: Symbol.for('IGetUserUseCase'),
        IDeleteUserUsecase: Symbol.for('IDeleteUserUsecase'),
        IUpdateUserUsecase: Symbol.for('IUpdateUserUsecase'),
    },
    repositories: {
        IUsersRepository: Symbol.for('IUsersRepository'),
    },
    mappers: {
        IUserMapper: Symbol.for('IUserMapper'),
        IGetUsersMapper: Symbol.for('IGetUsersMapper'),
    },
};

export default TYPES;