import {DelegatesAPI} from '../api/delegate';
/** 导航Key */
export class NavigatorKey {
    /** 流程管理 */
    static ProcessRoot = "navigator.key.process.root";
    /**超时任务 */
    static OverTimeTask = "navigator.key.process.overtimetask";
    /** 活动任务 */
    static ActivityTask = "navigator.key.process.activitytask";
    /** 活动实例 */
    static ProcActivityInst = "navigator.key.process.activityinst";
    /** 已部署流程 */
    static ProcDef = "navigator.key.process.def";
    /** 流程定义 */
    static ProcModel = "navigator.key.process.model";
    /** 流程分类 */
    static ProcCategory = "navigator.key.process.category";
    /** 角色管理 */
    static PositionRoot = "navigator.key.positions.root";
    /** 项目管理 */
    static ProjRoot = "navigator.key.proj.root";
    /** 参数管理 */
    static ParamRoot = "navigator.key.param.root";
    /** 快速链接 */
    static QuickLinks = "navigator.key.param.quick.links";
    /** 普通用户快速链接 */
    static UserQuickLinks = "navigator.key.param.user.quick.links";
    /** 已部署流程 */
    static ProcDefItem = "navigator.key.process.defitem";
    /** 流程实例详情 */
    static ProcInstItem = "navigator.key.process.inst.item";
    /** 流程报表 */
    static AdminReport = "navigator.key.admin.report";
    static DashBoard = "navigator.key.admin.dashboard";
    /** 内容列表 */
    static AdminLists = "navigator.key.admin.lists";
    /*预算管理*/
    static Budget = "navigator.key.admin.budget";

    /**流程中心 */
    static ProcessCenter = "navigator.key.process.center";
    /** 新建申请 */
    static NewProcess = "navigator.key.new.process";
    /** 待办任务 */
    static WaittingTask = "navigator.key.waitting.task";
    /** 已办任务 */
    static FinishTask = "navigator.key.finish.task";
    /** 我的申请 */
    static Application = "navigator.key.application";
    /** 领用任务 */
    static ReceiveTask = "navigator.key.receive.task";
    /** 流程申请中心 */
    static ApplyProcess = "navigator.key.apply.process";
    /** 草稿 */
    static ProcessDrafts = "navigator.key.process.drafts";
    /** 委托 */
    static Delegates = "navigator.key.process.delegate";
    /** 草稿 */
    static ProcessReport = "navigator.key.process.report";
    /** 流程设置 */
    static ProcessSetting = "navigator.key.process.setting";
    /*预算列表*/
    static BudgetLists = "navigator.key.budget.lists";
    /*规则设置*/
    static RuleSettings = "navigator.key.rule.settings";
    /*假期管理*/
    static HoliDayManage = "navigator.key.holiday.manage";
    /*员工假期*/
    static EmployeeHoliDay = "navigator.key.employee.holiday";
    /*假期查询*/
    static EmployeeHoliDayQuery = "navigator.key.holiday.query";
    /**预算模板 */
    static BudgetTemplate = "navigator.key.budget.template";
    /*流程绩效报表*/
    static ProcessAchievements = "navigator.key.process.achievements";
}
