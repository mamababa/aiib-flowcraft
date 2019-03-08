import {Request, AkResponse} from "akmii-yeeoffice-common";
/** 获取流程变量 */
export class VariableAPI {
    /** 根据ApplicationID获取流程变量 */
    static async getVariableByApplication(data : GetVariablesByApplicationIDRequest) {
        let url : string = "/api/variables";
        return new Request < GetVariablesByApplicationIDRequest,
        AkResponse > ().get(url, data);
    }
    /** 修改流程变量 */
    static async putVariable(data : GetVariableEditRequest) {
        let url : string = "/api/applications/variableedit";
        return new Request < GetVariableEditRequest,AkResponse > ().put(url, data);
    }
}
