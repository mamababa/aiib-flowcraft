interface ProcDefBrief extends BaseModel {
				DefKey : string;
				DefName : string;
}
interface ProcDefDelegate extends BaseModel{
    Key :string;
    ProcDefName  :string;
    ListID  :string;
}
/**委托流程名称列表*/
interface ProcDefBriefListResponse extends AkResponse {
			Data?: ProcDefBrief[];
}

/**委托Aiib流程名称列表*/
interface ProcDefDelegateResponse extends AkResponse {
    Data?: ProcDefDelegate[];
}
