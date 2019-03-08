interface YeeOfficeBaseRequest {
    AkmiiSecret?: string;//cookie.get("LoginToken");
}
interface DocumentPaginationRequest extends YeeOfficeBaseRequest {
    folderPath: string;
    keyword: string;
    pageIndex: number;
    pageSize: number;
    orderByField: string;
    orderByAscending: boolean;
    selectFolder:boolean;
}
