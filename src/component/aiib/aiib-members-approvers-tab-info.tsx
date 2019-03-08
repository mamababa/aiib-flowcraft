import * as React from 'react';
import {
    AkRow,
    AkCol,
    AkForm,
    AkFormComponentProps,
    FormHelper,
    AkButton,
    ContentListApi,
    ContentListEditDatasRequest,
    ContentListAddDatasRequest,
    ContentListWhereType,
    AkSpin
} from 'akmii-yeeoffice-common';
import {
    AIIBTeamMemberModal,
    AIIBTeamMemberList,
    ProposalSaveHandle,
    AiibProjectApprovers,
    AiibEmailButton,
    AiibPromissionControl,
    AiibProjectResponse,
    AiibListUtil
} from "./";
import { AIIBTeamMemberModel, AiibProjectCancelStatus, AiibProjectProcessStatus } from '../../api/aiibworkflow/common';
import { ProposalAPI } from '../../api/aiibworkflow/proposal';
import { ProjectMembersApproversModal } from '../../api/aiibworkflow/model/project';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { SATGE_BOARDAPPROVED, currentUser } from '../../util/aiib-common';
import { connect } from 'react-redux';
import { CommonLocale } from 'akmii-yeeoffice-common';
import { AIIBLocale } from '../../locales/localeid';
import { AiibFormContent } from './common/aiib-form-content';

export interface AIIBMembersApproversTabInfoProps extends AkFormComponentProps {
    loadData?: () => void;
    listData?: any;
    isAdmin?: boolean;
    isReadOnly?:boolean;
}

export interface AIIBMembersApproversTabInfoState {
    AIIBTeamMemberListData?: AIIBTeamMemberModel[];
    AIIBSPBMembers?: string[];
    AIIBIOMemberListData?: AIIBTeamMemberModel[];
    AIIBIOMembers?: string[];
    disabled?: boolean;
    hasPermission?: boolean;
    memberAddVisible?: boolean;
    userGroups?: string[];
    loading?: boolean;
    listData?: any;
    specialistType?: "SPBSpecialist" | 'IOSpecialist';
}


@AkForm.create()
@connect(state => { return { isAdmin: state.aiib.isAIIBAdmin } })
export class AIIBMembersApproversTabInfo extends React.Component<AIIBMembersApproversTabInfoProps, AIIBMembersApproversTabInfoState> {
    refs: {
        PTLEmailButton: AiibEmailButton
        LawyersEmailButton: AiibEmailButton
        ControllerEmailButton: AiibEmailButton
        TreasuryEmailButton: AiibEmailButton
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled: false,
            AIIBTeamMemberListData: [],
            AIIBSPBMembers: [],
            AIIBIOMemberListData: [],
            AIIBIOMembers: [],
            memberAddVisible: false,
            userGroups: [],
            loading: false,
            listData: props.listData,
            hasPermission: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if ("listData" in nextProps && nextProps.listData.RowVersion !== this.props.listData.RowVersion) {
            this.setState({ listData: nextProps.listData });
        }
    }

    componentDidMount() {
        const { listData } = this.state;
        if (listData) {
            this.loadListData();
            this.getUserGroups();
            this.setFormValues(listData);
            this.disabledCheck(listData);
        }
    }

    disabledCheck(variable) {
        let disabled: boolean = false;
        let hasPermission: boolean = false;
        const user = currentUser;
        /**PTL ManagerIO DG IO 可编辑表单*/
        if ((variable.ProjectLeader).indexOf(user) > -1 || user === variable.ManagerIO || user === variable.DGIO || this.props.isAdmin) {
            hasPermission = true;
        }
        if(this.props.isReadOnly) {
            this.setState({disabled:true,hasPermission});
            return;
        }
        /**流程完成时或者cancel流程完成不能编辑页面*/
        if (variable.ProcessStatus === AiibProjectProcessStatus.Completed + ""
            || variable.ProcessStatus === AiibProjectProcessStatus.Running + ""
            || variable.CancelStatus === AiibProjectCancelStatus.Cancelled + ""
            || variable.CancelStatus === AiibProjectCancelStatus.Cancelling + "") {
            disabled = true;
        }

        if (variable.Stage === SATGE_BOARDAPPROVED) {
            disabled = true;
        }

        this.setState({ disabled, hasPermission });
    }

