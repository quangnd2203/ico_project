import { Container} from "inversify";
import "reflect-metadata";
import TYPES from "./types.js";

import IUsersController from "src/interface/controllers/users.controllers.js";
import UsersController from "../controllers/users.controllers.js";

import ICreateUserUseCases from "src/interface/usercases/users/create_user.usecases.js";
import CreateUserUseCase from "src/infrastructure/usercases/create_user.usercase.js";

import IUsersRepository from "src/interface/repositories/users.repositories.js";
import UsersRepository from "src/infrastructure/repositories/users.repositories.js";
import CreateUserMapper from "src/domain/mappers/create_user.mappers.js";

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

}

/* Use Cases */
function injectUseCases(){
    container.bind<ICreateUserUseCases>(TYPES.useCases.ICreateUserUseCase).to(CreateUserUseCase);

}

/* Repositories */
function injectRepositories(){
    container.bind<IUsersRepository>(TYPES.repositories.IUsersRepository).to(UsersRepository);

}

/* Mappers */
function injectMappers(){
    container.bind<CreateUserMapper>(TYPES.mappers.CreateUserMapper).to(CreateUserMapper);
}