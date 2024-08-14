export default class PurchasePackageDto {
    id: string;
    name: string;
    value: number;
    tokenReceive: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, value: number, tokenReceive: number, type: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.tokenReceive = tokenReceive;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}