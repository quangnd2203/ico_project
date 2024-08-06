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
        IPurchasePackageRepository: Symbol.for('IPurchasePackageRepository'),
    },
    mappers: {
        IUserMapper: Symbol.for('IUserMapper'),
        IGetUsersMapper: Symbol.for('IGetUsersMapper'),
        IPurchasePackageMapper: Symbol.for('IPurchasePackageMapper'),
    },
};

export default TYPES;