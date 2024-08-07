import { injectable, inject } from "inversify";
import TYPES from "src/application/config/types.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import IGetPurchasePackageUsecase from "src/interface/usercases/purchase_package/get.purchase_package.usecase.js";

@injectable()
export default class GetPurchasePackageUsecase implements IGetPurchasePackageUsecase {
    @inject(TYPES.repositories.IPurchasePackageRepository) private _repository: IPurchasePackageRepository;

    async execute(id: string): Promise<PurchasePackage>{
        return await this._repository.get(id);
    };
}