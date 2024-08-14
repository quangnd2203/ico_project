export default class PurchasePackageDto {
    id: string;
    value: number;
    tokenReceive: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, value: number, tokenReceive: number, type: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.value = value;
        this.tokenReceive = tokenReceive;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}