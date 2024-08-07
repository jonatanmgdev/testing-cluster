export interface IPagination<T> {
    content: T[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
    empty: boolean;
}