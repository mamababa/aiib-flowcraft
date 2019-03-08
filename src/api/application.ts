import { Request } from "akmii-yeeoffice-common";
export class ApplicationAPI {
    /**
     * 根据APPID查询流程详情
     * @param data APPID
     */
    static getApplicationByIDV2(data: GetApplicationByIDRequest) {
        let url = "/api/applications/detail/v2";
        return new Request<GetApplicationByIDRequest,
            GetApplicationByIDResponse>().get(url, data);
    }
    /**
     *查找流程日志
     * @param data APPID
     */
    static getProcessLog(data: GetProcessByAppRequest) {
        let url = "/api/applications/processlog";
        return new Request<GetProcessByAppRequest,
            GetProcessByAppResponse>().get(url, data);
    }

    static getNodeTasksByApp(data: GetNodeTasksByAppRequest) {
        let url = "/api/applications/flownodetasks";
        return new Request<GetNodeTasksByAppRequest, GetNodeTasksByAppResponse>().get(url, data);
    }

    static getApplicationByFlowNo(data: GetApplicationByFlowNoRequest) {
        let url = "/api/applications/code";
        return new Request<GetApplicationByFlowNoRequest, GetApplicationByFlowNoResponse>().get(url, data);
    }
}
