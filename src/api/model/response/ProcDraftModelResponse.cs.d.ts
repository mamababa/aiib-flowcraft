interface ProcDraftModel extends BaseModel {
    ProcDraftID: string;
    ProcDefID: string;
    DefKey: string;
    FlowName: string;
    FormDATA: string;
    ApplicantID: string;
    ApplicantInfo: ApplicantInfo;
    ApplicantName: string;
    FormUrl: string;
}

interface ProcDraftModelResponse extends AkResponse {
    Data?: ProcDraftModel;
}

interface ProcDraftModelListResponse extends AkResponse {
    Data?: ProcDraftModel[];
}
