export default class SearchRequestDto {
    keyword?: string;
    page: number;
    limit: number;
    sortField?: string;
    sortOrder: string;

    constructor(keyword?: string, page?: number, limit?: number, sortField?: string, sortOrder?: string) {
        this.keyword = keyword;
        this.page = page ?? 1;
        this.limit = limit ?? 10;
        this.sortField = sortField;
        this.sortOrder = sortOrder ?? 'ASC';
    }
}