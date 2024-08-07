import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";

export default interface ICreatePurchasePackageUsecase {
    execute(request: PurchasePackageDto): Promise<PurchasePackage>;
}