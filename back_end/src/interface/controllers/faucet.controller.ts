import { NetworkResponse } from "src/domain/entities/network_response.entities.js";

export default interface IFaucetController {
    receiveFaucet(address: string): Promise<NetworkResponse<string>>
}