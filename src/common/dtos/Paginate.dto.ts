
export class PaginatedDto<T> {
    page:number;
    limit:number;
    data:T[]
}
export class QueryPaginateDTO {
    page:string
    limit:string
}