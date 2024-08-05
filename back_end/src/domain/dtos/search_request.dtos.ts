export default class SearchRequestDto {
    keyword?: string;
    page: number;
    limit: number;

    constructor(keyword?: string, page?: number, limit?: number){
        this.keyword = keyword;
        this.page = page ?? 1;
        this.limit = limit ?? 10;
    }
}