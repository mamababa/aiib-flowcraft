import {Request, AkResponse} from "akmii-yeeoffice-common";

export class ProcInstAPI {
    static async getProcInst() {
        let url : string = "/api/ProcInsts";
        return new Request < GetProcInstRequest,
        ProcInstModelListResponse  > ().get(url);
    }
    static async getActivityProcInst(data : GetActiveProcInstRequest) {
        let url : string = "/api/admin/applications";
        return new Request < GetActiveProcInstRequest,
        ApplicationModelListResponse  > ().get(url, data);
    }
    /**开启一个流程By Key */
    static async postStartProcInstByKey(data : ProcInstStartByKeyRequest) {
        let url : string = "/api/procinsts/Start/key";
            return new Request < ProcInstStartByKeyRequest ,
        AkResponse > ().post(url, data);
    }
    /**开启一个流程By Id */
    static async postStartProcInstById(data : ProcInstStartByIDRequest) {
        let url : string = "/api/procinsts/Start/id";
        return new Request < ProcInstStartByIDRequest ,
        AkResponse > ().post(url, data);
    }
    /** 获取流程实例详情 */
    static async getApplicantByUserID(data : GetApplicantRequest) {
        let url : string = "/api/applications/applicant";
        return new Request < GetApplicantRequest,
        ApplicantModelResponse  > ().get(url, data);
    }
    /** 获取流程实例详情 */
    static async getProcInstItemInfoByID(data : GetProcInstItemByIDRequest) {
        let url : string = "/api/admin/applications/detail";
        return new Request < GetProcInstItemByIDRequest,
        ApplicationDetailResponse > ().get(url, data);
    }
    /**撤回 */
    static async putProcInstItemRevoke(data : ApplicationPutRequest) {
        let url : string = "/api/admin/applications/revoke";
        return new Request < ApplicationPutRequest ,
        AkResponse > ().put(url, data);
    }
    /**取消 */
    static async putProcInstItemCancel(data : ApplicationPutRequest) {
        let url : string = "/api/admin/applications/cancel";
        return new Request < ApplicationPutRequest ,
        AkResponse > ().put(url, data);
    }
    /**
     * 请求流程图数据
     * @param data 请求
     */
    static getDiagram(data : GetDiagramRequest) {
        let url : string = "/api/procinsts/diagram";
        return new Request < GetDiagramRequest,
        GetDiagramResponse > ().get(url, data);
    }

    static getListFlowItem(data: GetListFlowItemRequest) {
        const url : string = "/api/listflow/item";
        return new Request < GetListFlowItemRequest,
        AkResponse > ().get(url, data);
    }
}
export enum ApplicationStatusEnum
{
    // /**草稿*/
    // Draft = -2,
    // Any = -1,
    // /**开始 */
    // Start = 0,
    /** 运行中 */
    Running = 1,
    /** 已结束 */
    Complete = 2,
    /** 拒绝 */
    Rejected= 3,
    /** 出错 */
    Error = 4,
    /** 撤回流程 */
    Revoked = 5,
        /** 流程撤回中 */
    Revoking = 51,
    /** 取消流程 */
    Canceled = 6,
        /**流程取消中 */
    Cancelling = 61,
    /**  终止流程 */
    // Terminated = 999,
}

export const ApplicationStatusColor = {
    /** 运行中 */
    Running: "rgb(255, 191, 0)",
    /** 已结束 */
    Complete: "#18ba9b",
    /** 拒绝 */
    Rejected: "#f04134",
    /** 出错 */
    Error: "#f04134",
    /** 撤回流程 */
    Revoked: "#bbb",
    /** 取消流程 */
    Cancelled: "#bbb"
}
