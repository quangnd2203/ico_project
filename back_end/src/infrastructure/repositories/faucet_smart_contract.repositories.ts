import IFaucetSmartContractRepository from "src/interface/repositories/faucet_smart_contract.repositories.js";
import { ethers } from "ethers";
import faucetJson from ".abis/Faucet.json" assert { type: "json" };
import { injectable } from "inversify";
import { JsonRpcProvider } from "ethers";

@injectable()
export default class FaucetSmartContractRepository implements IFaucetSmartContractRepository {

    async receiveFaucet(address: string): Promise<string> {
        const faucetContract: ethers.Contract = new ethers.Contract(
            process.env.FAUCET_ADDRESS, 
            faucetJson.abi, 
            new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, new JsonRpcProvider(process.env.RPC_URL))
        );
        try{
            const tx:ethers.Transaction = await faucetContract.receiveFaucet(address);
            return tx.hash;
        }catch(e){
            throw e.reason;
        }
    }
    
}