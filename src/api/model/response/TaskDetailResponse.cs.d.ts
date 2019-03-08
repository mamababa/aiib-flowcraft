interface TaskDetail extends BaseModel {
    /** 流程编号 */
    FlowNo: string;
    /** 状态 */
    AppStatus: number;
    /** 创建人 */
    CreatedBy: string;
    /** 创建人名称 */
    CreatedByName: string;
    ApplyDate: Date;
    /** 申请日期 */
    ApplyDateStr: string;
    /** 申请人 */
    ApplicantID: string;
    /** 申请人名字 */
    ApplicantName: string;
    /** 员工编号 */
    EmployeeNo: string;
    /** 职称 */
    JobTitle: string;
    /** 地点 */
    LocationID: string;
    /** 地点名称 */
    LocationName: string;
    /** 直接领导 */
    LineManagerID: string;
    /** 直接领导名称 */
    LineManagerName: string;
    /** 组织 */
    OrgID: string;
    /** 组织名称 */
    OrgName: string;
    /** 变量 */
    Variables: {
        [index: string]: string
    };
    /** 流程日志 */
    ProcessLogList: ProcessLogResponse[];
}

interface TaskDetailResponse extends AkResponse {
    Data?: TaskDetail;
}

interface ApplicantInfo {
    ApplicantID?: string;
    ApplicantName?: string;
    EmployeeNo?: string;
    JobTitle?: string;
    LocationID?: string;
    LocationName?: string;
    LineManagerID?: string;
    LineManagerName?: any;
    OrgID?: string;
    OrgName?: string;
    CreatedByName?: string;
}

interface ApplicationInfo {
    ApplicationID: string;
    CurrentProcInstID: string;
    HistoryProcInstIDs?: any;
    ApplicantID: string;
    Status: number;
    FlowNo: string;
    DefKey: string;
    FormUrl?: any;
    FlowName?: any;
    CategoryID?: any;
    CategoryName?: any;
    CreatedByName?: any;
    Version: number;
    Comment?: any;
    TenantID: string;
    CreatedStr: string;
    CreatedBy: string;
    ModifiedStr: string;
    ModifiedBy: string;
}

interface ProcInstInfo {
    ProcInstID: string;
    Name: string;
    ParentInstID: string;
    ProcDefID: string;
    Version: number;
    CategoryID?: any;
    CategoryName?: any;
    StartTimeStr: string;
    EndTimeStr: string;
    DURATION: string;
    StartUserID: string;
    StartActID: string;
    EndActID: string;
    Status: number;
    Comment?: any;
    TenantID: string;
    CreatedStr: string;
    CreatedBy: string;
    ModifiedStr: string;
    ModifiedBy: string;
}

interface TaskInfo {
    TaskID: string;
    ProcInstID: string;
    ProcDefID: string;
    ProcDefName?: any;
    FlowNo: string;
    CategoryID?: any;
    CategoryName?: any;
    ExecutionID: string;
    ActivityID: string;
    Name: string;
    ParentTaskID: string;
    Description?: any;
    OwnerID: string;
    AssigneeID: string;
    AssigneeName?: any;
    AssigneePhoto?: any;
    DelegateID: string;
    DelegateName?: any;
    DelegatePhoto?: any;
    Priority: number;
    StartTimeStr: string;
    ClaimTimeStr: string;
    EndTimeStr: string;
    Duration: string;
    DueDateStr: string;
    DeleteReason?: any;
    Outcome?: any;
    IsAllowSign: boolean;
    Comment?: any;
    TaskURL: string;
    IsSaveFormData: boolean;
    FormDataID: string;
    CallProcInstID: string;
    Child: [any];
    Flags:number;
    RecalledID:string;
    BeRecalledID:number;
    Ext: string;
    CreatedByName?: any;
    Status: number;
    TenantID: string;
    CreatedStr: string;
    CreatedBy: string;
    ModifiedStr: string;
    ModifiedBy: string;
}

interface TaskDetailV2Info {
    ApplicantInfo?: ApplicantInfo;
    Variables?: any;
    ApplicationInfo?: ApplicationInfo;
    ProcInstInfo?: ProcInstInfo;
    TaskInfo?: TaskInfo;
    NodeTask?: any;
    NodeTasks?: any;
}

interface TaskDetailV2Response extends AkResponse {
    Data?: TaskDetailV2Info;
}
