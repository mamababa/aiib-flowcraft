
export interface SortsListModel {
    SortName: string;
    SortByDesc: boolean;
}

export interface ProjectExportRequest extends AkRequest {
    Columns: string;
    Wheres?: string;
    Sorts?: string;
    FileName?: string;
    DetailUrl?: string;
    ReportType?: number;
}
