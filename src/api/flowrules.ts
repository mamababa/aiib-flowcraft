import {Request, AkResponse} from "akmii-yeeoffice-common";
export class FlowRulesAPI {

    /**根据key查询 */
    static async getFlowRulesByKey(data?: GetFlowRulesByKeyRequest) {
        let url : string = "/api/admin/flownorules/key";
        return new Request < GetFlowRulesByKeyRequest,
        FlowNoRuleResponse  > ().get(url, data);
    }
    /**编辑 */
    static async putFlowRules(data : FlowNoRuleRequest ) {
        let url : string = "/api/admin/flownorules";
        return new Request < FlowNoRuleRequest,
        AkResponse > ().put(url, data);
    }
    /**新增 */
    static async postFlowRules(data : FlowNoRuleRequest) {
        let url : string = "/api/admin/flownorules";
        return new Request < FlowNoRuleRequest,
        AkResponse > ().post(url, data);
    }
    /**删除 */
    static async delFlowRules(data : DeleteFlowRulesRequest) {
        let url : string = "/api/admin/flownorules";
        return new Request < DeleteFlowRulesRequest,
        AkResponse > ().del(url, data);
    }
    /**获取  */
    static async getAllFlowRules(data?: GetAllFlowRulesRequest) {
        let url : string = "/api/admin/flownorules";
        return new Request < GetAllFlowRulesRequest,
        FlowNoRuleListResponse  > ().get(url, data);
    }
}
