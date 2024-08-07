import { inject, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import IDeletePurchasePackageUsecase from "src/interface/usercases/purchase_package/delete.purchase_package.usecase.js";

@injectable()
export default class DeletePurchasePackageUsecase implements IDeletePurchasePackageUsecase {
    @inject(TYPES.repositories.IPurchasePackageRepository) private _repository: IPurchasePackageRepository;

    execute(id: string): Promise<void>{
        return this._repository.delete(id);
    };
}