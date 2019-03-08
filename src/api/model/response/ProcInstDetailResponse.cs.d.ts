interface ProcInstDetail extends BaseModel {
    /** ApplicationID */
    ApplicationID : string;
    /** 流程编号 */
    FlowNo : string;
    /** 流程名称 */
    FlowName : string;
    /** 类别 */
    CategoryID : string;
    /** 类别名称 */
    CategoryName : string;
    /** 状态 */
    Status : number;
    /** 版本 */
    Version : number;
    /** 定义资源ID */
    DefResourceID : string;
    /** 图片资源ID */
    ImgResourceID : string;
    StartTime : Date;
    /** 开始时间 */
    StartTimeStr : string;
    /** 创建人 */
    CreatedBy : string;
    /** 创建人名字 */
    CreatedByName : string;
    TaskList : TaskModelResponse[];
    VariableList : VariableModelResponse[];
}

interface ProcInstDetailResponse extends AkResponse {
    Data?: ProcInstDetail;
}
