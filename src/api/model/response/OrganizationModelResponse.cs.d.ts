interface OrganizationModel extends BaseModel {
    /** 扩展1 */
    Extends1 : string;
    /** 扩展2 */
    Extends2 : string;
    /** 扩展3 */
    Extends3 : string;
    /** 地址 */
    Address : string;
    /** Cost Center */
    CostCenter : string;
    /** PK */
    ID : string;
    /** 经理 */
    Manager : string;
    /** 中文名称 */
    Name_CN : string;
    /** 英文名称 */
    Name_EN : string;
    Num : string;
    /** 上级 */
    ParentID : string;
    /** 路径 */
    Path : string;
    /** Phone */
    Phone : string;
    /** 类型 */
    Type : string;
    /** 状态 */
    State : number;
}

interface OrganizationModelResponse extends AkResponse {
    Data?: OrganizationModel;
}
