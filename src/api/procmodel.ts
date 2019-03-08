import {Request, AkResponse,AppKeys,AkContext} from "akmii-yeeoffice-common";
interface GetAppRoleRequest {
    LoginToken: string;
}

interface GetAppRoleResponse extends AkResponse {
    ErrorMSG: string;
    TimeStamp: string;
    TipMSG: string;
    OperationState: boolean;
    State: number;
}
export class ProcModelAPI {
    static getAppAdmin() {
        let appID = AkContext.getAppInfoID(AppKeys.Flowcraft);
        let url =AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + `/appinforole/hasmodule/appinfoid?AppInfoID=${appID}`;
        return new Request<GetAppRoleRequest,GetAppRoleResponse>().get(url);
    }
    /***获取所有的申请 */
    static async getProcModel(data: GetProcModelRequest) {
        let url: string = "/api/admin/procmodels";
        return new Request<GetProcModelRequest,
            ProcDefModelListResponse>().get(url, data);
    }
    /**获取流程定义库详情 */
    static async getProcModelByID(data: GetProcModelByIDRequest) {
        let url: string = "/api/admin/procmodels/id";
        return new Request<GetProcModelByIDRequest,
            ProcDefModelResponse>().get(url, data);
    }

    /**添加流程 */
    static async postProcModel(data: ProcModelAddRequest) {
        let url: string = "/api/admin/procmodels";
        return new Request<ProcModelAddRequest,
            AkResponse>().post(url, data);
    }

    /**转存为流程定义*/
    static async postProcModelArchived(data: ProcModelArchivedRequest) {
        let url: string = "/api/admin/procmodels/save";
        return new Request<ProcModelArchivedRequest,
            AkResponse>().post(url, data);
    }

    /**导入模板新建流程 */
    static async addImportProcModel(data: ProcModelAddRequest) {
        let url: string = "/api/admin/procmodels/import";
        return new Request<ProcModelAddRequest,
            AkResponse>().post(url, data);
    }
    /**选择模板新建流程 */
    static async addSelectTemplateProcModel(data: ProcModelAddRequest) {
        let url: string = "/api/admin/processtemplate/import";
        return new Request<ProcModelAddRequest,AkResponse>().post(url, data);
    }
    /**流程复制 */
    static async copyProcModel(data: ProcModelCopyRequest) {
        let url: string = "/api/admin/procmodels/copy";
        return new Request<ProcModelCopyRequest,
            AkResponse>().post(url, data);
    }
    /**发布流程 */
    static async deployProcModel(data: ProcModelDeployRequest) {
        let url: string = "/api/admin/procmodels/deploy";
        return new Request<ProcModelDeployRequest,
            AkResponse>().put(url, data);
    }
    /**更新流程定义库 */
    static async putProcModel(data: ProcModelRequest) {
        let url: string = "/api/admin/procmodels/basicinfo";
        return new Request<ProcModelRequest,
            AkResponse>().put(url, data);
    }
    /**  更新流程定义 */
    static async putProcModelDef(data: ProcModelEditDefRequest) {
        let url: string = "/api/admin/procmodels/def";
        return new Request<ProcModelEditDefRequest,
            AkResponse>().put(url, data);
    }
    /**  验证key的唯一性 */
    static async keyValidate(data: ValidateKeyRequest) {
        let url: string = "/api/admin/procmodels/key/validate";
        return new Request<ValidateKeyRequest,
            AkResponse>().get(url, data);
    }

    /** 验证文件内容*/
    static async keyFile(data:ValidateFileRequest){
        let url: string = "/api/admin/processtemplate/Provefile";
        return new Request<ValidateFileRequest,
            AkResponse>().post(url, data);
    }

    /**  更新分类 */
    static async putCategory(data: ProcModelCategoryIDRequest) {
        let url: string = "/api/admin/procmodels/category";
        return new Request<ProcModelCategoryIDRequest,
            AkResponse>().put(url, data);
    }

    /**  更新流程权限 */
    static async putRight(data: PermissionModelRequest) {
        let url: string = "/api/admin/procmodels/permission";
        return new Request<PermissionModelRequest,
            AkResponse>().put(url, data);
    }

    /**
     * 获取流程图片上传URL
     * @param data
     */
    static getIcons(data: GetIconsUrlUploadRequest) {
        let url = "/api/icons/url/upload";
        return new Request<GetIconsUrlUploadRequest, GetIconsUrlUploadResposne>().get(url, data);
    }
     /**  导入流程定义 */
    static async putImportProcModelDef(data: ProcModelEditDefRequest) {
        let url: string = "/api/admin/procmodels/import";
        return new Request<ProcModelEditDefRequest,
            AkResponse>().put(url, data);
    }
}

