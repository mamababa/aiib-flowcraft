/**审批任务状态 */
const enum TaskType {
    /**处理中 */
    Activity = 1,
    /**已完成 */
    Complete = 2,
    /**拒绝 */
    Reject = 3
}

/**查询*/
const enum TaskStatus {
    /**All */
    Pending = 1,
    Complete = 2,
    OverTime = 3,
    Normal=4
}

const enum TaskStatusEnum
{
    /**  待办 */
    Pending = 1,
    /**  已完成 */
    Complete = 2,
    /**  待认领 */
    Candidate = 3
}

const enum TaskHandleEnum
{
    Approved = "同意",
    Rejected = "拒绝"
}

const enum TaskRuntimeOrderByEnum {
    /**默认*/
    Default = 0,
        /**流程编号*/
    FlowNoUp = 11,
        /**流程编号*/
    FlowNoDown = 12,
        /**创建时间*/
    CreatedUp = 61,
        /**创建时间*/
    CreatedDown = 62
}
interface GetTaskRequest extends AkRequest {
    type?: PageType;
    /**流程编号 */
    flowNo?: string;
    /**流程名称 */
    flowName?: string;
    /**申请人 */
    applicantID?: string;
    assigneeID?:string;
    startTimeStr?: string;
    endTimeStr?: string;
    pageIndex?: number;
    pageSize?: number;
    /**排序 */
    orderbyIndex?: TaskRuntimeOrderByEnum;
    isCompleted?:boolean;
}
const enum PageType {
    /**待办任务 */
    waittingTask =1,
    /**已办任务 */
    finishTask = 2,
    /**待办我的委托 */
    waittingDelegates = 3,
    /**已办我的委托 */
    finishDelegates =4,
}
interface PostTaskRequest extends AkRequest {}

interface PutTaskRequest extends AkRequest {}

interface DeleteTaskRequest extends AkRequest {}

interface GetAdminTaskRequest extends AkRequest {
    type?: string;//TaskStatus;
    status?: TaskType;
    flowNo?: string;
    flowName?: string;
    startTimeStr?: string;
    endTimeStr?: string;
    /**受让人，代理人 */
    assigneeID?: string;
    /**申请人ID */
    applicantID?: string;
    pageIndex?: number;
    pageSize?: number;
}

interface GetAdminTaskItemRequest extends AkRequest {
    /** 任务ID */
    TaskID : string;
}

/**获取待办任务数量 */
interface GetWaittingTaskCountRequest extends AkRequest {}

/**获取待认领任务的数量 */
interface GetReceiveTaskCountRequest extends AkRequest {}
/**
 * 获取对应的任务数量
 */
interface GetTaskCountRequest extends AkRequest {}

interface GetTaskCountResponse extends AkResponse {
    Data?: {
        PendingCount: number;
        CandidateCount: number;
    }
}
/**获取待审批内容 */
interface GetApproveInfoRequest extends AkRequest {
    taskID?: string;
    /**流程定义ID */
    procInstID?: string;
}

/**处理任务 同意、拒绝*/
interface PutTaskHandleRequest extends AkRequest {
    /**任务ID */
    TaskID?: string;
    /**审批结果 同意 拒绝 */
    Outcome?: "Approved" | "Rejected";
    /**评论意见 */
    Comment?: string;
    /**描述 */
    Description?: string;
    /**变量 */
    Variables?: Object;
}

/**任务转办 */
interface PutChangeTaskAssigneeRequest extends AkRequest {
    /**新处理人 */
    AssigneeID?: string;
    // /**转签人 */ OldAssigneeID?: string;
    /**任务ID */
    TaskID?: string;
}

/****管理员操作 督办及转办********** */
/**任务督办 */
interface AdminPutWarnTaskRequest extends AkRequest {
    /**任务ID */
    TaskID?: string;
}

/**批量任务转办 */
interface AdminPutChangeTaskAssigneeListRequest extends AkRequest {
    /**新处理人 */
    AssigneeID?: string;
    // /**转签人 */ OldAssigneeID?: string;
    /**任务ID */
    TaskIDs?: string[];
}

/**单个任务转办 */
interface AdminPutChangeTaskAssigneeRequest extends AkRequest {
    /**新处理人 */
    AssigneeID?: string;
    // /**转签人 */ OldAssigneeID?: string;
    /**任务ID */
    TaskID?: string;
}

/**批量任务督办 */
interface AdminPutWarnTaskListRequest extends AkRequest {
    /**任务ID */
    TaskIDs?: string[];
}

/****管理员操作 督办及转办********** */

/**申请人信息 */
interface ProposerInfo {
    /**部门 */
    Department?: string;
    /**职位 */
    Job?: string;
    /** 员工编号*/
    ProposerID?: string;
    /** 申请人*/
    ProposerName?: string;
    /** 汇报经理*/
    ReportManager?: string;
    /**提交日期 */
    SubmitDay?: string;
    /** 提交人*/
    Submitter?: string;
    /** 工作城市*/
    WorkCity?: string;
}

/**出差申请 获取申请人信息*/
interface GetProposerInfoRequest extends AkRequest {
    /**申请人ID */
    userId?: string
}

interface GetProjectListRequest extends AkRequest {}

/**领用任务*/
interface GetReceiveTaskRequest extends AkRequest {
    /**流程编号 */
    flowNo?: string;
    /**流程名称 */
    flowName?: string;
    /**申请人 */
    applicantID?: string;
    pageIndex?: number;
    pageSize?: number;
}

/**任务跳转*/
interface TransferTaskRequest extends AkRequest {
    applicationID?: string;
    type?: string;
    activityDefID?: string;
}
