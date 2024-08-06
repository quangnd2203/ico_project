// PURCHASE PACKAGE 
// id 
// value: number 
// token_receive: number 
// type: USDT | BNB
// createdAt: Date
// updatedAt: Date

export default class PurchasePackage {
    id: string;
    value: number;
    token_receive: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, value: number, token_receive: number, type: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.value = value;
        this.token_receive = token_receive;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}