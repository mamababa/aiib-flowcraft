import * as React from "react";
import {
    AkButton,
    AkGlobal,
    AkFormComponentProps,
    AkForm,
    AkSpin,
    ApplyContentLocale,
    PostProcDraftRequest,
    PostStartProcInstByKeyRequest,
    GetApplicantDetailRequest,
    AkRow,
    AkCol,
    ApplicationStatusEnum,
    AkMessage,
    WorkflowFormHelper,
    AkContext,
    TaskFlagsEnum,
    AkModal,
    AkHtml,
    RouterProps,
    //DeleteDocumentRequest
} from "akmii-yeeoffice-common";
import {
    AkFormcraftControlFactory,
    AkFCRuleUtil,
    AkFCRegulationUtil,
    AkFCFormDefData,
    AkFCFormContext,
    AkFCFormControl,
    CONTROL_FILE_UPLOAD,
    CONTROL_FILE_UPLOAD_MERGE,
    FormControlUtil,
    CONTROL_APPLICANTINFO,
    CONTROL_WORKFLOWCONTROLPANEL,
    CONTROL_FLEX_GRID
} from "akmii-yeeoffice-crafts";
import {
    CancelStatus,
    RevokeStatus,
    SaveStatus,
    SubmitStatus
} from "akmii-yeeoffice-common";
import { FormcraftLocale, ProcModelDesignerPageLocale, CommonLocationLocale, ReciveTaskPageLocale } from "../../../locales/localeid";
import { FlowcraftCommon } from "../../../util/common";
import { AkStatusBar } from "./AkControlStatusBar";
import { AkUtil, AkNotification, CommonLocale } from 'akmii-yeeoffice-common';
import { TaskAction } from '../../../actions/index';
import { withRouter } from "react-router";
import { read } from "fs";
import { ProjectAPI } from "../../../api/aiibworkflow/project";
import { currentUser } from "../../../util/aiib-common";
import { isNullOrUndefined } from "util";

export interface AkFlowcraftFormProps extends AkFormComponentProps, RouterProps {
    isPreview?: boolean;
    isTask?: boolean;
    taskDetail?: TaskDetailV2Info;
    formDef?: AkFCFormDefData;
    draftID?: string;
    appID?: string;
    defID?: string;
    defKey?: string;
    resID?: string;
}
interface AkFlowcraftFormStates {
    updateCounter?: number;
    loading?: boolean;
    cancleOrRevoke?: boolean;
    hasRecalled?: boolean;
    isReadOnly?:boolean;
}

// function mapPropsToFields(props: AkFlowcraftFormProps) {
//     return AkUtil.mapPropsToFields(props.taskDetail.Variables);
// }

let _flowContext: AkFCFormContext;

function onValuesChange(props, values) {
    AkFCRuleUtil.onFormValueChange(_flowContext, props, values);
    AkFCRegulationUtil.onFormValueChange(_flowContext, props, values);
}

