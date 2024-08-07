import { injectable, inject } from "inversify";
import TYPES from "src/application/config/types.js";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import ICreatePurchasePackageUsecase from "src/interface/usercases/purchase_package/create.purchase_package.usecase.js";

@injectable()
export default class CreatePurchasePackageUsecase implements ICreatePurchasePackageUsecase {
    @inject(TYPES.repositories.IPurchasePackageRepository) private _repository: IPurchasePackageRepository;

    async execute(request: PurchasePackageDto): Promise<PurchasePackage> {
        return await this._repository.create(request);
    };
}