interface GetProcModelByCategoryRequest extends AkRequest {
}


interface GetProcModelByIDRequest extends AkRequest {
    procModelID?: string;
}

interface GetProcModelRequest extends AkRequest {
    pageSize?: number;
    pageIndex?: number;
    categoryID?: string;
    status?: string;
    name?: string;
    key?: string;
}

/*** 添加流程模型*/
interface PostProcModelRequest extends AkRequest {
    ProcModelID?: string;
    Name?: string;
    CategoryID?: string;
    Description?: string;
    Key?: string;
    Localization?: string;
    FormUrl?: string;
    IconUrl?: string;
}

/** 流程复制 */
interface CopyProcModelRequest extends AkRequest {
    Key?: string;
    Name?: string;
    ProcModelID?: string;
}

/**更新流程定义 */
interface PutProcModelRequest extends AkRequest {
    /**定义ID */
    ProcModelID?: string;
    Name?: string;
    CategoryID?: string;
    Description?: string;
    Key?: string;
    Localization?: string;
    FormUrl?: string;
    IconUrl?: string;
}

interface DeployProcModelRequest extends AkRequest {
    ProcModelID?: string;
}

interface PutProcModelBasicRequest extends AkRequest {
}

/** 更新Category */
interface PutProcModelCategoryRequest extends AkRequest {
}

/** 更新Icon */
interface PutProcModelIconRequest extends AkRequest {
}


/** 更新Def */
interface PutProcModelDefRequest extends AkRequest {
    DefBlob?: string;
    ImgBlob?: string;
    Name?: string;
    ProcModelID?: string;
    ImgResourceID?: string;
    DefResourceID?: string;
}

interface DeleteProcModelRequest extends AkRequest {
}

interface GetIconsUrlUploadRequest extends AkRequest {
}
interface IconsUploadModel extends AkBase {
    Url: string;
    DownloadUrl: string;
}
interface GetIconsUrlUploadResposne extends AkResponse {
    Data?: IconsUploadModel;
}


/**流程模板-Model*/
interface ProTemplateModel extends BaseModel {
    TemplateID: string;
    CategoryID: string;
    Title: string;
    Key:string;
    Name:string;
    Description: string;
    IconURL: string;
    Resoucre: string;
    Name: string;
    IsUsed: number;
    ImgResource:string;
}

/**Process BaseModel*/
interface ProcessBaseModel extends BaseModel {
    /** ProcModel id */
    ProcModelID?: string;
    /** ProcModel 名字 */
    Name ?: string;
    /** ProcModel 类别 */
    CategoryID ?: string;
    /** 描述 */
    Description ?: string;
    /** Key */
    Key ?: string;
    /** 本地化 */
    Localization ?: string;
    /** 流程入口url */
    FormUrl ?: string;
    /** 流程定义iconurl */
    IconUrl ?: string;
    /** 是否设置权限 */
    IsItemPerm ?: boolean;
    /** 权限列表 {1:[12,3,4],2:[3,4,5],3:[4,56,8]} */
    PermTypeIDs ?: {
        [index: string]: any
    };
    /**导入模板新建流程时需要的流程资源*/
    Resource?: string;
    /**选择模板新建流程是需要的模板ID*/
    TemplateID?: string;
    /** 流程图Icon*/
    ImgResource?: string;
}

/** 导出的Json*/
interface ProcessImportFileModel extends BaseModel {
    /** ProcModel 名字 */
    FlowName ?: string;
    /** 描述 */
    Description ?: string;
    /** Key */
    FlowKey ?: string;
    /** 流程定义iconurl */
    Icon ?: string;
    /** 流程图Icon*/
    Img?: string;
    /**导入模板新建流程时需要的流程资源*/
    Def?: string;
}
