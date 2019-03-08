
/**管理员获取category列表**/
interface AdminGetMetadataCategoryRequest extends AkRequest {
    status?: number;
    pageIndex?: string;
    pageSize?: string;
}

/**新建分类 */
interface PostMetadataCategoryRequest extends AkRequest {
    Code?: string;
    Name?: string;
    Description?: string;
    Localization?: string;
    Ext?: string;
    Status?: boolean;
}

/**修改分类 */
interface PutMetadataCategoryRequest extends AkRequest {
    Code?: string;
    Name?: string;
    Ext?: string;
    Order?: number;
    Description?: string;
}

/**删除分类 */
interface PutMetadataCategoryDelRequest extends AkRequest {
    CategoryID?: string;
    Status?: boolean;
}

/**参数管理列表 */
/**获取metadata**/
interface GetMetadataRequest extends AkRequest {
    categoryID : string;
    parentID?: string;
}

interface AdminGetMetadataRequest extends AkRequest {
    status : number;
    categoryID : string;
    parentID : string;
}

interface PostMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Name?: string;
    Order?: number;
    ParentID?: string;
    Status?: number;
    Mapping?: string;
    Localization?: string
}
/**更新 */
interface PutMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    ParentID?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
    Order?: number;
    Status?: number;
}
/**删除 */
interface PutMetadataDelRequest extends AkRequest {
    CategoryID?: string;
    ID?: string;
    Status?: boolean;
}

/**新增参数 */
interface AddMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    ParentID?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
    Order?: number;
    Status?: number;
}

/**编辑 */
interface EditMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    ParentID?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
    Order?: number;
    Status?: number;
}

/**参数管理列表 */
interface DeleteMetadataRequest extends AkRequest {
    CategoryID?: string;
    ID?: string;
    Status?: boolean;
}

/**获取所有分类 */
interface GetAllCategoryRequest extends AkRequest {
    status?: string;
}

/**根据parentcode查询子级 */
interface GetChildByPrarentcode extends AkRequest {
    categoryCode?: string;
    parentCode?: string;
    status?: string;
}
