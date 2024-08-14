import { injectable } from "inversify";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import IGetPurchasePackagesMapper from "src/interface/mappers/get_purchase_packages.mappers.js";

@injectable()
export default class GetPurchasePackagesMapper implements IGetPurchasePackagesMapper{
    toResponse(entity: PurchasePackage[]): PurchasePackageDto[] {
        return entity.map((purchasePackage) => {
            return new PurchasePackageDto(
                purchasePackage.id,
                purchasePackage.value,
                purchasePackage.tokenReceive,
                purchasePackage.type,
                purchasePackage.createdAt,
                purchasePackage.updatedAt,
            );
        });
    }

    toDomain(dto: PurchasePackageDto[]): PurchasePackage[] {
        return dto.map((purchasePackageDto) => {
            return new PurchasePackage(
                purchasePackageDto.id,
                purchasePackageDto.value,
                purchasePackageDto.tokenReceive,
                purchasePackageDto.type,
                purchasePackageDto.createdAt,
                purchasePackageDto.updatedAt,
            );
        });
    }
}