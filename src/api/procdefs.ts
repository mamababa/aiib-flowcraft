import { Request, AkResponse } from "akmii-yeeoffice-common";
export class ProcDefsAPI {
    /**获取已部署流程列表 */
    static async getProcDefs(data?: GetProcDefsRequest) {
        let url: string = "/api/admin/procdefs";
        return new Request<GetProcDefsRequest,
            ProcDefModelListResponse>().get(url, data);
    }
    /**启用流程定义 */
    static async putEnableStatus(data?: ProcDefPutRequest) {
        let url: string = "/api/admin/procdefs/enable";
        return new Request<ProcDefPutRequest,
            AkResponse>().put(url, data);
    }
    /**禁用流程定义 */
    static async putDisableStatus(data?: ProcDefPutRequest) {
        let url: string = "/api/admin/procdefs/disable";
        return new Request<ProcDefPutRequest,
            AkResponse>().put(url, data);
    }

    /**根据ID获取流程定义 */
    static async getProcDefsById(data?: GetProcDefByIDRequest) {
        let url: string = "/api/admin/procdefs/id";
        return new Request<GetProcDefByIDRequest,
            ProcDefModelResponse>().get(url, data);
    }
    /**根据PageID获取表单定义 */
    static async getFormDefByPageID(data?: GetFormDefByPageIDRequest) {
        let url: string = "/api/procdefs/designertext";
        return new Request<GetFormDefByPageIDRequest,
            FormDefModelResponse>().get(url, data);
    }
    /**根据PageID获取表单定义 */
    static async getFormDefByPrintID(data?: GetFormDefByPrintIDRequest) {
        let url: string = "/api/procdefs/printtext";
        return new Request<GetFormDefByPageIDRequest,
            FormDefModelResponse>().get(url, data);
    }
    /**根据key获取所有版本号 */
    static async getAllVersionByKey(data?: GetProcdefVersionRequest) {
        let url: string = "/api/admin/procdefs/versions/key";
        return new Request<GetProcdefVersionRequest,
            AkResponse>().get(url, data);
    }
    /**根据key和version获取特定版本流程定义 */
    static async getProcDefsByKeyAndVersion(data?: GetProcdefByIdAndVersionRequest) {
        let url: string = "/api/admin/procdefs/version";
        return new Request<GetProcdefByIdAndVersionRequest,
            ProcDefModelResponse>().get(url, data);
    }

    /**根据key获取最新版本流程定义*/
    static async adminGetProcDefsByKey(data?: GetProcdefBykeyRequest) {
        let url: string = "/api/admin/procdefs/key";
        return new Request<GetProcdefBykeyRequest,
            ProcDefModelResponse>().get(url, data);
    }

    /**
     * 普通用户使用的版本，根据key获取最新的版本流程定义
     * @param data
     */
    static async getProcDefsByKey(data?: GetProcdefBykeyRequest) {
        let url: string = "/api/procdefs/key";
        return new Request<GetProcdefBykeyRequest,
            ProcDefModelResponse>().get(url, data);
    }


    /**获取用户持有的流程定义 */
    static async getAllApplication(data: GetAllApplicationsRequest) {
        let url: string = "/api/procdefs";
        return new Request<GetAllApplicationsRequest,
            ProcDefModelListResponse>().get(url, data);
    }

    /**已部署流程详情 修改流程分类 */
    static async putEditCategory(data?: ProcDefEditCategoryRequest) {
        let url: string = "/api/admin/procdefs/category";
        return new Request<ProcDefEditCategoryRequest,
            AkResponse>().put(url, data);
    }

    /**委托 获取流程名称列表*/
    static async getFlowList(data?: GetFlowListRequest) {
        let url: string = "/api/procdefs/brief";
        return new Request<GetFlowListRequest,
            ProcDefBriefListResponse>().get(url, data);
    }
    /**委托 aiib获取流程名称列表*/
    static async getAiibFlowList(data?: GetAiibFlowListRequest) {
        let url: string = "api/procdefs/flowdelegates";
        return new Request<GetAiibFlowListRequest,  ProcDefDelegateResponse>().get(url, data);
    }
    /**admin report 获取流程定义摘要列表 只包含Key和Name*/
    static async getSelectProcdefs(data?: GetSelectProcdefsRequest) {
        let url: string = "/api/admin/procdefs/brief";
        return new Request<GetSelectProcdefsRequest,
            ProcDefBriefListResponse>().get(url, data);
    }

    /**获取模板库列表 */
    static async getAllProcessTemplate(data: GetProcessTemplateRequest) {
        let url: string = "/api/admin/processtemplate";
        return new Request<GetProcessTemplateRequest, AkResponse>().get(url, data);
    }

    /**获取模板库列表 */
    static async getProcessTemplateType() {
        let url: string = "/api/admin/processtemplate/category";
        return new Request<AkRequest, AkResponse>().get(url, null);
    }

    /**获取模板库列表 */
    static async getProcessTemplateDetail(data: GetProcessTemplateDetailRequest) {
        let url: string = "/api/admin/processtemplate/Detail";
        return new Request<GetProcessTemplateDetailRequest, AkResponse>().get(url, data);
    }
}

export let ProcDefStatusLocale = "model.procdefs.status.";
export enum ProcDefStatusEnum {
    Disbale = 2,
    Enable = 1
}
