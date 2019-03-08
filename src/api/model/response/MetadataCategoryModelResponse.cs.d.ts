interface MetadataCategoryModel extends BaseModel {
    /** 类别 */
    CategoryID : string;
    /** 编号 */
    Code : string;
    /** 描述 */
    Description : string;
    /** 扩展 */
    Ext : string;
    /** 多语言 */
    Localization : string;
    /** 名字 */
    Name : string;
    /** 状态 */
    Status : number;
    HasChild?:boolean;
}

interface MetadataCategoryModelResponse extends AkResponse {
    Data?: MetadataCategoryModel;
}

interface MetadataCategoryModelListResponse extends AkResponse {
    Data?: MetadataCategoryModel[];
}
