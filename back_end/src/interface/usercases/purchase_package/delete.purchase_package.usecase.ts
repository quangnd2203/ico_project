export default interface IDeletePurchasePackageUsecase {
    execute(id: string): Promise<void>;
}