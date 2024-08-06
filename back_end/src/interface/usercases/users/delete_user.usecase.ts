export default interface IDeleteUserUsecase {
    execute(id: string): Promise<void>;
}