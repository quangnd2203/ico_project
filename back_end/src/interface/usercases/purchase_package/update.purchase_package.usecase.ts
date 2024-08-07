import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";

export default interface IUpdatePurchasePackageUsecase {
    execute(id: string, request: PurchasePackageDto): Promise<PurchasePackage>;
}