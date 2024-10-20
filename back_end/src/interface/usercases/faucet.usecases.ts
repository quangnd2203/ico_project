export default interface IFaucetUsecases{
    receiveFaucet(address: string): Promise<string>
}