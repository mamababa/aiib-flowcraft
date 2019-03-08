export class TaskLocale {
    static OutcomeCompleted = "model.task.outcome.Completed";
    static OutcomeApproved = "model.task.outcome.Approved";
    static OutcomeRejected = "model.task.outcome.Rejected";
    static OutcomeRevoked = "model.task.outcome.Revoked";
    static OutcomeCancelled = "model.task.outcome.Cancelled";
    static OutcomeTerminated = "model.task.outcome.Terminated";
}

/** 导航菜单 */
export class NavLocale {

    /**
     * Header标题
     */
    static HeaderTitle: string = "header.title";
    /**
     * 超时任务
     */
    static FlowOverTimeTask: string = "nav.flow.overtimetask";
    /**
     * 活动任务
     */
    static FlowActivityTask: string = "nav.flow.task.activity";
    /**
     * 活动任务描述
     */
    static FlowActivityTaskDetail: string = "nav.flow.task.activity.detail";
    /**
     * 流程实例
     */
    static FlowProcInstActivity: string = "nav.flow.procinst.activity";
    /**
     * 流程实例详情
     */
    static FlowProcInstActivityDetail: string = "nav.flow.procinst.activity.detail";
    /**
     * 已发布流程
     */
    static FlowProcDefAcvitity: string = "nav.flow.procdef.activity";
    /**
     * 已发布流程详情
     */
    static FlowProcDefAcvitityDetail: string = "nav.flow.procdef.activity.detail";
    /**
     * 流程定义库
     */
    static FLowProcModel: string = "nav.flow.procmodel";
    /**
     * 流程定义库详情
     */
    static FLowProcModelDetail: string = "nav.flow.procmodel.detail";
    /**
     * 流程定义分类
     */
    static FlowProcDefCategory: string = "nav.flow.procdefcategory";
    /**
     * 流程定义分类详情
     */
    static FlowProcDefCategoryDetail: string = "nav.flow.procdefcategory.detail";
    /**
     * 流程管理
     */
    static FlowSetting: string = "nav.flow.root";
    /**
     * 岗位管理
     */
    static PositionSetting: string = "nav.positions.root";
    /**
     * 岗位管理详情
     */
    static PositionSettingDetail: string = "nav.positions.root.detail";
    /**
     * 项目管理
     */
    static ProjectSetting: string = "nav.project.root";
    /**
     * 参数管理
     */
    static ParamSetting: string = "nav.param.root";
    /** 快速链接 */
    static QuickLinks: string = "nav.param.quick.links";
    /** 快速链接详情 */
    static QuickLinksDetail: string = "nav.param.quick.links.detail";
    /** 普通用户快速链接 */
    static UserQuickLinks: string = "nav.param.user.quick.links";
    /** 流程报表 */
    static FlowReport: string = "nav.param.report";
    /** 流程报表详情 */
    static FlowReportDetail: string = "nav.param.report.detail";

    /**流程设置 */
    static ProcessSetting: string = "nav.process.setting";
    /**新建申请 */
    static NewProcess: string = "nav.new.process";
    /**待办任务 */
    static WaitingTask: string = "nav.waitting.task";
    /**已办任务 */
    static FinishTask: string = "nav.finish.task";
    /**我的申请 */
    static FlowcraftDesignerLocale: any;
    static Application: string = "nav.application";
    /**领用任务 */
    static ReceiveTask: string = "nav.receive.task";
    /** 草稿箱 */
    static ProcessDrafts: string = "nav.process.drafts";
    /** 委托 */
    static Delegates: string = "nav.process.delegate";
    /** 不能将委托人设置为本人 */
    static DelegatesTips: string = "aiib.project.workflowcenter.delegatetip";
    /** 报表 */
    static ProcessReport: string = "nav.process.report";
    /** 流程报表 */
    static AdminReport: string = "nav.param.admin.report";
    /*预算管理*/
    static Budget = "nav.param.admin.budget";
    /*假期管理*/
    static HoliDay = "nav.param.admin.holiday";
    /*假期管理*/
    static HoliDayDetail = "nav.param.admin.holiday.detail";
    /*预算管理*/
    static BudgetDetail = "nav.param.admin.budget.detail";
    /** 内容列表 */
    static AdminLists: string = "nav.param.admin.lists";
    /** 流程仪表盘*/
    static DashBoard: string = "nav.param.admin.dashboard";
    /** 流程仪表盘*/
    static DashBoardDetail: string = "nav.param.admin.dashboard.detail";
    /*流程绩效报表*/
    static Achievements: string = "nav.param.admin.achievements";
    /*流程绩效报表说明*/
    static AchievementsDetail: string = "nav.param.admin.achievements.detail";
    /*部门绩效报表*/
    static Departments: string = "nav.param.admin.departments";
    /*法大大内容列表*/
    static FadadaContentList: string = "nav.param.admin.fadada.contentlist";
}
/** 表单 */
export class FormLocale {
    /**搜索 */
    static InputSearch: string = "form.input.search";

    static PickerAdd: string = "form.picker.add";
}
/** 流程实例 */
export class ProcessInstPageLocale {
    /**列名 标识 */
    static ColumnKey: string = "page.process.activity.instkey";
    /**列名 流程ID */
    static ColumnInstID: string = "page.process.activity.instid";
    /**
     * 列名 流程名称
     */
    static ColumnInstName: string = "page.process.activity.instname";
    /**
     * 列名 流程分类
     */
    static ColumnInstCategory: string = "page.process.activity.instcategory";
    /**
     * 列名 流程版本
     */
    static ColumnInstVersion: string = "page.process.activity.instversion";
    /**
     * 列名 流程发起时间
     */
    static ColumnInstCreated: string = "page.process.activity.instcreated";
    /**
     * 列名 流程发起人
     */
    static ColumnInstCreatedBy: string = "page.process.activity.instcreatedby";
    /** 列名 流程状态 */
    static ColumnInstStatus: string = "page.process.activity.inststatus";
    /**流程编号 */
    static SearchFlowNo: string = "page.process.activity.search.flowno";
    /**发起人 */
    static SearchCreatedBy: string = "page.process.activity.search.createdby";
}
/** 超时任务 */
export class OverTimeTaskPageLocale {
    /**
     * 列名 任务名称
     */
    static ColumnTaskName: string = "page.task.overtime.taskname";
    /**
     * 列名 经办人
     */
    static ColumnTaskAssignee: string = "page.task.overtime.assignee";
    /**
     * 列名 流程名称
     */
    static ColumnTaskProc: string = "page.task.overtime.procname";
    /**
     * 列名 流程分类
     */
    static ColumnProcCategory: string = "page.task.overtime.proccategory";
    /**
     * 列名 流程版本
     */
    static ColumnProcVersion: string = "page.task.overtime.procversion";
    /**
     * 列名 创建时间
     */
    static ColumnCreated: string = "page.task.overtime.created";
    /**
     * 列名 到期日
     */
    static ColumnDueDate: string = "page.task.overtime.duedate";
}
/** 流程定义库页面 */
export class ProcModelPageLocale {
    /**  流程名称 */
    static ColumnName: string = "page.process.model.name";
    /** 流程标识 */
    static ColumnKey: string = "page.process.model.key";
    /** 流程分类 */
    static ColumnCategory: string = "page.process.model.category";
    /** 最近更新时间 */
    static ColumnModified: string = "page.process.model.modified";
    /** 更新人 */
    static ColumnModifiedBy: string = "page.process.model.modifiedby";
    /**操作 */
    static ColumnOperation: string = "page.process.model.column.operation";
    /**版本 */
    static ColumnVersion: string = "page.process.model.column.version";
    /**流程编号 */
    static ColumnProcessID: string = "page.process.model.column.process.id";
    /**新建 */
    static SearchNew = "page.process.model.search.new";
    /**流程分类 */
    static SearchCategoryHolder = "page.process.model.search.categoryholder";
    /**请输入流程名称 */
    static SearchNameHolder = "page.process.model.search.nameholder";
    /**请输入流程标识 */
    static SearchKeyHolder = "page.process.model.search.keyholder";
    /**请输入流程唯一标识 */
    static SearchUniqueKeyHolder = "page.process.model.search.unique.keyholder";
    /**修改流程属性 */
    static OperationEdit = "page.process.model.operation.edit";
    /**修改 流程编号 */
    static OperationEditProcessID = "page.process.model.operation.edit.process.id";
    /**复制流程定义 */
    static OperationCopy = "page.process.model.operation.copy";
    /**修改提交权限 */
    static OperationRight = "page.process.model.operation.right";
    /**流程设计器 */
    static OperationDesigner = "page.process.model.operation.designer";
    /**新建流程定义 */
    static OperationCreateProcModel = "page.process.model.operation.create";

    /**流程分类 */
    static OperationCategory = "page.process.model.operation.category";
    /**删除流程分类*/
    static RemoveDefinition = "page.process.model.operation.removedefinition";
    /**流程页面 */
    static OperationPage = "page.process.model.operation.page";
    /**流程变量 */
    static OperationVariable = "page.process.model.operation.variable";

    static ModalNewTitle = "page.process.model.modal.newtitle";
    static ModalLableIcon = "page.process.model.modal.lableicon";
    static ModalLableName = "page.process.model.modal.lablename";
    /**流程标识 */
    static ModalLableKey = "page.process.model.modal.lablekey";
    /**标识说明 */
    static ModelLableKeyDes = "page.process.model.modal.lablekeydesc";
    static ModalLableCategory = "page.process.model.modal.lablecategory";
    static ModalLableRight = "page.process.model.modal.lableright";
    static ModalDeployTitle = "page.process.model.modal.deploytitle";
    static ModalCopyTitle = "page.process.model.modal.copytitle";
    static ModalRightTitle = "page.process.model.modal.righttitle";
    /**流程分类*/
    static ModalCategoryTitle = "page.process.model.modal.category.title";
    /**流程页面*/
    static ModalPageTitle = "page.process.model.modal.page.title";
    /**流程变量*/
    static ModalVariableTitle = "page.process.model.modal.variable.title";
    /** "上传150*150大小的jpg,png格式图片" */
    static PropsPlaceholderImgDescribe = "page.process.model.modal.palceholder.imgdescribe";
    /**"请输入名称" */
    static PropsPlaceholderName = "page.process.model.modal.palceholder.name";
    /** "请输入唯一的流程标识" */
    static PropsPlaceholderKey = "page.process.model.modal.palceholder.key";
    /**请选择分类，不选则默认未分类 */
    static PropsPlaceholderCategory = "page.process.model.modal.palceholder.category";
    /**请选择人员、部门、或组；默认允许所有人提交该类申请 */
    static PropsPlaceholderRight = "page.process.model.modal.palceholder.right";
    /**
     * 全部人员
     */
    static PropsLableAllUser = "page.process.model.madal.lable.alluser";
    /**
     * 特殊人员
     */
    static PropsLableSpecialUser = "page.process.model.madal.lable.specialuser";
    /**流程描述 */
    static ModalLableDescribe = "page.process.model.modal.labledescribe";
    /**编辑权限 */
    static ModalEditRightTitle = "page.process.model.modal.editright.title";

    /**是否确定在流程设计器中打开 xxx 吗？ */
    static TipOpenDesinger = "page.process.model.tip.open.desinger";
    /**是否确定删除流程定义 xxx 吗？ */
    static TipRemoveDefinition = "page.process.model.tip.remove.definition";
    /**需要打开设计器，以便完成新流程的创建吗？ */
    static TipOpenDesingerToDone = "page.process.model.tip.open.desinger.todone";
    /**流程标识已存在 */
    static TipKeyExist = "page.process.model.tip.key.exist";
    /**是否覆盖该流程 */
    static OverWriteProcess = "page.process.model.tip.overwrite.process";
    /**复制成功 */
    static TipCopySuccess = "page.process.model.tip.copy.success";
    /**复制失败 */
    static TipCopyFail = "page.process.model.tip.copy.fail";
    /**全部人员 */
    static PropsAllPerson = "page.process.model.props.all.preson";
    /**特定人员 */
    static PropsSpecialPerson = "page.process.model.props.special.person";
    /**提交权限 */
    static PropsSubmitRight = "page.process.model.props.submit.right";
    /**导入 */
    static PropsImport = "page.process.model.props.import";
    /**导出 */
    static PropsExport = "page.process.model.props.export";
    /**导出 流程定义不存在 */
    static TipExport = "page.process.model.tip.export";
    /**导入成功*/
    static PropsImportSuccess = "page.process.model.props.import.success";
    /**请导入YWF格式文件*/
    static TipImportTypeFile = "page.process.model.props.import.typefile";

    /** 创建新流程*/
    static PropsModalCreate = "page.process.modal.create";
    /** 导入模板*/
    static PropsModalImport = "page.process.model.import";
    /** 导入模板失败*/
    static PropsModalImportError = "page.process.model.import.error";
    /** 模板库*/
    static PropsModalTemplate = "page.process.model.template";
    /** 流程定义信息*/
    static PropsImportTemplate = "page.process.import.template";
    /** 请输入模板名称*/
    static PropsTemplateNameInput = "page.process.template.name.input";
    /** 全部分类*/
    static PropsTemplateType = "page.process.template.type";
    /** 请点击使用并补全信息*/
    static PropsPleaseCompletion = "page.process.template.please.completion";
    /** 安装*/
    static PropsTemplateInstall = "page.process.template.install";
    /** 已安装*/
    static PropsTemplateInstalled = "page.process.template.installed";
    /** 详情*/
    static PropsTemplateDetail = "page.process.template.detail";
    /** 补全流程定义信息*/
    static PropsCompletion = "page.process.template.completion";
    /** 流程模板库*/
    static PropsTemplateLibrary = "page.process.template.library";
    /** 请选择模板*/
    static SelectPropsTemplate = "page.process.select.template";
    /** 模板分类*/
    static TemplateCategory = "page.process.template.category";
}
/** 流程分类页面 */
export class ProcCategoryPageLocale {
    static NoCategory = "page.process.category.no";
    /** 分类名称 */
    static ColumnName = "page.process.category.name";
    /** 操作 */
    static ColumnOperation = "page.process.category.operation";
    /**修改 */
    static ColumnEdit = "page.process.category.edit";
    /**删除 */
    static ColumnRemove = "page.process.category.remove";
    /**新建分类 */
    static SearchNew = "page.process.category.search.new";
    /**确定 */
    static ButtonOk = "page.process.category.ok";
    /**提示 */
    static ModalTip = "page.process.category.modal.tip";
    /**是否确定删除分类名称 */
    static ModalIsDelCategoryName = "page.process.category.modal.isdelcategoryname";
    /**标题 */
    static ModalTitle = "page.process.category.modal.title";
    /**描述 */
    static ModalDescription = "page.process.category.modal.description";
    /**所有者 */
    static ModalOwner = "page.process.category.modal.owner";
    /**描述 */
    static ColumnDescription = "page.process.category.column.description";
    /**修改 */
    static OperationEdit = "page.process.category.operation.edit";
    /**删除 */
    static OperationDelete = "page.process.category.operation.delete";
    /**新建分类 */
    static OperationNew = "page.process.category.operation.new";
    /**新建流程分类 */
    static ModalNewTitle = "page.process.category.modal.newtitle";
    /**提示消息分类已被使用 */
    static TipBeenUsed = "page.process.category.tip.category.been.used";
}
/** 已部署流程 */
export class ProcDefPageLocale {
    /** 流程名称 */
    static ColumnName: string = "page.process.def.column.name";
    /**流程标识 */
    static ColumnKey: string = "page.process.def.column.key";
    /** 流程分类 */
    static ColumnCategory: string = "page.process.def.column.category";
    /**最新版本 */
    static ColumnVersion: string = "page.process.def.column.version";
    /**流程发布时间 */
    static ColumnPubTime: string = "page.process.def.column.pubtime";
    /**流程发布人 */
    static ColumnPubBy: string = "page.process.def.column.pubby";
    /** 状态 */
    static ColumnStatus: string = "page.process.def.column.status";
    /** 设置 */
    static ColumnSet: string = "page.process.def.column.set";
    /** 浏览分类 */
    static SearchCategoryHolder: string = "page.process.def.search.categoryholder";
    /** 流程状态 */
    static SearchStatusHolder: string = "page.process.def.search.statusholder";
    /** 流程名称 */
    static SearchNameHolder: string = "page.process.def.search.nameholder";
    /**流程标识 */
    static SearchKeyHolder: string = "page.process.def.search.keyholder";

    /***名称 */
    static PropsProcessName: string = "page.process.def.process.name";
    /**图标 */
    static PropsProcessIcon: string = "page.process.def.process.icon";
    /**流程分类 */
    static PropsProcessCategory: string = "page.process.def.process.category";
    /**流程标识 */
    static PropsProcessKey: string = "page.process.def.process.key";
    /**权限 */
    static PropsModeAuthority: string = "page.process.def.process.authority";
    /**编辑 */
    static PropsBtnEidt: string = "page.process.def.process.btn.edit";
    /**保存 */
    static PropsBtnSave: string = "page.process.def.process.btn.save";
    /**禁用 */
    static PropsDisable: string = "page.process.def.process.props.disable";
    /**启用 */
    static PropsEnable: string = "page.process.def.process.props.enable";
    /**是否确定 启用 啦啦啦 ? */
    static TipUpdateStatus: string = "page.process.def.process.tip.update.status";
}
/** 流程定义详细页 */
export class ProcModelItemPageLocale {
    /**流程定义 */
    static PropsProcModel: string = "page.proc.modelitem.procmodel";
    /**详情 */
    static PropsDetail: string = "page.proc.modelitem.detail";
    /** 流程标识 */
    static PropsKey: string = "page.proc.modelitem.key";
    /**流程名称 */
    static PropsName: string = "page.proc.modelitem.name";
    /** 流程分类 */
    static PropsCategory: string = "page.proc.modelitem.category";
    /** 编号规则 */
    static PropsIDRules: string = "page.proc.modelitem.id.rules";
    /**最近更新 */
    static PropsModified: string = "page.proc.modelitem.modified";
    /**更新人 */
    static PropsModifiedBy: string = "page.proc.modelitem.modifiedby";
    /** 流程变量 */
    static PropsVariable: string = "page.proc.modelitem.variable";
    /**流程页面 */
    static PropsPage: string = "page.proc.modelitem.page";
    /**查看 */
    static PropsSee: string = "page.proc.modelitem.see";
    /**关闭 */
    static PropsCloseModal: string = "page.proc.modelitem.close.modal";
    /**页面名称 */
    static PropsPageName: string = "page.proc.modelitem.page.name";
    /**页面地址 */
    static PropsPageUrl: string = "page.proc.modelitem.page.url";
    /**页面类型 */
    static PropsPageType: string = "page.proc.modelitem.page.type";
    /** 修改流程分类 */
    static PropsChangeCategory: string = "page.proc.modelitem.modal.change.category";
}
/**活动任务 */
export class ActivityTaskPageLocale {
    /**流程编号 */
    static ColumnProcssId = "page.task.activity.column.processid";
    /**任务名称 */
    static ColumnTaskName = "page.task.activity.column.taskname";
    /**经办人 */
    static ColumnAssigneeName = "page.task.activity.column.assigneename";
    /**所属流程 */
    static ColumnProcName = "page.task.activity.column.procname";
    /**创建时间 */
    static ColumnCreated = "page.task.activity.column.created";
    /**发起人 */
    static ColumnCreatedBy = "page.task.activity.column.createdby";
    /**到期日 */
    static ColumnDueDate = "page.task.activity.column.duedate";
    /**操作 */
    static ColumnOperation = "page.task.activity.column.operation";
    /**批量操作 */
    static BatchOperation = "page.task.activity.batch.operation";
    /**高级搜索 */
    static SearchAdvance = "page.task.activity.search.advance";

