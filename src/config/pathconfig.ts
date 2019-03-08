/** 路径地址 */
export class PathConfig {
    static Home = "/";
    /** 超时任务*/
    static OverTimeTask = "/admin/task/overdue";
    /** 活动任务 */
    static ActivityTask = "/admin/task/active";
    /** 活动实例*/
    static ProcInst = "/admin/actinst";
    /** 已部署流程*/
    static ProcDef = "/admin/deployed";
    /** 流程定义*/
    static ProcModel = "/admin/model";
    /** 定义详情 */
    static ProcModelItem = "/admin/model/item";
    /**设计器 */
    static ProcModelDesigner = "/admin/model/designer";
    /** 流程分类*/
    static ProcCategory = "/admin/category";
    /** Meta数据 */
    static Meta = "/meta";
    /** 已部署流程详情*/
    static ProcDefItme = "/admin/deployed/item";
    /**流程实例详情*/
    static ProcInstItme = "/admin/inst/item";
    /**新建流程*/
    // static NewProcess = "/";
    /**任务中转页面*/
    static TaskTransfer = "/todo/transfer/:a/:c/:t";
    /**待办任务*/
    static WaitingTask = "/todo";
    /**流程审批*/
    static TaskApprove = "/approval";
    /**已办任务*/
    static FinishTask = "/completed";
    /**已办任务 详情*/
    static FinishTaskItem = "/completed/item";
    /**我的申请*/
    static Application = "/app";
    /**申请单*/
    static ApplyProcess = "/process/application";
    /**审批单*/
    static ApproveProcess = "/process/approve";
    /**领用任务 */
    static ReceiveTask = "/claim";
    /**角色管理 */
    static Role = "/positions";
    /**组织角色 */
    static OrganizationRole = "/org/positions";
    /**地点角色 */
    static LocationRole = "/location/positions";
    /**草稿 */
    static Darfts = "/draft";
    /**快速链接 */
    static QuickLinks = "/quicklink";
    /**普通用户快速链接 */
    static UserQuickLinks = "/user/quicklink";
    /**委托 */
    static Delegate = "/delegate";
    /**普通人员 流程中心 */
    static PersonalCenter = "/";
    static FormDisplay = "form";
    static FormDisplay1 = "form1";
    static PrintDisplay = "print";
    static PrintPreviewDisplay = "print-preview";

    /** 通用报表 */
    static GeneralReportPage = "/report/general";

    /** 报表首页 */
    static HomeReportPage = "/report/home";

    /** 内容列表 */
    static ContentLists = "/content-lists";
    static ContentListDetail = "/content-lists/detail/:listID";
    static ContentListCalendarDetail = "/content-lists/calendar/detail/:listID";
    static ContentListCraft = "/admin/content-lists/designer";
    static ContentListManage = "/admin/content-lists/manage/:listID";

    /**流程图展示 */
    static FlowChart = "/flow/display";

    /**admin 流程报表 */
    static AdminReport = "/report";

    /*预算管理*/
    static BudgetManage = "/budget";
    /*预算界面*/
    static BudgetLists = "/budget";
    /*预算详情*/
    static BudgetListsDetails = "/budget/details";

    /*假期管理*/
    static HoliDayManage = "/rule-setting";
    /*规则设置*/
    static RuleSettings = "/rule-setting";
    /*员工假期*/
    static EmployeeHoliDay = "/employee-holiday";
    /*假期详情*/
    static EmployeeHoliDayDetail = "/employee-holiday/detail";
    /*操作日志*/
    static EmployeeHoliDayOperationLog = "/employee-holiday/operation-log";
    /*假期查询*/
    static EmployeeHoliDayQuery = "/holiday-query";
    /*假期测试专用URL*/
    static RuleSettingsTest = "/rule-setting-test";

    /** 仪表盘*/
    static DashBoard = "/statistics";

    /**admin 流程设置*/
    static ProcessSetting = "/process/setting";

    /*流程绩效报表*/
    static Achievements = "/performance";
    /*绩效报表列表页*/
    static AchievementsHome = "/performance-home";
    /**部门绩效报表*/
    static Departments = "/department";

    /**admin 预算模版 */
    static BudgetTemplate = "/budget/template";

    /**法大大 内容列表 */
    static FaDaDaIndex = "/fadada/index";

    /**亚投行文档 */
    static AiibDocument = "/aiib-document";
    /**亚投行组 */
    static AiibGroup = "/aiib-group";
    /**亚投行报表 */
    static AiibReport = "/aiib-report";
    static ProjectReport = "/project-report";
    static ProposalReport = "/proposal-report";
    static ProposalDataBase = "/investment-program-data";
    /**亚投行元数据 */
    static AiibMetadata = "/aiib-metadata";
    /**亚投行打印 */
    static AiibPrint = '/aiib-print';
    static AiibMeetingMaterials = '/aiib-meeting-materials';
    static AiibMeetingMinutes = '/aiib-meeting-minutes';
    static AiibProjectMeetingMaterials = '/aiib-project-meeting-materials';
    static AiibProjectMeetingMinutes = '/aiib-project-meeting-minutes';
    static ProposalPage = "/proposal-page";
    static ProjectPage = "/project-page";
    // static ProjectScreeningSheet = "/aii-print";

    static ProposalPool = "/proposal/pool";
    static MyProposal = "/my/proposal";
    static NewProposal = "/new/proposal";
    static UnsubmittedProposal = "/unsubmitted/proposal";
    static PendingScrCom = "/pending/scrcom";
    static ScrComApproved = "/scrcom/approved";
    // static ExComApproved = "/exCom/approved";
    static PendingSecret = "/pending/secret";
    static PendingDgReview = "/pending/dgreview";
    static PendingManagerReview = "/pending/managerreview";
    static AllProposal = "/all/proposal";

    static ProjectPool = "/project/pool";
    static MyProject = "/my/project";
    static NewProject = "/new/project";
    static AllProject = "/all/project";
    static AppraisalStage = "/appraisal/stage";
    static ApprovedProject = "/approved/project";
    static BoardApprovalStage = "/board/approval/stage";
    static ConceptStage = "/concept/stage";
    static NegotiationStage = "/negotiation/stage";

    static AppPage = "/aiib-app";

    /** 开发页面------生产需删除*/
    static DemoPage = "/demo";


}
