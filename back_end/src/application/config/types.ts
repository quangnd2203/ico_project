const TYPES = {
    controller: {
        IUsersController: Symbol.for('IUsersController'),
        IPurchasePackageController: Symbol.for('IPurchasePackageController'),
        IFaucetController: Symbol.for('IFaucetController'),
    },
    useCases: {
        ICreateUserUseCase: Symbol.for('ICreateUserUseCase'),
        IGetUsersUseCase: Symbol.for('IGetUsersUseCase'),
        IGetUserUseCase: Symbol.for('IGetUserUseCase'),
        IDeleteUserUsecase: Symbol.for('IDeleteUserUsecase'),
        IUpdateUserUsecase: Symbol.for('IUpdateUserUsecase'),
        ICreatePurchasePackageUsecase: Symbol.for('ICreatePurchasePackageUsecase'),
        IGetPurchasePackageUsecase: Symbol.for('IGetPurchasePackageUsecase'),
        IDeletePurchasePackageUsecase: Symbol.for('IDeletePurchasePackageUsecase'),
        IUpdatePurchasePackageUsecase: Symbol.for('IUpdatePurchasePackageUsecase'),
        IGetAllPurchasePackageUsecase: Symbol.for('IGetAllPurchasePackageUsecase'),
        IFaucetUsecases: Symbol.for('IFaucetUsecases'),
    },
    repositories: {
        IUsersRepository: Symbol.for('IUsersRepository'),
        IPurchasePackageRepository: Symbol.for('IPurchasePackageRepository'),
        IFaucetSmartContractRepository: Symbol.for('IFaucetSmartContractRepository'),
    },
    mappers: {
        IUserMapper: Symbol.for('IUserMapper'),
        IGetUsersMapper: Symbol.for('IGetUsersMapper'),
        IPurchasePackageMapper: Symbol.for('IPurchasePackageMapper'),
        IGetPurchasePackagesMapper: Symbol.for('IGetPurchasePackagesMapper'),
    },
};

export default TYPES;