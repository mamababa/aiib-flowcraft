interface MetadataModel extends BaseModel {
    /** 类别 */
    CategoryID? : string;
    /** 编号 */
    Code ?: string;
    /** 描述 */
    Description ?: string;
    /** 扩展 */
    Ext ?: string;
    /** PK */
    ID ?: string;
    /** 级别 */
    Level ?: number;
    /** 多语言 */
    Localization ?: string;
    /** mapping */
    Mapping ?: string;
    /** 名字 */
    Name ?: string;
    /** 顺序 */
    Order ?: string;
    /** 上级 */
    ParentID ?: string;
    /** 状态 */
    Status ?: number;

    HasChild?:boolean;
}

interface MetadataModelResponse extends AkResponse {
    Data?: MetadataModel;
}

interface MetadataModelListResponse extends AkResponse {
    Data?: MetadataModel[];
}
