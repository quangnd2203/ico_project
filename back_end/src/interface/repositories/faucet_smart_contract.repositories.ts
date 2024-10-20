export default interface IFaucetSmartContractRepository {
    receiveFaucet(address: string): Promise<string>
}