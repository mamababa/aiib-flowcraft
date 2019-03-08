import {Request, AkResponse} from "akmii-yeeoffice-common";
import { GetResourceByIdRequest} from "./model/resource";

export class ResourceAPI {
    /**根据ID获取流程资源 */
    static async getResourceById(data?: GetResourceByIdRequest) {
        let url : string = "/api/admin/resources/id";
        return new Request < GetResourceByIdRequest,
        ResourceModelResponse  > ().get(url,data);
    }
    /**添加资源 */
    static async postResource(data : ResourceRequest ) {
        let url : string = "/api/admin/resources";
        return new Request < ResourceRequest ,
        AkResponse > ().post(url, data);
    }
    /**导出*/
    static exportUrl(procModelID, fileName){
        return "/api/admin/resources/export?procModelID=" + procModelID + "&fileName=" + fileName;
    };
}