    /**输入流程编号 */
    static SearchTaskIDHolder = "page.task.activity.search.taskidholder";
    /**经办人 */
    static SearchAssignee = "page.task.activity.search.assignee";
    /**请输入经办人 */
    static SearchAssigneeHolder = "page.task.activity.search.assgneeholder";
    /**发起人 */
    static SearchCreatedBy = "page.task.activity.search.createdby";
    /**请输入发起人 */
    static SearchCreatedByHolder = "page.task.activity.search.createdbyholder";
    /**创建时间 */
    static SearchCreated = "page.task.activity.search.created";
    /**开始日期 */
    static SearchStartDateHolder = "page.task.activity.search.startdateholder";
    /**结束日期 */
    static SearchEndDateHolder = "page.task.activity.search.enddateholder";
    /**督办 */
    static OperationRemind = "page.task.activity.operation.remind";
    /**转办 */
    static OperationForward = "page.task.activity.operation.forward";
    /**关闭 */
    static OperationClose = "page.task.activity.operation.close";
    /**选择转办人 */
    static PropsChangeAssignee = "page.task.activity.props.charge.assignee";
    /**请选择操作记录行 */
    static TipChooseRow = "page.task.activity.tip.choose.row";
    /**请选择转办人 */
    static TipChooseAssignee = "page.task.activity.tip.choose.assignee";
    /**转办人不能为本人 */
    static TipAssigneeNotMe = "page.task.activity.tip.assignee.not.me";
    /**转办人不能为经办人 */
    static TipTransfereesNotManagers = "page.task.activity.tip.transferees.not.managers";
    /**转办成功 */
    static TipTransferSuccess = "page.task.activity.tip.transfer.success";
    /**转办失败 */
    static TipTransferFail = "page.task.activity.tip.transfer.fail";
    /**发送通知 */
    static PropsSendInfo = "page.task.activity.props.send.info";
    /**督办邮件已发送 */
    static TipMailHasSend = "page.task.activity.tip.mail.has.send";
    /**督办邮件发送失败 */
    static TipMailSendFail = "page.task.activity.tip.mail.send.fail";
    /**查询状态 */
    static SearchStuats = "page.task.activity.search.status.";
}

/** 已部署流程详细页 */
export class ProcDefItemPageLocale {
    /** 已部署流程 */
    static HeaderTitle: string = "page.proc.defitem.activity";
    /** 流程名称 */
    static PropsName: string = "page.proc.defitem.name";
    /** 流程标识 */
    static PropsKey: string = "page.proc.defitem.key";
    /** 编号规则 */
    static PropsIDRules: string = "page.proc.defitem.idrules";
    /** 流程分类 */
    static PropsCategory: string = "page.proc.defitem.category";
    /** 编辑 */
    static PropsEdit: string = "page.proc.defitem.btn.edit";
    /**流程版本 */
    static PropsVersion: string = "page.proc.defitem.version";
    /**状态 */
    static PropsStatus: string = "page.proc.defitem.status";
    /**选择版本 */
    static PropsChoseVersion: string = "page.proc.defitem.choseversion";
    /**发布时间 */
    static PropsPublishTime: string = "page.proc.defitem.publish.time";
    /**发布人 */
    static PropsPublisher: string = "page.proc.defitem.publisher";
    /**编辑流程分类 */
    static PropsEditCategory: string = "page.proc.defitem.edit.category";
    /**查看 */
    static PropsSee: string = "page.proc.defitem.see";
    /**示例编号 */
    static PropsEgID: string = "page.proc.defitem.eg.id";
    /** 转存为流程定义 */
    static PropsArchived: string = "page.process.def.process.props.archived";
}

/** 流程实例详情 */
export class ProcessInstItemPageLocale {
    /**流程实例 标题*/
    static HeaderTitle: string = "page.procinst.activity.item.title";
    /**流程实例详情*/
    static HeaderTitleDetail: string = "page.procinst.activity.item.title.detail";
    /**流程编号 */
    static PropsID: string = "page.procinst.activity.item.id";
    /**撤回 */
    static HeaderRecall: string = "page.procinst.item.task.recall";
    /**流程名称*/
    static PropsName: string = "page.procinst.activity.item.name";
    /** 流程分类 */
    static PropsCategory: string = "page.procinst.activity.item.category";
    /**流程实例状态*/
    static PropsStatus: string = "page.procinst.activity.item.status";
    /**流程版本*/
    static PropsVersion: string = "page.procinst.activity.item.version";
    /**流程发起时间*/
    static PropsCreated: string = "page.procinst.activity.item.created";
    /**流程发起人*/
    static PropsCreatedBy: string = "page.procinst.activity.item.createdby";
    /**流程提交时间 */
    static PropsModifyTime: string = "page.procinst.activity.item.modifytime";
    /**任务状态 */
    static PropsTaskStatus: string = "page.procinst.item.task.status";
    /**流程图 */
    static PropsTaskImage: string = "page.procinst.item.task.image";
    /**任务名称 */
    static ColumnTaskName: string = "page.procinst.item.task.column.name";
    /**经办人 */
    static ColumnTaskOperator: string = "page.procinst.item.task.column.operator";
    /**代理人 */
    static ColumnTaskAgent: string = "page.procinst.item.task.column.agent";
    /**委托人 */
    static ColumnAlternateAgent: string = "page.procinst.item.task.column.alternate";
    /**创建时间 */
    static ColumnTaskCreateTime: string = "page.procinst.item.task.column.createtime";
    /**完成时间 */
    static ColumnTaskDoneTime: string = "page.procinst.item.task.column.donetime";
    /**到期时间 */
    static ColumnTaskEndTime: string = "page.procinst.item.task.column.endtime";
    /**操作 */
    static ColumnTaskOperate: string = "page.procinst.item.task.column.operate";
    /**结果 */
    static ColumnTaskResult: string = "page.procinst.item.task.column.result";
    /**备注 */
    static ColumnTaskRemark: string = "page.procinst.item.task.column.remark";
    /**查看 */
    static ColumnTaskView: string = "page.procinst.item.task.column.view";
    /**流程变量 */
    static PropsVariable: string = "page.procinst.item.variable.title";
    /**实例操作 */
    static PropsOperation: string = "page.procinst.item.operation";
    /**变量名称 */
    static ColumnVariableName: string = "page.procinst.item.variable.column.name";
    /**变量类型 */
    static ColumnVariableCategory: string = "page.procinst.item.variable.column.category";
    /**变量值 */
    static ColumnVariableValue: string = "page.procinst.item.variable.column.value";
    /**流程日志 */
    static PropsLog: string = "page.procinst.item.log";
    /**发送通知 */
    static InfoSend: string = "page.procinst.item.infosend";
    /**选择转办人 */
    static PropsChangeAssignee: string = "page.procinst.item.charge.assignee";
    /**督办 */
    static ColumnOversee: string = "page.procinst.item.oversee";
    /**转办 */
    static ColumnComplaint: string = "page.procinst.item.complaint";
    /**督办邮件已发送 */
    static TipMailHasSend: string = "page.procinst.item.tip.mail.has.send";
    /**转办成功 */
    static TipTransferSuccess: string = "page.procinst.item.tip.transfer.success";
    /**撤回失败 */
    static TipRevokeFail: string = "page.procinst.item.tip.revoke.fail";
    /**取消失败 */
    static TipCancleFail: string = "page.procinst.item.tip.cancle.fail";
    /**督办邮件发送失败 */
    static TipMailSendFail: string = "page.procinst.item.tip.mail.send.fail";
    /**转办失败 */
    static TipTransferFail: string = "page.procinst.item.tip.transfer.fail";
    /**获取流程变量信息失败 */
    static TipGetVariableFail: string = "page.procinst.item.tip.get.variable.fail";
    /**请选择转办人 */
    static TipChooseAssignee: string = "page.procinst.item.tip.choose.assignee";
    /**“任务将转办给 $人员名称，是否继续？*/
    static TipReassignedTo: string = "page.procinst.item.tip.reassignedto";
    /**标识*/
    static PropsIdentifer: string = "page.procinst.item.identifer";

    /**所属列表*/
    static PropsSubordinateList: string = "page.procinst.item.subordinate.list";
    /**列表流程*/
    static PropsListProcess: string = "page.procinst.item.list.process";
    /**所属记录*/
    static PropsSubordinateRecord: string = "page.procinst.item.subordinate.record";
    /**触发条件*/
    static PropsTriggeringCondition: string = "page.procinst.item.triggering.condition";
    /**列表记录*/
    static PropsListRecord: string = "page.procinst.item.list.record";
    /**名称*/
    static PropsListRecordName: string = "page.procinst.item.list.record.Name";
    /**值*/
    static PropsListRecordValue: string = "page.procinst.item.list.record.value";
}

/** 新建申请 */
export class NewProcessPageLocale {
    /** 全部流程 */
    static HeaderTitle: string = "page.newprocess.header.title";
    /** 选择流程分类 */
    static ChoseCategory: string = "page.newprocess.chose.category";
    /** 输入流程名称 */
    static InputProcessName: string = "page.newprocess.intput.name";
}

/** 待办任务 */
export class WaitingTaskPageLocale {
    /**头部标题 */
    static HeaderTitle: string = "page.waiting.task.header.title";
    /**输入流程编号 */
    static SearchInputID = "page.waiting.task.search.input.placeholder.id";
    /**输入流程名称 */
    static SearchInputName = "page.waiting.task.search.input.placeholder.name";
    /**输入申请人 */
    static SearchInputCreatedBy = "page.waiting.task.search.input.placeholder.createdby";

    /**流程编号 */
    static ColumnProcessID = "page.waiting.task.column.process.id";
    /**流程名称 */
    static ColumnName = "page.waiting.task.column.process.defname";
    /**任务名称 */
    static ColumnProcessName = "page.waiting.task.column.process.name";
    /**流程类型 */
    static ColumnProcessCategory = "page.waiting.task.column.process.category";
    /**申请人 */
    static ColumnProcessCreateBy = "page.waiting.task.column.process.createdby";
    /**申请时间 */
    static ColumnProcessCreateted = "page.waiting.task.column.process.created";
    /**到期时间 */
    static ColumnProcessDuedate = "page.waiting.task.column.process.duedate";
    /**任务结果 */
    static ColumnProcessStatus = "page.waiting.task.column.process.status";
}

/**任务审批-请假申请 */
export class TaskApprovalPageLocale {
    /**请假申请 */
    static LeftHeaderTitle = "page.task.approval.leave.application";
    /**流程编号 */
    static RightHeaderProcessID = "page.task.approval.process.id";
    /**关闭 */
    static RightHeaderBtnClose = "page.task.approval.button.close";
    /**申请人信息 */
    static PropsProposerInfo = "page.task.approval.proposer.info";
    /**提交人 */
    static PropsSubmitter = "page.task.approval.submitter";
    /**提交日期 */
    static PropsSubmitDay = "page.task.approval.submit.day";
    /**申请人 */
    static PropsProposerName = "page.task.approval.proposer.name";
    /**员工编号 */
    static PropsProposerID = "page.task.approval.proposer.id";
    /**职位 */
    static PropsProposerPosition = "page.task.approval.proposer.positions";
    /**工作城市 */
    static PropsWorkCity = "page.task.approval.work.city";
    /**汇报经理 */
    static PropsReportManager = "page.task.approval.report.manager";
    /**部门 */
    static PropsDepartment = "page.task.approval.department";
    /**假期申请 */
    static PropsHolidayApplication = "page.task.approval.holiday.application";
    /**项目名称 */
    static PropsProjectName = "page.task.approval.project.name";
    /**假期类型 */
    static PropsHolidayType = "page.task.approval.holiday.type";
    /**开始时间 */
    static PropsStartTime = "page.task.approval.start.time";
    /**结束时间 */
    static PropsEndTime = "page.task.approval.end.time";
    /**休假时长 */
    static PropsVacationTime = "page.task.approval.vacation.time";
    /**休假原因 */
    static PropsVacationReason = "page.task.approval.vacation.reason";
    /** 附件*/
    static PropsEnclosure = "page.task.approval.enclosure";
    /**空 */
    static PropsEmptyContent = "page.task.approval.empty.content";
    /**审批意见 */
    static PropsApprovalOption = "page.task.approval.approval.option";
    /**拒绝请填写审批意见 */
    static PropsPlaceHolderRefusalReason = "page.task.approval.placeholder.refusal.reason";
    /**同意 */
    static BtnAgreeTxt = "page.task.approval.button.agree.txt";
    /**拒绝 */
    static BtnRefuseTxt = "page.task.approval.button.refuse.txt";
    /**转签 */
    static btnSign = "page.task.approval.sign";
    /**输入人员名称或点击选择按钮 */
    static PropsSignTip = "page.task.approval.sign.tip";
    /**流程日志 */
    static PropsProcessLog = "page.task.approval.process.log";
    /**提交时间 */
    static PropsUpdateTime = "page.task.approval.submit.time";
    /**状态 */
    static PropsStatus = "page.task.approval.status";
    /**流程图 */
    static PropsProcessChart = "page.task.approval.process.chart";
    /**领用 btn */
    static BtnReceiveTask = "page.receive.task.receive.btn";
}

/** 已办任务 */
export class FinishTaskPageLocale {
    /**头部标题 */
    static HeaderTitle: string = "page.finish.task.header.title";
    /**输入流程编号 */
    static SearchInputProcessID = "page.finish.task.search.input.processid";
    /**输入流程名称 */
    static SearchInputProcessName = "page.finish.task.search.input.processname";
    /**输入申请人 */
    static SearchInputCreateBy = "page.finish.task.search.input.createby";
    /**流程编号 */
    static ColumnProcessID = "page.finish.task.column.process.id";
    /**任务名称 */
    static ColumnTaskName = "page.finish.task.column.task.name";
    /**流程名称 */
    static ColumnProcessName = "page.finish.task.column.process.name";
    /**流程类型 */
    static ColumnProcessCategory = "page.finish.task.column.process.category";
    /**申请人 */
    static ColumnProcessCreateBy = "page.finish.task.column.process.createdby";
    /**申请时间 */
    static ColumnProcessCreated = "page.finish.task.column.process.created";
    /**完成时间 */
    static ColumnProcessEndTime = "page.finish.task.column.process.endtime";
    /**任务结果 */
    static ColumnTaskOutcome = "page.finish.task.column.task.outcome";
    /**流程状态 */
    static ColumnProcessStatus = "page.finish.task.column.process.status";
    /**流程状态运行中 */
    static ColumnProcessStatusActivity = "page.finish.task.column.process.status.activity";
    /**流程状态已完成 */
    static ColumnProcessStatusComplete = "page.finish.task.column.process.status.complete";
    /**流程状态拒绝 */
    static ColumnProcessStatusReject = "page.finish.task.column.process.status.reject";
}

/** 我的申请 */
export class ApplicationPageLocale {
    /**头部标题 */
    static HeaderTitle: string = "page.apply.header.title";
    /**选择状态 */
    static SearchSelectStatus: string = "page.apply.select.status";
    /**输入流程编号 */
    static SearchInputProcessID = "page.apply.search.input.processid";
    /**输入流程名称 */
    static SearchInputProcessName = "page.apply.search.input.processname";
    /**输入申请人*/
    static SearchInputCreateBy = "page.apply.search.input.createby";
    /**流程编号 */
    static ColumnProcessID = "page.apply.column.process.id";
    /**任务名称 */
    static ColumnTaskName = "page.apply.column.task.name";
    /**流程名称 */
    static ColumnProcessName = "page.apply.column.process.name";
    /**流程类型 */
    static ColumnProcessCategory = "page.apply.column.process.category";
    /**申请时间 */
    static ColumnProcessCreated = "page.apply.column.process.created";
    /**任务结果 */
    static ColumnTaskOutcome = "page.apply.column.task.outcome";
    /**流程状态 */
    static ColumnProcessStatus = "page.apply.column.process.status";
    /**流程状态运行中 */
    static ColumnProcessStatusActivity = "page.apply.column.process.status.activity";
    /**流程状态已完成 */
    static ColumnProcessStatusComplete = "page.apply.column.process.status.complete";
    /**流程状态拒绝 */
    static ColumnProcessStatusReject = "page.apply.column.process.status.reject";
    /**状态拒绝和已撤回提示 */
    static StatusTip = "page.apply.column.process.status.tip";
    /**撤回 */
    static StatusRecall = "page.apply.column.process.status.recall";
    /**模态框标题 */
    static ModalTitle = "page.apply.column.modal.title";
    /**模态框内容 */
    static ModalContent = "page.apply.column.modal.content";
}

/**流程设计器 */
export class FlowcraftDesignerLocale {
    static LookupFiltersTip = "flowcraft.variable.contains.no.muli";
    static Variable = "flowcraft.variable";
    /**修改编号规则*/
    static ChangeRules = "flowcraft.change.rules";
    /**流程页面 */
    static FlowPage = "flowcraft.flowpage";
    static BasicVariable = "flowcraft.basicvariable";
    static NewVariable = "flowcraft.newvariable";
    static VariableListNewVariable = "flowcraft.variable.list.newvar";
    static Operation = "flowcraft.operation";
    static Save = "common.save";
    static Cancel = "common.cancel";
    static Edit = "common.edit";
    static Delete = "common.delete";

    static VariableListDuplicated = "flowcraft.variable.list.duplicated";
    static VariableList = "flowcraft.variable.list";
    static VariableListCount = "flowcraft.variable.list.count";
    static VariableListDef = "flowcraft.variable.listdef";
    static VariableId = "flowcraft.variable.id";
    static VariableName = "flowcraft.variable.name";
    static VariableType = "flowcraft.variable.type";
    static VariableDefaultRef = "flowcraft.variable.defaultref";
    static VariableListRefId = "common.id";
    static VariableListRefName = "common.name";
    static VariableListAdd = "flowcraft.variable.list.add";
    static VariableListEdit = "flowcraft.variable.list.edit";
    static VariableListEmpty = "flowcraft.variable.list.empty";
    static VariableListTooltip = "flowcraft.variable.list.tooltip";
    static VariableMetadataTooltip = "flowcraft.variable.metadata.tooltip";
    static VariableListPlaceholder = "flowcraft.variable.list.placeholder";
    static VariableListCheck = "flowcraft.variable.list.check";
    static VariableListCheckIdRepeat = "flowcraft.variable.list.check.idrepeat";
    static VariableCategoryPlaceholder = "flowcraft.variable.category.placeholder";
    static VariableCategoryEmpty = "flowcraft.variable.category.empty";
    static VariableLookupPlaceholder = "flowcraft.variable.lookup.placeholder";
    static VariableLookupEmpty = "flowcraft.variable.lookup.empty";
    static VariableTypeFile = "flowcraft.variable.type.file";
    static VariableTypeString = "flowcraft.variable.type.string";
    static VariableTypeNumber = "flowcraft.variable.type.number";
    static VariableTypeBoolean = "flowcraft.variable.type.boolean";
    static VariableTypeDate = "flowcraft.variable.type.date";
    static VariableTypeMetadata = "flowcraft.variable.type.metadata";
    static VariableTypeList = "flowcraft.variable.type.list";
    static VariableTypeDictionary = "flowcraft.variable.type.dictionary";
    static VariableIdEmpty = "flowcraft.variable.id.empty";
    static VariableIdIsChiness = "flowcraft.variable.id.ischiness";
    static VariableIdDuplicated = "flowcraft.variable.id.duplicated";
    static VariableIdStartWithLowDash = "flowcraft.variable.id.startwithlowdash";
    static VariableTypeCostCenter = "flowcraft.variable.type.costcenter";
    static VariableTypeGroupSelect = "flowcraft.variable.type.groupselect";
    static VariableTypeLocation = "flowcraft.variable.type.location";
    static VariableTypeLookup = "flowcraft.variable.type.lookup";
    static VariableTypeBudget = "flowcraft.variable.type.budget";
    static VariableTypeVacation = "flowcraft.variable.type.vacation";
    static VariableTypeVacationConfirmation = "flowcraft.variable.type.vacation-confirmation";
    static VariableTypeSignature = "flowcraft.variable.type.signature";
    static VariableTypeImg = "flowcraft.variable.type.img";
    /** 流程变量唯一值 标题*/
    static UniqueTitle = "flowcraft.uniqute.title";
    /** 请选择绑定值*/
    static UniqueChooseFiled = "flowcraft.uniqute.choose.filed";
    /** 改值已绑定*/
    static UniqueHasBind = "flowcraft.uniqute.has.bind";
    /** 请选择变量：*/
    static UniqueChooseVariable = "flowcraft.uniqute.choose.variable";
    /** 描述*/
    static UniqueDesc = "flowcraft.uniqute.desc";
    /** 该变量关联了唯一值，确认要删除吗？*/
    static ConfirmVariableJoinUnique = "flowcraft.uniqute.confirm.variablejoinunique";


    /** 变量设置*/
    static PropVariableSetting = "flowcraft.props.variable.setting";

    static PropVariableAdd = "flowcraft.props.variable.add";
    static ExprEditor = "flowcraft.expr.editor";
    static ExprEditorMail = "flowcraft.expr.editor.mail";

    static ExprCategoryVariable = "flowcraft.expr.cat.variable";
    static ExprCategoryTask = "flowcraft.expr.cat.task";
    static ExprCategoryContext = "flowcraft.expr.cat.context";
    static ExprCategoryCurrentTask = "flowcraft.expr.cat.task.current";
    static ExprCategoryFunction = "flowcraft.expr.cat.function";
    static ExprCategoryListField = "flowcraft.expr.cat.listfield";
    static ExprCategoryUserGroup = "flowcraft.expr.cat.usergroup";
    static ExprCategoryFunctionTaskOutcome = "flowcraft.expr.cat.function.taskoutcome";

