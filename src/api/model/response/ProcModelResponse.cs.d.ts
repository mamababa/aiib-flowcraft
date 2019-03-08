interface ProcModel extends BaseModel {
    /** ProcModel id */
    ID : string;
    /** ProcModel 名字 */
    Name : string;
    /** ProcModel 类别 */
    CategoryID : string;
    /** 描述 */
    Description : string;
    /** Key */
    Key : string;
    /** 本地化 */
    Localization : string;
    FormUrl : string;
    IconUrl : string;
    /** 创建时间 */
    CreatedStr : string;
    /** 创建人 */
    CreatedBy : string;
}

interface ProcModelResponse extends AkResponse {
    Data?: ProcModel;
}