    getUserGroups() {
        ProjectAPI.getUserGroups({ userID: "" }).then(data => {
            if (data.Status === 0) {
                const userGroups = data.Data.filter(item => item && item.Ext1 === "UserGroup").map(i => {
                    return i.Code;
                });
                this.setState({ userGroups });
            }
        });
    }

    setFormValues(values) {
        this.props.form.setFieldsValue({
            ProjectLeader: values.ProjectLeader,
            Lawyers: values.Lawyers,
            Controller: values.Controller,
            Treasury: values.Treasury,
            ManagerIO: values.ManagerIO,
            DGIO: values.DGIO,
        });
    }

    private async loadListData() {
        const requestData = {
            Title: "Project-Member",
            Columns: [
                "Permission",
                "Role",
                "UserID",
                "ListDataID",
                "Type"
            ],
            Wheres: [{
                WhereName: "ProjectID",
                Value: this.props.listData.ProjectID,
                Type: ContentListWhereType.Eq,
                Pre: "and"
            }],
            FilterValue: "",
            PageIndex: 1,
            PageSize: 9999,
            Verification: false
        };
        const listData = await ContentListApi.GetDataByTitle(requestData);
        if (listData.Status === 0) {
            const AIIBTeamMemberListData = listData.Data.filter(item => item.Type === "" || item.Type === "SPBSpecialist");
            const AIIBSPBMembers = listData.Data.filter(item => item.Type === "" || item.Type === "SPBSpecialist").map(i => i.UserID);
            const AIIBIOMemberListData = listData.Data.filter(item => item.Type === "IOSpecialist");
            const AIIBIOMembers = listData.Data.filter(item => item.Type === "IOSpecialist").map(i => i.UserID);
            this.setState({ AIIBTeamMemberListData, AIIBIOMemberListData, AIIBSPBMembers, AIIBIOMembers });
        }
    }

    handelAddOrEidtMembers(value?: any, isEidt?: boolean) {
        if (!value) return;
        if (!this.props.listData.ProjectID) return;

        let params: ContentListAddDatasRequest | ContentListEditDatasRequest = {
            Title: "Project-Member",
            Dic: { ...value, ProjectID: this.props.listData.ProjectID },
            ListDataID: value.ListDataID
        };
        if (isEidt) {
            ContentListApi.EditDataByTitle(params).then(data => {
                if (data.Status === 0) {
                    this.loadListData();
                    AiibProjectResponse.successTip(CommonLocale.EditSuccess);
                } else {
                    AiibProjectResponse.errorTip(CommonLocale.EditFail);
                }
            });
        } else {
            ContentListApi.AddDataByTitle(params).then(data => {
                if (data.Status === 0) {
                    this.loadListData();
                    AiibProjectResponse.successTip(CommonLocale.AddSuccess);
                } else {
                    AiibProjectResponse.errorTip(CommonLocale.AddFail);
                }
            })
        }
    }

    onSave(value?: any, childKey?: string) {
        this.setState({ loading: true });
        let variable = null;
        if (!value) {
            variable = this.props.form.getFieldsValue() as ProjectMembersApproversModal;
            let approvers = [];
            for (const key in variable) {
                if (key !== "ProjectLeader" && variable[key]) {
                    if (Array.isArray(variable[key])) {
                        variable[key].forEach(i => {
                            if (approvers.indexOf(i) === -1)
                                approvers.push(i);
                        });
                    } else if (approvers.indexOf(variable[key]) === -1) {
                        approvers.push(variable[key]);
                    }
                }

                if (variable[key] && Array.isArray(variable[key])) {
                    variable[key] = JSON.stringify(variable[key]);
                }
            }

            variable.Approvers = JSON.stringify(approvers);
        } else {
            variable = {
                Members: value.length > 0 ? JSON.stringify(value) : ""
            };
        }

        let request: any = {
            Title: "Project",
            ListDataID: this.props.listData.ListDataID,
            RowVersion: this.props.listData.RowVersion,
            Dic: {
                ...variable
            }
        };
        ProposalAPI.saveMembers(request).then(data => {
            this.setState({ loading: false });
            if (data.Status === 0) {
                this.props.loadData();
                if (!value && !childKey) {
                    AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                }
                if (childKey) {
                    this.onSendEmail(childKey);
                }
            } else if (value && data.Status === 101) {
                AiibProjectResponse.errorStringTip(data.Message);
            } else {
                !value && AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
            }
        });
    }


