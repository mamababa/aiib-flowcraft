import {Request, AkResponse} from "akmii-yeeoffice-common";
/** 我的申请 */
export class ApplyAPI {
    /** 获取申请列表(我的) */
    static async getApply(data: GetApplyRequest) {
        let url: string = "/api/applications";
        return new Request<GetApplyRequest,
            ApplicationModelListResponse>().get(url, data);
    }
    /**申请取消 取消之后不允许再提交 */
    static async putApplyCancel(data: ApplicationPutRequest) {
        let url: string = "/api/applications/cancel";
        return new Request<ApplicationPutRequest,
            AkResponse>().put(url, data);
    }
    /**申请撤回 */
    static async putApplyRevoke(data: ApplicationPutRequest) {
        let url: string = "/api/applications/revoke";
        return new Request<ApplicationPutRequest,
            AkResponse>().put(url, data);
    }
    /**获取申请人信息 */
    static async getApplyApplicant(data: ApplicantApplicationRequest) {
        let url: string = "/api/applications/applicant";
        return new Request<ApplicantApplicationRequest,
            AkResponse>().get(url, data);
    }
}


