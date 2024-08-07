import { inject, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import IGetAllPurchasePackageUsecase from "src/interface/usercases/purchase_package/get_all.purchase_package.usecase.js";

@injectable()
export default class GetAllPurchasePackageUsecase implements IGetAllPurchasePackageUsecase {
    @inject(TYPES.repositories.IPurchasePackageRepository) private _repository: IPurchasePackageRepository;

    async execute(request: SearchRequestDto): Promise<[PurchasePackage[], number]>{
        return this._repository.getAll(request);
    };
}