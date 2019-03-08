interface TaskDelegateModel extends BaseModel {
    /** UserID */
    UserID ?: string;
    /** ProcdefKey 0：表示所有流程定义都满足 */
    ProcdefKey ?: string[];
    /**流程名称*/
    ProcDefName?:string;
    /** DelegateID */
    DelegateID ?: string;
    /**委托人*/
    DelegateName?:string;
    /** Status */
    Status ?: boolean;
    /** StartDate */
    StartDate ?: Date;
    /** StartDate */
    StartDateStr ?: string;
    /** EndDate */
    EndDate ?: Date;
    /** EndDate */
    EndDateStr ?: string;
    /** Comment */
    Comment ?: string;
}
interface OwnerTaskModel  extends BaseModel {
    /** TaskID */
    TaskID?: string;
    /** 流程实例ID */
    ProcInstID?: string;
    /** 流程定义ID */
    ProcDefID?: string;
    /** 流程名称 */
    ProcDefName?: string;
    /** 流程编号 */
    FlowNo?: string;
    /** 类别ID */
    CategoryID?: string;
    /** 类别名称 */
    CategoryName?: string;
    /** 执行ID */
    ExecutionID?: string;
    /** 任务对应的ActivityID */
    ActivityID?: string;
    /** Name */
    Name?: string;
    /** ParentTaskID */
    ParentTaskID?: string;
    /** Description */
    Description?: string;
    /** OwnerID */
    OwnerID?: string;
    /** 任务的分配对象 */
    AssigneeID?: string;
    /** 分配人名字 */
    AssigneeName?: string;
    /** 分配人头像 */
    AssigneePhoto?: string;
    /** 任务的代理人 */
    DelegateID?: string;
    /** 代理人名字 */
    DelegateName?: string;
    /** 代理人头像 */
    DelegatePhoto?: string;
    /** 优先级 */
    Priority?: number;
    /** StartTime */
    StartTime?: Date;
    /** on update CURRENT_TIMESTAMP(3) */
    StartTimeStr?: string;
    /** ClaimTime */
    ClaimTime?: Date;
    /** ClaimTime */
    ClaimTimeStr?: string;
    /** EndTime */
    EndTime?: Date;
    /** EndTime */
    EndTimeStr?: string;
    /** Duration */
    Duration?: string;
    /** DueDate */
    DueDate?: Date;
    /** DueDate */
    DueDateStr?: string;
    /** DeleteReason */
    DeleteReason?: string;
    /** Outcome */
    Outcome?: string;
    /**是否允许加签 */
    IsAllowSign?: string;
    /** Comment */
    Comment?: string;
    /** TaskURL */
    TaskURL?: string;
    /** 是否存储表单数据 */
    IsSaveFormData?: boolean;
    /** FormDataID */
    FormDataID?: string;
    CallProcInstID?: string;
    /** Ext */
    Ext?: string;
    /** 状态 = ['1', '2', '3']integerEnum:1, 2, 3,*/
    Status?: any;
    Child?: [TaskModel];
    /** 召回ID */
    RecalledID?: string;
    BeRecalledID?: string;
    /**任务类型 */
    Flags?: number;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
}
interface TaskDelegateModelResponse extends AkResponse {
    Data?: TaskDelegateModel;
}

interface TaskDelegateModelListResponse extends AkResponse {
    Data?: TaskDelegateModel[];
}
/**获取我的委托列表 */
interface GetDelegateListResponse extends AkResponse{
    Data?:OwnerTaskModel[];
}
