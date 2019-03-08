/**流程实例*/
const enum ProcInstEnum {
    /** 活动 */
    Nomal = 1,
    /** 已结束 */
    Complete = 2,
    /** 修复*/
    Repair = 4
}
interface GetDiagramRequest extends AkRequest {
    procInstID : string;
    defResourceID : string;
}
interface GetDiagramResponse extends AkResponse {
    DefBlob : string,
    CurrentActivityList : {
        [key : string]: number;
    };
}
interface GetActiveProcInstRequest extends AkRequest {
    pageIndex?: number;
    pageSize?: number;
    defKey?: string;
    flowName?: string;
    applicantID?: string;
    categoryID?: string;
    status?: string;
    flowNo?: string;
}

interface GetProcInstRequest extends AkRequest {
    pageIndex?: number;
    pageSize?: number;
    defKey?: string;
    flowName?: string;
    applicantID?: string;
    categoryID?: string;
    status?: string;
    flowNo?: string;
}

interface PostProcInstRequest extends AkRequest {}

interface PutProcInstRequest extends AkRequest {}

interface DeleteProcInstRequest extends AkRequest {}

/***获取流程实例详情 */
interface GetProcInstItemByIDRequest extends AkRequest {
    /** applicationID 和 procInstID 必须填一个*/
    applicationID?: string;
    procInstID?: string;
}

interface GetApplicantRequest extends AkRequest {
    userID?: string;
}

// /**开启一个流程实例 By Key*/
// interface PostStartProcInstByKeyRequest extends AkRequest {
//     key?: string;
//     variables?: {};
//     applicationID?: string;
//     applicantID?: string;
// }
//
// /**开启一个流程实例  By ID*/
// interface PostStartProcInstByIdRequest extends AkRequest {
//     procdefID?: string;
//     variables?: {};
//     applicationID?: string;
//     applicantID?: string;
//     /**流程草稿ID 如果有的话 */
//     procDraftID?: string;
// }


interface GetListFlowItemRequest extends AkRequest {
    appID?: sting;
    listID?: sting;
    ListDataID?: sting;
    itemID?: sting;
}