    onSendEmail(childKey: string) {
        if (childKey === "PTLEmailButton") {
            this.refs.PTLEmailButton.onSendEmail();
        } else if (childKey === "LawyersEmailButton") {
            this.refs.LawyersEmailButton.onSendEmail();
        } else if (childKey === "ControllerEmailButton") {
            this.refs.ControllerEmailButton.onSendEmail();
        } else if (childKey === "TreasuryEmailButton") {
            this.refs.TreasuryEmailButton.onSendEmail();
        }
    }

    onSpecialishChange(data, value, type: "SPBSpecialist" | 'IOSpecialist', isEdit) {
        const { AIIBIOMemberListData, AIIBTeamMemberListData } = this.state;
        if (value) {
            this.handelAddOrEidtMembers(value, isEdit);
        } else {
            this.loadListData();
        }
        const allData = type === "IOSpecialist" ? [...data, ...AIIBTeamMemberListData] : [...data, ...AIIBIOMemberListData];
        let memberArr = [];
        allData && allData.forEach(item => {
            if (memberArr.indexOf(item.UserID) === -1) {
                memberArr.push(item.UserID);
            }
        });
        if (!isEdit && memberArr.indexOf(value.UserID) === -1) {
            memberArr.push(value.UserID);
        }
        this.onSave(memberArr);
    }

    promissionCheck(group: string) {
        const { props: { isAdmin }, state: { disabled, userGroups } } = this;
        let isHidden = true;
        if (disabled) {
            isHidden = true;
        } else if (isAdmin) {
            isHidden = false;
        } else if (userGroups.indexOf(group) > -1) {
            isHidden = false;
        }

        return isHidden;
    }

    disabledEntertoModal(e, specialistType) {
        this.setState({ memberAddVisible: true, specialistType })
        e.target.blur();
        e.preventDefault();
    }

    renderApproversActions() {
        const { state: { hasPermission, userGroups } } = this;
        const disabled = this.state.disabled || !(hasPermission || userGroups.indexOf("DG SPB") > -1 || userGroups.indexOf("OGC") > -1 || userGroups.indexOf("Controller") > -1 || userGroups.indexOf("Treasury") > -1);
        return <AkRow type="flex" justify="end">
            <AkCol >
                {AiibPromissionControl.hasSaveElements(this.props.isReadOnly || disabled, <ProposalSaveHandle onClick={() => this.onSave()}></ProposalSaveHandle>)}
            </AkCol>
        </AkRow>;
    }

    renderRequestEamils() {
        const { state: { listData } } = this;
        const AssignPromission = listData.ManagerIO === currentUser || listData.DGIO === currentUser || this.props.isAdmin;
        const disabled = this.state.disabled || !AssignPromission;
        return AiibPromissionControl.hasSaveElements(disabled, <AkRow type="flex" justify="end" className="mt15 ak-tab-actions">
            <AiibEmailButton code="Project-Member-Request" toGroups={["Treasury"]} iconClassName="iconfont icon-assign" listData={listData} btnText="Request Treasurer To Assign Members" />

            <AiibEmailButton code="Project-Member-Request" toGroups={["Controller"]} iconClassName="iconfont icon-assign" listData={listData} btnText="Request Controller to Assign Members" />

            <AiibEmailButton code="Project-Member-Request" toGroups={["OGC"]} iconClassName="iconfont icon-assign" listData={listData} btnText="Request General Counsel to Assign Lawyers" />

            <AiibEmailButton code="Project-Member-Request" toGroups={["DG SPB"]} iconClassName="iconfont icon-assign" listData={listData} btnText="Request DG SPB to Assign Specialist" />
        </AkRow>);
    }

