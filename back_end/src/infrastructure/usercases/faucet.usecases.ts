import { inject, injectable } from "inversify";
import TYPES from "src/application/config/types.js";
import IFaucetSmartContractRepository from "src/interface/repositories/faucet_smart_contract.repositories.js";
import IFaucetUsecases from "src/interface/usercases/faucet.usecases.js";

@injectable()
export default class FaucetUsecases implements IFaucetUsecases{
    @inject(TYPES.repositories.IFaucetSmartContractRepository) private _faucetSmartContractRepository: IFaucetSmartContractRepository;

    async receiveFaucet(address: string): Promise<string>{
        return this._faucetSmartContractRepository.receiveFaucet(address);
    }
}