    static ExprItemApplicationID = "flowcraft.expr.app.id";
    static ExprItemApplicationNo = "flowcraft.expr.app.no";
    static ExprItemApplicationURL = "flowcraft.expr.app.url";
    static ExprItemProcessName = "flowcraft.expr.process.name";
    static ExprItemApplicant = "flowcraft.expr.app.applicant";
    static ExprItemCreatedBy = "flowcraft.expr.app.createdby";
    static ExprItemCreated = "flowcraft.expr.app.created";
    static ExprItemSiteURL = "flowcraft.expr.context.siteurl";

    static ExprItemTaskID = "flowcraft.expr.task.id";
    static ExprItemTaskURL = "flowcraft.expr.task.url";
    static ExprItemTaskName = "flowcraft.expr.task.name";
    static ExprItemTaskAssignee = "flowcraft.expr.task.assignee";
    static ExprItemTaskDueDate = "flowcraft.expr.task.duedate";
    static ExprItemTaskOutcome = "flowcraft.expr.task.outcome";
    static ExprItemTaskCreated = "flowcraft.expr.task.created";
    static ExprItemTaskModified = "flowcraft.expr.task.modified";
    static ExprItemTaskComment = "flowcraft.expr.task.comment";

    static ExprOperatorAnd = "flowcraft.expr.op.and";
    static ExprOperatorOr = "flowcraft.expr.op.or";

    static ExprOperatorGeneral = "flowcraft.expr.op.general";
    static ExprOperatorString = "flowcraft.expr.op.string";
    static ExprOperatorNumber = "flowcraft.expr.op.number";
    static ExprOperatorBoolean = "flowcraft.expr.op.boolean";
    static ExprOperatorDatetime = "flowcraft.expr.op.datetime";
    static ExprOperatorNotContains = "flowcraft.expr.op.nocontains";
    static ExprOperatorIsTrue = "flowcraft.expr.op.istrue";
    static ExprOperatorIsFalse = "flowcraft.expr.op.isfalse";
    static ExprOperatorIsNull = "flowcraft.expr.op.isnull";
    static ExprOperatorIsNotNull = "flowcraft.expr.op.isnotnull";
    static ExprOperatorEqual = "flowcraft.expr.op.equal";
    static ExprOperatorNotEqual = "flowcraft.expr.op.noequal";
    static ExprOperatorContains = "flowcraft.expr.op.contains";
    static ExprOperatorIn = "flowcraft.expr.op.in";
    static ExprOperatorBelongs = "flowcraft.expr.op.belongs";
    static ExprOperatorStartWith = "flowcraft.expr.op.startwith";
    static ExprOperatorEndWith = "flowcraft.expr.op.endwith";
    static ExprOperatorGreater = "flowcraft.expr.op.ge";
    static ExprOperatorLesser = "flowcraft.expr.op.le";
    static ExprOperatorGreaterEq = "flowcraft.expr.op.geq";
    static ExprOperatorLesserEq = "flowcraft.expr.op.leq";
    static ExprUserId = "flowcraft.expr.user.id";
    static ExprUserEmail = "flowcraft.expr.user.email";
    static ExprUserName = "flowcraft.expr.user.name";
    static ExprUserLogin = "flowcraft.expr.user.lgoin";
    static ExprUserManager = "flowcraft.expr.user.manager";
    static ExprUserOrganization = "flowcraft.expr.user.organization";
    static ExprUserLocation = "flowcraft.expr.user.location";
    static ExprUserJobGrade = "flowcraft.expr.user.jobgrade";

    static ExprOrganizationId = "flowcraft.expr.organization.id";
    static ExprOrganizationName = "flowcraft.expr.organization.name";
    static ExprOrganizationManager = "flowcraft.expr.organization.manager";

    static ExprLocationName = "flowcraft.expr.location.name";
    static ExprLocationNum = "flowcraft.expr.location.number";
    static ExprLocationCode = "flowcraft.expr.location.code";
    static ExprLocationId = "flowcraft.expr.location.id";
    static ExprLocationManagementName = "flowcraft.expr.location.managementname";
    static ExprLocationPhoneNumber = "flowcraft.expr.location.phonenumber";
    static ExprLocationAddresses = "flowcraft.expr.location.addresses";

    static ExprCostCenterNum = "flowcraft.expr.costcenter.number";
    static ExprCostCenterName = "flowcraft.expr.costcenter.name";
    static ExprCostCenterOrganization = "flowcraft.expr.costcenter.organization";
    static ExprCostCenterManagement = "flowcraft.expr.costcenter.management";
    static ExprCostCenterStatus = "flowcraft.expr.costcenter.status";

    static ExprMailExprInsertHint = "flowcraft.expr.expr.insert.hint";
    static ExprMailLinkInsertHint = "flowcraft.expr.link.insert.hint";

    static ExprUserGroupCode = "flowcraft.expr.usergroup.code";
    static ExprUserGroupAllUser = "flowcraft.expr.usergroup.all.user";
    static ExprUserGroupAllEmail = "flowcraft.expr.usergroup.all.email";
    static ExprUserGroupAllNameCN = "flowcraft.expr.usergroup.all.name.cn";

    static ConditionEditor = "flowcraft.con.editor";
    static ConditionExprRequired = "flowcraft.con.expr.required";
    static ConditionOpRequired = "flowcraft.con.op.required";
    static ConditionAdd = "flowcraft.con.add";
    static ConditionAddGroup = "flowcraft.con.addgroup";
    static ConditionAddChild = "flowcraft.con.addchild";
    static ConditionGroup = "flowcraft.con.group";

    static AssigneeEmpty = "flowcraft.assign.empty";
    static AssignEditor = "flowcraft.assign.editor";
    static AssignAdd = "flowcraft.assign.add";
    static AssignSelected = "flowcraft.assign.selected";
    static AssignDirect = "flowcraft.assign.method.direct";
    static AssignExpression = "flowcraft.assign.method.expression";
    static AssignPosition = "flowcraft.assign.method.positions";
    static AssignPositionLoc = "flowcraft.assign.method.roleloc";
    static AssignPositionLocExpr = "flowcraft.assign.method.rolelocexpr";
    static AssignPositionOrg = "flowcraft.assign.method.roleorg";
    static AssignPositionOrgExpr = "flowcraft.assign.method.roleorgexpr";

    static AssignUserExprTP = "flowcraft.assign.method.usr.tp";
    static AssignPositionOrgExprTP = "flowcraft.assign.method.roleorgexpr.tp";
    static AssignPositionLocExprTP = "flowcraft.assign.method.rolelocexpr.tp";
    /** 开始  */
    static MenuStartEvent = "flowcraft.menu.startevent";
    /** 信号事件  */
    static SignalEvent = "flowcraft.menu.signalevent";
    /** 指派任务  */
    static MenuWaitTask = "flowcraft.menu.waittask";
    /** 多人任务  */
    static MenuMultiTask = "flowcraft.menu.multitask";
    /** 领用任务  */
    static MenuReceiveTask = "flowcraft.menu.receivetask";
    /** 邮件任务  */
    static MenuMailTask = "flowcraft.menu.mailtask";
    /** 设置变量  */
    static MenuSetVariable = "flowcraft.menu.setvariable";
    /** 设置列表数据 */
    static MenuSetContentList = "flowcraft.menu.setcontentlist";
    /**电子签章 */
    static MenuElectronicSignature = "flowcraft.electronic.signature";
    /** 包含分支  */
    static MenuInclusiveGateway = "flowcraft.menu.inclusivegateway";
    /** 结束  */
    static MenuStopNoneEvent = "flowcraft.menu.stopnoneevent";
    /** 结束(拒绝)  */
    static MenuStopRejectEvent = "flowcraft.menu.stoprejectevent";
    /** 控件设置 */
    static SettingControl = "formcraft.setting.control";
    /** 模版设置 */
    static SettingTemplate = "formcraft.setting.template";
    /** 属性设置 */
    static PropSettingTitle = "flowcraft.prop.title";
    /**
     * 管理员
     */
    static PropAdministrator = "flowcraft.prop.administrator";
    /**
     * 任务标签
     */
    static PropLable = "flowcraft.prop.label";
    /**
     * 任务名称名称
     */
    static PropLableName = "flowcraft.prop.label.name";
    /**
     * 描述
     */
    static PropLableDesc = "flowcraft.prop.label.desc";
    /**
     * 表达式
     */
    static PropLabelConditions = "flowcraft.prop.label.conditions";
    static PropLabelConditionsTooltip = "flowcraft.prop.label.conditions.tooltip";
    /**
     * 页面
     */
    static PropLableEmailEnable = "flowcraft.prop.label.email.enable";
    /**自动审批*/
    static PropAutomaticApproval = "flowcraft.prop.label.automaticapproval";
    /**允许召回*/
    static PropRollBack = "flowcraft.prop.label.rollback";
    /**允许转办*/
    static PropAllowReassign = "flowcraft.prop.label.allowreassign";
    /**允许加签*/
    static PropAllowSign = "flowcraft.prop.label.allowsign";
    /**自动审批 注释*/
    static PropAutomaticApprovalTopTip = "flowcraft.prop.automaticapproval.toptip";
    static PropAutomaticApprovalNotice = "flowcraft.prop.automaticapproval.notice";
    /**指定顺序*/
    static PropIsSequential = "flowcraft.prop.label.issequential";
    /**任务类型 */
    static PropTaskType = "flowcraft.prop.label.tasktype";
    /**审批 */
    static PropTaskTypeApprove = "flowcraft.prop.label.tasktype.approve";
    /**完成  */
    static PropTaskTypeComplete = "flowcraft.prop.label.tasktype.complete";

    /**指定顺序说明*/
    static PropIsSequentialTopTip = "flowcraft.prop.issequential.toptip";
    static PropIsSequentialCountersign = "flowcraft.prop.issequential.countersign";
    /**说明：任务名称不支持富文本或者换行 */
    static PropsUnSupportRichText = "flowcraft.prop.unsupport.richtext";
    static PropLablePage = "flowcraft.prop.label.page";
    static PropLableAssign = "flowcraft.prop.label.assign";
    static PropLableReceiver = "flowcraft.prop.label.receiver";
    static PropLableOthers = "flowcraft.prop.label.others";
    static PropLableTaskSetting = "flowcraft.prop.label.tasksetting";
    /**经办人*/
    static PropLableHandler = "flowcraft.prop.label.handler";
    static PropLableDurdate = "flowcraft.prop.label.durdate";
    static PropLableDurday = "flowcraft.prop.label.durday";
    static PropLableMailSubject = "flowcraft.prop.label.mailsubject";
    static PropLableMailTo = "flowcraft.prop.label.mailto";
    static PropLableMailCC = "flowcraft.prop.label.mailcc";
    static PropLableMailBody = "flowcraft.prop.label.mailbody";
    static PropLableVariable = "flowcraft.prop.label.variable";
    static PropLableApproveway = "flowcraft.prop.label.approveway";
    static PropLableApprovepercentage = "flowcraft.prop.label.approvepercentage";
    static PropLableAllowSkip = "flowcraft.prop.label.allowskip";
    static PropLableAllowSkipTopTipe = "flowcraft.prop.allowskip.toptip";
    static PropLabelContentList = "flowcraft.prop.label.contentlist";
    static PropLabelExecuteType = "flowcraft.prop.label.executetype";
    static PropLabelFieldSettings = "flowcraft.prop.label.fieldsettings";
    static PropLabelCondition = "flowcraft.prop.label.condition";
    static PropLabelIdentity = "flowcraft.prop.label.identity";
    static PropApproveWayAll = "flowcraft.prop.tasktype.all.";
    static PropFirstOpinion = "flowcraft.prop.tasktype.first";
    static PropApproveWayAny = "flowcraft.prop.tasktype.any.";
    static PropApproveWayAnyRejected = "flowcraft.prop.tasktype.anyrejected";
    static PropApproveWayCustom = "flowcraft.prop.tasktype.custom.";
    static ContentListCurrent = "flowcraft.prop.contentlist.current";
    static ContentListSelect = "flowcraft.prop.contentlist.select";

    static StencilTaskWaitting = "flowcraft.stencil.task.waitting";
    static StencilTaskReceive = "flowcraft.stencil.task.receive";
    static StencilTaskMail = "flowcraft.stencil.task.mail";
    static StencilTaskMultiTask = "flowcraft.stencil.task.multitask";
    static StencilTaskVariable = "flowcraft.stencil.task.variable";
    static StencilTaskContentList = "flowcraft.stencil.task.contentlist";
    static StencilTaskSignature = "flowcraft.stencil.electronic.signature";
    static StencilEventStart = "flowcraft.stencil.event.start";
    static StencilEventSignal = "flowcraft.stencil.event.signal";
    static StencilEventStopNone = "flowcraft.stencil.event.stopnone";
    static StencilEventStopReject = "flowcraft.stencil.event.stopreject";
    static StencilIncludeGateway = "flowcraft.stencil.gateway.includegateway";
    static StencilFlowLink = "flowcraft.stencil.link";
    static StencilHttp = "flowcraft.stencil.http";
    static StencilHttpAddress = "flowcraft.stencil.http.address";
    static StencilHttpHeader = "flowcraft.stencil.http.header";
    static StencilHttpData = "flowcraft.stencil.http.data";
    static StencilHttpResult = "flowcraft.stencil.http.result";
    static StencilHttpStatus = "flowcraft.stencil.http.status";
    static StencilHttpDictPlaceholder = "flowcraft.stencil.http.dict.placeholder";
    static StencilHttpDLPlaceholder = "flowcraft.stencil.http.dictlist.placeholder";
    static StencilHttpAuthType = "flowcraft.stencil.http.authtype";
    static StencilHttpMethod = "flowcraft.stencil.http.method";
    static StencilHttpNumberPlaceholder = "flowcraft.stencil.http.number.placeholder";
    static StencilHttpAuthYeeOffice = "flowcraft.stencil.http.authtype.yeeoffice";
    static StencilHttpAuthUserPwd = "flowcraft.stencil.http.authtype.pwd";
    static StencilHttpAuthNone = "flowcraft.stencil.http.authtype.none";
    static StencilHttpAuthHeader = "flowcraft.stencil.http.auth.header";

    static StencilExecuteAdd = "flowcraft.stencil.execute.add";
    static StencilExecuteEdit = "flowcraft.stencil.execute.edit";
    static StencilExecuteRemove = "flowcraft.stencil.execute.remove";
    static StencilSettings = "flowcraft.stencil.settings";
    static StencilNoListTip = "flowcraft.stencil.no.list.tip";
    static StencilLabel = "flowcraft.stencil.label";
    static StencilContentType = "flowcraft.stencil.contnet.type";
    static StencilEvaluate = "flowcraft.stencil.evaluate";
    static StencilPlus = "flowcraft.stencil.plus";
    static StencilMinus = "flowcraft.stencil.minus";
    static StencilMultiply = "flowcraft.stencil.multiply";
    static StencilDivide = "flowcraft.stencil.divide";
    static StencilRequiredEvaluate = "flowcraft.stencil.require.evaluate";
    static StencilSignature = "flowcraft.stencil.signature";

    static PageDefTitle = "flowcraft.pagedef.title";
    static PageDefAddPage = "flowcraft.pagedef.add";
    static PageDefTypeHolder = "flowcraft.pagedef.typeholder";
    static PageDefPageTypeHolder = "flowcraft.pagedef.pagetypeholder";
    static PageDefNameHolder = "flowcraft.pagedef.nameholder";
    static PageDefTitleHolder = "flowcraft.pagedef.titleholder";
    static PageDetTitleName = "flowcraft.pagedef.title.name";
    static PageDefUrlHolder = "flowcraft.pagedef.urlholder";
    static PageDefCopyTitle = "flowcraft.pagedef.copy.title";
    static PageDefCopyNew = "flowcraft.pagedef.copy.new";
    static PageDefCopyReplace = "flowcraft.pagedef.copy.replace";
    static PageDefCopyNameEmpty = "flowcraft.pagedef.copy.nameempty";
    static PageDefNameEmpty = "flowcraft.pagedef.nameempty";
    static PageDefDeleteConfirm = "flowcraft.pagedef.delete.confirm";
    static PageDefNameUnique = "flowcraft.pagedef.nameunique";

    static PageDefValidateRequired = "flowcraft.pagedef.validate.filedrequired";
    static PageDefValidateType = "flowcraft.pagedef.validate.type";
    static PageDefValidateName = "flowcraft.pagedef.validate.name";
    static PageDefValidateTitle = "flowcraft.pagedef.validate.title";
    static PageDefValidateUrl = "flowcraft.pagedef.validate.url";
    /**请选择覆盖页面 */
    static PageDefValidateOverlayPage = "flowcraft.pagedef.validate.overlay.page";

    static PagePrintTitle = "flowcraft.pageprint.title";
    static PagePrintAdd = "flowcraft.pageprint.add";
    static PagePrintNameHolder = "flowcraft.pageprint.nameholder";
    static PagePrintCopyNew = "flowcraft.pageprint.copy.new";
    static PagePrintCopyReplace = "flowcraft.pageprint.copy.replace";
    static PagePrintCopyNameEmpty = "flowcraft.pageprint.copy.nameempty";
    static PagePrintCopyNameSelect = "flowcraft.pageprint.copy.name.select";
    static PagePrintNameEmpty = "flowcraft.pageprint.nameempty";
    static PagePrintDeleteConfirm = "flowcraft.pageprint.delete.confirm";
    static PagePrintDeleteWarning = "flowcraft.pageprint.delete.warning";
    static PageTaskTransferWarning = "flowcraft.page.task.transfer.warning";

    static PageDefValidateTypeMain = "flowcraft.pagedef.validate.type.main";
    /**设计出错*/
    static TipDesignerError = "flowcraft.designer.tip.designer.error";
    /**节点【" + item.defaultName + "】" + setting.label + " 的 xxx 为必填字段*/
    static TipDesignerErrorMsg = "flowcraft.designer.tip.designer.errormsg";
    /**节点【" + item.defaultName + "】" + setting.label + " 的 xxx 有问题*/
    static TipDesignerLineError = "flowcraft.designer.tip.designer.line.error";
    /** 请检查线 xxx*/
    static TipCheckLine = "flowcraft.designer.line.tip";
    /** 设计器内容不能为空*/
    static TipFlowIsNull = "flowcraft.designer.tip.flow.isnull";
    /** 入线*/
    static PropsInComing = "flowcraft.designer.props.incoming";
    /** 出线*/
    static PropsOutGoing = "flowcraft.designer.props.outgoing";
    /** 设计出错，必须有结束或拒绝节点*/
    static TipFlowEnd = "flowcraft.designer.tip.flow.end";
    /** 设计出错，必须有开始节点*/
    static TipFlowStart = "flowcraft.designer.tip.flow.start";
    /** xxx节点缺失 xx eg: 开始节点 缺失 出线*/
    static TipDefectLine = "flowcraft.designer.tip.defect.line";

    /* 全部审批人控件 */
    static TaskAssigneeList = "flowcraft.print.task.assignee.list";
    /* 批准 */
    static ButtonApproval = "flowcraft.designer.button.approval";

    static PrintPageTitle = "flowcraft.print.page.title";
    static PrintButtonTitle = "flowcraft.print.button.title";

    /* 请链接节点 */
    static TipLinkFirst = "flowcraft.tip.link.first";
    //"复杂类型变量 "+listrefs[index].name+" 被变量 "+find.name+" 使用，确定要修改吗？"
    static TipListVariableChangeKey = "flowcraft.tip.listvariable.changekey";
}

