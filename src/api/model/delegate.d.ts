/** 删除委托*/
interface DeleteDelegateRequest extends AkRequest {
    key?: string;
}

/**批量 删除委托*/
interface DeleteDelegateBatchRequest extends AkRequest {
    keys?: string[];
}

/** 获取委托列表*/
interface GetDelegateListRequest extends AkRequest {
    key?: string;
    status?:string;
    pageIndex?:number;
    pageSize?:number;
}
/** 获取我的委托列表*/
interface getOwnerDelegateListRequest extends AkRequest{
    flowNo?:string;
    flowName?:string;
    assigneeID?:string;
    pageIndex?:number;
    pageSize?:number;
    /**排序 */
    orderbyIndex?: TaskRuntimeOrderByEnum;
    isCompleted:boolean;
    context?:string;
}
/** 验证改流程key是否已被使用过*/
interface ValidateKeyCanUseRequest extends AkRequest {
    key?: string;
}

