const enum BindingType {
    JobPosition = 1,
    Dept = 2,
    Location = 3
}

/**添加或更新时 Request参数 */
interface JobPositionParam extends AkBase {
    ID?: string,
    Name?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    UserIDs?: string[],
    BindingType?: BindingType;
    BindingTargetID?: string;
}


interface GetJobPositionsRequest extends AkRequest {
    bindingType?: BindingType;
    bindingTargetID?: string;
}

/***删除 */
interface DeleteJobPositionsRequest extends AkRequest {
    jobPositionID?: string;
    bindingType?:BindingType;
    bindingTargetID?:string;
}

/***新增 */
interface PostJobPositionsRequest extends AkRequest {
    ID?: string,
    Name?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    UserIDs?: string[],
    BindingType?: BindingType;
    BindingTargetID?: string;
}

/***更新 */
interface PutJobPositionsRequest extends AkRequest {
    ID?: string,
    Name?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    UserIDs?: string[],
    BindingType?: BindingType;
    BindingTargetID?: string;
}

/***查看岗位详情 */
interface GetJobPositionsDetailRequest extends AkRequest {
    jobPositionID?: string
}
