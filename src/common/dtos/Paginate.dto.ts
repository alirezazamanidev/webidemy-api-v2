
export class PaginatedDto<T> {
    page:number;
    pages:number
    limit:number
    data:T[]
}