/**领用任务 */
export class ReciveTaskPageLocale {
    /**领用任务标题 */
    static PropsHeaderTitle = "page.receive.task.left.title";
    /**输入流程编号 */
    static InputProcessID = "page.receive.task.input.process.id";
    /**输入流程名称 */
    static InputProcessName = "page.receive.task.input.process.name";
    /**输入申请人 */
    static InputProposer = "page.receive.task.input.proposer";
    /**列 流程编号 */
    static ColumnProcessID = "page.receive.task.column.process.id";
    /**列 任务名称 */
    static ColumnTaskName = "page.receive.task.column.task.name";
    /**列 流程名称 */
    static ColumnProcessName = "page.receive.task.column.process.name";
    /**列 流程分类 */
    static ColumnProcessCategory = "page.receive.task.column.process.category";
    /**列 申请人 */
    static ColumnProposer = "page.receive.task.column.proposer";
    /**列 创建时间 */
    static ColumnApplyTime = "page.receive.task.column.apply.time";
    /**列 到期时间 */
    static ColumnExpireTime = "page.receive.task.column.expire.time";
    /**行 操作-领用任务 */
    static OperationReceiveTask = "page.receive.task.row.operation.receivetask";
    /**确定领用 " + record.Name + " " + record.ProcDefName + " 吗？ */
    static TipReceiveTask = "page.receive.task.tip.receive.task";
    /**领用成功 */
    static TipReceiveSuccess = "page.receive.task.tip.receive.success";
    /**领用失败 */
    static TipReceiveFail = "page.receive.task.tip.receive.fail";
    /** 任务已处理或不存在 */
    static TipAssignedOrCanceled = "page.receive.task.tip.assigned.or.canceled";
}
export let ProcDefStatusLocale = "model.procdefs.status.";
/**参数管理 */
export class MetaDataPageLocale {
    /**参数列表 */
    static PropsHeaderTitle = "page.metadata.left.title";
    /**新建 */
    static PropsModalTitleNewCategory = "page.metadata.left.title.newcategory";
    /**编辑 */
    static PropsModalTitleEditCategory = "page.metadata.left.title.editcategory";
    /**
     * 添加元数据
     *
     * @static
     *
     * @memberOf MetaDataPageLocale
     */
    static PropsModalTitleNewMeta = "page.metadata.modal.title.newmeta";
    /**
     * 编辑元数据
     *
     * @static
     *
     * @memberOf MetaDataPageLocale
     */
    static PropsModalTitleEditMeta = "page.metadata.modal.title.editmeta";
    /**新建 */
    static PropsHeaderRightBtn = "page.metadata.right.button.new";
    /**编辑 */
    static PropsHeaderTitleEdit = "page.metadata.right.button.edit";
    /**删除 */
    static MetaDataRemove = "page.metadata.left.remove";
    /**确定 */
    static ButtonOk = "page.metadata.modal.ok";
    /**提示 */
    static ModalTip = "page.metadata.modal.tip";
    /**是否确定删除 */
    static ModalIsDelete = "page.metadata.modal.isdelete";
    /**标题 */
    static ModalTitle = "page.metadata.modal.title";
    /**备注信息 */
    static ModalDescription = "page.metadata.modal.description";
    /**参数编码 */
    static MetaLeftModalCode = "page.metadata.left.modal.code";
    /**参数名称 */
    static MetaLeftModalName = "page.metadata.left.modal.name";
    /**参数描述 */
    static MetaLeftModalDescription = "page.metadata.left.modal.description";
    /**添加下级 */
    static PropsHeaderTitleAdd = "page.metadata.right.button.add";
    /**列 编码 */
    static ColumnCode = "page.metadata.column.code";
    /**列 名称 */
    static ColumnName = "page.metadata.column.name";
    /**列 方式 */
    static ColumnMode = "page.metadata.column.assignment";
    /**列 扩展字段1 */
    static ColumnExt1 = "page.metadata.column.ext1";
    /**列 扩展字段2 */
    static ColumnExt2 = "page.metadata.column.ext2";
    /**列 排序 */
    static ColumnSort = "page.metadata.column.sort";
    /**描述 */
    static ColumnDescription = "page.metadata.column.description";
    /**行操作 编辑 */
    static ColumnBtnEdit = "page.metadata.column.button.edit";
    /**行操作 删除 */
    static ColumnBtnDelete = "page.metadata.column.button.delete";
    /**操作 */
    static ColumnOperation = "page.metadata.column.operation";
    /**编码已存在 */
    static TipkeyExist = "page.metadata.tip.key.exist";

    static TipUpdateStatus: string = "page.metadata.def.process.tip.update.status";
    /**参数列表 */

    /**取消 */
    static ButtonCancel: string = "page.metadata.right.button.cancel";

    static ERROR_CODE_PREFIX: string = "crafts.server.status.";
}

/**岗位列表 */
export class JobPositionsPageLocale {
    /**新建 */
    static SearchNew = "page.job.positions.search.new";
    /**组织岗位 */
    static SearchRoleOrg = "page.job.positions.search.roleorg";
    /**地点岗位 */
    static SearchRoleLoc = "page.job.positions.search.roleloc";
    /**模态框标题 添加岗位*/
    static ModalTitleAdd = "page.job.positions.modal.title.add";
    /**模态框标题 编辑*/
    static ModalTitleEdit = "page.job.positions.modal.title.edit";
    /**模态框内容 岗位名称*/
    static ModalRoleName = "page.job.positions.modal.content.rolesname";
    /**模态框内容 分配人*/
    static ModalAssigner = "page.job.positions.modal.content.assigner";
    /**模态框 分配人*/
    static ModalEditAssigner = "page.job.positions.modal.edit.assigner";
    /**按钮编辑*/
    static ButtonEdit = "page.job.positions.modal.button.edit";
    /**岗位名称 */
    static ColumnName = "page.job.positions.column.name";
    /**分配人 */
    static ColumnAssigner = "page.job.positions.column.assigner";
    /**操作 */
    static ColumnOperation = "page.job.positions.column.operation";
    /**编辑 */
    static OperationEdit = "page.job.positions.column.operation.edit";
    /**删除 */
    static OperationRemove = "page.job.positions.column.operation.remove";
    /**关联详情 标题 */
    static DetailModalTitle = "page.job.positions.detailmodal.title";
    /**关联组织 */
    static DetailModalLinkOrg = "page.job.positions.detailmodal.link.org";
    /**关联地点*/
    static DetailModalLinkLocale = "page.job.positions.detailmodal.link.locale";
    /**删除时提示 此岗位已被组织岗位或/和地点岗位关联。*/
    static TipDeletePart1 = "page.job.positions.tip.delete.part1";
    /**删除时提示 删除此岗位将同时删除关联项！*/
    static TipDeletePart2 = "page.job.positions.tip.delete.part2";
    /**删除时提示 是否继续？*/
    static TipDeletePart3 = "page.job.positions.tip.delete.part3";
    /**岗位名称已存在 */
    static TipAddFail = "page.job.positions.tip.addFail";
}

/**组织岗位 */
export class OrganizationPageLocale {
    /**请选择组织 */
    static PropRightTitle = "page.org.positions.right.title";
    /**添加 */
    static SearchNew = "page.org.positions.search.new";
    /**组织岗位 */
    static SearchRoleOrg = "page.org.positions.search.roleorg";
    /**模态框标题 添加人员*/
    static ModalTitleAdd = "page.org.positions.modal.title.add";
    /**模态框 选择岗位*/
    static ModalChooseRole = "page.org.positions.modal.choose.role";
    /**模态框 岗位*/
    static ModalRole = "page.org.positions.modal.role";
    /**模态框内容 岗位名称*/
    static ModalRoleName = "page.org.positions.modal.content.rolesname";
    /**模态框标题 编辑*/
    static ModalTitleEdit = "page.org.positions.modal.title.edit";
    /**模态框内容 分配人*/
    static ModalAssigner = "page.org.positions.modal.content.assigner";
    /**模态框备注*/
    static ModalDescription = "page.org.positions.modal.description";
    /**按钮编辑*/
    static ButtonEdit = "page.org.positions.modal.button.edit";
    /**岗位名称 */
    static ColumnName = "page.org.positions.column.name";
    /**分配人 */
    static ColumnAssigner = "page.org.positions.column.assigner";
    /**操作 */
    static ColumnOperation = "page.org.positions.column.operation";
    /**编辑 */
    static OperationEdit = "page.org.positions.column.operation.edit";
    /**删除 */
    static OperationRemove = "page.org.positions.column.operation.remove";
    /**请选择角色 */
    static TipChooseRole = "page.org.positions.tip.choose.role";
    /**请选择分配人 */
    static TipChooseTransfer = "page.org.positions.tip.choose.transfer";
    /**请先选择树节点 */
    static TipChooseTreeNode = "page.org.positions.tip.choose.tree.node";
}

/**地点岗位 */
export class LocationPageLocale {
    /**请选择地点 */
    static PropRightTitle = "page.location.positions.right.title";
    /**添加 */
    static SearchNew = "page.location.positions.search.new";
    /**地点角色 */
    static SearchRoleLoc = "page.location.positions.search.roleloc";
    /**模态框 选择岗位*/
    static ModalChooseRole = "page.location.positions.modal.choose.role";
    /**模态框标题 添加*/
    static ModalTitleAdd = "page.location.positions.modal.title.add";
    /**模态框标题 编辑*/
    static ModalTitleEdit = "page.location.positions.modal.title.edit";
    /**模态框内容 岗位名称*/
    static ModalRoleName = "page.location.positions.modal.content.rolesname";
    /**模态框内容 分配人*/
    static ModalAssigner = "page.location.positions.modal.content.assigner";
    /**编辑岗位*/
    static ModalRowEditPosition = "page.location.positions.modalrow.edit.position";
    /**模态框备注*/
    static ModalDescription = "page.location.positions.modal.description";
    /**按钮编辑*/
    static ButtonEdit = "page.location.positions.modal.button.edit";
    /**岗位名称 */
    static ColumnName = "page.location.positions.column.name";
    /**分配人 */
    static ColumnAssigner = "page.location.positions.column.assigner";
    /**操作 */
    static ColumnOperation = "page.location.positions.column.operation";
    /**编辑 */
    static OperationEdit = "page.location.positions.column.operation.edit";
    /**删除 */
    static OperationRemove = "page.location.positions.column.operation.remove";
    /**请选择角色 */
    static TipChooseRole = "page.location.positions.tip.choose.role";
    /**请选择岗位名称 */
    static TipChooseLocationRole = "page.location.positions.tip.choose.locationRole";
    /**请选择分配人 */
    static TipChooseTransfer = "page.location.positions.tip.choose.transfer";
    /**请先选择树节点 */
    static TipChooseTreeNode = "page.location.positions.tip.choose.tree.node";
}

/** 流程规则管理*/
export class FlowRulesPageLocale {
    /** 修改流程分类 */
    static PropsChangeCategory: string = "page.proc.model.modal.change.category";
    /** 流程分类 */
    static PropsCategory: string = "page.proc.model.category";
}

/**日常报销申请 */
export class DailyReimburseApplicationPageLocale {
    /**日常报销申请 */
    static PropsTitle = "page.daily.reimburse.application.title";
    /**提交 */
    static BtnSubmit = "page.daily.reimburse.application.btn.submit";
    /**申请人信息 */
    static PropsProposerInfo = "page.daily.reimburse.application.proposer.info";
    /**提交人 */
    static PropsSubmitter = "page.daily.reimburse.application.submitter";
    /**提交日期 */
    static PropsSubmitDay = "page.daily.reimburse.application.submit.day";
    /**申请人 */
    static PropsProposerName = "page.daily.reimburse.application.proposer.name";
    /**员工编号 */
    static PropsProposerID = "page.daily.reimburse.application.proposer.id";
    /**职位 */
    static PropsProposerPosition = "page.daily.reimburse.application.proposer.positions";
    /**工作城市 */
    static PropsWorkCity = "page.daily.reimburse.application.work.city";
    /**汇报经理 */
    static PropsReportManager = "page.daily.reimburse.application.report.manager";
    /**部门 */
    static PropsDepartment = "page.daily.reimburse.application.department";
    /**项目名称 */
    static PropsProjectName = "page.daily.reimburse.application.project.name";
    /**请选择 */
    static PropsDefaultSelect = "page.daily.reimburse.application.default.select";
    /**总金额 */
    static PropsAmount = "page.daily.reimburse.application.amount";
    /**日期 */
    static PropsDay = "page.daily.reimburse.application.day";
    /** *无效的日期格式，参考格式 MM-DD-YYYY */
    static PropsValidDay = "page.daily.reimburse.application.valid.day";
    /**请选择报销类型 */
    static PropsSelectReimburse = "page.daily.reimburse.application.select.reimburse";
    /**金额(人民币)*/
    static PropsItemAmount = "page.daily.reimburse.application.item.amount";
    /** *此字段必填 */
    static PropsTipItemAmount = "page.daily.reimburse.application.tip.item.amount";
    /** *请输入一个有2位小数的有效数字。 */
    static PropsValidItemAmount = "page.daily.reimburse.application.valid.item.amount";
    /**单据张数 */
    static PropsBillCount = "page.daily.reimburse.application.bill.count";
    /**不是一个有效的整数 */
    static PropsValidBillCount = "page.daily.reimburse.application.valid.bill.count";
    /**摘要 */
    static PropsAbstract = "page.daily.reimburse.application.abstract";
    /**添加报销明细 */
    static BtnAddItemDetail = "page.daily.reimburse.application.additem.detail";
    /**附件 */
    static PropsEnclosure = "page.daily.reimburse.application.enclosure";
    /**添加附件 */
    static PropsAddEnclosure = "page.daily.reimburse.application.add.enclosure";
}
/**
 * 申请单
 *
 * @export
 * @class ApplyContentLocale
 */
export class ApplyContentLocale {
    /**
     * 申请人信息
     * @memberOf YeeUserContentLocale
     */
    static ApplyUserTitle = "requistion.user.title";
    /**
     * 提交人
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelSubmitUser = "requistion.user.label.submituser";
    /**
     * 提交时间
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelSubmitDate = "requistion.user.label.submitdate";
    /**
     * 申请人
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelApplyUser = "requistion.user.label.applyuser";
    /**
     * 员工编号
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelEmployeeNo = "requistion.user.label.employeeno";
    /**
     * 职位
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelJobTitle = "requistion.user.label.jobtitle";
    /**
     * 工作城市
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelLocation = "requistion.user.label.location";
    /**
     * 汇报经理
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelLineManager = "requistion.user.label.linemanager";
    /**
     * 部门
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelOrg = "requistion.user.label.org";

    static LogTitle = "requistion.log.title";

    static ButtonSubmit = "requistion.button.submit";
    static ButtonApprove = "requistion.button.approve";
    static ButtonReject = "requistion.button.reject";
    static ButtonForward = "requistion.button.forward";
}

/**草稿*/
export class ProcDraftsPageLocale {
    /** 草稿箱 */
    static PropsHeaderTitle: string = "page.drafts.props.header.title";
    /*** 列名 流程定义标识*/
    static ColumnProcDefKey: string = "page.drafts.column.procdefkey";
    /*** 列名 流程定义名称*/
    static ColumnProcDefName: string = "page.drafts.column.procdefname";
    /*** 列名 创建人*/
    static ColumnCreatedBy: string = "page.drafts.column.createdby";
    /*** 列名 创建时间*/
    static ColumnCreated: string = "page.drafts.column.created";
    /*** 列名 数据*/
    static ColumnFormData: string = "page.drafts.column.form.data";
    /*** 列名 操作*/
    static ColumnControl: string = "page.drafts.column.contorl";
    /*** 列操作 删除*/
    static RowDelete: string = "page.drafts.row.delete";
}

/**快速链接*/
export class QuickLinksPageLocale {
    /** 快速链接 */
    static PropsHeaderTitle: string = "page.quicklinks.props.header.title";
    /*** 操作 添加*/
    static OperationAdd: string = "page.quicklinks.operation.add";
    /*** 操作 排序*/
    static OperationSort: string = "page.quicklinks.operation.sort";
    /*** 操作 保存排序*/
    static OperationSaveSort: string = "page.quicklinks.operation.save.sort";
    /*** 列名 图标*/
    static ColumnIcon: string = "page.quicklinks.column.icon";
    /*** 列名 名称*/
    static ColumnName: string = "page.quicklinks.column.name";
    /*** 列名 地址*/
    static ColumnLinkUrl: string = "page.quicklinks.column.link.url";
    /*** 列名 操作-编辑*/
    static ColumnOperationEdit: string = "page.quicklinks.column.operation.edit";
    /*** 列名 操作 -权限*/
    static ColumnOperationRight: string = "page.quicklinks.column.operation.right";
    /*** 列名 操作 -删除*/
    static ColumnOperationDelete: string = "page.quicklinks.column.operation.delete";

    /***新增Modal 添加快速链接 标题*/
    static AddModalTitle: string = "page.quicklinks.add.modal.title";
    /***编辑Modal 编辑快速链接标题*/
    static EditModalTitle: string = "page.quicklinks.edit.modal.title";
    /***  图标*/
    static ModalPropsIcon: string = "page.quicklinks.modal.props.icon";
    /***  图标描述*/
    static ModalPropsIconDescribe: string = "page.quicklinks.modal.props.icon.describe";
    /***  名称*/
    static ModalPropsName: string = "page.quicklinks.modal.props.name";
    /***  名称描述*/
    static ModalPropsNameDescribe: string = "page.quicklinks.modal.props.name.describe";
    /***  地址*/
    static ModalPropsUrl: string = "page.quicklinks.modal.props.url";
    /***  地址描述*/
    static ModalPropsUrlDescribe: string = "page.quicklinks.modal.props.url.describe";
    /*** 修改查看权限*/
    static PropsRightModalTitle: string = "page.quicklinks.right.modal.title";
    /**查看权限 */
    static PropsModeAuthority: string = "page.quicklinks.modal.authority";
    /**全部人员 */
    static PropsAllPerson: string = "page.quicklinks.modal.props.all.preson";
    /**特定人员 */
    static PropsSpecialPerson: string = "page.quicklinks.modal.props.special.person";
    /**页面打开方式 */
    static PropsOpenWith: string = "page.quicklinks.modal.props.open.with";
    /**当前窗口 */
    static PropsTargetSelf: string = "page.quicklinks.modal.props.target.self";
    /**新页面 */
    static PropsTargetBlank: string = "page.quicklinks.modal.props.target.blank";
    /***  上传不合规图标描述*/
    static TipIconDescribe: string = "page.quicklinks.tip.icon.describe";
    /***  保存成功*/
    static TipSaveSuccess: string = "page.quicklinks.tip.save.success";
    /***  保存失败*/
    static TipSaveFail: string = "page.quicklinks.tip.save.fail";
}

/** 委托*/
export class DelegatesPageLocale {
    /** 委托 */
    static PropsHeaderTitle: string = "page.delegate.props.header.title";
    /** search Key */
    static SearchKeyPlaceholder: string = "page.delegate.search.key.placeholder";
    /**添加 */
    static OperationAdd: string = "page.delegate.operation.add";
    /** 流程名称 */
    static ColumnProcessName: string = "page.delegate.column.name";
    /** Key */
    static ColumnKey: string = "page.delegate.column.key";
    /**开始时间 */
    static ColumnStartTime: string = "page.delegate.column.start.time";
    /**结束时间 */
    static ColumnEndTime: string = "page.delegate.column.ent.time";
    /**代理人 */
    static ColumnDelegate: string = "page.delegate.column.delegate.person";
    /**创建时间 */
    static ColumnCreated: string = "page.delegate.column.create.time";
    /**状态 */
    static ColumnStatus: string = "page.delegate.column.status";
    /**编辑 */
    static RowOperationEdit: string = "page.delegate.row.operation.edit";
    /**删除 */
    static RowOperationDelete: string = "page.delegate.row.operation.delete";
    /** add modal 添加委托 */
    static AddModalPropsTitle: string = "page.delegate.addmodal.props.header.title";
    /**add modal 流程名称 */
    static AddModalProcDef: string = "page.delegate.addmodal.procdef";
    /**add modal 委托说明 */
    static AddModalProcDefExplain: string = "page.delegate.addmodal.procdef.explain";
    /**add modal 请选择开始时间 */
    static AddModalChooseStartTime: string = "page.delegate.addmodal.please.choose.start.time";
    /**add modal 请选择结束时间 */
    static AddModalChooseEndTime: string = "page.delegate.addmodal.please.choose.end.time";
    /**add modal 开始日期 */
    static AddModalStartDay: string = "page.delegate.addmodal.start.day";
    /**add modal 结束日期 */
    static AddModalEndDay: string = "page.delegate.addmodal.end.day";
    /**add modal 请选择开始日期 */
    static AddModalChooseStartDay: string = "page.delegate.addmodal.please.choose.start.day";
    /**add modal 请选择结束日期 */
    static AddModalChooseEndDay: string = "page.delegate.addmodal.please.choose.end.day";
    /**add modal 代理人 */
    static AddModalDelegate: string = "page.delegate.addmodal.delegate.person";
    /**add modal 启用 */
    static AddModalEnable: string = "page.delegate.addmodal.endable";
    /**add modal 事由 */
    static AddModalReason: string = "page.delegate.addmodal.reason";
    /**edit modal 编辑委托 */
    static EditModalPropsTitle: string = "page.delegate.editmodal.props.header.title";
    /**Edit modal 流程名称 */
    static EditModalProcDef: string = "page.delegate.editmodal.procdef";
    /**Edit modal 请选择开始时间 */
    static EditModalChooseStartTime: string = "page.delegate.editmodal.please.choose.start.time";
    /**Edit modal 请选择结束时间 */
    static EditModalChooseEndTime: string = "page.delegate.editmodal.please.choose.end.time";
    /**Edit modal 开始日期 */
    static EditModalStartDay: string = "page.delegate.editmodal.start.day";
    /**Edit modal 结束日期 */
    static EditModalEndDay: string = "page.delegate.editmodal.end.day";
    /**Edit modal 请选择开始日期 */
    static EditModalChooseStartDay: string = "page.delegate.editmodal.please.choose.start.day";
    /**Edit modal 请选择结束日期 */
    static EditModalChooseEndDay: string = "page.delegate.editmodal.please.choose.end.day";
    /**edit modal 代理人 */
    static EditModalDelegate: string = "page.delegate.editmodal.delegate.person";
    /**edit modal 启用 */
    static EditModalEnable: string = "page.delegate.editmodal.endable";
    /**edit modal 事由 */
    static EditModalReason: string = "page.delegate.editmodal.reason";
    /**该流程定义已被使用！ The process definition has been used*/
    static TipHasUsed: string = "page.delegate.tip.has.used";
    /**批量 */
    static OperationBatch: string = "page.delegate.operation.batch";
    /**Tip 流程名称不能为空 */
    static TipWorkFlow: string = "page.delegate.tip.workflow";
    /**Tip 任务已被委托给{name} */
    static TipAssignedName: string = "page.delegate.tip.assigned.name";
}

/**报表*/
export class ReportPageLocale {

