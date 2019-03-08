/** 获取已部署流程详情 返回值 GET /api/procdefs/id */
interface GetProcDefByIDRequest extends AkRequest {
    procDefID?: string;
}
/** 获取表单定义 返回值 GET /api/procdefs/id */
interface GetFormDefByPageIDRequest extends AkRequest {
    pageID?: string;
}

interface GetFormDefByPrintIDRequest extends AkRequest {
    pageID?: string;
    urlPageID?: string;
}

/** 根据key获取所有版本号 GET /api/procdefs/versions/key */
interface GetProcdefVersionRequest extends AkRequest {
    key?:string;
}

/**根据key和version获取特定版本流程定义 */
interface GetProcdefByIdAndVersionRequest extends AkRequest {
    key?:string;
    version?:string;
}

/***根据key获取最新版本流程定义 */
interface GetProcdefBykeyRequest extends AkRequest {
    key?:string;
}


/**已部署流程 列表 */
interface GetProcDefsRequest extends AkRequest {
    categoryID?: string;
    flowName?: string;
    flowKey?: string;
    isItemPerm?: string;
    status?: string;
    pageIndex?: number;
    pageSize?: number;
}

/**启用已部署流程（状态） 列表 */
interface PutEnableStatusRequest extends AkRequest {
    ProcDefID?: string;
}

/**禁用已部署流程（状态） 列表 */
interface PutDisableStatusRequest extends AkRequest {
    ProcDefID?: string;
}

/*** 新建流程 */
interface GetAllApplicationsRequest extends AkRequest {
    categoryID?:string;
    flowName?:string;
    pageIndex?: number;
    pageSize?: number;
}

/***已部署流程详情 修改流程分类 */
interface PutEditCategoryRequest extends AkRequest {
    categoryID?:string;
    key?:string;
}

/**委托 获取流程名称列表*/
interface GetFlowListRequest extends AkRequest {
    categoryID?: string;
    flowName?:string;
}
/**委托 获取aiib流程名称列表*/
interface GetAiibFlowListRequest extends AkRequest {
    flowName?:string;
}
/** Report 获取流程定义摘要列表 只包含Key和Name*/
interface GetSelectProcdefsRequest extends AkRequest {
    categoryID?: string;
    flowName?:string;
}

/** Process 获取流程模板列表*/
interface GetProcessTemplateRequest extends AkRequest {
    pageSize?: number;
    pageIndex?: number;
    Title?: string;
    CategoryID?: string;
}

/** Process 获取流程模板详情*/
interface GetProcessTemplateDetailRequest extends AkRequest {
    TemplateID?: string;
}

interface ProCategoryModel extends BaseModel {
    CategoryID?: string;
    Name?:string;
}
