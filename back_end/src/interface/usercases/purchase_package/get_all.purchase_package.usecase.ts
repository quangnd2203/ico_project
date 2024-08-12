import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";

export default interface IGetAllPurchasePackageUsecase {
    execute(): Promise<PurchasePackage[]>;
}