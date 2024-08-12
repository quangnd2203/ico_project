import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import Mapper from "./mapper.js";

export default interface IGetPurchasePackagesMapper extends Mapper<PurchasePackage[], PurchasePackageDto[]>{
    // toResponse(entity: PurchasePackage): PurchasePackageDto;

    // toDomain(dto: PurchasePackageDto): PurchasePackage;
}