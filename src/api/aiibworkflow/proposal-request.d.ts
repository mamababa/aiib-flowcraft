export interface AddProposalRequest extends AkRequest {
    Title?: string;
    AppID?: number;
    Dic?: any
}

export interface EditProposalRequest extends AddProposalRequest {
    ListDataID?: string;
    RowVersion?: number;
    Wheres?: ContentListWhereModel[]
}

export interface EditBatchProposalRequest extends AddProposalRequest {
    ParList: EditProposalRequest[]
}

export interface ListWorkflowStart extends AkRequest {
    AppID?: number;
    ListID?: string;
    ListDataID?: string;
    Key?: string;
    Variables?: string;
    ProcDraftID?: string;
    ApplicationID?: string;
    ApplicantID?: string;
    ApplicationExt2?: string;
    BatchNo?: string;
    RowVersion?: number;

}

export interface CheckUserRequest extends AkRequest {
    userID?: string;
    groupCode: string;
}

export interface EditProposalStatusRequest extends EditProposalRequest {
    ProposalID?: string;
    IsCreateProposal?: boolean;
}

export interface GetProcessLogRequest extends AkRequest {
    AppID?: number;
    Title: string;
    ListDataID: string;
}

export interface GoToTBDRequest extends AkRequest {
    AppID?: number;
    Title: string;
    ListDataID: string;
    RowVersion: number;
    Dic?: any;
    Wheres?: ContentListWhereModel[]
}

export interface ProjectCancelRequest extends AkRequest {
    AppID?: number;
    Title: string;
    Data: ProjectCancelDataModal;
}

export interface ProjectCancelDataModal {
    ListDataID: string;
    RowVersion: number;
    Dic?: any;
    Wheres?: ContentListWhereModel[]
}

export interface UserListModel extends AkResponse {
    Data: UserModel[];
}
export interface PrintScreenSummaryRequest extends AkRequest {
    appID?: number;
    listID: string;
    listDataID: string;
}


