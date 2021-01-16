export interface DataGridConfig {
    useSortable: boolean,
    useFilter: boolean,
    usePagination: boolean,
    displayColumns: Columns[],
    dateformat: string,
    lineActions?: LineAction[],
    pageSize?: number[],
    useSelect: boolean,
    page?: Page
}

export interface Columns {
    displayName?: string,
    field: string,
    type?: string
}

export interface LineAction {
    label: string,
    icon: string,
    color: string,
    action: (p: any) => void;
}

export interface Page {
    totalElements?: number;
    index?: number;
    size?: number;
}