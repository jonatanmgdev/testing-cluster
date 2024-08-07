import { Pageable } from "./pageable";

export interface PageableData <T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    first: boolean;
    empty: boolean;
    sort: { unsorted: boolean, sorted: boolean, empty: boolean };
}