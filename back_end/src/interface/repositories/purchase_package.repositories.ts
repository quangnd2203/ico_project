import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js"
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js"
import PurchasePackage from "src/domain/entities/purchase_package.js"

export default interface IPurchasePackageRepository {
    create(request: PurchasePackageDto): Promise<PurchasePackage>
    getAll(request: SearchRequestDto): Promise<[PurchasePackage[], number]>
    get(id: string): Promise<PurchasePackage>
    delete(id: string): Promise<void>
    update(id: string, request: PurchasePackageDto): Promise<PurchasePackage>
}