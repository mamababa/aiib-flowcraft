import {Request, AkResponse} from "akmii-yeeoffice-common";
/** 我的申请 */
export class AdminMetadataAPI {
    /**获取分类列表(Root节点) */
    static async GetMetadataCategoryList(data?: AdminGetMetadataCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return new Request<AdminGetMetadataCategoryRequest,
            MetadataCategoryModelListResponse >().get(url, data);
    }
    /**新建分类列表(Root节点) */
    static async PostMetadataCategoryList(data?: MetadataCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return new Request<MetadataCategoryRequest,
            AkResponse>().post(url, data);
    }
    /**更新分类列表(Root节点) */
    static async PutMetadataCategoryList(data?: MetadataCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return new Request<MetadataCategoryRequest,
            AkResponse>().put(url, data);
    }
    /**删除分类 */
    static async PutMetadataCategoryDel(data?: MetadataCategoryEditStatusRequest ) {
        let url: string = "/api/admin/metadata/categories/editstatus";
        return new Request<MetadataCategoryEditStatusRequest ,
            AkResponse>().put(url, data);
    }
    /**获取参数管理列表 */
    static async getMetadataList(data?: AdminGetMetadataRequest) {
        let url: string = "/api/admin/metadata";
        return new Request<AdminGetMetadataRequest,
            MetadataModelListResponse >().get(url, data);
    }
    /**添加下级 */
    static async postMetadataList(data?: MetadataRequest) {
        let url: string = "/api/admin/metadata";
        return new Request<MetadataRequest,
            AkResponse>().post(url, data);
    }
    /**更新下级参数 */
    static async putMetadataList(data?: MetadataRequest) {
        let url: string = "/api/admin/metadata";
        return new Request<MetadataRequest,
            AkResponse>().put(url, data);
    }
    /**删除下级 */
    static async putMetadataDel(data?: MetadataEditStatusRequest) {
        let url: string = "/api/admin/metadata/editstatus";
        return new Request<MetadataEditStatusRequest,
            AkResponse>().put(url, data);
    }
    /**get all categories */
    static async getAllMetadataCategory(data?:GetAllCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return new Request<GetAllCategoryRequest,
            MetadataCategoryModelListResponse>().get(url, data);
    }
    /**根据parentcode查询子级*/
    static async getChildByParentcode(data?:GetChildByPrarentcode) {
        let url: string = "/api/admin/metadata/parentcode";
        return new Request<GetChildByPrarentcode,
            MetadataModelListResponse >().get(url, data);
    }
    /**编辑元数据状态 */
    static async putMetadataStatus(data?:MetadataEditStatusRequest ) {
        let url: string = "/api/admin/metadata/editstatus";
        return new Request<MetadataEditStatusRequest ,
            AkResponse>().put(url, data);
    }
    /**编辑分类状态 */
    static async putMetadataCategoryStatus(data?:MetadataCategoryEditStatusRequest  ) {
        let url: string = "/api/admin/metadata/categories/editstatus";
        return new Request<MetadataCategoryEditStatusRequest  ,
            AkResponse>().put(url, data);
    }
    
}

export enum CategoryStatus{
    All=-1,
    Disable=0,
    Enable=1
}