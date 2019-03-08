import {Request, AkResponse} from "akmii-yeeoffice-common";

export class ParameterManagerAPI {
    /**获取参数管理列表 */
    static async getParameterManagerList(data?: GetParameterManagerListRequest) {
        let url : string = "/api/parameter/list";
        return new Request < GetParameterManagerListRequest,
        GetParameterManagerListResponse > ().get(url);
    }
    /**新增参数 */
    static async addParameter(data?: AddParameterRequest) {
        let url : string = "/api/add/parameter";
        return new Request < AddParameterRequest,
        AkResponse > ().post(url);
    }
    /**编辑参数 */
    static async editParameter(data?: EditParameterRequest) {
        let url : string = "/api/edit/parameter";
        return new Request < EditParameterRequest,
        AkResponse > ().put(url);
    }
    /**删除参数 */
    static async deleteParameter(data?: DeleteParameterRequest) {
        let url : string = "/api/delete/parameter";
        return new Request < DeleteParameterRequest,
        AkResponse > ().del(url);
    }
}
