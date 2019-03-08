import {Request, AkResponse} from "akmii-yeeoffice-common";
export class JobPositionsAPI {
    /**获取列表 */
    static async getJobPositions(data?: GetJobPositionsRequest) {
        let url : string = "/api/admin/jobpositions";
        return new Request < GetJobPositionsRequest,
        JobPositionModelListResponse  > ().get(url, data);
    }
    /**新增 */
    static async postJobPositions(data?: JobPositionRequest ) {
        let url : string = "/api/admin/jobpositions";
        return new Request < JobPositionRequest ,
        AkResponse > ().post(url, data);
    }
    /**更新 */
    static async putJobPositions(data?: JobPositionRequest ) {
        let url : string = "/api/admin/jobpositions";
        return new Request < JobPositionRequest ,
        AkResponse > ().put(url, data);
    }
    /**删除 */
    static async deleteJobPositions(data?: DeleteJobPositionsRequest) {
        let url : string = "/api/admin/jobpositions";
        return new Request < DeleteJobPositionsRequest,
        AkResponse > ().del(url, data);
    }

    /**查看详情 */
    static async getJobPositionsDetail(data?: GetJobPositionsDetailRequest) {
        let url: string = "/api/admin/jobpositions/detail";
        return new Request < GetJobPositionsDetailRequest,
            JobPositionDetailResponse >().get(url, data);
    }
}
