import { injectable, inject } from "inversify";
import TYPES from "src/application/config/types.js";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import IUpdatePurchasePackageUsecase from "src/interface/usercases/purchase_package/update.purchase_package.usecase.js";

@injectable()
export default class UpdatePurchasePackageUsecase implements IUpdatePurchasePackageUsecase {
    @inject(TYPES.repositories.IPurchasePackageRepository) private _repository: IPurchasePackageRepository;

    async execute(id: string, request: PurchasePackageDto): Promise<PurchasePackage>{
        return await this._repository.update(id, request);
    };
}