    static HomeTitle: string = "page.report.home.title";
    /**请假申请标题 */
    static LeaveRequestReportTitle: string = "page.report.leaverequest.title";
    /**出差申请标题 */
    static TravelRequestReportTitle: string = "page.report.travelrequest.title";
    /**付款申请标题 */
    static PaymentRequestReportTitle: string = "page.report.paymentrequest.title";
    /**借款申请标题 */
    static CashRequestReportTitle: string = "page.report.cashrequest.title";
    /**日常报销申请标题 */
    static DailyReimbursementReportTitle: string = "page.report.dailyreimbursement.title";
    /**出差报销申请标题 */
    static TravelExpenseReportTitle: string = "page.report.travelexpense.title";
    /**名片申请标题 */
    static BusinessCardReportTitle: string = "page.report.businesscard.title";
    /**机票预订申请标题 */
    static BookingFlightReportTitle: string = "page.report.flight.title";
    /**酒店预订申请标题 */
    static BookingHotalReportTitle: string = "page.report.hotal.title";
    /**用车申请标题 */
    static BookingCarReportTitle: string = "page.report.car.title";

    /**请假申请名称 */
    static LeaveRequestName: string = "page.report.leaverequest.name";
    /**出差申请名称 */
    static TravelRequestName: string = "page.report.travelrequest.name";
    /**付款申请名称 */
    static PaymentRequestName: string = "page.report.paymentrequest.name";
    /**借款申请名称 */
    static CashRequestName: string = "page.report.cashrequest.name";
    /**日常报销申请名称 */
    static DailyReimbursementName: string = "page.report.dailyreimbursement.name";
    /**出差报销申请名称 */
    static TravelExpenseName: string = "page.report.travelexpense.name";
    /**名片申请名称 */
    static BusinessCardName: string = "page.report.businesscard.name";
    /**机票预订申请名称 */
    static BookingFlightName: string = "page.report.flight.name";
    /**酒店预订申请名称 */
    static BookingHotalName: string = "page.report.hotal.name";
    /**用车申请名称 */
    static BookingCarName: string = "page.report.car.name";
    static ReportSuffixTitle: string = "page.report.suffix.title";

    /**报表导出按钮标题 */
    static ExportButtonTitle: string = "page.report.export.button.title";

    static StartDateHoldStr: string = "page.report.startdateholdstr";
    static EndDateHoldStr: string = "page.report.enddateholdstr";
    static SearchButtonTitle: string = "page.report.searchbuttontitle";

    /**流程编号 */
    static PropsProcessID: string = "page.report.props.process.id";

    /**标题格式化 */
    static PropsTitleFormat: string = "page.report.title.format";
}

/**  Common */
export class CommonLocationLocale {
    /**提示 */
    static Tip: string = "common.tip";

    /**添加成功 */
    static AddSuccess: string = "common.add.success";
    /**编辑成功 */
    static EditSuccess: string = "common.edit.success";
    /**删除成功 */
    static DeleteSuccess: string = "common.delete.success";
    /**添加失败 */
    static AddFail: string = "common.add.fail";
    /**编辑失败 */
    static EditFail: string = "common.edit.fail";
    /**删除失败 */
    static DeleteFail: string = "common.delete.fail";
    /**禁用成功 */
    static DisabledSuccess: string = "common.disabled.success";
    /**启用成功 */
    static EnabledSuccess: string = "common.enabled.success";
    /**禁用失败 */
    static DisabledFail: string = "common.disabled.fail";
    /**启用失败 */
    static EnabledFail: string = "common.enabled.fail";
    /**未选择字段 */
    static SelectNoFile: string = "common.select.nofile";
    static FlowClassifyName: string = "common.flowclassify.alreadyexist";

    /**必填信息不可为空 */
    static ValidaMessage: string = "common.validate.message";
    /**默认值不可为空 */
    static ValidaDefaultValueMsg: string = "common.validate.default.message";
    /**资源文件不存在 */
    static ResourceUnExist: string = "common.resouce.not.exist";
    /**请选择转办人 */
    static ChooseTransfer: string = "common.choose.transfer";

    /**保存并编辑 */
    static BtnSaveAndEdit: string = "common.btn.save.and.edit";
    /**添加 */
    static BtnAdd: string = "common.btn.add";
    /**获取出错 */
    static GetInfoError: string = "common.getinfo.error";

    /**您确定要删除 xxx : xxx 吗？eg:您确定要删除流程分类：测试流程 吗？ */
    static DeleteConfirmWithCategory: string = "common.delete.confirm.category.msg";
    /**您确定要删除 xxx 吗？eg:您确定要删除 测试流程 吗？ */
    static DeleteConfirm: string = "common.delete.confirm.msg";
    /**您确定要删除控件"xxx"吗？eg:您确定要删除控件"测试流程"吗？ */
    static DeleteControlConfirm: string = "common.delete.control.confirm.msg";
    /**是否同时删除关联变量"xxx". eg:是否同时删除关联变量"金额". */
    static DeleteControlVariableConfirm: string = "common.delete.control.variable.confirm.msg";


    /**您确定要 xxx: xxx 吗？eg:您确定要 启用 测试流程 吗？ */
    static UpdateConfirm: string = "common.update.confirm.msg";

    /**图标 */
    static PropsIcon: string = "common.props.icon";
    /**图标描述 */
    static PropsIconDescribe: string = "common.props.icon.describe";
    /**上传图片出差描述 */
    static TipIconWarning: string = "common.tip.icon.warning";

    /**查看权限 */
    static PropsSeeRight: string = "common.props.see.right";
    /**全部人员 */
    static PropsAllPersion: string = "common.props.all.persion";
    /**特定人员 */
    static PropsSpecialPersion: string = "common.props.special.persion";

    /**保存成功 */
    static TipSaveSuccess: string = "common.tip.save.suceess";
    /**保存失败 */
    static TipSaveFail: string = "common.tip.save.fail";
    /**清除默认值 */
    static PropsClearDefault: string = "common.props.clear.default";
    /**请上传正确格式的文件 */
    static UploadFormatError: string = "common.upload.format.error";
    /**请上传正确的模板 */
    static UploadFormatCorrect: string = "common.upload.format.correct";
    /**请上传正确的模板 */
    static SelectImport: string = "common.select.import";
    /** 选择文件 */
    static SelectFile: string = "common.select.file";
    /** 上传文件为空 */
    static TipFileSizeNull: string = "common.tip.file.size.null";
    /*流程下拉*/
    static ProcessDropDown: string = "common.process.dropdown";
}

/** 流程设计器 */
export class ProcModelDesignerPageLocale {
    /**  流程名称 */
    static PropsName: string = "page.procmodel.designer.name";
    /** 流程分类 */
    static PropsCategory: string = "page.procmodel.designer.category";
    /**版本 */
    static PropsVersion: string = "page.procmodel.designer.props.version";
    /**流程编号 */
    static PropsProcessID: string = "page.procmodel.designer.props.process.id";
    /**修改 流程编号 */
    static OperationEditProcessID: string = "page.procmodel.designer.operation.edit.process.id";
    /**弹窗 位数 */
    static PropsDialogDigit: string = "page.procmodel.designer.dialog.digit";
    /**弹窗 起始于 */
    static PropsDialogStartAt: string = "page.procmodel.designer.dialog.start.at";
    /**弹窗 流程编号 */
    static PropsDialogTitle: string = "page.procmodel.designer.dialog.title";
    /**弹窗 编号预览 */
    static PropsDialogNumberPreview: string = "page.procmodel.designer.dialog.number.preview";
    /**规则类型 固定字符 */
    static PropsFixedCharacter: string = "page.procmodel.designer.fixed.character";
    /**规则类型 自增数字 */
    static PropsAutoNumber: string = "page.procmodel.designer.auto.number";
    /**规则类型 连接符 */
    static PropsConnector: string = "page.procmodel.designer.connector";
    /**规则类型 时间 */
    static PropsTime: string = "page.procmodel.designer.time";
    /**规则类型 日期 */
    static PropsDate: string = "page.procmodel.designer.date";
    /**获取规则信息出错 */
    static TipGetRulesError: string = "page.procmodel.designer.tip.getrules.error";
    /**保存成功 */
    static TipSaveSuccess: string = "page.procmodel.designer.tip.save.success";
    /**保存失败 */
    static TipSaveFail: string = "page.procmodel.designer.tip.save.fail";
    /**发布成功 */
    static TipDeploySuccess: string = "page.procmodel.designer.tip.deploy.success";
    /**发布失败 */
    static TipDeployFail: string = "page.procmodel.designer.tip.deploy.fail";
    /**流程编号不可超过50个字符 */
    static TipRulesLength: string = "page.procmodel.designer.tip.ruleslength";
    /**xxx 必须唯一*/
    static TipUniqueValue: string = "page.procmodel.designer.tip.unique.value";
}

/**报表*/
export class ProcessReportPageLocale {
    /** 流程报表 */
    static PropsHeaderTitle: string = "page.report.props.header.title";
    /*** 绩效报表*/
    static PropsAchievements: string = "page.report.achievements";
    /*** 新建*/
    static OperationAdd: string = "page.report.operation.add";
    /*** 图标*/
    static ColumnIcon: string = "page.report.column.icon";
    /*** 报表名称*/
    static ColumnName: string = "page.report.column.name";
    /*** 报表描述*/
    static ColumnDescribe: string = "page.report.column.describe";
    /*** 所属流程*/
    static ColumnFlowPath: string = "page.report.column.flow.path";
    /*** 状态*/
    static ColumnStatus: string = "page.report.column.status";
    /*** 已启用*/
    static PropsEnable: string = "page.report.props.enable";
    /*** 已禁用*/
    static PropsDisable: string = "page.report.props.disable";
    /***  禁用*/
    static OperationDisable: string = "page.report.operate.disable";
    /***  启用*/
    static OperationEnable: string = "page.report.operate.enable";
    /*** 编辑属性*/
    static OperationEditProps: string = "page.report.operation.eidt.props";
    /***修改权限*/
    static OperationEditRight: string = "page.report.operation.eidt.right";
    /***修改报表*/
    static OperationEditReport: string = "page.report.operation.eidt.report";
    /***  新建报表*/
    static ModalTitle: string = "page.report.modal.title";
    /***  编辑*/
    static ModalEditTitle: string = "page.report.modal.edit.title";
    /***  修改查看权限*/
    static ModalEditRightTitle: string = "page.report.modal.edit.right.title";
    /***  报表名称*/
    static ModalReportName: string = "page.report.modal.report.name";
    /***  报表名称描述*/
    static ModalReportNameDescribe: string = "page.report.modal.report.name.describe";
    /*** 报表描述*/
    static ModalReportDescribe: string = "page.report.modal.report.describe";
    /**报表描述 Placeholder */
    static ModalReportPlaceholder: string = "page.report.report.placeholder";
    /**所属流程 */
    static ModalFlowPath: string = "page.report.modal.flow.path";
    /**btn 下一步 */
    static OperationBtnNext: string = "page.report.modal.operate.btn.next";
    /** 名称 */
    static ReportFileName: string = "page.report.modal.reportfile.name";
    /** 显示名称 */
    static ReportShowFileName: string = "page.report.modal.reportfile.showname";
    /** 排序 */
    static ReportFileSort: string = "page.report.modal.reportfile.sort";
    /** 关联变量 */
    static ReportFileVariable: string = "page.report.modal.reportfile.variable";
    /** 变量类型 */
    static ReportFileVariableType: string = "page.report.modal.reportfile.variableType";
    /** 已删除 */
    static ReportDeleteData: string = "page.report.modal.reportfile.deletedata";
    /**设置报表字段 */
    static SetReportFile: string = "page.report.modal.reportfiletitle";
    /**过滤设置 */
    static FilterSettings: string = "page.report.modal.reportfiltersettings";
    /**自定义变量 */
    static CustomizedVariables: string = "page.report.modal.reportfilter.customized";
    /**内置变量 */
    static BuildinVariables: string = "page.report.modal.reportfilter.buildin";
    /**过滤说明 */
    static FilterDescriptions: string = "page.report.modal.reportfilter.filterdescriptions";
    /**选择变量 */
    static ChooseFilterVariables: string = "page.report.modal.reportfilter.choosefiltervariables";
    /**添加*/
    static AddVariables: string = "page.report.modal.reportfilter.addvariables";
    /**选择字段*/
    static SelectField: string = "page.report.modal.reportfilter.select.field";
    /**删除 */
    static FilterRemove: string = "page.report.modal.reportfilter.remove";
    /**隐藏 */
    static FilterHide: string = "page.report.modal.reportfilter.hide";
    /**设置固定值 */
    static FilterFixedValue: string = "page.report.modal.reportfilter.fixedvalue";
    /**true */
    static FilterBooleanOptionTrue: string = "page.report.modal.reportfilter.booleantrue";
    /**false */
    static FilterBooleanOptionFalse: string = "page.report.modal.reportfilter.booleanfalse";
    /**起始日期*/
    static FilterStartDate: string = "page.report.modal.reportfilter.startdate";
    /**结束日期*/
    static FilterEndDate: string = "page.report.modal.reportfilter.enddate";
    /**创建*/
    static Create: string = "page.report.modal.reportfilter.create";
    /**修改*/
    static Modified: string = "page.report.modal.reportfilter.modified";
    /**列表字段至少选择一个列表字段*/
    static ListCheck: string = "page.report.modal.reportfilter.list.check.more.than.one";
    /**列表字段只能选择一个*/
    static ReportLen: string = "page.report.modal.reportfilter.report.length";
    /**自定义显示名称*/
    static ReportShowName: string = "page.report.modal.reportfilter.report.showname";

}
export class DashBoardPageLocale {
    /**流程编号*/
    static ProcessNumber: string = "page.dashboard.table.header.processnumber";
    /**流程名称*/
    static ProcessName: string = "page.dashboard.table.header.processname";
    /**流程分类*/
    static ProcessClassification: string = "page.dashboard.table.header.processclassification";
    /**申请人*/
    static Applicant: string = "page.dashboard.table.header.applicant";
    /**申请部门*/
    static ApplyForDepartment: string = "page.dashboard.table.header.applyfordepartment";
    /**任务名称*/
    static TaskName: string = "page.dashboard.table.header.taskname";
    /**经办人*/
    static Agent: string = "page.dashboard.table.header.agent";
    /**错误代码*/
    static ErrorCode: string = "page.dashboard.table.header.errorcode";
    /**查看*/
    static View: string = "page.dashboard.table.header.view";
    /**流程数 */
    static Processthetitle: string = "page.dashboard.table.header.processthetitle";
    /**任务数 */
    static Tasktitle: string = "page.dashboard.table.header.tasktitle";
    /**all流程数 */
    static AllProcessthetitle: string = "page.dashboard.table.header.allprocessthetitle";
    /**all任务数 */
    static AllTasktitle: string = "page.dashboard.table.header.alltasktitle";
    /**超时任务 */
    static OverTimeTask: string = "page.dashboard.table.header.overtimetask";
    /**出错流程*/
    static ErrorProcess: string = "page.dashboard.table.header.errorprocess";
    /**更多*/
    static More: string = "page.dashboard.table.header.more";
    /**流程分类及活动流程数量 */
    static DashBoardPieTitle: string = "page.dashboard.chart.title.pie";
    /**部门活动流程数量 */
    static DashBoardTreeMapTitle: string = "page.dashboard.chart.title.treemap";
    /**流程活动运行时间统计 */
    static DashBoardRangeTitle: string = "page.dashboard.chart.title.range";
    /**正常及超时活动流程数量 */
    static DashBoardHollowTitle: string = "page.dashboard.chart.title.hollow";
    /**单位小时*/
    static UintHours: string = "page.dashboard.chart.unit.hours";
    /**单位分钟*/
    static UintMinutes: string = "page.dashboard.chart.unit.minutes";
    /**运行时间 */
    static RunTime: string = "page.dashboard.chart.key.name.runtime";
    /**流程分类 */
    static FlowClassification: string = "page.dashboard.chart.key.name.flowclassification";
}
export class DepartmentPageLocale {
    /**提交总数title*/
    static SubmitNumberTitle: string = "page.department.alltitle.submittitle";
    /**经办流程总数title */
    static AssignedProcessTitle: string = "page.department.alltitle.assignedprocesstitle";
    /**经办任务总数title */
    static AssignedTasksTitle: string = "page.department.alltitle.assignedtasktitle";
    /**活动及已完成流程数量 */
    static ActivityAndCompleted: string = "page.department.chart.title.activityandcompleted";
    /**流程数量统计-按提交时间 */
    static ProcessSubmitTime: string = "page.department.chart.title.processsubmittime";
    /**正常及超时运行流程数量 */
    static NormalTimeoutRun: string = "page.department.chart.title.normaltimeoutrun";
    /**任务平均完成时间 - 经办 */
    static AverageCompletionTime: string = "page.department.chart.title.averagecompletiontime";
    /**任务平均完成时间 - 发起*/
    static StartCompletionTime: string = "page.department.chart.title.startcompletiontime";
    /**任务人时间效率 */
    static TaskTimeEfficiency: string = "page.department.chart.title.tasktimeefficiency";
    /**任务完成数量 */
    static NumberTasksCompleted: string = "page.department.chart.title.numbertaskscompleted";
    /**全部年份 */
    static allYear: string = "page.department.chart.placeholder.allyear";
    /**全部月份 */
    static allMonth: string = "page.department.chart.placeholder.allmonth";
    /**年 */
    static UnitYear: string = "page.department.chart.unit.year";
    /**月 */
    static UnitMonth: string = "page.department.chart.unit.month";
    /**日期 */
    static UnitDate: string = "page.department.chart.unit.date";
    /**暂无数据 */
    static NoData: string = "page.department.chart.tip.nodata";
    /**已完成*/
    static Completed: string = 'page.department.chart.key.name.completed';
    /**活动*/
    static Activity: string = 'page.department.chart.key.name.activity';
    /**流程 */
    static Process: string = 'page.department.chart.key.name.process';
    /**平均时间 */
    static AverageTime: string = 'page.department.chart.key.name.averagetime';
    /**范围 */
    static Range: string = 'page.department.chart.key.name.range';
    /**平均 */
    static Average: string = 'page.department.chart.key.name.average';
    /**正常 */
    static Normal: string = 'page.department.chart.key.name.normal';
    /**超时 */
    static Overtime: string = 'page.department.chart.key.name.overtime';
    /**状态 */
    static Status: string = 'page.department.chart.key.name.status';
    /**部门 */
    static Department: string = 'page.department.chart.key.name.department';
}
export class FormcraftLocale {
    static FormValidateMessage = "formcraft.form.validate.message";
    // static RuleEffect = "formcraft.rules.effect";
    // static RuleNew = "formcraft.rules.new";
    // static RuleEditor = "formcraft.rules.editor";
    // /**请输入意见*/
    // static ApprovalOpinion = "formcraft.placeholder.approval.opinion";
    // /**
    //  * 是否退出
    //  */
    static BtnExitConfirmTitle = "formcraft.btn.confirm.title";
    // /**标签 */
    static PropsLabel = "formcraft.props.label";
    // /**输入框 */
    // static PropsInput = "formcraft.props.input";
    // /**数字输入框 */
    // static PropsNumberInput = "formcraft.props.numberinput";
    // /**日期 */
    // static PropsDatePicker = "formcraft.props.datepicker";
    // /**列表 */
    // static PropsList = "formcraft.props.list";
    // /**
    //  * 文件上传
    //  */
    // static PropsFileUpload = "formcraft.props.fileupload";
    // /**申请人信息 */
    // static PropsApplicantInfo = "formcraft.props.applicant.info";
    // /**流程日志 */
    // static PropsWorkflowHistory = "formcraft.props.workflowhistory";
    // /**任务面板 */
    // static PropsTaskPanel = "formcraft.props.taskpanel";
    // /**栅格 */
    // static PropsGrid = "formcraft.props.grid";
    // /**动态栅格 */
    // static PropsFlexGrid = "formcraft.props.flexgrid";
    // /**分割线 */
    // static PropsLine = "formcraft.props.line";
    // /**区域 */
    // static PropsSection = "formcraft.props.section";
    // /**标签页 */
    // static PropsTab = "formcraft.props.tab";
    // /**向导 */
    // static PropsWizard = "formcraft.props.wizard";
    // /**默认值 */
    // static PropsDefaultValue = "formcraft.props.defaultvalue";
    // /**显示标签 */
    // static PropsDisplayLabel = "formcraft.props.dispalylabel";
    // /**只读 */
    // static PropsReadonly = "formcraft.props.readonly";
    // /**是否委托 */
    // static PropsCanDelegate = "formcraft.props.candelegate";
    // /**数据绑定 */
    // static PropsBinding = "formcraft.props.binding";
    // /**类型 */
    // static PropsType = "formcraft.props.type";
    // /**宽度 */
    // static PropsWidth = "formcraft.props.width";
    // /**选择类型 */
    // static PropsChooseType = "formcraft.props.choosetype";
    // /**将控件拖到此处 */
    // static PropsDragControls = "formcraft.props.dragcontorls";
    // /**控件 */
    static PropsControls = "formcraft.props.controls";
    // /**布局 */
    static PropsLayouts = "formcraft.props.layouts";
    // /**基础控件 */
    static PropsBasic = "formcraft.props.basic";
    // /**用户字段 */
    static PropsSystemVariables = "formcraft.props.system.variables";
    // /**流程变量 */
    static PropsVariables = "formcraft.props.variables";
    // /**复杂类型定义 */
    static PropsComplex = "formcraft.props.complex";
    // /**流程节点字段 */
    static PropsTask = "formcraft.props.task";
    // /**表格控件 */
    static PropsFormControls = "formcraft.props.formcontorls";
    // /**申请表 */
    static PropsApplicationForm = "formcraft.props.applicationform";
    // /**规则 */
    // static PropsRules = "formcraft.props.rules";
    // /**预览 */
    static PropsPreview = "formcraft.props.preview";
    // /**保存 */
    static PropsSave = "formcraft.props.save";
    // /**退出 */
    static PropsExit = "formcraft.props.exit";
    // /**请先绑定变量数据 */
    // static PropsBindVariable = "formcraft.props.bind.variable";
    // /**绑定变量不存在 */
    // static PropsVariableUnExist = "formcraft.props.variable.unexist";
    // /**绑定列表不存在 */
    // static PropsListUnExist = "formcraft.props.list.unexist";
    // /**选择列表字段 */
    // static PropsSelectFields = "formcraft.props.select.fields";
    // /**请在设置中定义列表字段 */
    // static PropsDefineFields = "formcraft.props.definefields";
    // /**字段 */
    // static PropsFields = "formcraft.props.fields";
    // /**设置字段 */
    // static PropsSetFields = "formcraft.props.setfields";
    // /**设置搜索条件 */
    // static PropsSetFilters = "formcraft.props.setfilters";
    // /**设置查阅项 */
    // static PropsSetLookup = "formcraft.props.setlookup";