    renderIOSpecialist() {
        const { state: { hasPermission, AIIBIOMemberListData } } = this;
        const disabled = this.state.disabled || !hasPermission;
        return <div>
            {this.renderMembersActions("IOSpecialist")}
            <AkRow>
                <AIIBTeamMemberList type="IOSpecialist" disabled={disabled} dataSource={AIIBIOMemberListData} onChange={(data, v) => {
                    if (v) {
                        (v as AIIBTeamMemberModel).Type = "IOSpecialist";
                    }
                    this.onSpecialishChange(data, v, "IOSpecialist", true);
                }} ></AIIBTeamMemberList>
            </AkRow>
        </div>;
    }

    renderPTL() {
        const { props, state: { hasPermission, listData } } = this;
        const disabled = this.state.disabled || !hasPermission;
        const PTL = this.props.form.getFieldValue("ProjectLeader");
        return <div className="aiib-members">
            <AiibFormContent title="Responsibility of IO" contentClassName="aiib-members-content">
                {props.isReadOnly ? null : this.renderRequestEamils()}
                <AkRow  {...FormHelper.rowLayout} >
                    {AiibListUtil.ConvertDefToFormItem(props, "ProjectLeader", disabled, true)}
                    {AiibPromissionControl.hasSaveElements(this.props.isReadOnly || disabled, <AiibEmailButton
                        ref="PTLEmailButton"
                        btnClassName="aiib-members-email"
                        to={PTL}
                        code="Project-SendTo-PTL"
                        listData={listData}
                        onSave={() => this.onSave(null, "PTLEmailButton")}
                        btnText="Send Email To PTL" />)}
                </AkRow>
                {this.renderIOSpecialist()}
            </AiibFormContent>
        </div>;
    }

    renderMembersActions(specialistType?: "SPBSpecialist" | 'IOSpecialist') {
        const { state: { disabled, hasPermission, AIIBIOMembers, AIIBSPBMembers },props:{isReadOnly} } = this;
        const IOMemberDisabled = disabled || !hasPermission;
        const membersCrol = this.promissionCheck("DG SPB");
        const membersTo = specialistType === "IOSpecialist" ? AIIBIOMembers : AIIBSPBMembers;

        return AiibPromissionControl.hasSaveElements(specialistType === "IOSpecialist" ? (isReadOnly || IOMemberDisabled) : (isReadOnly ||membersCrol), <AkRow type="flex" justify="end" className="ak-tab-actions">
            <AkCol>
                <AkButton className='aiib-button dark' icon="plus" onClick={(e) => {
                    this.disabledEntertoModal(e, specialistType);
                }}>Add New Member</AkButton>
                <AiibEmailButton
                    to={membersTo}
                    fieldKey="Specialist"
                    code="Project-Member-SendTo"
                    listData={this.state.listData}
                    btnText="Send Email to Specialist" />
            </AkCol>
        </AkRow>)
    }

    renderMembers() {
        const topThis = this;
        const { state: { AIIBTeamMemberListData } } = topThis;
        const membersCrol = this.promissionCheck("DG SPB");
        return <AiibFormContent title={<span>Responsibility of SPB <span className="ant-form-item-required"></span></span>}>
            {this.renderMembersActions("SPBSpecialist")}
            <AIIBTeamMemberList type="SPBSpecialist" disabled={membersCrol} dataSource={AIIBTeamMemberListData} onChange={(data, v) => {
                if (v) {
                    (v as AIIBTeamMemberModel).Type = "SPBSpecialist";
                }
                this.onSpecialishChange(data, v, "SPBSpecialist", true);
            }} ></AIIBTeamMemberList>
        </AiibFormContent>;
    }

