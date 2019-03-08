import {Request, AkResponse} from "akmii-yeeoffice-common";

export class ProcDraftsAPI {
    /** 分页获取用户所有流程草稿 */
    static async getProcDrafts(data?: GetProcDraftRequest) {
        let url : string = "/api/procdrafts";
        return new Request < GetProcDraftRequest,
        ProcDraftModelListResponse  > ().get(url, data);
    }

    /**获取单个流程草稿 */
    static async getProcDraftsV2ByID(data?: GetProcDraftByIDRequest) {
        let url: string = "/api/procdrafts/id/v2";
        return new Request < GetProcDraftByIDRequest,
        ProcDraftModelResponse  > ().get(url, data);
    }
    /**保存草稿 */
    static async postProcDrafts(data?: ProcDraftRequest ) {
        let url : string = "/api/procdrafts";
        return new Request < ProcDraftRequest ,
        AkResponse > ().post(url, data);
    }
    /**更新草稿 */
    static async putProcDrafts(data?: ProcDraftRequest ) {
        let url : string = "/api/procdrafts";
        return new Request < ProcDraftRequest ,
        AkResponse > ().put(url, data);
    }

    /**删除草稿 */
    static async deleteProcDrafts(data?: DeleteProcDraftRequest) {
        let url : string = "/api/procdrafts";
        return new Request < DeleteProcDraftRequest,
        AkResponse > ().del(url, data);
    }
}
