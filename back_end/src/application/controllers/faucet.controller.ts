import { NetworkResponse, STATUS_CODE } from "src/domain/entities/network_response.entities.js";
import IFaucetController from "src/interface/controllers/faucet.controller.js";
import IFaucetUsecases from "src/interface/usercases/faucet.usecases.js";
import TYPES from "../config/types.js";
import { inject, injectable } from "inversify";

@injectable()
export default class FaucetController implements IFaucetController {

    @inject(TYPES.useCases.IFaucetUsecases) private faucetUsecases: IFaucetUsecases;

    async receiveFaucet(address: string): Promise<NetworkResponse<string>> {
        try{
            const transactionHash = await this.faucetUsecases.receiveFaucet(address);
            return NetworkResponse.success(transactionHash);
        }catch(error){
            return NetworkResponse.fromErrors(STATUS_CODE.bad_request, error);
        }
    }
}