    // static VariableNotExist = "formcraft.variable.notexist";

    // static ListNoData = "formcraft.list.nodata";
    // static ListSummaryNote = "formcraft.list.summary.note";
    // static ListSummaryDuplicate = "formcraft.list.summary.duplicate";
    // static ListSummaryEditor = "formcraft.list.summary.editor";
    // static ListSummaryDisplay = "formcraft.list.summary.display";
    // static ListSummary = "formcraft.list.summary";
    // static ListSummaryTypePre = "formcraft.list.summary.";
    // static ListSummaryTotal = "formcraft.list.summary.total";
    // static ListSummaryAvg = "formcraft.list.summary.avg";
    // static ListSummaryMin = "formcraft.list.summary.min";
    // static ListSummaryMax = "formcraft.list.summary.max";
    // /**多行文本输入框 */
    // static PropsTextarea = "formcraft.props.textarea";
    // /**富文本 */
    // static PropsRichText = "formcraft.props.richtext";
    // /**下拉框 */
    // static PropsSelect = "formcraft.props.select";
    // /**元数据 */
    // static PropsMetadata = "formcraft.props.metadata";
    // /**单选框 */
    // static PropsRadio = "formcraft.props.radio";
    // /**勾选框 */
    // static PropsCheckbox = "formcraft.props.checkbox";
    // /**时间 */
    // static PropsTime = "formcraft.props.time";
    // /**日期范围 */
    // static PropsDateRange = "formcraft.props.daterange";
    // /**按钮 */
    // static PropsButton = "formcraft.props.button";
    // /**货币 */
    // static PropsCurrency = "formcraft.props.currency";
    // /**最小值 */
    // static PropsMin = "formcraft.props.min";
    // /**最大值 */
    // static PropsMax = "formcraft.props.max";
    // /**步数 */
    // static PropsStep = "formcraft.props.step";
    // /**字体大小 */
    // static PropsFontSize = "formcraft.props.fontsize";
    // /**颜色 */
    // static PropsColor = "formcraft.props.color";
    // /**行数 */
    // static PropsGridRow = "formcraft.props.gridrow";
    // /**列数 */
    // static PropsGridCol = "formcraft.props.gridcol";
    // /**选择颜色 */
    // static PropsChooseColor = "formcraft.props.choosecolor";
    // /**整数 */
    // static PropsIntNumber = "formcraft.props.intnumber";

    // static PropsCanFold = "formcraft.props.canfold";
    // /**请先绑定以下元素值 */
    // static PropsTipBindValues = "formcraft.tip.binding.values";

    // static PropsChoices = "formcraft.props.choices";

    // static CategoryAppearance = "formcraft.category.appearance";
    // static CategoryValidation = "formcraft.category.validation";
    // static CategoryPermission = "formcraft.category.permission";
    // static CategoryRule = "formcraft.category.rule";
    // static CategoryData = "formcraft.category.data";
    // static CategoryChoices = "formcraft.category.choices";
    // static CategoryLookup = "formcraft.category.lookup";
    // static BindingMismatched = "formcraft.binding.mismatched";
    // static BindingFieldId = "formcraft.binding.fieldid";
    static BindingFieldName = "formcraft.binding.fieldname";
    // static BindingFieldLabelUpdateAsName = "formcraft.binding.field.label.update.as.name";
    // /**显示时间 */
    // static PropsShowTime = "formcraft.props.showtime";
    // /**textArea 最小行数 */
    // static PropsTextAreaMinRows = "formcraft.props.textarea.minrows";
    // /**textArea 最大行数 */
    // static PropsTextAreaMaxRows = "formcraft.props.textarea.maxrows";
    // /**必填项 */
    // static PropsRequired = "formcraft.props.required";
    // /**显示标题 */
    // static PropsShowTitle = "formcraft.props.show.title";
    // /**开始时间 水印 */
    // static PropsDateStartHolder = "formcraft.props.date.start.holder";
    // /**结束时间 水印 */
    // static PropsDateEndHolder = "formcraft.props.date.end.holder";
    // /**用户 */
    // static PropsIdentityPicker = "formcraft.props.identitypicker";
    // /**是否多选 */
    // static PropsMultiple = "formcraft.props.multiple";
    // /**最大长度 */
    // static PropsMaxLength = "formcraft.props.maxlength";
    // /**文本内容 */
    // static PropsTxtContent = "formcraft.props.txt.content";
    // /**Identity 最大人数 */
    // static PropsMaxSelection = "formcraft.props.maxselection";
    // /**最大个数 */
    // static PropsMaxCount = "formcraft.props.maxcount";
    // /**Switch 开关*/
    // static PropsSwitch = "formcraft.props.switch";
    // /**Switch OFF 关*/
    // static PropsOFF = "formcraft.props.switch.off";
    // /**Switch ON 开*/
    // static PropsON = "formcraft.props.switch.on";
    // /**公式*/
    // static PropsFormula = "formcraft.props.formula";
    // /**计算列*/
    // static PropsCalculated = "formcraft.props.calculated";
    // /**流程日志 原*/
    // static PropsFrom = "formcraft.props.history.from";
    // /**选择转签人*/
    // static PropsChooseAssignee = "formcraft.props.choose.assignee";
    // /**数字精度*/
    // static PropsNumberDigit = "formcraft.props.number.digit";
    // /**提示 最大值为 xx*/
    // static TipPropsMaxNumber = "formcraft.tip.props.maxnumber";
    // /**iif函数 */
    // static FormulaFuncIIF = "formcraft.formula.func.iif";
    // /**iisNullOrEmpty函数 */
    // static FormulaFuncIsNullOrEmpty = "formcraft.formula.func.isNullOrEmpty";
    // /**len函数 */
    // static FormulaFuncLen = "formcraft.formula.func.len";
    // /**strIndex函数 */
    // static FormulaFuncStrIndex = "formcraft.formula.func.strIndex";
    // /**listLookup函数 */
    // static FormulaFuncListLookup = "formcraft.formula.func.listLookup";
    // /**listLookup函数Filter参数 */
    // static FormulaFuncListLookupFilter = "formcraft.formula.func.listLookupfilter";
    // /**listLookup函数Filter说明 */
    // static FormulaFuncListLookupFilterDesc = "formcraft.formula.func.listLookupfilterdesc";
    // /**当前对象 */
    // static FormulaCurrentObj = "formcraft.formula.currentobj";
    // /**表达式错误 */
    // static FormulaError = "formcraft.formula.error";
    // /**空字符串显示 */
    // static FormulaStrEmpty = "formcraft.formula.string.empty";
    // /**加图标文字提示 */
    // static FormulaIconPlus = "formcraft.formula.icon.plus";
    // /** 处理人 */
    // static TaskTableActorUser = "formcraft.task.table.title.actorUser";
    // /** 子任务 */
    // static TaskTableSubtask = "formcraft.task.table.title.subtask";
    // /** 状态 */
    // static TaskTableStatues = "formcraft.task.table.title.status";
    // /** 开始时间 */
    // static TaskTableStartTime = "formcraft.task.table.title.startTime";
    // /** 结束时间 */
    // static TaskTableEndTime = "formcraft.task.table.title.endTime";
    // /** 开启层级 */
    // static PropsOpenHierarchy = "formcraft.props.open.hierarchy";
    // /** 成本中心 */
    // static PropsCostCenter = "formcraft.props.costcenter";
    // /** 组织 */
    // static PropsOrganization = "formcraft.props.organization";
    // /** 查阅项 */
    // static PropsLookup = "formcraft.props.lookup";
    // /** 显示列 */
    // static PropsListField = "formcraft.props.listfield";
    // /** 搜索条件 */
    // static PropsListFilter = "formcraft.props.listfilter";
    // /** 任务待领用*/
    // static PropWaitReceive = "formcraft.props.wait.receive";
    // /** 富文本*/
    // static PropKindEditor = "formcraft.props.kindeditor";
    // /** 富文本 选择工具栏*/
    // static PropKindEditorSetToolBar = "formcraft.props.kindeditor.set.toolbar";
    // /** 关联字段 */
    // static PropAssociated = "formcraft.props.associated";
    // /** 全部只读 */
    // static PropAllReadonly = "formcraft.props.allreadonly";
    // /** 全部非只读 */
    // static PropAllNotReadonly = "formcraft.props.allnotreadonly";
    // /** 不设置 */
    // static PropNotSet = "formcraft.props.notset";
    /** 页面设置*/
    static PropPageSetting = "formcraft.props.page.setting";
    /** 控件设置*/
    static PropControlSetting = "formcraft.props.control.setting";
    /** 页面名称 */
    static PropPageName = "formcraft.props.page.setting.name";
    /** 页面标题 */
    static PropPageTitle = "formcraft.props.page.setting.title";
    /** 页面标签将显示在浏览器页签上，建议使用流程名称 */
    static PropPageTitleSuffix = "formcraft.props.page.setting.title.suffix";
    /** 页面类型 */
    static PropPageType = "formcraft.props.page.setting.type";
    /** 申请页面 */
    static PropRequestPage = "formcraft.props.request.page";
    /** 任务页面 */
    static PropTaskPage = "formcraft.props.task.page";
    /** 批量设置控件属性 */
    static PropAllReadOnly = "formcraft.props.all.read.only";
    /** 只读 */
    static PropReadOnlyOpen = "formcraft.props.read.only.open";
    /** 可写 */
    static PropReadOnlyShut = "formcraft.props.read.only.shut";
    /** 表单控件*/
    static PropFormControl = "formcraft.props.control.form";
    /** 列表字段*/
    static PropListFields = "formcraft.props.control.list";
}

/*绩效报表*/
export class AchievementsLocale {
    /*绩效报表*/
    static AchievementsTitle: string = "admin.achievementsHome.title";
    /*流程绩效报表*/
    static AchievementsProcess: string = "admin.achievementsHome.process";
    /*部门绩效报表*/
    static AchievementsOrg: string = "admin.achievementsHome.org";
    /*进入*/
    static GoAchievementsReport: string = "admin.achievementsHome.report";
    /*所有部门*/
    static AllOrganization: string = "admin.achievements.organization";
    /*新提交流程数*/
    static NewSubmitWorkflow: string = "admin.achievements.newsubmitworkflow";
    /*活动任务数*/
    static ActiveTask: string = "admin.achievements.activetask";
    /*各部门新提交及已完成流程数*/
    static NewAndCompletedWorkflow: string = "admin.achievements.new.and.completed.workflow";
    /*流程数量统计-按提交时间*/
    static WorkflowCountForTime: string = "admin.achievements.workflow.count.for.time";
    /*任务数量和时间统计*/
    static TaskCount: string = "admin.achievements.task.count";
    /*超时任务明细*/
    static TaskOvertime: string = "admin.achievements.task.overtime";
    /*经办部门*/
    static TableDepartment: string = "admin.achievements.table.department";
    /*任务所有者*/
    static TableTaskOwner: string = "admin.achievements.table.task.owner";
    /*任务名称*/
    static TableTaskName: string = "admin.achievements.table.task.name";
    /*任务数*/
    static TableTaskNumber: string = "admin.achievements.table.task.number";
    /*平均处理时间（小时）*/
    static TableAverageTime: string = "admin.achievements.table.average.time";
    /*流程编号*/
    static TableWorkflowNo: string = "admin.achievements.table.workflowNo";
    /*流程名称*/
    static TableWorkflowName: string = "admin.achievements.table.workflow.name";
    /*•	预期(小时)*/
    static TableExpectedHours: string = "admin.achievements.table.expected.hours";
    /*耗时（小时）*/
    static TableTimeConsuming: string = "admin.achievements.table.consuming.time";
    /*请选择一个流程*/
    static PleaseSelectWorkflow: string = "admin.achievements.please.select.workflow";
    /*全部月份*/
    static SearchAllMonth: string = "admin.achievements.search.all.month";
    /*月份*/
    static SearchMonth: string = "admin.achievements.search.month";
    /*年份*/
    static SearchYear: string = "admin.achievements.search.year";
    /*全部年份*/
    static SearchAllYear: string = "admin.achievements.search.all.Year";
    /*月份单位*/
    static ChartMonth: string = "admin.achievements.chart.month";
    /*年份单位*/
    static ChartYear: string = "admin.achievements.chart.year";
    /*日期单位*/
    static ChartDay: string = "admin.achievements.chart.day";
    /*完成数量*/
    static ChartCompleteNum: string = "admin.achievements.chart.complete.num";
    /*未完成数量*/
    static ChartUnCompleteNum: string = "admin.achievements.chart.uncomplete.num";
    /*提交数量*/
    static ChartSubmitNum: string = "admin.achievements.chart.submit.num";
    /*完成情况*/
    static ChartCompleteSituation: string = "admin.achievements.chart.complete.situation";
    /*暂无数据*/
    static ChartNotData: string = "admin.achievements.chart.not.data";
    /*提交时间*/
    static ChartSubmitDate: string = "admin.achievements.chart.submit.date";
    /*运行时间*/
    static ChartRunningTime: string = "admin.achievements.chart.running.time";
    /*平均时间*/
    static ChartTaverageTime: string = "admin.achievements.chart.average.time";
    /*任务完成时间-按经办人部门*/
    static ChartOwnerDuration: string = "admin.achievements.chart.owner.duration";
    /*任务完成时间-按发起人部门*/
    static ChartDuration: string = "admin.achievements.chart.duration";
    /*正常及超时任务数量-按发起人部门*/
    static ChartOvertiem: string = "admin.achievements.chart.overtiem";
    /*正常及超时任务数量-按经办人部门*/
    static ChartOwnerOvertiem: string = "admin.achievements.chart.owner.overtiem";
    /*正常*/
    static ChartNormal: string = "admin.achievements.chart.normal";
    /*超时*/
    static ChartOvertime: string = "admin.achievements.chart.overtime";
    /*完成状态*/
    static ChartCompletionStatus: string = "admin.achievements.completion.status";
    /*流程绩效描述*/
    static AchievementsDescription: string = "admin.achievements.completion.achievementsdescription";
    /*部门绩效描述*/
    static DepartmentDescription: string = "admin.achievements.completion.departmentdescription";
    /*请选择相应流程进行报表查看*/
    static ChartSelectWorkflow: string = "admin.achievements.select.workflow";
}

/*预算管理*/
export class BudgetLocale {
    /*预算管理*/
    static CallBackBudget: string = "page.budget.call.back";
    /*预算列表*/
    static BudgetLists: string = "page.budget.lists";
    /*输入预算名称*/
    static BuggetSearchName: string = "page.budget.search.name";
    /*全部实体*/
    static BudgetSearchDropdownEntityAll: string = "page.budget.search.dropdown.entity.all";
    /*全部状态*/
    static BudgetSearchDropdownStatusAll: string = "page.budget.search.dropdown.status.all";
    /*组织*/
    static BudgetSearchDropdownOrg: string = "page.budget.search.dropdown.org";
    /*成本中心*/
    static BudgetSearchDropdownCenter: string = "page.budget.search.dropdown.center";
    /*执行中*/
    static BudgetSearchDropdownActive: string = "page.budget.search.dropdown.active";
    /*已结束*/
    static BudgetSearchDropdownFinish: string = "page.budget.search.dropdown.finish";
    /*草稿*/
    static BudgetSearchDropdownDraft: string = "page.budget.search.dropdown.draft";
    /*预算代码*/
    static BudgetTableTemplete: string = "page.budget.table.temp";
    /*所属实体*/
    static BudgetTableEntity: string = "page.budget.table.entity";
    /*预算期间*/
    static BudgetTablePeriod: string = "page.budget.table.period";
    /*状态*/
    static BudgetTableStatus: string = "page.budget.table.status";
    /*创建时间*/
    static BudgetTableCreated: string = "page.budget.table.created";
    /*提交时间*/
    static BudgetTableSubmittd: string = "page.budget.table.submittd";
    /*调节时间*/
    static BudgetTableUpdateTime: string = "page.budget.table.update.time";
    /*添加预算*/
    static BudgetAdd: string = "page.budget.add";
    /*修改预算*/
    static BudgetModalTitleEdit: string = "page.budget.modal.title.edit";
    /*结束预算*/
    static BudgetModalTitleFinish: string = "page.budget.modal.title.finish";
    /*提交预算*/
    static BudgetModalTitleSubmit: string = "page.budget.modal.title.submit";
    /*调整预算*/
    static BudgetModalTitleAdhust: string = "page.budget.modal.title.adjust";
    /*实体*/
    static BudgetAddEntity: string = "page.budget.add.entity";
    /*预算模板*/
    static BudgetAddTemplete: string = "page.budget.add.templete";
    /*预算年份*/
    static BudgetAddYear: string = "page.budget.add.year";
    /*预算期间*/
    static BudgetAddDate: string = "page.budget.add.date";
    /*开始月份*/
    static BudgetAddBeginMonth: string = "page.budget.add.begin.month";
    /*结束月份*/
    static BudgetAddEndMonth: string = "page.budget.add.end.month";
    /*控制方式*/
    static BudgetAddContorlMode: string = "page.budget.add.contorl.mode";
    /*控制周期*/
    static BudgetAddContorlCycle: string = "page.budget.add.contorl.cycle";
    /*预算总计*/
    static BudgetAddBudgetCount: string = "page.budget.add.budget.count";
    /*实际使用*/
    static BudgetAddBudgetUseCount: string = "page.budget.add.budget.use.count";
    /*备注*/
    static BudgetAddBudgetRemark: string = "page.budget.add.budget.remark";
    /*总计*/
    static BudgetAddTotal: string = "page.budget.add.total";
    /*不控制*/
    static BudgetAddNotControl: string = "page.budget.add.not.control";
    /*全量*/
    static BudgetAddTotalAmount: string = "page.budget.add.total.amount";
    /*按期*/
    static BudgetAddOnSchedule: string = "page.budget.add.on.schedule";
    /*累计*/
    static BudgetAddAccumulative: string = "page.budget.add.accumulative";
    /*每月*/
    static BudgetAddMonthly: string = "page.budget.add.monthly";
    /*双月*/
    static BudgetAddBimonthly: string = "page.budget.add.bimonthly";
    /*每季*/
    static BudgetAddQuarterly: string = "page.budget.add.quarterly";
    /*半年*/
    static BudgetAddHalfYear: string = "page.budget.add.half.year";
    /*请选择实体*/
    static BudgetAddEntityNotNull: string = "page.budget.add.entity.not.null";
    /*请选择部门*/
    static BudgetAddOrgNotNull: string = "page.budget.add.org.not.null";
    /*请选择成本中心*/
    static BudgetAddCostCenterNotNull: string = "page.budget.add.costcenter.not.null";
    /*请选择模板*/
    static BudgetAddTempleteNotNull: string = "page.budget.add.templete.not.null";
    /*请选择开始时间*/
    static BudgetAddBeginNotNull: string = "page.budget.add.begin.not.null";
    /*请选择结束时间*/
    static BudgetAddEndNotNull: string = "page.budget.add.end.not.null";
    /*请选择控制周期*/
    static BudgetAddControlCycleNotNull: string = "page.budget.add.controlcycle.not.null";
    /*备注不能为空*/
    static BudgetAddRemarkNotNull: string = "page.budget.add.remark.not.null";
    /*模板不存在*/
    static BudgetErrorTemplateIsNotExist: string = "page.budget.error.template.is.not.exist";
    /*不可编辑*/
    static BudgetErrorNotEditable: string = "page.budget.error.not.editable";
    /*不支持删除*/
    static BudgetErrorDoesNotSupportRemoving: string = "page.budget.error.does.not.support.removing";
    /* 模板code已存在*/
    static BudgetErrorTemplateCodeIsExist: string = "page.budget.error.template.code.is.exist";
    /*不支持发布*/
    static BudgetErrorCanNotPublish: string = "page.budget.error.can.not.publish";
    /*不支持停用*/
    static BudgetErrorCanNotBeDisabled: string = "page.budget.error.can.not.be.disabled";
    /*不支持切换草稿*/
    static BudgetErrorCanNotBeDraft: string = "page.budget.error.can.not.be.draft";
    /*调整金额不能小于实际*/
    static BudgetErrorAdjustAmountNotLessActual: string = "page.budget.error.adjust.amount.not.less.actual";
    /*冲正金额超出科目计划总额*/
    static BudgetErrorCorrectAmountExceedsBalancePlanSum: string = "page.budget.error.correct.amount.exceeds.balance.PlanSum";
    /*模板不可用*/
    static BudgetErrorTemplateNotAvailable: string = "page.budget.error.template.not.available";
    /*预算明细不存在*/
    static BudgetErrorBugetDetailIsNotExist: string = "page.budget.error.budget.detail.is.not.exist";
    /*预算不存在*/
    static BudgetErrorBudgetIsNotExist: string = "page.budget.error.budget.is.not.exist";
    /*调节时间不能小于当前*/
    static BudgetErrorAdjustTimeNotLessCurrent: string = "page.budget.error.adjust.time.not.less.current";
    /*不支持调节*/
    static BudgetErrorCanNotBeAdjust: string = "page.budget.error.can.not.be.adjust";
    /*模板科目不能为空*/
    static BudgetErrorTemplateSubjectIsNotNull: string = "page.budget.error.template.subject.is.not.null";
    /*科目重复*/
    static BudgetErrorSubjectRepeat: string = "page.budget.error.subject.repeat";
    /*不支持删除*/
    static BudgetErrorCanNotBeRemove: string = "page.budget.error.can.not.be.remove";
    /*不支持结束*/
    static BudgetErrorDoesNotSupportTheEnd: string = "page.budget.error.does.not.support.the.end";
    /*使用金额超出当前限制*/
    static BudgetErrorUseAmountExceedsTheCurrentLimit: string = "page.budget.error.useamount.exceeds.the.current.limit";
    /* 结束时间不能小于当前*/
    static BudgetErrorEndTimeNotLessCurrent: string = "page.budget.error.endtime.not.less.current";
    /* 结束时间不能大于最大时间*/
    static BudgetErrorEndTimeCanNotGreaterLastTime: string = "page.budget.error.endtime.cannot.greater.last.time";
    /*交易记录不存在*/
    static BudgetErrorTransationNotExist: string = "page.budget.error.transation.not.exist";
    /*Balance不存在*/
    static BudgetErrorBalanceNotExist: string = "page.budget.error.balance.not.exist";
    /*冻结记录不存在*/
    static BudgetErrorFreezeNotExist: string = "page.budget.error.freeze.not.exist";
    /*科目已存在*/
    static BudgetErrorSubjectIsExist: string = "page.budget.error.subject.is.exist";
    /*冻结记录已存在*/
    static BudgetErrorFreezeIsExist: string = "page.budget.error.freeze.is.exist";
    /*无可用预算*/
    static BudgetErrorNoBudgetAvailable: string = "page.budget.error.no.budget.available";
    /*预算不够*/
    static BudgetErrorBalanceAmountNotEnough: string = "page.budget.error.balance.amount.not.enoug";
    /*调节失败*/
    static BudgetErrorAdjustError: string = "page.budget.error.adjust.error";
    /*明细不合法*/
    static BudgetErrorDetailNotLegal: string = "page.budget.error.detail.not.legal";
    /*操作对象不存在*/
    static BudgetErrorEntityNotExist: string = "page.budget.error.entity.not.exist";

