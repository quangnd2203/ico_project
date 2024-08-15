import IPurchasePackageMapper from "src/interface/mappers/purchase_package.mappers.js";
import PurchasePackageDto from "../dtos/purchase_package.dtos.js";
import PurchasePackage from "../entities/purchase_package.js";
import { injectable } from "inversify";

@injectable()
export default class PurchasePackageMapper implements IPurchasePackageMapper {
    toResponse(entity: PurchasePackage): PurchasePackageDto {
        return new PurchasePackageDto(
            entity.id,
            entity.name,
            entity.value,
            entity.tokenReceive,
            entity.bonus,
            entity.type,
            entity.createdAt,
            entity.updatedAt
        );
    }
    toDomain(dto: PurchasePackageDto): PurchasePackage {
        return new PurchasePackage(
            dto.id,
            dto.name,
            dto.value,
            dto.tokenReceive,
            dto.bonus,
            dto.type,
            dto.createdAt,
            dto.updatedAt
        );
    }

}