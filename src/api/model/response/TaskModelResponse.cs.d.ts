interface TaskModel extends BaseModel {
    /** TaskID */
    TaskID : string;
    /** 流程实例ID */
    ProcInstID : string;
    /** 流程定义ID */
    ProcDefID : string;
    /** 流程名称 */
    ProcDefName : string;
    /** 流程编号 */
    FlowNo : string;
    /** 类别ID */
    CategoryID : string;
    /** 类别名称 */
    CategoryName : string;
    /** 执行ID */
    ExecutionID : string;
    /** 任务对应的ActivityID */
    ActivityID : string;
    /** Name */
    Name : string;
    /** ParentTaskID */
    ParentTaskID : string;
    /** Description */
    Description : string;
    /** OwnerID */
    OwnerID : string;
    /** 任务的分配对象 */
    AssigneeID : string;
    /** 分配人名字 */
    AssigneeName : string;
    /** 分配人头像 */
    AssigneePhoto : string;
    /** 任务的代理人 */
    DelegateID : string;
    /** 代理人名字 */
    DelegateName : string;
    /** 代理人头像 */
    DelegatePhoto : string;
    /** 优先级 */
    Priority : number;
    /** StartTime */
    StartTime : Date;
    /** on update CURRENT_TIMESTAMP(3) */
    StartTimeStr : string;
    /** ClaimTime */
    ClaimTime : Date;
    /** ClaimTime */
    ClaimTimeStr : string;
    /** EndTime */
    EndTime : Date;
    /** EndTime */
    EndTimeStr : string;
    /** Duration */
    Duration : string;
    /** DueDate */
    DueDate : Date;
    /** DueDate */
    DueDateStr : string;
    /** DeleteReason */
    DeleteReason : string;
    /** Outcome */
    Outcome : string;
    /** Comment */
    Comment : string;
    /** TaskURL */
    TaskURL : string;
    /** 是否存储表单数据 */
    IsSaveFormData : boolean;
    /** FormDataID */
    FormDataID : string;
    /** Ext */
    Ext : string;
    /** 状态 */
    Status : any;
    Child:[];
    /** 召回ID */
    RecalledID?:string;
    BeRecalledID?:string;
    Flags?:number;
}

interface TaskModelResponse extends AkResponse {
    Data?: TaskModel;
}

interface TaskModelListResponse extends AkResponse {
    Data?: TaskModel[];
}