    /*提交成功*/
    static SubmitSuccess: string = "page.budget.submit.success";
    /*保存成功*/
    static SaveSuccess: string = "page.budget.save.success";
    /*调整成功*/
    static AdjustSuccess: string = "page.budget.adjust.success";
    /*结束成功*/
    static EndSuccess: string = "page.budget.end.success";
    /*修改*/
    static BudgetUpdate: string = "page.budget.update";
    /*提交*/
    static BudgetSubmit: string = "page.budget.submit";
    /*删除*/
    static BudgetDelete: string = "page.budget.delete";
    /*查看*/
    static BudgetSee: string = "page.budget.see";
    /*明细*/
    static BudgetDetail: string = "page.budget.detail";
    /*调节*/
    static BudgetAdjust: string = "page.budget.adjust";
    /*结束*/
    static BudgetFinish: string = "page.budget.finish";
    /*至少填写一项预算明细*/
    static BudgetAddErrorNotDetail: string = "page.budget.add.error.not.detail";
    /*预算总额不可为0*/
    static BudgetAddErrorShouldNotBeEmpty: string = "page.budget.add.error.should.not.be.empty";
    /*提交*/
    static BudgetAddSubmit: string = "page.budget.add.submit";
    /*总计*/
    static BudgetAmount: string = "page.budget.view.amount";
    /*计划*/
    static BudgetPlan: string = "page.budget.view.plan";
    /*实际*/
    static BudgetPractical: string = "page.budget.view.practical";
    /*年份*/
    static BudgetYear: string = "page.budget.view.year";
    /*月份*/
    static BudgetMonth: string = "page.budget.view.month";
    /*调节前*/
    static BudgetAdjustBefore: string = "page.budget.view.adjustbefore";
    /*调节额度*/
    static BudgetAdjustAmount: string = "page.budget.view.adjustamount";
    /*调节后*/
    static BudgetAdjustAfter: string = "page.budget.view.adjustafter";
    /*调节人*/
    static BudgetRegulating: string = "page.budget.view.regulating";
    /*调节日期*/
    static BudgetAdjustDate: string = "page.budget.view.adjustdate";
    /*组织成本中心名称*/
    static BudgetViewHeader: string = "page.budget.view.viewheader";
    /*预算调节记录*/
    static BudgetViewTitle: string = "page.budget.view.viewtitle";
    /*删除预算*/
    static Delete: string = "page.budget.delete.name";
    /*删除成功*/
    static DeleteSuccess: string = "page.budget.delete.success";
    /*您确定要提交XXXXX吗*/
    static Submit: string = "page.budget.submit.name";
    /*您确定要提前结束吗?*/
    static FinishTip: string = "page.budget.finish.tip";
    /*操作成功*/
    static SuccessOperation: string = "page.budget.successful.operation";
    /*操作失败*/
    static FailedOperation: string = "page.budget.failed.operation";
    /*Entity 说明*/
    static EntityTooltip: string = "page.budget.modal.tooltip.entity";
    /*Control 说明*/
    static ControlTooltip: string = "page.budget.modal.tooltip.control";
}

/*规则设置*/
export class RuleSettingsLocale {
    /*规则设置*/
    static RuleSettings: string = "page.rule.settings.title";
    /*假期规则*/
    static HoliDayRule: string = "page.rule.settings.holiday.rule";
    /*假期类型*/
    static TableHoliDayType: string = "page.rule.settings.table.holiday.type";
    /*扣减方式*/
    static TableDeductedWay: string = "page.rule.settings.table.deducted.way";
    /*过期日期*/
    static TableExpiredDate: string = "page.rule.settings.table.expired.date";
    /*创建时间*/
    static TableCreated: string = "page.rule.settings.table.created";
    /*创建人*/
    static TableCreatedBy: string = "page.rule.settings.table.created.by";
    /*修改时间*/
    static TableModifiedTime: string = "page.rule.settings.table.modified.time";
    /*修改人*/
    static TableModifiedBy: string = "page.rule.settings.table.modified.by";
    /*操作*/
    static TableOperation: string = "page.rule.settings.table.operation";
    /*编辑*/
    static TableEdit: string = "page.rule.settings.table.edit";
    /*新增*/
    static Add: string = "page.rule.settings.add";
    /*规则设置*/
    static ModalRuleSettings: string = "page.rule.settings.modal.rule.settings";
    /*按工作日*/
    static ModalWorkingDay: string = "page.rule.settings.modal.working.day";
    /*按日历日*/
    static ModalCalendarDay: string = "page.rule.settings.modal.calendar.day";
    /*额度控制*/
    static ModalBalanceControl: string = "page.rule.settings.modal.balance.control";
    /*过期日期*/
    static ModalExpiredDate: string = "page.rule.settings.modal.expired.date";
    /*过期日期说明*/
    static ModalExpiredDateMessage: string = "page.rule.settings.modal.expired.date.message";
    /*额度设置*/
    static ModalBalanceSettings: string = "page.rule.settings.modal.balance.settings";
    /*例外*/
    static ModalException: string = "page.rule.settings.modal.exception";
    /*例外说明*/
    static ModalExceptionMessage: string = "page.rule.settings.modal.exception.message";
    /*额度设置说明*/
    static ModalBalanceSettingsMessage: string = "page.rule.settings.modal.balance.settings.message";
    /*条件*/
    static ModalCondition: string = "page.rule.settings.modal.condition";
    /*额度*/
    static ModalQuota: string = "page.rule.settings.modal.quota";
    /*小时*/
    static ModalHour: string = "page.rule.settings.modal.hour";
    /*描述*/
    static ModalRemark: string = "page.rule.settings.modal.remark";
    /*设置*/
    static ModalSetting: string = "page.rule.settings.modal.setting";
    /*添加新项*/
    static ModalAddItem: string = "page.rule.settings.modal.add.item";
    /*人员*/
    static ModalPersonnel: string = "page.rule.settings.modal.personnel";
    /*固定额度*/
    static ModalFixedBalance: string = "page.rule.settings.modal.fixed.balance";
    /*条件编辑器*/
    static ModalConditionEditor: string = "page.rule.settings.modal.condition.editor";
    /*工龄*/
    static ModalWorkingYears: string = "page.rule.settings.modal.working.years";
    /*司龄*/
    static ModalOurAge: string = "page.rule.settings.modal.our.age";
    /*职级*/
    static ModalRank: string = "page.rule.settings.modal.rank";
    /*1月*/
    static ModalExpiredJan: string = "page.rule.settings.modal.expired.jan";
    /*2月*/
    static ModalExpiredFeb: string = "page.rule.settings.modal.expired.feb";
    /*3月*/
    static ModalExpiredMar: string = "page.rule.settings.modal.expired.mar";
    /*4月*/
    static ModalExpiredApr: string = "page.rule.settings.modal.expired.apr";
    /*5月*/
    static ModalExpiredJMay: string = "page.rule.settings.modal.expired.may";
    /*6月*/
    static ModalExpiredJun: string = "page.rule.settings.modal.expired.jun";
    /*7月*/
    static ModalExpiredJul: string = "page.rule.settings.modal.expired.jul";
    /*8月*/
    static ModalExpiredAng: string = "page.rule.settings.modal.expired.ang";
    /*9月*/
    static ModalExpiredSep: string = "page.rule.settings.modal.expired.sep";
    /*10月*/
    static ModalExpiredOct: string = "page.rule.settings.modal.expired.oct";
    /*11月*/
    static ModalExpiredNov: string = "page.rule.settings.modal.expired.nov";
    /*12月*/
    static ModalExpiredDec: string = "page.rule.settings.modal.expired.dec";
    /*最后一天*/
    static ModalExpiredLastDate: string = "page.rule.settings.modal.expired.last.date";
    /*{name}不能为空*/
    static ModalSubmitNotNull: string = "page.rule.settings.modal.submit.not.null";
    /*月份*/
    static ModalExpiredMonth: string = "page.rule.settings.modal.expired.month";
    /*日期*/
    static ModalExpiredDay: string = "page.rule.settings.modal.expired.day";
    /*请填写数值*/
    static ModalErrorEnterValue: string = "page.rule.settings.modal.error.enter.value";
    /*请填写条件*/
    static ModalErrorEnterCondition: string = "page.rule.settings.modal.error.enter.condition";
    /*至少填写一条额度设置*/
    static ModalErrorEnterBalance: string = "page.rule.settings.modal.error.enter.balance";
    /*请填写固定额度*/
    static ModalErrorEnterFixedAmount: string = "page.rule.settings.modal.error.enter.fixed.amount";
    /*请勿重复填写人员*/
    static ModalErrorEnterSomeUser: string = "page.rule.settings.modal.error.enter.some.user";
    /*请填写额度和固定额度*/
    static ModalErrorEnterAmountAndFixedAmount: string = "page.rule.settings.modal.error.enter.amount.and.fixed.amount";
    /*过期日期的？*/
    static ModalExpiredDetail: string = "page.rule.settings.modal.expired.detail";
    /*下一步*/
    static ModalPreviewNext: string = "page.rule.settings.modal.preview.next";
    /** 上一步*/
    static ModalPreviewPrev: string = "page.rule.settings.modal.preview.prev";
    /*关闭*/
    static ModalPreviewCancel: string = "page.rule.settings.modal.preview.cancel";
    /** 规则测试*/
    static ModalPreviewRuleTest: string = "page.rule.settings.modal.preview.rule.test";
    /** 规则测试说明*/
    static ModalPreviewRuleTestDetail: string = "page.rule.settings.modal.preview.rule.test.detail";
    /** 额度预览*/
    static ModalPreviewTitle: string = "page.rule.settings.modal.preview.title";
    /** 选择人员*/
    static ModalPreviewSelectUser: string = "page.rule.settings.modal.preview.select.user";
    /** 人员*/
    static ModalPreviewTableUser: string = "page.rule.settings.modal.preview.table.user";
    /** 额度*/
    static ModalPreviewTableBalance: string = "page.rule.settings.modal.preview.table.balance";
    /** 执行*/
    static ModalPreviewImplement: string = "page.rule.settings.modal.preview.implement";
    /** 请设置额度或者例外条件*/
    static ModalPreviewRuleTestError: string = "page.rule.settings.modal.preview.rule.test.error";
}
/*员工假期*/
export class EmployeeHoliDayLocale {
    /*员工假期*/
    static EmployeeHoliDay: string = "page.employee.holiday.title";
    /*新增*/
    static SearchAdd: string = "page.employee.holiday.search.add";
    /*导入*/
    static SearchImport: string = "page.employee.holiday.search.import";
    /*搜索*/
    static SearchQuery: string = "page.employee.holiday.search.query";
    /*关闭*/
    static SearchClose: string = "page.employee.holiday.search.close";
    /*操作*/
    static SearchOperation: string = "page.employee.holiday.search.operation";
    /*请选择组织*/
    static SearchSelectOrganization: string = "page.employee.holiday.search.selectorganization";
    /*请选择人员*/
    static SearchSelectUser: string = "page.employee.holiday.search.selectuser";
    /*包含下级*/
    static SearchSubordinate: string = "page.employee.holiday.search.subordinate";
    /*姓名*/
    static TableName: string = "page.employee.holiday.table.title.name";
    /*员工编号*/
    static TableNumber: string = "page.employee.holiday.table.title.number";
    /*部门*/
    static TableDepartment: string = "page.employee.holiday.table.title.department";
    /*年份*/
    static TableYear: string = "page.employee.holiday.table.title.year";
    /*年假*/
    static TableAnnualLeave: string = "page.employee.holiday.table.title.annualleave";
    /*病假*/
    static TableSickLeave: string = "page.employee.holiday.table.title.sickleave";
    /*无薪假*/
    static TableUnpaidLeave: string = "page.employee.holiday.table.title.unpaidleave";
    /*婚假*/
    static TableMarriageLeave: string = "page.employee.holiday.table.title.marriageleave";
    /*产假*/
    static TableMaternityLeave: string = "page.employee.holiday.table.title.maternityleave";
    /*操作*/
    static TableOperation: string = "page.employee.holiday.table.title.operation";
    /*新增*/
    static TableAdd: string = "page.employee.holiday.table.add";
    /*调节*/
    static TableEdit: string = "page.employee.holiday.table.edit";
    /*导入记录*/
    static TableImport: string = "page.employee.holiday.table.import";
    /*导出结果*/
    static TableExport: string = "page.employee.holiday.table.export";
    /*确定添加*/
    static TableConfirmAdd: string = "page.employee.holiday.table.confirm.add";
    /*导入日志*/
    static TableOperationlog: string = "page.employee.holiday.table.log";

    /*调节假期*/
    static ModalTitle: string = "page.employee.holiday.modal.title";
    /*员工信息*/
    static ModalInformation: string = "page.employee.holiday.modal.information";
    /*调节详情*/
    static ModalAdjustHoliday: string = "page.employee.holiday.modal.adjustholiday";
    /*假期类型*/
    static ModalHolidayType: string = "page.employee.holiday.modal.holidaytype";
    /*假期总计*/
    static ModalAllHoliday: string = "page.employee.holiday.modal.allholiday";
    /*调节额度*/
    static ModalAdjustment: string = "page.employee.holiday.modal.adjustment";
    /*额度*/
    static ModalLines: string = "page.employee.holiday.modal.lines";
    /*类型*/
    static ModalType: string = "page.employee.holiday.modal.type";
    /*小时*/
    static ModalHours: string = "page.employee.holiday.modal.hours";
    /*调节已休数*/
    static ModalAdjustedRest: string = "page.employee.holiday.modal.adjustedrest";
    /*已使用数*/
    static ModalRest: string = "page.employee.holiday.modal.rest";
    /*调节数*/
    static ModalAdjustedCount: string = "page.employee.holiday.modal.adjustedcount";
    /*调节后总数*/
    static ModalAfterCount: string = "page.employee.holiday.modal.aftercount";
    /*调节后已休/剩余*/
    static ModalAfterRestCount: string = "page.employee.holiday.modal.afterrestcount";
    /*增加*/
    static ModalAdd: string = "page.budget.detail.modal.addamount";
    /*减少*/
    static ModalReduce: string = "page.budget.detail.modal.reduceamount";
    /*备注*/
    static ModalRemark: string = "page.employee.holiday.modal.remark";
    /*导入假期*/
    static ModalImport: string = "page.employee.holiday.modal.title.Import";
    /*额度记录*/
    static ModalHolidaySummaryRecord: string = "page.employee.holiday.modal.holidaysummaryrecord";
    /*使用记录*/
    static ModalHolidayCorrectionRecord: string = "page.employee.holiday.modal.Holidaycorrectionrecord";
    /*点击下载*/
    static ModalClickDownLoad: string = "page.employee.holiday.modal.clickdownload";
    /*选择文件*/
    static ModalSelectFile: string = "page.employee.holiday.modal.selectfile";
    /*《员工假期导入模版》*/
    static ModalEmployeeHolidayTemplate: string = "page.employee.holiday.modal.employeeholidaytemplate";
    /*《假期修正记录导入模板》*/
    static ModalEmployeeHolidayTemplateRevision: string = "page.employee.holiday.modal.employeeholidaytemplaterevision";
    /*填写模板文件*/
    static ModalEmployeeHolidayModal: string = "page.employee.holiday.modal.employeeholidaymodal";
    /*导入说明*/
    static ModalImportInstructions: string = "page.employee.holiday.modal.importinstructions";
    /*下载*/
    static ModalDownLoad: string = "page.employee.holiday.modal.download";
    /*移除*/
    static ModalRemove: string = "page.employee.holiday.modal.remove";
    /*请选择*/
    static ModalCommonTip: string = "page.employee.holiday.modal.commontip";

