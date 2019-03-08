import * as React from 'react';
import { withRouter } from 'react-router';
import {
    AkSpin,
    AkTab,
    RouterProps,
    AkCol,
    AkRow,
    AkMessage,
    AkUtil,
    AkInput,
    ContentListApi,
    AkContext,
    AkNoContent,
    ContentListWhereType,
    CustonDataGetTitleRequest, CommonLocale
} from 'akmii-yeeoffice-common';
import { PathConfig } from '../../config/pathconfig';
import { ProposalAPI } from '../../api/aiibworkflow/proposal';
import { AiibNewProposal, AiibProposalContacts, AIIBWorkflowHistoryTabInfo, AiibProposalForScreening, AiibCommonFun, AiibContrastModal } from '../../component/aiib';
import { CraftsMainContent } from 'akmii-yeeoffice-crafts';
import { AIIBLocale } from '../../locales/localeid';
import { ProjectContentList, AiibSendEmailCommom } from '../../api/aiibworkflow/content-list';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import Document from '../../component/document/document';
import { AiibContentListDefs, ColumnsArr, ProjectAllFieldsModal } from '../../api/aiibworkflow';
import { addAiibWorkflowHistory, MultipleFieldType, AIIBTeamMemberModel, AiibProjectProcessStatus, AiibProjectCancelStatus } from '../../api/aiibworkflow/common';
import { STATE_NEWPROPOSAL, STATE_MANAGERIOREVIEW, STATE_DGIOREVIRE, SATGE_PROPOSAL, currentUser } from '../../util/aiib-common';
import { DocumentPermissionType } from '../../util/document-common';
import { AiibContentListAPI } from '../../api/aiibworkflow/content-list-api';
import { isNullOrUndefined } from 'util';
import { connect } from 'react-redux';
import { AiibMilestones, AiibMilestoesType } from '../../component/aiib/aiib-milestones';
import { UserGroupsModel, ProjectFormFieldModal } from '../../api/aiibworkflow/aiib-content-list';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import AiibPrintModal from '../../component/aiib/print/aiib-print-modal';
import { PrintPageType } from '../../component/aiib/print/aiib-print-util';
import { AiibProjectResponse } from '../../component/aiib/common/aiib-response-tip';
import { PrintScreenSummaryRequest } from '../../api/aiibworkflow/proposal-request';

export interface AIIBProposalPageProps extends RouterProps {
    isAdmin?: boolean;
}

export interface AIIBProposalPageState {
    loading?: boolean;
    activeKey?: string;
    listData: ProjectAllFieldsModal;
    listDataID?: string;
    subSectorOptions?: any;
    disabled?: boolean;
    isEdit?: boolean;
    isScSecretariat?: boolean;
    aiiBTeamMemberListData?: AIIBTeamMemberModel[];
    contactsData?: any[];
    userGrops?: UserGroupsModel[];
    visiblePrintModal: boolean;
    visiblePrintType?: PrintPageType;
    showChangeTabModal?: boolean;
    modalValues?: any;
    modalListData?: any;
    isClose?: boolean;
    isReadOnly?:boolean;
}

@withRouter
@connect(state => ({ isAdmin: state.aiib.isAIIBAdmin }))
export default class AIIBProposalPage extends React.Component<AIIBProposalPageProps, AIIBProposalPageState>{
    refs: {
        NewProposal: any,
        ScreeningSummary: any
        Contacts: any
    }
    listDefs?: AiibContentListDefs[];
    changTabkKey: string;
    protectLoading: boolean;
    Title?: string;
    constructor(props, context) {
        super(props, context);
        this.state = {
            listDataID: AkUtil.getQueryString("listdataid"),
            loading: false,
            subSectorOptions: [],
            activeKey: this.props.location.query['tab'] || "proposal",
            listData: null,
            isEdit: false,
            isScSecretariat: false,
            aiiBTeamMemberListData: [],
            contactsData: [],
            userGrops: [],
            visiblePrintModal: false,
            showChangeTabModal: false,
            isClose: false,
            isReadOnly:false
        };
        this.Title = "Project";
        this.protectLoading = false;
        this.changTabkKey = "";
        this.listDefs = AiibCommonFun.getlocalStorageListDefsData();
    }

    static childContextTypes = {
        state: React.PropTypes.string,
        status: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        loadData: React.PropTypes.func,
        onOpenPrint: React.PropTypes.func,
    }

