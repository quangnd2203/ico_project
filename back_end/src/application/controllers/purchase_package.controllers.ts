import { injectable, inject } from "inversify";
import PageResponseDto from "src/domain/dtos/page_response.dtos.js";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import IPurchasePackageController from "src/interface/controllers/purchase_package.controller.js";
import TYPES from "../config/types.js";
import ICreatePurchasePackageUsecase from "src/interface/usercases/purchase_package/create.purchase_package.usecase.js";
import IDeletePurchasePackageUsecase from "src/interface/usercases/purchase_package/delete.purchase_package.usecase.js";
import IGetAllPurchasePackageUsecase from "src/interface/usercases/purchase_package/get_all.purchase_package.usecase.js";
import IUpdatePurchasePackageUsecase from "src/interface/usercases/purchase_package/update.purchase_package.usecase.js";
import { container } from "../config/dependencies.config.js";
import IPurchasePackageMapper from "src/interface/mappers/purchase_package.mappers.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import IGetPurchasePackagesMapper from "src/interface/mappers/get_purchase_packages.mappers.js";
import IGetPurchasePackageUsecase from "src/interface/usercases/purchase_package/get.purchase_package.usecase.js";

@injectable()
export default class PurchasePackageController implements IPurchasePackageController{
    @inject(TYPES.useCases.ICreatePurchasePackageUsecase) private createPurchasePackageUseCase: ICreatePurchasePackageUsecase;
    @inject(TYPES.useCases.IGetPurchasePackageUsecase) private getPurchasePackageUseCase: IGetPurchasePackageUsecase;
    @inject(TYPES.useCases.IGetAllPurchasePackageUsecase) private getAllPurchasePackageUsecase: IGetAllPurchasePackageUsecase;
    @inject(TYPES.useCases.IDeletePurchasePackageUsecase) private deletePurchasePackageUsecase: IDeletePurchasePackageUsecase;
    @inject(TYPES.useCases.IUpdatePurchasePackageUsecase) private updatePurchasePackageUsecase: IUpdatePurchasePackageUsecase;

    async create(request: PurchasePackageDto): Promise<NetworkResponse<PurchasePackageDto>> {
        try {
            const purchasePackage = await this.createPurchasePackageUseCase.execute(request);
            const response = container.get<IPurchasePackageMapper>(TYPES.mappers.IPurchasePackageMapper).toResponse(purchasePackage);
            return NetworkResponse.success<PurchasePackageDto>(response);
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'create_purchase_package_error');
        }
    }

    async getAll(request: SearchRequestDto): Promise<NetworkResponse<PageResponseDto<PurchasePackageDto>>> {
        try{
            const [purchasePackages, total] = await this.getAllPurchasePackageUsecase.execute(request);
            const response = container.get<IGetPurchasePackagesMapper>(TYPES.mappers.IGetPurchasePackagesMapper).toResponse(purchasePackages);
            return NetworkResponse.success<PageResponseDto<PurchasePackageDto>>(
                new PageResponseDto<PurchasePackageDto>(response, total, request.page, request.limit)
            );
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'get_all_purchase_package_error');
        }
    }

    async get(id: string): Promise<NetworkResponse<PurchasePackageDto>> {
        try{
            const purchasePackage = await this.getPurchasePackageUseCase.execute(id);
            const response = container.get<IPurchasePackageMapper>(TYPES.mappers.IPurchasePackageMapper).toResponse(purchasePackage);
            return NetworkResponse.success<PurchasePackageDto>(response);
        } catch (e) {
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'get_purchase_package_error');
        }
    }

    async delete(id: string): Promise<NetworkResponse<null>> {
        try{
            this.deletePurchasePackageUsecase.execute(id);
            return NetworkResponse.success<null>(null);
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'delete_purchase_package_error');
        }
    }

    async update(id: string, params: PurchasePackageDto): Promise<NetworkResponse<PurchasePackageDto>> {
        try{
            const purchasePackage = await this.updatePurchasePackageUsecase.execute(id, params);
            const response = container.get<IPurchasePackageMapper>(TYPES.mappers.IPurchasePackageMapper).toResponse(purchasePackage);
            return NetworkResponse.success<PurchasePackageDto>(response);
        }catch(e){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'update_purchase_package_error');
        }
    }
    
}