    /*假期详情*/
    static DetailTitle: string = "page.employee.holiday.detail.title";
    /*姓名*/
    static DetailTableName: string = "page.employee.holiday.table.name";
    /*员工编号*/
    static DetailTableCode: string = "page.employee.holiday.table.code";
    /*部门*/
    static DetailTableDepartment: string = "page.employee.holiday.table.department";
    /*假期记录*/
    static DetailHolidaylog: string = "page.employee.holiday.holiday.log";
    /*假期类型*/
    static DetailTableType: string = "page.employee.holiday.table.holiday.type";
    /*年份*/
    static DetailTableYear: string = "page.employee.holiday.table.year";
    /*单位*/
    static DetailTableUnit: string = "page.employee.holiday.table.unit";
    /*总计*/
    static DetailTableAmount: string = "page.employee.holiday.table.amount";
    /*已休*/
    static DetailTableHughHas: string = "page.employee.holiday.table.hugh.has";
    /*冻结*/
    static DetailTableFrozen: string = "page.employee.holiday.table.frozen";
    /*剩余*/
    static DetailTableSurplus: string = "page.employee.holiday.table.surplus";
    /*查看明细*/
    static DetailTableLook: string = "page.employee.holiday.table.look";
    /*修正*/
    static DetailSearchEdit: string = "page.employee.holiday.search.edit";
    /*假期类型*/
    static DetailSearchType: string = "page.employee.holiday.search.type";
    /*员工假期流程记录*/
    static DetailLog: string = "page.employee.holiday.detail.log";
    /*变更数*/
    static DetailModalChangeNumber: string = "page.employee.holiday.detail.modal.change.number";
    /*变更前*/
    static DetailModalBeforeChange: string = "page.employee.holiday.detail.modal.before.change";
    /*变更后*/
    static DetailModalAfterChange: string = "page.employee.holiday.detail.modal.after.change";
    /*变更日期*/
    static DetailModalChangeDate: string = "page.employee.holiday.detail.modal.change.date";
    /*操作人*/
    static DetailModalOperator: string = "page.employee.holiday.detail.modal.operator";
    /*关联记录ID*/
    static DetailModalRecordID: string = "page.employee.holiday.detail.modal.record.id";
    /*备注*/
    static DetailModalRemark: string = "page.employee.holiday.detail.modal.remark";
    /*流水记录*/
    static DetailTableDetailLog: string = "page.employee.holiday.title.detaillog";
    /*所属年份*/
    static DetailTableBelongsYear: string = "page.employee.holiday.table.belongsyear";
    /*变更类型*/
    static DetailTableChangeType: string = "page.employee.holiday.table.changetype";
    /*休假时间*/
    static DetailTableLeavedate: string = "page.employee.holiday.table.leavedate";
    /*创建时间*/
    static DetailTableCreatedTime: string = "page.employee.holiday.table.createdtime";
    /*创建人*/
    static DetailTableCreated: string = "page.employee.holiday.table.created";
    /*操作类型*/
    static DetailTableOperationType: string = "page.employee.holiday.table.operationtype";

    /*调节数不可超过当前{name}*/
    static AdjustTip: string = "page.employee.holiday.tip.adjust";
    /*请选择组织或人员进行查看*/
    static TipSelectOrg: string = "page.employee.holiday.tip.selectorg";
    /**全部假期*/
    static SearchAllHoliday: string = "page.employee.holiday.search.searchallholiday";
    /*额度不能小于0**/
    static WarnAdjustmentResult: string = "page.employee.holiday.warn.adjustmentresult";
    /*已使用不能小于0**/
    static WarnUsedAdjustmentResult: string = "page.employee.holiday.warn.usedadjustmentresult";
    /*额度不能小于已使用**/
    static WarnQuotaCannotBeLessThanUsed: string = "page.employee.holiday.warn.quotacannotbelessthanused";
    /*该假期类型已被禁用**/
    static WarnUnableLeaveType: string = "page.employee.holiday.warn.unableleavetype";
    /*文件有误,请下载最新模版!**/
    static WarnTemplateExpired: string = "page.employee.holiday.warn.templateexpired";
    /**数据正在导入中 */
    static WarnTheDataImport: string = "page.employee.holiday.warn.dataprocessed";
    /**导入完成*/
    static WarnImportComplete: string = "page.employee.holiday.warn.importcomplete";

    /**导入额度*/
    static OperationLogQuota: string = "page.employee.operationlog.search.typequota";
    /**导入使用*/
    static OperationLogUsage: string = "page.employee.operationlog.search.typeusage";
    /**查看*/
    static OperationLogView: string = "page.employee.operationlog.table.view";
    /**详情*/
    static OperationLogDetail: string = "page.employee.operationlog.table.detail";
    /**完成时间*/
    static OperationLogCompletedTime: string = "page.employee.operationlog.table.completedtime";
    /**基本信息*/
    static ModalBasicInfo: string = "page.employee.operationlog.modal.basicinfo";
    /**成功数*/
    static ModalSucceedCount: string = "page.employee.operationlog.modal.succeedcount";
    /**失败数*/
    static ModalFailedCount: string = "page.employee.operationlog.modal.failedcount";
    /**错误记录*/
    static ModalErrorLog: string = "page.employee.operationlog.modal.errorlog";
    /**已完成*/
    static OperationLogCompleted: string = "page.employee.operationlog.status.completed";
    /**进行中*/
    static OperationLogProcessing: string = "page.employee.operationlog.status.processing";
}

export class EmployeeHoliDayQueryLocale {
    /**假期查询 */
    static EmployeeHoliDayQuery: string = "page.holiday.query.navigator.title";
    /**组织 */
    static SearchOrganization: string = "page.holiday.query.search.organization";
    /**人员 */
    static SearchUser: string = "page.holiday.query.search.user";
    /**发生年份 */
    static SearchHappened: string = "page.holiday.query.search.happened";
    /**全部类型 */
    static SearchAll: string = "page.holiday.query.search.alltype";
    /**全部年份 */
    static SearchAllYear: string = "page.holiday.query.search.allyear";
    /**导出结果 */
    static ExportResult: string = "page.holiday.query.search.exportresult";
    /**开始日期 */
    static StartDate: string = "page.holiday.query.search.startdate";
    /**结束日期 */
    static EndDate: string = "page.holiday.query.search.enddate";
    /**剩余额度 */
    static BalanceQuota: string = "page.holiday.query.table.balancequota";
    /**请假申请 */
    static TypeApplyFor: string = "page.holiday.query.operationtype.applyfor";
    /**销假申请 */
    static TypeImpact: string = "page.holiday.query.operationtype.impact";
    /**请假冲正 */
    static TypeAdjusttion: string = "page.holiday.query.operationtype.adjusttion";
    /**调节 */
    static TypeAdjust: string = "page.holiday.query.operationtype.Adjust";
    /**状态 */
    static TableStatus: string = "page.holiday.query.table.status";
    /**导出提示 */
    static ExportTip: string = "page.holiday.query.export.tip";
}

export class BudgetListDetailsLocale {
    /**预算明细 */
    static HeaderName: string = "page.budget.detail.header.title.name";
    /*预算科目*/
    static TitleName: string = "page.budget.detail.table.title.name";
    /*来源*/
    static TitleSource: string = "page.budget.detail.table.title.source";
    /*金额*/
    static TitleAmount: string = "page.budget.detail.table.title.amount";
    /*剩余*/
    static TitleBalance: string = "page.budget.detail.table.title.balance";
    /*预算月份*/
    static TitleMonth: string = "page.budget.detail.table.title.month";
    /*创建人*/
    static TitleCreater: string = "page.budget.detail.table.title.creater";
    /*创建时间*/
    static TitleCreatTime: string = "page.budget.detail.table.title.creattime";
    /*备注*/
    static TitleRemark: string = "page.budget.detail.table.title.remark";
    /*全部科目*/
    static SearchAllSubjects: string = "page.budget.detail.search.allsubjects";
    /*全部资源*/
    static SearchAllSource: string = "page.budget.detail.search.allsource";
    /*流程申请*/
    static SearchRequest: string = "page.budget.detail.search.request";
    /*手工添加*/
    static SearchManual: string = "page.budget.detail.search.manual";
    /*提前结束*/
    static SearchCutShort: string = "page.budget.detail.search.cutshort";
    /*预算调节*/
    static SearchAdjustion: string = "page.budget.detail.search.adjustion";
    /*增加明细*/
    static SearchAddDetail: string = "page.budget.detail.search.adddetail";
    /*冲正冻结*/
    static SearchReversal: string = "page.budget.detail.search.reversal";
    /*当前剩余*/
    static CurrentBalance: string = "page.budget.detail.modal.CurrentBalance";
    /*增加*/
    static ModalAddAmount: string = "page.budget.detail.modal.addamount";
    /*减少*/
    static ModalReduceAmount: string = "page.budget.detail.modal.reduceamount";
    /*请输入{name}*/
    static ModalInputTip: string = "page.budget.detail.modal.tip";
    /**超出当前剩余额度*/
    static TipExcessAmount: string = "page.budget.detail.modal.tip.excessamount";
    /**预算Balance不存在*/
    static TipNoBalance: string = "page.budget.detail.modal.tip.nobalance";
}

export class BudgetTemplateLocale {
    /*模板名称*/
    static TemplateName: string = "page.budgettemplate.table.title.templatename";
    /*模板编号*/
    static TemplateCode: string = "page.budgettemplate.table.title.templatecode";
    /*状态*/
    static Status: string = "page.budgettemplate.table.title.status";
    /*创建人*/
    static CreatedBy: string = "page.budgettemplate.table.title.createdby";
    /*创建时间*/
    static CreatedTime: string = "page.budgettemplate.table.title.createdtime";
    /*修改人*/
    static ModifiedBy: string = "page.budgettemplate.table.title.modifiedby";
    /*修改时间*/
    static ModifiedTime: string = "page.budgettemplate.table.title.modifiedtime";
    /*预算模板*/
    static BudgetTemplate: string = "page.budgettemplate.modal.title";
    /*模板名称*/
    static BudgetTitle: string = "page.budgettemplate.modal.template.budgettitle";
    /*模板编号*/
    static BudgetNumber: string = "page.budgettemplate.modal.template.budgetnumber";
    /*元数据分类*/
    static BudgetMetadata: string = "page.budgettemplate.modal.template.budgetmetadata";
    /*科目名称*/
    static BudgetAccount: string = "page.budgettemplate.modal.table.budgetaccount";
    /*科目编码*/
    static BudgetCode: string = "page.budgettemplate.modal.table.budgetcode";
    /*添加*/
    static Add: string = "page.budgettemplate.modal.button.add";
    /*查看*/
    static View: string = "page.budgettemplate.modal.button.view";
    /*发布*/
    static Publish: string = "page.budgettemplate.modal.button.publish";
    /*关闭*/
    static Close: string = "page.budgettemplate.modal.button.close";
    /*复制*/
    static Copy: string = "page.budgettemplate.modal.button.copy";
    /*修改*/
    static Modification: string = "page.budgettemplate.modal.button.modification";
    /*删除*/
    static Remove: string = "page.budgettemplate.modal.button.remove";
    /*停用*/
    static Disable: string = "page.budgettemplate.modal.button.disable";
    /*启用*/
    static Enablement: string = "page.budgettemplate.modal.button.enablement";
    /*请输入模板名称*/
    static TemplateNameTip: string = "page.budgettemplate.input.placeholder.templatenametip";
    /*请输入模板编码*/
    static TemplateCodeTip: string = "page.budgettemplate.input.placeholder.templatecodetip";
    /*请输入模板名称*/
    static TemplateNameSearchTip: string = "page.budgettemplate.input.placeholder.templatenamesearchtip";
    /*请输入模板编码*/
    static TemplateCodeSearchTip: string = "page.budgettemplate.input.placeholder.templatecodesearchtip";
    /*请选择元数据分类*/
    static TemplateMetadataTip: string = "page.budgettemplate.input.placeholder.templatemetadatatip";
    /*新建模板*/
    static AddTemplate: string = "page.budgettemplate.modal.button.addtemplate";
    /**请选择科目 */
    static SelectSubjects: string = "page.budgettemplate.input.placeholder.selectsubjects";
    /**模板编码不能重复 */
    static TemplateCodeUnique: string = "page.budgettemplate.tip.templatecodeunique";
    /**至少要有一个科目 */
    static LeastOneSubjects: string = "page.budgettemplate.tip.leastonesubjects";
    /**科目不能重复 */
    static SubjectNoRepeated: string = "page.budgettemplate.tip.subjectnorepeated";
    /**停用tip */
    static DisableTip: string = "page.budgettemplate.tip.disabletip";
    /**启用tip */
    static EnablementTip: string = "page.budgettemplate.tip.enablementtip";
    /**{value}成功*/
    static CommonTip: string = "page.budgettemplate.tip.commontip";
}

export class FadadaPageLocale {
    /**生成凭证 */
    static ProductionVoucher = "page.fadada.production.voucher";
    /**商户 */
    static MerchantInfo = "page.fadada.merchant";
}

export class AIIBLocale {
    /**Proposal pool导航 */
    static MyProposal = "aiib.nav.my.proposal";
    static NewProposal = "aiib.nav.new.proposal";
    static PendingScrCom = "aiib.nav.pending.scrcom";
    static ScrComApproved = "aiib.nav.scrcom.approved";
    static ExComApproved = "aiib.nav.excom.approved";
    static AllProposal = "aiib.nav.all.proposal";
    static ProposalPool = "aiib.proposal.pool.page.title";
    static ProjectPool = "aiib.project.pool.page.title";
    static PendingScSecretariat = "aiib.proposal.pending.sc.secretariat";
    static PendingDgReview = "aiib.proposal.pending.dg.review";
    static PendingManagerReview = "aiib.proposal.pending.manager.review";

    /**Project pool导航 */
    static MyProject = "aiib.nav.my.project";
    static NewProject = "aiib.nav.new.project";
    static AllProject = "aiib.nav.all.project";
    static AppraisalStage = "aiib.nav.appraisal.stage";
    static ApprovedProject = "aiib.nav.approved.project";
    static BoardApprovalStage = "aiib.nav.board.approval.stage";
    static ConceptStage = "aiib.nav.concept.stage";
    static NegotiationStage = "aiib.nav.negotiation.stage";

    /**Proposal 高级搜索 */
    static AdvanceSearch = "aiib.proposal.adv.search";
    static AdvProposalNo = "aiib.proposal.adv.proposal.no";
    static AdvProjectNo = "aiib.proposal.adv.project.no";
    static AdvCountry = "aiib.proposal.adv.country";
    static AdvFinancingMethod = "aiib.proposal.adv.financing.method";
    static AdvSector = "aiib.proposal.adv.sector";
    static AdvRegion = "aiib.proposal.adv.region";
    static AdvESocialCatepory = "aiib.proposal.adv.e.social.catepory";
    static AdvProjectRisk = "aiib.proposal.adv.project.risk";
    static AdvDG = "aiib.proposal.adv.d.g";
    static AdvDGIOSPB = "aiib.proposal.adv.d.g.io.spb";
    static AdvManagerIOSBP = "aiib.proposal.adv.manager.io.spb";
    static AdvProjectStage = "aiib.proposal.adv.project.stage";
    static AdvPReceivedStartDate = "aiib.proposal.adv.p.received.start.date";
    static AdvPReceivedEndDate = "aiib.proposal.adv.p.received.end.date";
    static AdvECommitteeStartDate = "aiib.proposal.adv.e.committee.start.date";
    static AdvECommitteeEndDate = "aiib.proposal.adv.e.committee.end.date";
    static AdvCDecisionStartDate = "aiib.proposal.adv.c.decision.start.date";
    static AdvCDecisionEndDate = "aiib.proposal.adv.c.decision.end.date";
    static AdvADecisionStartDate = "aiib.proposal.adv.a.decision.start.date";
    static AdvADecisionEndDate = "aiib.proposal.adv.a.decision.end.date";
    static AdvFReviewStartDate = "aiib.proposal.adv.f.review.start.date";
    static AdvFReviewEndDate = "aiib.proposal.adv.f.review.end.date";
    static AdvBApprovalStartDate = "aiib.proposal.adv.b.approval.start.date";
    static AdvBApprovalEndDate = "aiib.proposal.adv.b.approval.end.date";
    static AIIBRequireformtips = "aiib.require.form.tips";
    /** Team Member*/
    static TMember = "aiib.team.member";
    static TMRoleName = "aiib.team.member.role.name";
    static TMPermission = "aiib.team.member.permission";
    static TMIsSendEmail = "aiib.team.member.is.send.email";
    /**Report 导航 */
    static ProjectReport = "aiib.report.type.project";
    static ProposalReport = "aiib.report.type.proposal";
    static ProposalDataBase = "aiib.report.type.database";

    static SendEmailSuccess = "aiib.common.send.email.success.tip";
    static SendEmailFailure = "aiib.common.send.email.failure.tip";
    static ReworkCommentRequire = "aiib.common.rework.comment.require";
    static NewProposalRequire = "aiib.common.newproposal.require";
    static ProposalApprovedDate = "aiib.Approved.Date";

    /**导入完成 */
    static ImportSuccess: string = "aiib.common.project.import.success";
    /**导入失败 */
    static ImportFail: string = "aiib.common.project.import.fail";
    /**请添加要导入的模板 */
    static PleaseImportTemplate: string = "aiib.common.project.detail.please.import.template";
    static FileUpload: string = "aiib.common.project.import.file.upload";
    static Import: string = "aiib.common.project.import";
    static DocumentImport: string = "aiib.common.project.document.import";
    static CodeUnique: string = "aiib.common.matadate.code.unique";

    static SubmisionSuccess: string = "aiib.common.tip.submit.success";
    static RevokeSuccess:string = "aiib.common.tip.revoke.success";
    static RevokeFail:string = "aiib.common.tip.revoke.fail";
    static SubmisionFail: string = "aiib.common.tip.submit.fail";
    static SelectRequire: string = "aiib.common.tip.select.one.data";
    static RecipientRequire: string = "aiib.common.tip.recipient.one.data";
    static MembersUnique: string = "aiib.common.tip.members.unique";
    static SaveSuccess: string = "aiib.common.tip.save.success";
    static SaveFail: string = "aiib.common.tip.save.fail";
    static OperationFailByVersion: string = "aiib.common.tip.operation.fail.status.540010";
    static ProjectFormLocationTip: string = "aiib.common.form.field.location.tip";
    static ProjectFormProjectDescriptionTip: string = "aiib.common.form.field.project.description.tip";
    static ProjectFormThematicPrioritiesCommentTip: string = "aiib.common.form.field.thematic.prioties.comment.tip";
    static ProjectFormSponsorIntroductionTip: string = "aiib.common.form.field.sponsor.introduction.tip";
    static ProjectFormTechnicalAdvisorTip: string = "aiib.common.form.field.techical.advisor.tip";
    static ProjectFormPreliminaryAssessmentTip: string = "aiib.common.form.field.preliminary.assessment.tip";
    /** Rename 成功*/
    static ProjectFileRename: string = "aiib.project.file.renamesuccess.tip";
    static ProposalPrintTip: string = "aiib.project.print.screen.summary.errortip";
    static ProposalSuccessTip:string = "aiib.project.print.success.tip";
}

export class MyDelegatedLocal {
    static MyDelegate = "mydelegated.title";
    /**转办人不能为代理人*/
    static TipAssigneeNotMe = "mydelegated.tip.assignee.not.me";
    /**勾选必填 */
    static CheckboxQequire = "aiib.common.project.check.require";
}