    getChildContext() {
        const { listData, disabled } = this.state;
        return {
            state: listData ? listData.State : "",
            status: listData ? listData.Status : "Unsubmitted",
            disabled: disabled,
            loadData: () => this.loadData(),
            onOpenPrint: this.onOpenPrint.bind(this),
        };
    }

    componentWillMount() {
        if (this.state.listDataID) {
            this.loadAllDate();
            this.setState({ isEdit: true });
        }
    }

    loadAllDate() {
        this.setState({ loading: true });
        const req1 = ContentListApi.GetListByListDataIdAndTitle({
            Title: "Project",
            Columns: [],
            ListDataID: this.state.listDataID
        });
        const req2 = ProjectAPI.getUserGroups({ userID: currentUser });
        Promise.all([req1, req2]).then(data => {
            if (data.find(item => item.Status !== 0)) {
                AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
            } else {
                let variable = data[0].Data;
                for (const key in variable) {
                    if (MultipleFieldType.indexOf(key) > -1) {
                        variable[key] = variable[key] ? JSON.parse(variable[key]) : [];
                    }
                }
                const userGrops = data[1].Data.filter(item => item && item.Ext1 === "UserGroup");
                const isScSecretariat = userGrops.find(item => item.Code === "SC Secretariat");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
                this.loadContactsList();
                this.loadMemberData(variable);
                this.setState({ listData: variable, userGrops, isScSecretariat: !isNullOrUndefined(isScSecretariat), 
                    isReadOnly:!isNullOrUndefined(isReadOnly),
                    loading: false },()=> {
                        this.disabledHandle(variable, userGrops);
                    });
            }
        });
    }

    loadData(contrastSave?: boolean) {
        this.protectLoading = true;
        this.setState({ loading: true });
        const rs = {
            Title: "Project",
            Columns: [],
            ListDataID: this.state.listDataID
        };
        ContentListApi.GetListByListDataIdAndTitle(rs).then(data => {
            this.protectLoading = false;
            if (data.Status === 0) {
                let variable = data.Data;
                for (const key in variable) {
                    if (MultipleFieldType.indexOf(key) > -1) {
                        variable[key] = variable[key] ? JSON.parse(variable[key]) : [];
                    }
                }

                this.disabledHandle(variable, this.state.userGrops);
                this.loadMemberData(variable);
                this.setState({ listData: variable }, () => {
                    this.setState({ loading: false });
                    if (contrastSave) {
                        this.setState({ showChangeTabModal: false, activeKey: this.changTabkKey });
                        this.onRouterReplace(this.changTabkKey);
                    }
                });
            } else {
                AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
            }
        });
    }

    loadContactsList(contrastSave?: boolean) {
        const { listDataID } = this.state;
        this.protectLoading = true;
        this.setState({ loading: true });
        const getReqeust: CustonDataGetTitleRequest = {
            Title: "Contact",
            Columns: ColumnsArr.contactsColumns,
            Wheres: [{
                WhereName: 'ProjectListDataID',
                Value: listDataID,
                Type: 0,
                Pre: "and",
            }],
            Verification: false
        };
        ContentListApi.GetDataByTitle(getReqeust).then(d => {
            this.protectLoading = false;
            if (d.Status === 0 && d.Data.length > 0) {
                this.setState({ contactsData: d.Data }, () => {
                    this.setState({ loading: false });
                    if (contrastSave) {
                        this.setState({ showChangeTabModal: false, activeKey: this.changTabkKey });
                        this.onRouterReplace(this.changTabkKey);
                    }
                });
            }
        })
    }