    renderLawyers() {
        const { props } = this;
        const lawyersCrol = this.promissionCheck("OGC");
        const Lawyers = this.props.form.getFieldValue("Lawyers");
        return <div className="aiib-members">
            <AiibFormContent title="Responsibility of General Counsel" contentClassName="aiib-members-content">
                <AkRow  {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "Lawyers", lawyersCrol, true)}
                    {AiibPromissionControl.hasSaveElements(this.props.isReadOnly || lawyersCrol, <AiibEmailButton
                        ref="LawyersEmailButton"
                        btnClassName="aiib-members-email"
                        to={Lawyers}
                        code="Project-Member-SendTo"
                        listData={this.state.listData}
                        fieldKey="Lawyers"
                        onSave={() => this.onSave(null, "LawyersEmailButton")}
                        btnText="Send Email to Lawyers" />)}
                </AkRow>
            </AiibFormContent>
        </div>;
    }

    renderController() {
        const { props } = this;
        const ControllerCrol = this.promissionCheck("Controller");
        const Controller = this.props.form.getFieldValue("Controller");

        return <div className="aiib-members">
            <AiibFormContent title="Responsibility of Controller" contentClassName="aiib-members-content">
                <AkRow  {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "Controller", ControllerCrol, true)}
                    {AiibPromissionControl.hasSaveElements(props.isReadOnly || ControllerCrol, <AiibEmailButton
                        ref="ControllerEmailButton"
                        btnClassName="aiib-members-email"
                        to={Controller}
                        code="Project-Member-SendTo"
                        fieldKey="Controller"
                        listData={this.state.listData}
                        onSave={() => this.onSave(null, "ControllerEmailButton")}
                        btnText="Send Email to Controller" />)}

                </AkRow>
            </AiibFormContent>
        </div>;
    }

    renderTreasury() {
        const { props } = this;
        const TreasuryCrol = this.promissionCheck("Treasury");
        const Treasury = this.props.form.getFieldValue("Treasury");
        return <div className="aiib-members">
            <AiibFormContent title="Responsibility of Treasury" contentClassName="aiib-members-content">
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "Treasury", TreasuryCrol, true)}
                    {AiibPromissionControl.hasSaveElements(props.isReadOnly || TreasuryCrol, <AiibEmailButton
                        ref="TreasuryEmailButton"
                        btnClassName="aiib-members-email"
                        to={Treasury}
                        code="Project-Member-SendTo"
                        fieldKey="Treasury"
                        listData={this.state.listData}
                        onSave={() => this.onSave(null, "TreasuryEmailButton")}
                        btnText="Send Email to Treasury" />)}
                </AkRow>
            </AiibFormContent>
        </div>;
    }

    renderApprovers() {
        const { state: { hasPermission } } = this;
        const disabled = this.state.disabled || !hasPermission;
        return <AiibFormContent title="Approvers">
            <AiibProjectApprovers disabled={disabled} {...this.props} />
        </AiibFormContent>;
    }

    render() {
        const { memberAddVisible, AIIBIOMemberListData, specialistType, AIIBTeamMemberListData, } = this.state;
        return <AkSpin spinning={this.state.loading}>
            <AkForm>
                {this.renderApproversActions()}
                {this.renderPTL()}
                {this.renderApprovers()}
                {this.renderMembers()}
                {this.renderLawyers()}
                {this.renderController()}
                {this.renderTreasury()}
                {memberAddVisible === true ?
                    <AIIBTeamMemberModal type={specialistType} visible={memberAddVisible} onCancel={() => {
                        this.setState({ memberAddVisible: false });
                    }} onOk={(v: AIIBTeamMemberModel) => {
                        v.Type = specialistType;
                        let data = specialistType === "IOSpecialist" ? AIIBIOMemberListData : AIIBTeamMemberListData;
                        if (data.findIndex(i => i.UserID === v.UserID) === -1) {
                            this.setState({ memberAddVisible: false });
                            this.onSpecialishChange(data, v, specialistType, false);
                        } else {
                            AiibProjectResponse.errorTip(AIIBLocale.MembersUnique);
                        }
                    }}></AIIBTeamMemberModal> : null}
            </AkForm>
        </AkSpin>;

    }

}
