import * as React from 'react';
import {
    AkSpin,
    AkCol,
    RouterProps,
    AkInput,
    AkTab,
    AkUtil,
    AkRow,
    ContentListApi,
    AkContext,
    ContentListWhereType
} from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import { CraftsMainContent } from 'akmii-yeeoffice-crafts';
import { AIIBLocale } from '../../locales/localeid';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import Document from '../../component/document/document';
import {
    AIIBMembersApproversTabInfo,
    AIIBWorkflowHistoryTabInfo,
    ProjectInfo,
    AiibCommonFun,
    AIIBSubProjectInfo,
    AiibContrastModal
} from '../../component/aiib';
import { AiibContentListDefs, ProjectAllFieldsModal } from '../../api/aiibworkflow';
import { DocumentPermissionType } from '../../util/document-common';
import { SATGE_BOARDAPPROVED, SATGE_CONCEPT } from '../../util/aiib-common';
import {
    MultipleFieldType,
    AIIBTeamMemberModel,
    AiibProjectCancelStage,
    AiibProjectCancelStatus,
    AiibProjectProcessStatus
} from '../../api/aiibworkflow/common';
import { PathConfig } from '../../config/pathconfig';
import { AiibMilestones, AiibMilestoesType } from '../../component/aiib/aiib-milestones';
import { connect } from 'react-redux';
import { AkModal, AkButton, CommonLocale } from 'akmii-yeeoffice-common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { UserGroupsModel } from '../../api/aiibworkflow/aiib-content-list';
import { PrintPageType } from '../../component/aiib/print/aiib-print-util';
import AiibPrintModal from '../../component/aiib/print/aiib-print-modal';
import { AiibProjectResponse } from '../../component/aiib/common/aiib-response-tip';
import { isNullOrUndefined } from 'util';

export interface AIIBProjectPageProps extends RouterProps {
    listDataID?: string;
    isAdmin?: boolean;
}

export interface AIIBProjectPageState {
    loading?: boolean;
    activeKey?: string;
    listDataID?: string;
    documentFolderType?: number;
    listData: ProjectAllFieldsModal;
    disable?: boolean;
    AIIBTeamMemberListData?: AIIBTeamMemberModel[];
    documentPermissionType?: DocumentPermissionType;
    userGrops?: UserGroupsModel[];
    visiblePrintModal: boolean;
    visiblePrintType?: PrintPageType;
    showChangeTabModal?: boolean;
    modalValues?: ProjectAllFieldsModal;
    modalListData?: ProjectAllFieldsModal;
    isReadOnly?:boolean;
}

export const currentUser = AkContext.getUser().AccountID;

