import { Container} from "inversify";
import "reflect-metadata";
import TYPES from "./types.js";

import IUsersController from "src/interface/controllers/users.controllers.js";
import UsersController from "../controllers/users.controllers.js";

import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecase.js";
import CreateUserUseCase from "src/infrastructure/usercases/users/create_user.usercase.js";

import IUsersRepository from "src/interface/repositories/users.repositories.js";
import UsersRepository from "src/infrastructure/repositories/users.repositories.js";
import UserMapper from "src/domain/mappers/user.mappers.js";
import GetUsersMapper from "src/domain/mappers/get_users.mappers.js";
import IGetUsersUseCase from "src/interface/usercases/users/get_users.usecase.js";
import IGetUserUseCase from "src/interface/usercases/users/get_user.usecase.js";
import GetUsersUseCase from "src/infrastructure/usercases/users/get_users.usercase.js";
import GetUserUsecase from "src/infrastructure/usercases/users/get_user.usecase.js";
import IUserMapper from "src/interface/mappers/user.mappers.js";
import IGetUsersMapper from "src/interface/mappers/get_users.mappers.js";
import IDeleteUserUsecase from "src/interface/usercases/users/delete_user.usecase.js";
import DeleteUserUsecase from "src/infrastructure/usercases/users/delete_user.usecase.js";
import UpdateUserUsecase from "src/infrastructure/usercases/users/update_user.usecase.js";
import IUpdateUserUsecase from "src/interface/usercases/users/update_user.usecase.js";
import IPurchasePackageMapper from "src/interface/mappers/purchase_package.mappers.js";
import PurchasePackageMapper from "src/domain/mappers/purchase_package.mappers.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import PurchasePackageRepository from "src/infrastructure/repositories/purchase_package.repositories.js";
import ICreatePurchasePackageUsecase from "src/interface/usercases/purchase_package/create.purchase_package.usecase.js";
import IDeletePurchasePackageUsecase from "src/interface/usercases/purchase_package/delete.purchase_package.usecase.js";
import IGetPurchasePackageUsecase from "src/interface/usercases/purchase_package/get.purchase_package.usecase.js";
import IGetAllPurchasePackageUsecase from "src/interface/usercases/purchase_package/get_all.purchase_package.usecase.js";
import IUpdatePurchasePackageUsecase from "src/interface/usercases/purchase_package/update.purchase_package.usecase.js";
import GetPurchasePackageUsecase from "src/infrastructure/usercases/purchase_package/get.purchase_package.usecase.js";
import CreatePurchasePackageUsecase from "src/infrastructure/usercases/purchase_package/create.purchase_package.usecase.js";
import GetAllPurchasePackageUsecase from "src/infrastructure/usercases/purchase_package/get_all.purchase_package.usecase.js";
import UpdatePurchasePackageUsecase from "src/infrastructure/usercases/purchase_package/update.purchase_package.usecase.js";
import DeletePurchasePackageUsecase from "src/infrastructure/usercases/purchase_package/delete.purchase_package.usecase.js";
import IPurchasePackageController from "src/interface/controllers/purchase_package.controller.js";
import PurchasePackageController from "../controllers/purchase_package.controllers.js";
import IGetPurchasePackagesMapper from "src/interface/mappers/get_purchase_packages.mappers.js";
import GetPurchasePackagesMapper from "src/domain/mappers/get_purchase_packages.mappers.js";

export const container = new Container();

export function inject() {
    injectControllers();
    injectUseCases();
    injectRepositories();
    injectMappers();
}

/* Controllers */
function injectControllers(){
    container.bind<IUsersController>(TYPES.controller.IUsersController).to(UsersController);
    container.bind<IPurchasePackageController>(TYPES.controller.IPurchasePackageController).to(PurchasePackageController);
}

/* Use Cases */
function injectUseCases(){
    container.bind<ICreateUserUseCases>(TYPES.useCases.ICreateUserUseCase).to(CreateUserUseCase);
    container.bind<IGetUsersUseCase>(TYPES.useCases.IGetUsersUseCase).to(GetUsersUseCase);
    container.bind<IGetUserUseCase>(TYPES.useCases.IGetUserUseCase).to(GetUserUsecase);
    container.bind<IDeleteUserUsecase>(TYPES.useCases.IDeleteUserUsecase).to(DeleteUserUsecase);
    container.bind<IUpdateUserUsecase>(TYPES.useCases.IUpdateUserUsecase).to(UpdateUserUsecase);

    container.bind<IGetPurchasePackageUsecase>(TYPES.useCases.IGetPurchasePackageUsecase).to(GetPurchasePackageUsecase);
    container.bind<ICreatePurchasePackageUsecase>(TYPES.useCases.ICreatePurchasePackageUsecase).to(CreatePurchasePackageUsecase);
    container.bind<IGetAllPurchasePackageUsecase>(TYPES.useCases.IGetAllPurchasePackageUsecase).to(GetAllPurchasePackageUsecase);
    container.bind<IDeletePurchasePackageUsecase>(TYPES.useCases.IDeletePurchasePackageUsecase).to(DeletePurchasePackageUsecase);
    container.bind<IUpdatePurchasePackageUsecase>(TYPES.useCases.IUpdatePurchasePackageUsecase).to(UpdatePurchasePackageUsecase);
}

/* Repositories */
function injectRepositories(){
    container.bind<IUsersRepository>(TYPES.repositories.IUsersRepository).to(UsersRepository);
    container.bind<IPurchasePackageRepository>(TYPES.repositories.IPurchasePackageRepository).to(PurchasePackageRepository);
}

/* Mappers */
function injectMappers(){
    container.bind<IUserMapper>(TYPES.mappers.IUserMapper).to(UserMapper);
    container.bind<IGetUsersMapper>(TYPES.mappers.IGetUsersMapper).to(GetUsersMapper);
    container.bind<IPurchasePackageMapper>(TYPES.mappers.IPurchasePackageMapper).to(PurchasePackageMapper);
    container.bind<IGetPurchasePackagesMapper>(TYPES.mappers.IGetPurchasePackagesMapper).to(GetPurchasePackagesMapper);
}