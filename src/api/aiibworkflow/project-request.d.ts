interface NextStageRequest extends AkRequest {
    Title?: string;
    AppID?: number;
    CurrentStage?: string;
    ProjectID?: string;
    ListDataID?: string;
    RowVersion?: string;
    Dic?: any
    Wheres?: any[];
}

interface GetUserGroupRequest extends AkRequest {
    userID: string;
}
interface GetUserByCode extends AkRequest{
    groupCode?:string;
    pageIndex:number;
    pageSize:number;
    searchKey?:string;
}
interface SendEmailRequest extends AkRequest {
    Title?: string;
    ListDataID?: string;
    ListDataIDs?: string[];
    EmailCode?: string;
    To?: string[];
    CC?: string[];
    ToGroups?: string[];
    Links?: string[];
    Attr?:string
}

interface ProjectByMemberRequest extends AkRequest {
    Type: string;
    MemberID: string;
    ProjectColumns: any[];
    Wheres?: any[];
    Sorts?: any[];
    PageIndex?: number;
    PageSize?: number;
}

interface ProjectImportRequest extends AkRequest {
    ClientHour: number;
    ClientType:string;
}

interface ProjectDocumentImportRequest extends AkRequest {
    Type: string;
}