@withRouter
@connect(state => { return { isAdmin: state.aiib.isAIIBAdmin } })
export default class AIIBProjectPage extends React.Component<AIIBProjectPageProps, AIIBProjectPageState> {
    refs: {
        ProjectInfo: any,
        MembersApprovers: any
    }
    changTabkKey: string;
    protectLoading: boolean;
    listDefs: AiibContentListDefs[];
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            activeKey: this.props.location.query['tab'] || 'proInfo',
            listDataID: AkUtil.getQueryString('listdataid'),
            listData: null,
            disable: false,
            AIIBTeamMemberListData: [],
            userGrops: [],
            visiblePrintModal: false,
            showChangeTabModal: false,
            isReadOnly:false
        };
        this.protectLoading = false;
        this.changTabkKey = "";
        this.listDefs = AiibCommonFun.getlocalStorageListDefsData();
    }

    static childContextTypes = {
        documentFolderType: React.PropTypes.number,
        listData: React.PropTypes.object,
        listDefs: React.PropTypes.array,
        onOpenPrint: React.PropTypes.func,
    };

    getChildContext() {
        return {
            documentFolderType: this.state.documentFolderType,
            listData: this.state.listData,
            listDefs: this.listDefs,
            onOpenPrint: this.onOpenPrint.bind(this),
        };
    }

    componentWillMount() {
        this.loadAllDate();

    }

    loadAllDate() {
        if (this.protectLoading) return;
        this.protectLoading = true;
        this.setState({ loading: true });
        const req1 = ContentListApi.GetListByListDataIdAndTitle({
            Title: 'Project',
            Columns: [],
            ListDataID: this.state.listDataID
        });
        const req2 = ProjectAPI.getUserGroups({ userID: currentUser });
        Promise.all([req1, req2]).then(data => {
            this.protectLoading = false;
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
                const isReadOnly = userGrops.find(item =>item.Code === "Readonly");
                const documentFolderType = AiibCommonFun.ProjectDocumentFolderType(variable);
                this.loadMemberData(variable);
                this.setState({ listData: variable, documentFolderType, userGrops, loading: false,isReadOnly:!isNullOrUndefined(isReadOnly)},()=> {
                    this.disabledCheck(variable, userGrops);
                });
            }
        });
    }

    loadData(contrastSave?: boolean) {
        this.protectLoading = true;
        this.setState({ loading: true });

        const rs = {
            Title: 'Project',
            Columns: [],
            ListDataID: this.state.listDataID
        }
        ContentListApi.GetListByListDataIdAndTitle(rs).then((data) => {
            this.protectLoading = false;
            if (data.Status === 0) {
                let variable = data.Data;
                for (const key in variable) {
                    if (MultipleFieldType.indexOf(key) > -1) {
                        variable[key] = variable[key] ? JSON.parse(variable[key]) : [];
                    }
                }
                this.disabledCheck(variable, this.state.userGrops);
                const documentFolderType = AiibCommonFun.ProjectDocumentFolderType(variable);
                this.setState({ listData: variable, documentFolderType }, () => {
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

    async loadMemberData(variable) {
        const requestData = {
            Title: 'Project-Member',
            Columns: ['Permission', 'Role', 'UserID', 'ListDataID', 'Type'],
            Wheres: [
                {
                    WhereName: 'ProjectID',
                    Value: variable.ProjectID,
                    Type: ContentListWhereType.Eq,
                    Pre: 'and'
                }
            ],
            FilterValue: '',
            PageIndex: 1,
            PageSize: 99999,
            Verification: false
        };
        const listData = await ContentListApi.GetDataByTitle(requestData);
        if (listData.Status === 0) {
            this.setState({ AIIBTeamMemberListData: listData.Data });
        }
    }

    disabledCheck(variable, userGrops) {
        let disable: boolean = true;
        const user = AkContext.getUser();
        if(this.state.isReadOnly) {
            this.setState({disable:true});
            return;
        }
        /**PTL ManagerIO DG IO admin 可编辑表单*/
        if (
            variable.ProjectLeader.indexOf(user.AccountID) > -1 ||
            user.AccountID === variable.ManagerIO ||
            user.AccountID === variable.DGIO ||
            user.AccountID === variable.CreatedBy ||
            this.props.isAdmin ||
            AiibCommonFun.UserIsManager(userGrops)) {
            disable = false;
        }

        /**流程完成时不能编辑页面*/
        if (variable.ProcessStatus === AiibProjectProcessStatus.Completed + ""
            || variable.ProcessStatus === AiibProjectProcessStatus.Running + "") {
            disable = true;
        }

        /**流程Cancel完成时不能编辑页面*/
        if (variable.CancelStatus === AiibProjectCancelStatus.Cancelled + ''
            || variable.CancelStatus === AiibProjectCancelStatus.Cancelling + '') {
            disable = true;
        }
        /**board approved 阶段表单不可编辑*/
        if (variable.Stage === SATGE_BOARDAPPROVED) {
            disable = true;
        }
        this.setState({ disable });
    }

    onRouterReplace(changTabkKey) {
        this.props.router.replace({
            pathname: PathConfig.ProjectPage,
            query: {
                backUrl: this.props.location.query["backUrl"],
                listdataid: this.props.location.query["listdataid"],
                state: this.props.location.query["state"],
                tab: changTabkKey
            }
        });
    }

    onTabChange(changeKeys) {
        const { activeKey, listData, disable } = this.state;
        const projectInfoValues = this.refs.ProjectInfo ? this.refs.ProjectInfo.getFieldsValue() : {};
        const membersApproversValues = this.refs.MembersApprovers ? this.refs.MembersApprovers.getFieldsValue() : {};
        let isChange: boolean = false;
        let modalValues = null;
        let modalListData = null;
        if (activeKey === "proInfo" && projectInfoValues && !disable) {
            isChange = AiibCommonFun.onContrastValues(projectInfoValues, listData);
            modalValues = projectInfoValues;
            modalListData = listData;
        } else if (activeKey === "members" && membersApproversValues && !disable) {
            isChange = AiibCommonFun.onContrastValues(membersApproversValues, listData);
            modalValues = membersApproversValues;
            modalListData = listData;
        } else {
            this.onRouterReplace(changeKeys);
            this.setState({ activeKey: changeKeys });
        }

        if (isChange) {
            this.changTabkKey = changeKeys;
            this.setState({ showChangeTabModal: true, modalValues, modalListData });
        } else {
            this.onRouterReplace(changeKeys);
            this.setState({ activeKey: changeKeys });
        }

    }

    renderTabChangeModalFooter() {
        return <AkRow>
            <AkButton type="primary" icon="check-circle-o" size="large" className="btn-footer btn-search"
                onClick={() => {
                    this.onRouterReplace(this.changTabkKey);
                    this.setState({ showChangeTabModal: false, activeKey: this.changTabkKey });
                }}>Ok</AkButton>
            <AkButton type="primary" icon="close-circle-o" size="large" className="btn-footer btn-cancel"
                onClick={() => {
                    this.setState({ showChangeTabModal: false });
                }}>Cancel</AkButton>
        </AkRow>;
    }

    renderTabChangeModal() {
        return <AkModal
            visible={true}
            wrapClassName="aiib-adv-search-modal"
            title="Confirm"
            okText="Ok"
            footer={this.renderTabChangeModalFooter()}
            onCancel={() => {
                this.setState({ showChangeTabModal: false });
            }}>
            <div>Switching may result in data loss, please confirm that it has been saved?</div>
        </AkModal>;
    }

    documentPermission(): DocumentPermissionType {
        const { disable, AIIBTeamMemberListData, listData } = this.state;
        let documentPermissionType = null;
        if (disable && listData.Stage === SATGE_BOARDAPPROVED) {
            documentPermissionType = DocumentPermissionType.Upload;
        } else if (!disable) {
            documentPermissionType = DocumentPermissionType.All;
        } else if (listData.ProcessStatus === AiibProjectProcessStatus.Completed + ""
            || listData.ProcessStatus === AiibProjectProcessStatus.Running + ""
            || listData.CancelStatus === AiibProjectCancelStatus.Cancelled + ""
            || listData.CancelStatus === AiibProjectCancelStatus.Cancelling + "") {
            documentPermissionType = DocumentPermissionType.Readonly;
        } else if (listData.Approvers.indexOf(currentUser) > -1) {
            documentPermissionType = DocumentPermissionType.All;
        } else {
            const member =
                AIIBTeamMemberListData &&
                AIIBTeamMemberListData.filter((item) => item.UserID === currentUser && item.Permission === 'Edit');
            if (member && member.length > 0) {
                documentPermissionType = DocumentPermissionType.All;
            } else {
                documentPermissionType = DocumentPermissionType.Readonly;
            }
        }
        return documentPermissionType;
    }

    renderBaseInfo() {
        const { state: { listData } } = this;
        const colon = (listData.CountryName && listData.ProjectShortName) ? ":" : "";
        return listData ? (
            <div>
                <AkRow className="mb10 aiib-title" type="flex" justify="space-between">
                    <AkCol>
                        <span className="aiib-title-text">Project ID: {listData.ProjectID}</span>
                        <br />
                        <span className="aiib-title-text">
                            {(!listData.CountryName && !listData.ProjectShortName) ? null : `${listData.CountryName}${colon} ${listData.ProjectShortName}`}
                        </span>
                    </AkCol>
                </AkRow>
                <AkRow>{this.renderMilestones()}</AkRow>
                {listData.CancelStage !== AiibProjectCancelStage.Default + '' || listData.Status === 'Inactive' ? (
                    <AkRow className="mb15">
                        <AkInput.TextArea disabled value={listData.CancelledComment} />
                    </AkRow>
                ) : null}
            </div>
        ) : null;
    }

    renderMilestones() {
        const { listData } = this.state;
        if (listData.Stage === SATGE_CONCEPT && listData.ProjectLeader.length === 0 && listData.ProcessStatus === '0')
            return null;
        return (
            <AiibMilestones
                stepType={listData.FinancingMethod === 'Sovereign-backed Financing' ? 'sovereign' : 'nonSovereign'}
                stepKey={listData.ProcessStage}
                stepState={listData.CancelStatus === '2' ? AiibMilestoesType.cancel : AiibMilestoesType.pass}
            />
        );
    }

    renderTab() {
        const AkTabPane = AkTab.TabPane;
        const { state: { activeKey, documentFolderType, listData, disable } } = this;
        if (!listData || !this.listDefs) return;
        return (
            <AkTab
                className="mt30 proposalTab"
                type="card"
                activeKey={activeKey}
                onChange={(activeKey) => this.onTabChange(activeKey)}
            >
                <AkTabPane key="proInfo" tab="Project Info">
                    {activeKey === 'proInfo' ? (
                        <ProjectInfo
                            ref="ProjectInfo"
                            loadData={() => {
                                this.loadData();
                            }}
                            disabled={disable}
                            isReadOnly={this.state.isReadOnly}
                            listData={listData}
                        />
                    ) : null}
                </AkTabPane>
                <AkTabPane key="subProject" tab="Sub Project Info">
                    {activeKey === 'subProject' ? (
                        <AIIBSubProjectInfo
                            projectID={listData.ProjectID}
                            projectLeader={listData.ProjectLeader}
                            disabled={disable}
                        />
                    ) : null}
                </AkTabPane>
                <AkTabPane key="document" tab="Documents">
                    {activeKey === 'document' ? (
                        <div>
                            <Document
                                documentPermissionType={this.documentPermission()}
                                isReadOnly={this.state.isReadOnly}
                                id={listData.ProjectID}
                                stage={DocumentFolderType.Working}
                                ProcessStatus={listData.ProcessStatus}
                            />
                            <Document
                                documentPermissionType={DocumentPermissionType.Readonly}
                                id={listData.ProjectID}
                                isReadOnly={this.state.isReadOnly}
                                stage={documentFolderType}
                                ProcessStatus={listData.ProcessStatus}
                            />
                        </div>
                    ) : null}
                </AkTabPane>
                <AkTabPane key="members" tab="Members & Approvers">
                    {activeKey === 'members' ? (
                        <AIIBMembersApproversTabInfo
                            ref="MembersApprovers"
                            loadData={() => {
                                this.loadData();
                            }}
                            listData={listData}
                            isReadOnly={this.state.isReadOnly}
                        />
                    ) : null}
                </AkTabPane>
                <AkTabPane key="workflowhistory" tab="Workflow History">
                    {activeKey === 'workflowhistory' ? (
                        <AIIBWorkflowHistoryTabInfo listDataID={listData.ListDataID} listData={listData} />
                    ) : null}
                </AkTabPane>
            </AkTab>
        );
    }
    onClosePrint() {
        this.setState({ visiblePrintModal: false });
    }
    onOpenPrint(type: PrintPageType) {
        this.setState({ visiblePrintModal: true, visiblePrintType: type });
    }
    render() {
        const { state: { listData, visiblePrintModal, visiblePrintType, showChangeTabModal } } = this;
        if (!listData) return null;
        const backUrl = this.props.location.query['backUrl'] || PathConfig.NewProject;
        return (
            <CraftsMainContent withBack={true} backUrl={backUrl} header={AIIBLocale.ProjectPool}>
                <div style={{ display: visiblePrintModal ? 'none' : 'block' }}>
                    <AkSpin spinning={this.state.loading}>
                        <div className="aiib-content-form aiib-content">
                            {this.renderBaseInfo()}
                            {this.renderTab()}
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
                            values={this.state.modalValues}
                            listData={this.state.modalListData}
                            listDataID={this.state.listDataID}
                            activeKey={this.state.activeKey}
                            onSaveClick={() => {
                                this.loadData(true);
                            }}
                            onNotSaveClick={() => {
                                this.setState({ showChangeTabModal: false, activeKey: this.changTabkKey }, () => {
                                    this.onRouterReplace(this.changTabkKey);
                                });
                            }}
                            onCancelClick={() => {
                                this.setState({ showChangeTabModal: false });
                            }} />
                        :
                        null
                }
            </CraftsMainContent>
        );
    }
}
