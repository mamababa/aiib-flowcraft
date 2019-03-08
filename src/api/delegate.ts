import {Request, AkResponse} from "akmii-yeeoffice-common";
export class DelegatesAPI {
    /** 委托列表 */
    static async getDelegateList(data?: GetDelegateListRequest) {
        let url : string = "/api/delegates";
        return new Request < GetDelegateListRequest,
        TaskDelegateModelListResponse > ().get(url, data);
    }
    /** 委托列表 */
    static async getOwnerDelegateList(data?: GetTaskRequest) {
        let url : string = "/api/tasks/owner";
        return new Request < GetTaskRequest,
        GetDelegateListResponse > ().get(url, data);
    }

    /** 添加委托 */
    static async postDelegate(data?: DelegateRequest) {
        let url : string = "/api/delegates";
        return new Request < DelegateRequest,
        AkResponse > ().post(url, data);
    }
    /** 更新委托 */
    static async putDelegate(data?: DelegateRequest) {
        let url : string = "/api/delegates";
        return new Request < DelegateRequest,
        AkResponse > ().put(url, data);
    }
    /** 编辑委托状态 */
    static async putDelegateStatus(data?: DelegateEditStatusRequest) {
        let url : string = "/api/delegates/UpdateStatus";
        return new Request < DelegateEditStatusRequest,
        AkResponse > ().put(url, data);
    }
    /** 删除委托 */
    static async deleteDelegate(data?: DeleteDelegateRequest) {
        let url : string = "/api/delegates";
        return new Request < DeleteDelegateRequest,
        AkResponse > ().del(url, data);
    }
     /** 验证改流程key是否已被使用过 */
    static async validatekey(data?: ValidateKeyCanUseRequest) {
        let url : string = "/api/delegates/key";
         return new Request < ValidateKeyCanUseRequest,
        TaskDelegateModelResponse  > ().get(url, data);
    }
    /**批量 添加委托 */
    static async postDelegateBatch(data?: BatchRequest) {
        let url : string = "/api/delegates/batch";
        return new Request < BatchRequest,
        AkResponse > ().post(url, data);
    }
    /**编辑委托 */
    static async putDelegateBatch(data?: BatchRequest) {
        let url : string = "/api/delegates/batch";
        return new Request < BatchRequest,
        AkResponse > ().put(url, data);
    }
     /**批量 删除委托 */
     static async deleteDelegateBatch(data?: DeleteDelegateBatchRequest) {
        let url : string = "/api/delegates/removebatch";
        return new Request < DeleteDelegateBatchRequest,
        AkResponse > ().put(url, data);
    }
}