@AkForm.create<AkFlowcraftFormProps>({ onValuesChange })
@withRouter
export class AkFlowcraftForm extends React.Component<AkFlowcraftFormProps,
AkFlowcraftFormStates> {

    submitting = false;
    draftID: string;
    applicationID: string;
    flowContext: AkFCFormContext;
    isReceive: boolean = false;

    static defaultProps: AkFlowcraftFormProps = {};

    constructor(props: AkFlowcraftFormProps, context) {
        super(props, context);
        this.draftID = props.draftID;
        this.applicationID = props.appID;
        this.isReceive = false;

        this.state = {
            updateCounter: 0,
            loading: false,
            cancleOrRevoke: false,
            hasRecalled: false,
            isReadOnly:true
        };

        //构造formContext对象
        // this.flowContext = { form: this.props.form, formDef: this.props.formDef, taskDetail: this.props.taskDetail, ctxObj: {} };
        this.flowContext = FormControlUtil.initFormContext(this.props.form, this.props.formDef, this.props.taskDetail, this.props.defID, this.props.resID);
        AkFCRuleUtil.createRuleSubscriber(this.flowContext);
        let triggerPageUpdateTimer: any;
        let triggerPageUpdate = () => {
            clearTimeout(triggerPageUpdateTimer);
            triggerPageUpdateTimer = setTimeout(() => {
                this.setState({
                    updateCounter: this.state.updateCounter + 1
                });
            }, );
        };
        AkFCRegulationUtil.createStyleRegulationSubscriber(this.flowContext, triggerPageUpdate.bind(this));
        _flowContext = this.flowContext;

        //页面加载完毕，触发context更新规则
        AkFCRuleUtil.triggerContextChange(_flowContext);

        //任务页面、已提交页面、已保存页面，加载完毕，触发动态样式规则
        //预览或第一次打开页面，无需触发动态样式规则
        // if (this.props.isTask === true || (this.props.appID && this.props.appID.length > 0) || (this.props.draftID && this.props.draftID.length > 0))
        //     AkFCRegulationUtil.triggerStyleRegulations(_flowContext);
        //打开页面后默认执行一遍所有规则
        AkFCRegulationUtil.triggerStyleRegulations(_flowContext);
    }
    componentDidMount() {
        ProjectAPI.getUserGroups({ userID: currentUser }).then(d=> {
            if(d.Status === 0) {
                const userGrops = d.Data.filter(item => item && item.Ext1 === "UserGroup");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
               this.setState({isReadOnly:!isNullOrUndefined(isReadOnly)}) ;
            }
        });
    }
    displayChildControls(parent: AkFCFormControl) {
        const { form, taskDetail, isTask, isPreview, defID } = this.props;
        let readOnly = false;
        let appStatus = taskDetail.ApplicationInfo && taskDetail.ApplicationInfo.Status;
        let taskStatus = Number(taskDetail.TaskInfo && taskDetail.TaskInfo.Status);

        if (isTask) {
            readOnly = appStatus === ApplicationStatusEnum.Complete
                || appStatus === ApplicationStatusEnum.Cancel
                || appStatus === ApplicationStatusEnum.Error
                || taskStatus === TaskStatusEnum.Complete
                || taskStatus === TaskStatusEnum.Candidate;
        } else {
            readOnly = appStatus === ApplicationStatusEnum.Complete
                || appStatus === ApplicationStatusEnum.Cancel
                || appStatus === ApplicationStatusEnum.Running
                || appStatus === ApplicationStatusEnum.Error;
        }

        if ("children" in parent) {
            var controls = parent.children;
            if (controls && controls.length > 0) {
                return controls.map(c => {
                 
                    let control = AkFormcraftControlFactory.Create(c, null);
                    //[申请人信息]控件在[任务页面]总是[只读]
                    if (c.type === CONTROL_APPLICANTINFO && isTask === true) {
                        return control.renderForm(this.flowContext, true, isPreview);
                    }
                    if(c.type === CONTROL_FLEX_GRID && (c.children && c.children.findIndex(i=>i.binding === "ApprovalDate") !== -1 ) && this.state.isReadOnly) {
                        return null;
                    }
                    if(c.type === CONTROL_WORKFLOWCONTROLPANEL && this.state.isReadOnly) {
                        return null;
                    }
                    // 当代理人不等于当前登陆人时不显示任务面板
                    // if (taskDetail.TaskInfo && c.type === CONTROL_WORKFLOWCONTROLPANEL && AkContext.getUser().AccountID === taskDetail.TaskInfo.DelegateID && AkContext.getUser().AccountID !== taskDetail.TaskInfo.AssigneeID) {
                    //     return null;
                    // }
                    // AIIB当前登陆人不等于处理人或者代理人时不显示任务面板
                    if (taskDetail.TaskInfo && c.type === CONTROL_WORKFLOWCONTROLPANEL && AkContext.getUser().AccountID !== taskDetail.TaskInfo.AssigneeID && AkContext.getUser().AccountID !== taskDetail.TaskInfo.DelegateID) {
                        return null;
                    }
                    return control.renderForm(this.flowContext, readOnly, isPreview);
                });
            }
        }
        // this.state = {
        //     loading: false
        // };
        return undefined;
    }

    setLoading(flag: boolean) {
        this.submitting = flag;
        this.setState({ loading: flag, cancleOrRevoke: flag });
    }

    handleResponse(data: any, success?: () => void, error?: () => void) {
        const { formatMessage } = AkGlobal.intl;
        if (data.Status === 0) {
            AkMessage.success(data.Message);
            success && success();
        } else {
            let msg = data.Message;
            if (data.Status === 110000) {
                msg = formatMessage({ id: ProcModelDesignerPageLocale.TipUniqueValue }, { name: data.Message });
            }
            AkNotification.warning({
                message: formatMessage({ id: CommonLocale.Tip }),
                description: msg
            });
            error && error();
        }
        this.setLoading(false);
    }
    //提交成功后更新任务数
    upTaskCount() {
        setTimeout(() => {
            AkGlobal.store.dispatch(TaskAction.requestTaskCount());
            FlowcraftCommon.goBack();
        }, 2000);
    }
    onClose() {
        //todo: go back to list
        const pageIndex = this.props.location.query.pageIndex;
        if (this.props.location.query.delegateurl === "/completed") {
            window.location.href = window.location.pathname + "#/completed?pageIndex=" + pageIndex;
        } else {
            window.location.href = window.location.pathname + "#/todo";
        }

    }
    onSave() {
        if (this.submitting) {
            return null;
        } else {
            this.setLoading(true);
        }
        const { formatMessage } = AkGlobal.intl;
        const { form, taskDetail, formDef, defKey, defID } = this.props;
        let filesName = [];
        let childs = (formDef.children as AkFCFormControl[]).filter(f => (f.type === CONTROL_FILE_UPLOAD_MERGE || f.type === CONTROL_FILE_UPLOAD));
        if (childs && childs.length > 0) {
            childs.forEach((item: AkFCFormControl, index) => {
                filesName.push(item.binding);
            });
        }
        formDef["onsave"] = true;
        setTimeout(() => {
            //force默认为false，控件的验证结果上一次是true，将会跳过验证
            //force为true，无论上次验证结果是什么，都会执行再次验证
            form.validateFieldsAndScroll(filesName, { force: true }, (err, v) => {
                if (err) {
                    let msg = formatMessage({ id: FormcraftLocale.FormValidateMessage }, { name: "" });
                    let errors = err[Object.getOwnPropertyNames(err)[0]].errors;
                    if (errors && errors[0] && errors[0].message) {
                        msg = err[Object.getOwnPropertyNames(err)[0]].errors[0].message;
                    }
                    this.setLoading(false);
                    AkNotification.warning({
                        message: formatMessage({ id: CommonLocale.Tip }),
                        description: msg
                    });
                    return;
                }
                let formVariables = form.getFieldsValue();
                formVariables = WorkflowFormHelper.deleteFiles(formVariables);

                //merge当前表单和服务器端taskDetail.Variables中的值
                const values = { ...taskDetail.Variables, ...formVariables };
                let variables = WorkflowFormHelper.serializeVariables(values, "formcraft");
                const saveRequest: PostProcDraftRequest = {
                    ProcDefID: defID,
                    DefKey: defKey,
                    FormData: variables,
                    ProcDraftID: this.draftID,
                    ApplicantID: taskDetail.ApplicantInfo && taskDetail.ApplicantInfo.ApplicantID
                };
                WorkflowFormHelper.onSave(this, saveRequest, "flowcraft");
            });
        }, 600);
    }

    onSubmit() {
        if (this.submitting) {
            return null;
        } else {
            this.setLoading(true);
        }
        const { form, taskDetail, defKey, defID, appID, formDef } = this.props;
        formDef["onsave"] = false;
        setTimeout(() => {
            //force默认为false，控件的验证结果上一次是true，将会跳过验证
            //force为true，无论上次验证结果是什么，都会执行再次验证
            form.validateFieldsAndScroll({ force: true }, (err, values) => {
                if (err) {
                    let msg = AkGlobal.intl.formatMessage({ id: FormcraftLocale.FormValidateMessage }, { name: "" });
                    let errors = err[Object.getOwnPropertyNames(err)[0]].errors;
                    if (errors && errors[0] && errors[0].message) {
                        msg = err[Object.getOwnPropertyNames(err)[0]].errors[0].message;
                    }

                    this.setLoading(false);
                    AkMessage.warning(msg);
                    return;
                }

                let formVariables = form.getFieldsValue();
                formVariables = WorkflowFormHelper.deleteFiles(formVariables);
                //merge当前表单和服务器端taskDetail.Variables中的值
                let submitValues = AkUtil.deepClone({ ...taskDetail.Variables, ...formVariables });
                const ext2 = WorkflowFormHelper.buildApplicationExt2(submitValues);
                let variables = WorkflowFormHelper.serializeVariables(submitValues, "formcraft");
                const startRequest: PostStartProcInstByKeyRequest = {
                    Key: defKey,
                    Variables: variables,
                    ApplicantID: taskDetail.ApplicantInfo && taskDetail.ApplicantInfo.ApplicantID,
                    ProcDraftID: this.draftID,
                    ApplicationID: appID,
                    applicationext2: JSON.stringify(ext2)
                };
                WorkflowFormHelper.onSubmit(this, startRequest, "flowcraft", this.upTaskCount);
            });
        }, 600);
    }

    onCancel() {
        const { form, taskDetail, defKey, defID, appID } = this.props;
        let appStatus = taskDetail.ApplicationInfo && taskDetail.ApplicationInfo.Status || 0;
        if (this.submitting || CancelStatus.indexOf(appStatus) === -1) {
            return null;
        } else {
            this.setLoading(true);
        }
        let applicantId = appID ? appID : (taskDetail.ApplicantInfo && taskDetail.ApplicantInfo.ApplicantID);
        const cancelRequest: GetApplicantDetailRequest = {
            applicationID: applicantId
        };
        WorkflowFormHelper.onCancel(this, cancelRequest, "flowcraft");
    }

    onRevoke() {
        const { form, taskDetail, defKey, defID, appID } = this.props;
        let appStatus = taskDetail.ApplicationInfo && taskDetail.ApplicationInfo.Status || 0;
        let applicantId = appID ? appID : (taskDetail.ApplicantInfo && taskDetail.ApplicantInfo.ApplicantID);
        if (this.submitting || RevokeStatus.indexOf(appStatus) === -1) {
            return null;
        } else {
            this.setLoading(true);
        }

        const revokeRequest: GetApplicantDetailRequest = {
            applicationID: applicantId
        };
        WorkflowFormHelper.onRevoke(this, revokeRequest, "flowcraft");
    }

    getFileControlBindings(parent, bindingArr) {
        if (parent && parent.children && parent.children.length > 0) {
            for (var i = 0; i < parent.children.length; i++) {
                let item = parent.children[i];
                if (item.type === CONTROL_FILE_UPLOAD_MERGE || item.type === CONTROL_FILE_UPLOAD) {
                    bindingArr.push(item.binding);
                }

                this.getFileControlBindings(item, bindingArr);
            }
        }
    }

    /**
     * 保存审批页面数据
     * @param comment 审批意见
     */
    onSaveVariable(comment?: string) {
        if (this.submitting) {
            return null;
        } else {
            this.setLoading(true);
        }
        const { form, formDef, taskDetail } = this.props;
        // let variables = taskDetail.Variables;
        const { formatMessage } = AkGlobal.intl;
        let filesName = [];
        //只验证上传附件, 获取所有上传控件的binding
        this.getFileControlBindings(formDef, filesName);
        formDef["onsave"] = true;
        setTimeout(() => {
            form.validateFields(filesName, { force: true }, (err, values) => {
                if (err) {
                    let msg = formatMessage({ id: FormcraftLocale.FormValidateMessage }, { name: "" });
                    let errors = err[Object.getOwnPropertyNames(err)[0]].errors;
                    if (errors && errors[0] && errors[0].message) {
                        msg = err[Object.getOwnPropertyNames(err)[0]].errors[0].message;
                    }
                    this.setLoading(false);
                    AkNotification.warning({
                        message: formatMessage({ id: CommonLocale.Tip }),
                        description: msg
                    });
                    return;
                }
                //保存变量时删除附件
                let variables = form.getFieldsValue();
                variables = this.deleteReadOnlyListFields(variables, formDef);
                variables = WorkflowFormHelper.deleteFiles(variables);
                variables = WorkflowFormHelper.serializeVariables(variables, "formcraft");

                const params = {
                    TaskID: taskDetail.TaskInfo.TaskID,
                    Outcome: "SaveVariable",
                    Variables: variables,
                    Comment: comment
                };
                WorkflowFormHelper.onSaveVariable(this, params, "flowcraft");
            });
        }, 600);
    }

    /**删除只读状态下的列表字段*/
    deleteReadOnlyListFields(variables, formDef) {
        let ____customListFields = {};
        if (variables.hasOwnProperty("____customListFields")) {
            ____customListFields = this.findListFieldsControl(variables, formDef);
        }
        return { ...variables, ____customListFields }
    }
    /**查找非只读状态下列表字段值，并重组成新的对象*/
    findListFieldsControl(variables, formDef) {
        let ____customListFields = {};
        if (formDef instanceof Array) {
            for (let i = 0, j = formDef.length; i < j; i++) {
                const d = formDef[i]
                if (d.hasOwnProperty("children")) {
                    const customListFields = this.findListFieldsControl(variables, d.children);
                    ____customListFields = { ...____customListFields, ...customListFields }
                } else {
                    if (d.isListControl && d.readonly) {
                        const key = (String(d)).split(".")[2];
                        ____customListFields[key] = variables[d];
                    }
                }
            }
        }
        return ____customListFields;
    }

    //领用任务
    onReceiveTask() {
        let topThis = this;
        if (topThis.submitting) {
            return null;
        } else {
            topThis.setLoading(true);
        }
        topThis.isReceive = true;
        const { formatMessage } = AkGlobal.intl;
        const { form, taskDetail, defKey, defID, appID } = topThis.props;
        let variables = taskDetail.Variables;

        form.validateFields((err, values) => {
            if (err) {
                topThis.setLoading(false);
                topThis.isReceive = false;
                return;
            }
            AkModal.confirm({
                title: formatMessage({ id: CommonLocationLocale.Tip }),
                content: <AkHtml>{formatMessage({ id: ReciveTaskPageLocale.TipReceiveTask }
                    , { taskName: taskDetail.TaskInfo.Name, prcessName: taskDetail.ProcInstInfo.Name })}</AkHtml>,
                onOk() {
                    topThis.setLoading(true);
                    topThis.isReceive = true;
                    const receiveRequest = { TaskID: taskDetail.TaskInfo.TaskID };
                    WorkflowFormHelper.onReceive(topThis, receiveRequest, "flowcraft", topThis.upTaskCount);
                },
                onCancel() {
                    topThis.setLoading(false);
                    topThis.isReceive = false;
                }
            });
        });
    }

    //放弃领用
    onResign() {
        const { taskDetail } = this.props;

        const params = {
            TaskID: taskDetail.TaskInfo.TaskID
        };
        WorkflowFormHelper.onCancelClaim(this, params, "flowcraft");
    }
    //召回
    onRecall() {
        if (!this.state.hasRecalled) {
            this.setState({ hasRecalled: true })
        }
        const { taskDetail } = this.props;
        const { formatMessage } = AkGlobal.intl;
        const { RecallNotExit, RecallRuning, RecallUnSelf, RecallRefuseReceive, RecallRefuse } = ApplyContentLocale;
        let msg = "";
        if (!taskDetail.TaskInfo) {
            msg = formatMessage({ id: RecallNotExit });
        } else if (!taskDetail.TaskInfo.Outcome) {
            msg = formatMessage({ id: RecallRuning });
        } else if (taskDetail.TaskInfo.AssigneeID !== AkContext.getUser().AccountID) {
            msg = formatMessage({ id: RecallUnSelf });
        } else if (taskDetail.TaskInfo && taskDetail.TaskInfo.AssigneeID === "0" && taskDetail.TaskInfo.Flags === TaskFlagsEnum.CandidateTask) {
            msg = formatMessage({ id: RecallRefuseReceive });
        } else if (taskDetail.TaskInfo && ((taskDetail.TaskInfo.Flags & TaskFlagsEnum.RecallTask) !== TaskFlagsEnum.RecallTask)) {
            msg = formatMessage({ id: RecallRefuse });
        } else if (taskDetail.ApplicationInfo.Status !== ApplicationStatusEnum.Running) {//允许中任务禁止召回
            msg = formatMessage({ id: RecallRefuse });
        }
        if (msg) {
            return AkNotification.warning({
                message: formatMessage({ id: CommonLocale.Tip }),
                description: msg
            });
        }
        const params = {
            TaskID: taskDetail.TaskInfo.TaskID
        };
        WorkflowFormHelper.onRecall(this, params, "flowcraft", (recalled: boolean) => {
            // this.setState({hasRecalled:true});
            if (recalled) {
                setTimeout(() => { FlowcraftCommon.goBack(); }, 2000);
            }
        });
    }
    renderActionbar() {
        const { cancleOrRevoke, hasRecalled } = this.state;
        const { formDef, taskDetail, isPreview } = this.props;
        const { formatMessage } = AkGlobal.intl;
        const { ButtonClose, ButtonTerminate, ButtonSave, ButtonSubmit, ButtonRevoke, ButtonReceive, ButtonResign, ButtonRecall } = ApplyContentLocale;
        let company = AkContext.getCompanyInfo();
        let appStatus = taskDetail.ApplicationInfo && taskDetail.ApplicationInfo.Status || 0;
        let fontColor = company ? { color: company.NavFontColour } : null;

        //bug59非申请人点击申请页面流程报表控件的流程编号，进入申请页面显示撤回和取消按钮
        let canRevokeOrCancle = taskDetail.ApplicationInfo && (AkContext.getUser().AccountID === taskDetail.ApplicationInfo.CreatedBy);

        let terminateMenu = <AkButton icon="minus-circle-o" style={fontColor} onClick={() => this.onCancel()}>
            {formatMessage({ id: ButtonTerminate })}
        </AkButton>;
        let revokeMenu = <AkButton icon="retweet" style={fontColor} onClick={() => this.onRevoke()}>
            {formatMessage({ id: ButtonRevoke })}
        </AkButton>;
        if (canRevokeOrCancle) {
            terminateMenu = CancelStatus.indexOf(appStatus) === -1 ? null : terminateMenu;
            revokeMenu = RevokeStatus.indexOf(appStatus) === -1 ? null : revokeMenu
        } else {
            terminateMenu = null;
            revokeMenu = null;
        }

        //347 如果有任务ID则是任务界面，无需显示保存和提交
        let taskid = false;
        let href = window.location.href;
        let findTaskid = href.indexOf("taskid");
        if (findTaskid > -1) {
            taskid = href.substring(findTaskid + 7).length > 0;
        }

        let menuContent = <AkCol>
            {terminateMenu}
            {revokeMenu}
            {SaveStatus.indexOf(appStatus) === -1
                ? null
                : (taskid ? null : <AkButton icon="save" style={fontColor} onClick={() => this.onSave()}>
                    {formatMessage({ id: ButtonSave })}
                </AkButton>)}
            {SubmitStatus.indexOf(appStatus) === -1
                ? null
                : (taskid ? null : <AkButton icon="fly" style={fontColor} onClick={() => this.onSubmit()}>
                    {formatMessage({ id: ButtonSubmit })}
                </AkButton>)}
            <AkButton icon="close" style={fontColor} onClick={() => this.onClose()}>
                {formatMessage({ id: ButtonClose })}
            </AkButton>
        </AkCol>;

        let saveVariableMenu = <AkButton icon="save" style={fontColor} onClick={() => this.onSaveVariable("")}>{formatMessage({ id: ButtonSave })}</AkButton>;
        let closeMenu = <AkButton icon="close" style={fontColor} onClick={() => this.onClose()}>{formatMessage({ id: ButtonClose })}</AkButton>;
        //放弃btn
        let resignMenu = <AkButton icon="rollback" style={fontColor} onClick={() => this.onResign()}>{formatMessage({ id: ButtonResign })}</AkButton>;
        //召回
        let recallMenu = <AkButton icon="recallback" style={fontColor} onClick={() => this.onRecall()}>{formatMessage({ id: ButtonRecall })}</AkButton>;

        //领用
        if (taskDetail.TaskInfo && taskDetail.TaskInfo.AssigneeID === "0") {
            menuContent = <AkCol>
                <AkButton icon="receive-task" style={fontColor} onClick={() => this.onReceiveTask()}>
                    {formatMessage({ id: ButtonReceive })}
                </AkButton>
                {closeMenu}
            </AkCol>;
        }

        let canRecallOutComs = ["Completed", "Approved", "Rejected"];
        let validateStatus = [ApplicationStatusEnum.Cancel, ApplicationStatusEnum.Error, ApplicationStatusEnum.Complete];
        //撤回或取消时，或者为待办任务/已办任务/我的申请（已取消、已拒绝、出差、已结束）时 只显示关闭按钮
        if (cancleOrRevoke
            || (taskDetail.TaskInfo && taskDetail.TaskInfo.AssigneeID !== "0")
            || (taskDetail.ApplicationInfo && validateStatus.indexOf(taskDetail.ApplicationInfo.Status) > -1)) {
            if (taskDetail.TaskInfo && !taskDetail.TaskInfo.Outcome && !this.isReceive) {//如果为代办任务，可以保存
                menuContent = <AkCol>
                    {(taskDetail.TaskInfo.Flags & TaskFlagsEnum.CandidateTask) === TaskFlagsEnum.CandidateTask ? resignMenu : null}
                    {/* 如果从我的委托打开，则不显示保存 1344 */}
                    {/* AIIB审批页面不显示保存按钮 */}
                    {formDef.attrs && formDef.attrs.owner || findTaskid > -1 ? null : saveVariableMenu}
                    {closeMenu}
                </AkCol>;
            } else if (taskDetail.TaskInfo
                && ((taskDetail.TaskInfo.Flags & TaskFlagsEnum.RecallTask) === TaskFlagsEnum.RecallTask)
                && (!taskDetail.TaskInfo.Outcome || canRecallOutComs.findIndex(f => f === taskDetail.TaskInfo.Outcome) > -1)
                && (taskDetail.ApplicationInfo.Status === ApplicationStatusEnum.Running)//任务运行中
                && taskDetail.TaskInfo.AssigneeID === AkContext.getUser().AccountID) {//如果是自己的任务并可以召回,则显示召回功能
                if (!hasRecalled) {
                    if (taskDetail.TaskInfo.RecalledID !== "0" || (taskDetail.TaskInfo.Flags & TaskFlagsEnum.NoCanRecallTask) === TaskFlagsEnum.NoCanRecallTask) {
                        menuContent = <AkCol>{closeMenu}</AkCol>;
                    } else {
                        menuContent = <AkCol>{recallMenu}{closeMenu}</AkCol>;
                    }
                } else {
                    menuContent = <AkCol>{closeMenu}</AkCol>;
                }
            } else {
                menuContent = <AkCol>{closeMenu}</AkCol>;
            }
        }
        return isPreview
            ? null
            : <AkRow className="akfc-form-actionbar" style={company ? {
                backgroundColor: company.NavBarColour,
                color: company.NavFontColour
            } : null} justify="space-between" type="flex" align="middle">
                <AkCol>
                    <span className="title over-title" style={fontColor}>{formDef.title}</span>
                </AkCol>
                {menuContent}
            </AkRow>;
    }


    render() {
        const { formDef, taskDetail, isPreview } = this.props;
        const { loading } = this.state;
        const { formatMessage } = AkGlobal.intl;
        return <div className="akfc-form">
            {this.renderActionbar()}
            <AkSpin spinning={loading}>
                <div className="akfc-form-content" style={{ marginTop: FlowcraftCommon.minSM ? "30px" : "" }}>
                    <AkStatusBar taskDetail={taskDetail} />
                    <AkForm>
                        {formDef && formDef.children ? this.displayChildControls({ children: formDef.children }) : null}
                    </AkForm>
                </div>
            </AkSpin>
        </div>;
    }
}
