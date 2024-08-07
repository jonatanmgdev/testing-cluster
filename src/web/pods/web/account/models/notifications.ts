export interface AccountNotification {
    content:          Content[];
    pageable:         Pageable;
    totalElements:    number;
    totalPages:       number;
    last:             boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    empty:            boolean;
}

export interface Content {
    id:              number;
    notification_id: number;
    push_date_time:  Date;
    title:           string;
    link:            string;
    image:           string;
    body:            string;
    is_seen:         boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted:   boolean;
    empty:    boolean;
}

export interface TotalPending {
    pending: number;
}
