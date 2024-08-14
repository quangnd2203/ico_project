import { container } from "src/application/config/dependencies.config.js";
import TYPES from "src/application/config/types.js";
import PurchasePackageDto from "src/domain/dtos/purchase_package.dtos.js";
import SearchRequestDto from "src/domain/dtos/search_request.dtos.js";
import PurchasePackage from "src/domain/entities/purchase_package.js";
import IPurchasePackageMapper from "src/interface/mappers/purchase_package.mappers.js";
import IPurchasePackageRepository from "src/interface/repositories/purchase_package.repositories.js";
import PurchasePackageModel from "src/infrastructure/models/purchase_package.model.js";
import { injectable } from "inversify";

@injectable()
export default class PurchasePackageRepository implements IPurchasePackageRepository{

    async create(request: PurchasePackageDto): Promise<PurchasePackage> {
        const purchasePackage = container.get<IPurchasePackageMapper>(TYPES.mappers.IPurchasePackageMapper).toDomain(request as PurchasePackageDto);
        const purchasePackageModel = new PurchasePackageModel(purchasePackage);
        await purchasePackageModel.save();
        return purchasePackageModel.toObject();
    }

    async getAll(request: SearchRequestDto): Promise<[PurchasePackage[], number]> {
        const sort = {};
        if (request.sortField) {
            sort[request.sortField] = request.sortOrder === 'ASC' ? 1 : -1;
        }
        const [listPurchasePackage, total] = await Promise.all([
            PurchasePackageModel.find()
                .skip((request.page - 1) * request.limit)
                .limit(request.limit)
                .sort(sort),
                PurchasePackageModel.countDocuments()
        ]);
        return [listPurchasePackage, total];
    }

    async get(id: string): Promise<PurchasePackage> {
        try {
            const purchasePackage = await PurchasePackageModel.findById(id);
            if (!purchasePackage) {
                throw new Error('package_not_found');
            }
            return purchasePackage;
        } catch (e) {
            throw new Error('package_not_found');
        }
    }

    async delete(id: string): Promise<void> {
        await PurchasePackageModel.findByIdAndDelete(id);
    }

    async update(id: string, request: PurchasePackageDto): Promise<PurchasePackage> {
        const purchasePackage = container.get<IPurchasePackageMapper>(TYPES.mappers.IPurchasePackageMapper).toDomain(request as PurchasePackageDto);
        const purchasePackageModel = await PurchasePackageModel.findById(id);
        if (!purchasePackageModel) {
            throw new Error('package_not_found');
        }
        purchasePackageModel.set(purchasePackage);
        await purchasePackageModel.save();
        return purchasePackageModel.toObject();
    }

}