import PurchasePackage from "src/domain/entities/purchase_package.js";

export default interface IGetPurchasePackageUsecase {
    execute(id: string): Promise<PurchasePackage>;
}