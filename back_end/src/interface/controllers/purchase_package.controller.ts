import PageResponseDto from "src/domain/dtos/page_response.dtos.js";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import { NetworkResponse } from "src/domain/entities/network_response.entities.js";

export default interface IPurchasePackageController{
    create(params: PurchasePackageDto): Promise<NetworkResponse<PurchasePackageDto>>;
    getAll(): Promise<NetworkResponse<PageResponseDto<PurchasePackageDto>>>;
    get(id: string): Promise<NetworkResponse<PurchasePackageDto>>;
    delete(id: string): Promise<NetworkResponse<null>>;
    update(id: string, params: PurchasePackageDto): Promise<NetworkResponse<PurchasePackageDto>>;
}