interface MenuModel extends BaseModel {
    /** 说明 */
    Comment : string;
    /** Icon */
    IconImg : string;
    /** PK */
    ID : string;
    /** 权限 */
    IsItemPerm : boolean;
    /** Url */
    LinkUrl : string;
    /** 多语言 */
    Localization : string;
    /** 名字 */
    Name : string;
    /** 上级 */
    ParentID : string;
    /** /// 权限列表 {1:[12,3,4],2:[3,4,5],3:[4,56,8]}/// */
    PermTypeIDs : any[];
    Status: string ;
    OrderNum: number;
    /** 页面打开方式 当前页面、新页面 */
    Ext1: string;
    Ext2: string;
    Ext3: string;
}

interface MenuModelResponse extends AkResponse {
    Data?: MenuModel;
}

interface MenuModelListResponse extends AkResponse {
    Data?: MenuModel[];
}
