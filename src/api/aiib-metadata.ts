import { Request, AkResponse, AkContext, AppKeys, GetMetadataModelRequest, GetMetadataResponse } from 'akmii-yeeoffice-common';
/** 我的申请 */
export class AdminMetadataAPI {
    /**获取分类列表(Root节点) */
    static async GetMetadataCategoryList(data?: AdminGetMetadataCategoryRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/categories";
        return new Request<AdminGetMetadataCategoryRequest,
            MetadataCategoryModelListResponse>().get(url, data);
    }
    /**新建分类列表(Root节点) */
    static async PostMetadataCategoryList(data?: MetadataCategoryRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/categories";
        return new Request<MetadataCategoryRequest,
            AkResponse>().post(url, data);
    }
    /**更新分类列表(Root节点) */
    static async PutMetadataCategoryList(data?: MetadataCategoryRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/categories";
        return new Request<MetadataCategoryRequest,
            AkResponse>().put(url, data);
    }
    /**删除分类 */
    static async PutMetadataCategoryDel(data?: MetadataCategoryEditStatusRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/categories/editstatus";
        return new Request<MetadataCategoryEditStatusRequest,
            AkResponse>().put(url, data);
    }
    /**获取参数管理列表 */
    static async getMetadataList(data?: AdminGetMetadataRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata";
        return new Request<AdminGetMetadataRequest,
            MetadataModelListResponse>().get(url, data);
    }
    /**添加下级 */
    static async postMetadataList(data?: MetadataRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata";
        return new Request<MetadataRequest,
            AkResponse>().post(url, data);
    }
    /**更新下级参数 */
    static async putMetadataList(data?: MetadataRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata";
        return new Request<MetadataRequest,
            AkResponse>().put(url, data);
    }
    /**删除下级 */
    static async putMetadataDel(data?: MetadataEditStatusRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/editstatus";
        return new Request<MetadataEditStatusRequest,
            AkResponse>().put(url, data);
    }
    /**get all categories */
    static async getAllMetadataCategory(data?: GetAllCategoryRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/categories";
        return new Request<GetAllCategoryRequest,
            MetadataCategoryModelListResponse>().get(url, data);
    }
    /**根据parentcode查询子级*/
    static async getChildByParentcode(data?: GetChildByPrarentcode) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/parentcode";
        return new Request<GetChildByPrarentcode,
            MetadataModelListResponse>().get(url, data);
    }
    /**编辑元数据状态 */
    static async putMetadataStatus(data?: MetadataEditStatusRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/editstatus";
        return new Request<MetadataEditStatusRequest,
            AkResponse>().put(url, data);
    }
    /**编辑分类状态 */
    static async putMetadataCategoryStatus(data?: MetadataCategoryEditStatusRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/admin/metadata/categories/editstatus";
        return new Request<MetadataCategoryEditStatusRequest,
            AkResponse>().put(url, data);
    }
    static async postImportMetadata(data: ImportMetadataRequest, file: FormData) {
        data.AppID = data.AppID || AkContext.getAppInfoID();
        const url = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + `/api/crafts/datas/import?AppID=${data.AppID}&ListID=${data.ListID}&uniqueKeyName=${data.uniqueKeyName}`;
        return new Request<ImportMetadataRequest, AkResponse>().send(url, file);
    }

    /**获取分类列表(Root节点) */
    static async GetMetadataCategorys() {
        let url: string = "/api/metadata/categories";
        return new Request<AdminGetMetadataCategoryRequest,
            MetadataCategoryModelListResponse>().get(url);
    }

        /**
     * 根据parentcode查询子级
     */
    static getByCode(request: GetMetadataModelRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/metadata/parentcode";
        return new Request<GetMetadataModelRequest,
            GetMetadataResponse>().get(url, request, []);
    }

}