    async loadMemberData(variable) {
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
                Value: variable.ProjectID,
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
            this.setState({ aiiBTeamMemberListData: listData.Data });
        }
    }

    disabledHandle(variable, userGrops) {
        const { state: { isScSecretariat,isReadOnly }, props: { isAdmin } } = this;
        const user = AkContext.getUser().AccountID;
        if(isReadOnly) {
            this.setState({disabled:true}); return;
        }
        let disabled = variable.Status === "Inactive"
            || variable.DropStatus === "2"
        // || variable.Stage !== "Proposal";
       
        /**流程完成时或者流程运行中不能编辑页面*/
        if (variable.ProcessStatus === AiibProjectProcessStatus.Completed + ""
            || variable.ProcessStatus === AiibProjectProcessStatus.Running + "") {
            disabled = true;
        }
        /**流程Cancel发起后不能编辑页面*/
        if (variable.CancelStatus === AiibProjectCancelStatus.Cancelled + ''
            || variable.CancelStatus === AiibProjectCancelStatus.Cancelling + '') {
            disabled = true;
        }
        //提交prososal后直到 Excom Review 除了审批人和管理员外都disabled
        if((variable.State !== STATE_NEWPROPOSAL) && !isAdmin &&  (variable.DGIO !== user &&  variable.ManagerIO !== user) && (!isScSecretariat)) {
            disabled = true;
        }
        // if (!disabled) {
        //     if (isAdmin || AiibCommonFun.UserIsManager(userGrops)) {
        //         disabled = false;
        //     } else if (variable.CreatedBy === user || variable.State === STATE_NEWPROPOSAL) {
        //         disabled = variable.CreatedBy !== user;
        //     } else if (variable.State === STATE_MANAGERIOREVIEW) {
        //         disabled = variable.ManagerIO !== user;
        //     } else if (variable.State === STATE_DGIOREVIRE) {
        //         disabled = variable.DGIO !== user;
        //     } else {
        //         disabled = !isScSecretariat;
        //     }
        // }
        //cr 只有admin 和其他角色和manager IO 可审批
        // if(variable.State !== STATE_NEWPROPOSAL) {
            if(!disabled) {
            if(isAdmin || AiibCommonFun.UserIsManager(userGrops)) {
                disabled = false;
            }else if(variable.CreatedBy === user && variable.State === STATE_NEWPROPOSAL) {
                // disabled = variable.CreatedBy !== user;
                disabled = false;
            }else if(variable.CreatedBy !== user || variable.State === STATE_NEWPROPOSAL) {
                disabled = variable.CreatedBy !== user;
            }
            else if(variable.State === STATE_MANAGERIOREVIEW) {
                disabled = variable.ManagerIO !== user;
            }else if(variable.State === STATE_DGIOREVIRE) {
                disabled = variable.DGIO !== user;
            }else {
                disabled = !isScSecretariat;
          }
       }
        this.setState({ disabled });
    }

    documentPermission(): DocumentPermissionType {
        const { disabled, aiiBTeamMemberListData } = this.state;
        let documentPermissionType = null;
        if (!disabled) {
            documentPermissionType = DocumentPermissionType.All;
        } else {
            const member = aiiBTeamMemberListData && aiiBTeamMemberListData.filter(item => item.UserID === currentUser && item.Permission === "Edit");
            if (member && member.length > 0) {
                documentPermissionType = DocumentPermissionType.All;
            } else {
                documentPermissionType = DocumentPermissionType.Readonly;
            }
        }
        return documentPermissionType;
    }

    afterRequest(data) {
        const { listDataID, isClose } = this.state;
        this.protectLoading = false;
        if (data.Status === 0) {

            if (isClose) {
                AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                this.setState({
                    showChangeTabModal: false
                }, () => {
                    this.onClose();
                });
            } else {
                if (!listDataID) {
                    this.setState({ listDataID: data.Data.ListDataID });
                    this.props.router.replace({
                        pathname: PathConfig.ProposalPage,
                        query: {
                            listdataid: data.Data.ListDataID
                        }
                    });
                };
                this.loadData();
                AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                this.setState({ loading: false, isEdit: true });
            }

        } else if (data.Status === 101) {
            this.setState({ loading: false });
            AiibProjectResponse.errorStringTip(data.Message);
        } else {
            this.setState({ loading: false });
            AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
        }
    }

    onAddHandle(values) {
        let request: any = {
            Title: this.Title,
            Dic: {
                ...values
            }
        };
        ProposalAPI.addProposal(request).then(data => {
            this.afterRequest(data);
        });
    }

    onEditeHandle(values) {
        const { listDataID, listData } = this.state;
        let request = {
            Title: this.Title,
            ListDataID: listDataID,
            RowVersion: listData.RowVersion,
            Dic: {
                ...values
            }
        };
        ProjectContentList.editContentList(request).then(data => {
            this.afterRequest(data);
        });
    }

    onSubmitHandle(values, actionType) {
        const { listDataID, listData } = this.state;
        this.setState({ loading: true });
        let request = {
            Title: this.Title,
            Par: {
                ListDataID: listDataID,
                RowVersion: listData.RowVersion,
                Dic: {
                    ...values,
                },
                Wheres: [{
                    WhereName: "State",
                    Value: STATE_NEWPROPOSAL,
                    Type: ContentListWhereType.Eq
                }]
            },
            Verification: false
        };
        AiibContentListAPI.editByTitleWhere(request).then(data => {
            if (data.Status === 0) {
                this.onAddWorkflowHistory(actionType);
                this.onSendEmail(listData);
                AkMessage.success("Submitted successfully");
                this.setState({ loading: false });
                this.props.router.replace({
                    pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
                });
            } else {
                this.setState({ loading: false });
                AkMessage.error("Submitted failed,please refresh it before saving");
            }
        });
    }

    onSendEmail(listDate) {
        const code = "Proposal-Submit";
        AiibSendEmailCommom.sendEmail(code, undefined, listDate.ListDataID);
    }

    onAddWorkflowHistory(actionType: string) {
        const { listData } = this.state;
        let workflowHistory: addAiibWorkflowHistory = {
            Title: "ActionLog",
            DicList: [{
                Title: "Proposal Submitted",
                ProjectDataID: this.state.listDataID,
                ActionType: actionType,
                StartNum: listData.StartNum || "1",
                Category: "Proposal"
            }]
        };
        ContentListApi.AddBatchDataByTitle(workflowHistory);
    }

    onSave(value: ProjectFormFieldModal, actionType?: string) {
        const { listDataID, listData, isEdit } = this.state;
        // Subsector默认把null改成[]
        if (!value["Subsector"]) {
            value["Subsector"] = [];
        }

        if (actionType === "Close") {
            let isChange: boolean = false;
            if (isEdit) {
                isChange = AiibCommonFun.onContrastValues(value, listData);
            } else {
                isChange = true;
            }
            const modalValues = value;
            const modalListData = listData;
            if (isChange) {
                this.setState({ showChangeTabModal: true, modalValues, modalListData, isClose: true });
            } else {
                this.onClose();
            }
        } else {
            if (this.protectLoading) return;
            this.protectLoading = true;
            this.setState({ loading: true });

            let Approvers = [];
            if (value.ManagerIO) {
                Approvers = [value.ManagerIO];
            }
            if (value.DGIO && Approvers.indexOf(value.DGIO) === -1 && value.ManagerIO !== value.DGIO) {
                Approvers = [value.ManagerIO, value.DGIO];
            }
            value.Approvers = Approvers;
            const values = AiibCommonFun.setValuesStringfy(value);
            if (values.ProjectName) {
                if (actionType === "Submitted" && listDataID) {
                    this.onSubmitHandle(values, actionType);
                } else {
                    listDataID ? this.onEditeHandle(values) : this.onAddHandle(values);
                }
            } else {
                this.protectLoading = false;
                this.setState({ loading: false });
                AiibProjectResponse.errorStringTip("Please fill in the Project Name field!");
            }
        }
    }

    onContrastValues(values, allData) {
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                if (Object.keys(allData).length > 0) {
                    if ((values[key] || allData[key]) && JSON.stringify(values[key]) !== JSON.stringify(allData[key])) {
                        return true;
                    }
                } else if (values[key]) {
                    return true;
                }

            }
        }
        return false;
    }

    onTabChange(changeKeys) {
        const { activeKey, listData, contactsData, disabled } = this.state;
        if ((activeKey === "proposal" || activeKey === "screening" || activeKey === "contacts") && !disabled) {
            let isChange: boolean = false;
            let modalValues = null;
            let modalListData = null;
            const newProposalValues = this.refs.NewProposal ? this.refs.NewProposal.getFieldsValue() : {};
            const screenSummaryValues = this.refs.ScreeningSummary ? this.refs.ScreeningSummary.getFieldsValue() : {};
            const contacts = this.refs.Contacts ? this.refs.Contacts.getFieldsValue() : {};
            if (activeKey === "proposal" && newProposalValues) {
                isChange = AiibCommonFun.onContrastValues(newProposalValues, listData);
                modalValues = newProposalValues;
                modalListData = listData;
            } else if (activeKey === "screening" && screenSummaryValues) {
                isChange = AiibCommonFun.onContrastValues(screenSummaryValues, listData);
                modalValues = screenSummaryValues;
                modalListData = listData;
            } else if (activeKey === "contacts" && contacts) {
                let obj = {};
                contactsData.forEach(i => {
                    for (const key in i) {
                        if (i.hasOwnProperty(key)) {
                            obj[`${i.Code}_${key}`] = i[key];
                        }
                    }
                });
                isChange = this.onContrastValues(contacts, obj);
                modalValues = contacts;
                modalListData = contactsData;
            }
            if (isChange) {
                this.changTabkKey = changeKeys;
                this.setState({ showChangeTabModal: true, modalValues, modalListData });
            }
            else {
                this.onRouterReplace(changeKeys);
                this.setState({ activeKey: changeKeys });
            }
        } else {
            this.onRouterReplace(changeKeys);
            this.setState({ activeKey: changeKeys });
        }
    }

    onRouterReplace(changeKeys: string) {
        this.props.router.replace({
            pathname: PathConfig.ProposalPage,
            query: {
                backUrl: this.props.location.query["backUrl"],
                listdataid: this.props.location.query["listdataid"],
                state: this.props.location.query["state"],
                tab: changeKeys
            }
        });
    }

    onClose() {
        this.props.router.replace({
            pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
        });
    }

    renderBaseInfo() {
        const { listData } = this.state;
        const ProposalID = this.listDefs && this.listDefs.find(item => item.InternalName === "ProposalID");
        const ProjectStatus = this.listDefs && this.listDefs.find(item => item.InternalName === "ProcessStage");
        if (!ProposalID && !ProjectStatus) return;
        return <div>
            <AkRow className="mb10 aiib-title" type="flex" justify="space-between" >
                <AkCol>
                    <span className="aiib-title-text">{ProposalID.DisplayName}: {listData.ProposalID}</span><br />
                    <span className="aiib-title-text">{listData.CountryName ? listData.CountryName : null}
                        {(listData.CountryName && listData.ProjectShortName) ? ": " : null}
                        {listData.ProjectShortName ? listData.ProjectShortName : null}</span>
                </AkCol>
            </AkRow>
            {listData.Status === "Inactive" || listData.DropStatus !== "0" ? <AkRow className="mb15">
                <AkInput.TextArea disabled value={listData.CancelledComment}></AkInput.TextArea>
            </AkRow> : null}
        </div>;
    }

    renderTab() {
        const AkTabPane = AkTab.TabPane;
        const { state: { activeKey, disabled, listData, isEdit, loading, contactsData }, listDefs } = this;
        if (isEdit && !listData) return;
        if (!listDefs) return;
        return <AkTab type="card" className="proposalTab" activeKey={activeKey} onChange={(activeKey) => this.onTabChange(activeKey)}>
            <AkTabPane key="proposal" tab="Proposal">
                {activeKey === "proposal" ? this.renderNewProposal() : null}
            </AkTabPane>
            <AkTabPane key="screening" tab="Screening Summary">
                {activeKey === "screening" ? <AiibProposalForScreening ref="ScreeningSummary" isEdit={isEdit} disabled={disabled} listData={listData} onSave={(values, actionType) => this.onSave(values, actionType)} isReadOnly={this.state.isReadOnly}/> : null}
            </AkTabPane>
            <AkTabPane key="document" tab="Documents">
                {activeKey === "document" ? <div>
                    <p style={{ paddingLeft: "20px", paddingTop: "10px", fontSize: "14px" }}>Please include any documents necessary to support the application</p>
                    {listData.Stage === SATGE_PROPOSAL ? <Document
                         isReadOnly={this.state.isReadOnly}
                        documentPermissionType={this.documentPermission()}
                        id={this.state.listData.ProposalID}
                        stage={DocumentFolderType.ProposalID} /> : <Document
                            isReadOnly={this.state.isReadOnly}
                            documentPermissionType={DocumentPermissionType.Readonly}
                            id={listData.ProjectID}
                            stage={AiibCommonFun.ProjectDocumentFolderType(listData)} />}

                </div> : null}
            </AkTabPane>
            <AkTabPane key="contacts" tab="Contacts">
                {activeKey === "contacts" ?
                    <AiibProposalContacts
                        ref="Contacts"
                        isReadOnly={this.state.isReadOnly}
                        disable={disabled}
                        listData={listData}
                        loadData={() => this.loadContactsList()}
                        contactsData={contactsData}
                    />
                    : null}
            </AkTabPane>
            <AkTabPane key="workflowhistory" tab="Workflow History">
                {activeKey === "workflowhistory" ?
                    listData
                        ? <AIIBWorkflowHistoryTabInfo listDataID={this.state.listData.ListDataID} listData={listData} ></AIIBWorkflowHistoryTabInfo> : <AkNoContent loading={loading}></AkNoContent>
                    : null}
            </AkTabPane>
        </AkTab>;
    }

    renderNewProposal() {
        const { state: { disabled, listData, isEdit } } = this;
        if (isEdit && !listData) return;
        return <AiibNewProposal ref="NewProposal" isEdit={isEdit} disabled={disabled} listData={listData} onSave={(values, actionType) => this.onSave(values, actionType)} isReadOnly={this.state.isReadOnly}/>;
    }
    //拿到内容列表中字段配置选项
    getRules(InternalName: string) {
        const { listDefs } = this;
        const data = listDefs && listDefs.find(i => i.InternalName === InternalName);
        return data && JSON.parse(data.Rules);
    }
    onClosePrint() {
        this.setState({ visiblePrintModal: false });
    }
    onOpenPrint(type: PrintPageType) {
        this.setState({ visiblePrintModal: true, visiblePrintType: type });
    }
    renderMilestones() {
        const { listData } = this.state;
        const { State } = listData;
        if (State === STATE_NEWPROPOSAL) return null;
        const stateObj = this.getRules('State');
        const States = stateObj && stateObj.choices;
        if (!States) return null;
        // const index = States ? States.findIndex(i => i === State) : 0;
        let stepKey = listData.ProcessStage;
        if (listData.Stage !== SATGE_PROPOSAL) {
            stepKey = 'Approved by ExCom';
        }
        // if ((index + 1) === States.length) {
        //     stepKey = 'Approved by ExCom';
        // } else if (index >= 5) {
        //     stepKey = 'Recommended by ScrCom';
        // } else if (index > 2) {
        //     stepKey = 'Proposal documents complete';
        // }
        return <AiibMilestones
            stepType='proposal'
            stepKey={stepKey}
            stepState={listData.DropStatus === "2" ? AiibMilestoesType.cancel : AiibMilestoesType.pass} />;
    }
    render() {
        const { listData, loading, listDataID, visiblePrintModal, visiblePrintType, showChangeTabModal } = this.state;
        const backUrl = this.props.location.query['backUrl'] || PathConfig.NewProposal;
        return <CraftsMainContent withBack={true} header={AIIBLocale.ProposalPool} backUrl={backUrl}>
            <div style={{ display: visiblePrintModal ? 'none' : 'block' }}>
                <AkSpin spinning={loading}>
                    <div className="aiib-content-form aiib-content">
                        {listData && listData.ProposalID ? this.renderBaseInfo() : null}
                        {listData && listData.ProposalID ? this.renderMilestones() : null}
                        {listDataID ? this.renderTab() : this.renderNewProposal()}
                    </div>

                </AkSpin>
            </div>
            {
                visiblePrintModal
                    ?
                    <AiibPrintModal listData={listData} type={visiblePrintType} onClose={this.onClosePrint.bind(this)} />
                    :
                    null
            }
            {
                showChangeTabModal
                    ?
                    <AiibContrastModal
                        loading={this.state.loading}
                        values={this.state.modalValues}
                        listData={this.state.modalListData}
                        listDataID={this.state.listDataID}
                        activeKey={this.state.activeKey}
                        isClose={this.state.isClose}
                        onSaveClick={() => {
                            if (this.state.activeKey === "contacts") {
                                this.loadContactsList(true);
                            } else {
                                this.loadData(true);
                            }
                        }}
                        onNotSaveClick={() => {
                            if (this.state.isClose) {
                                this.setState({ showChangeTabModal: false }, () => {
                                    this.onClose();
                                });
                            } else {
                                this.setState({ showChangeTabModal: false, activeKey: this.changTabkKey }, () => {
                                    this.onRouterReplace(this.changTabkKey);
                                });
                            }
                        }}
                        onCloseSaveClick={() => {
                            this.onSave(this.state.modalValues);
                        }}
                        onCancelClick={() => {
                            this.setState({ showChangeTabModal: false, isClose: false });
                        }} />
                    :
                    null
            }
        </CraftsMainContent>;
    }
}
