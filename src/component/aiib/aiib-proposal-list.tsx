import * as React from 'react';
import {
    AkColumnProps,
    ContentListApi,
    AkResponsiveTable,
    ContentListWhereModel,
    CustonDataGetTitleRequest,
    AkMetadataLabel,
    AkFormComponentProps,
    AkForm,
    RouterProps,
    AkSpin,
    AkAvatar,
    AkContext,
    AkTab,
    ContentListWhereType,
    CommonLocale,
    AkGlobal
} from 'akmii-yeeoffice-common';
import { ProposalState, ProjectState } from '../../api/aiibworkflow/proposalModal';
import { withRouter } from 'react-router';
import { PathConfig } from '../../config/pathconfig';
import { addAiibWorkflowHistory, AiibProjectCancelStage, AiibProjectDropStatus, AiibProjectCancelStatus } from '../../api/aiibworkflow/common';
import { AiibProposalListHeader } from './aiib-proposal-list-header';
import {
    STATE_NEWPROPOSAL,
    STATE_MANAGERIOREVIEW,
    STATE_DGIOREVIRE,
    STATE_SCSECREVIEW,
    STATE_PENDINGSCREENINGCOMMITTEE,
    STATE_SCREENINGCOMMITTEE,
    currentUser,
} from '../../util/aiib-common';
import { AiibSendEmailCommom } from '../../api/aiibworkflow/content-list';
import { AiibWhereMethod, WhereModel, whereTransform } from '../../util/aiib-where';
import { ListView } from 'akmii-yeeoffice-common/lib/components/controls/ak-responsive-table';
import { ColumnsArr } from '../../api/aiibworkflow/index';
import { AiibCommonFun, AiibFormatDate } from './index';
import { UserGroupsModel, AiibContentListDefs } from '../../api/aiibworkflow/aiib-content-list';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { isNullOrUndefined } from 'util';
import { NONSOVEREIGN_BACKEDFINACING, SOVEREIGN_BACKEDFINACING, SATGE_PROPOSAL } from '../../util/aiib-common';
import { connect } from 'react-redux';
import { AiibProjectResponse } from './common/aiib-response-tip';
const AkTabPane = AkTab.TabPane;
export interface ProposalListTableProps extends RouterProps, AkFormComponentProps {
    state?: ProposalState;
    privateColumns?: AkColumnProps<any>[];
    isAdmin?: boolean;
}

export interface ProposalListTableState {
    loading?: boolean;
    listData?: any[];
    totalCount?: number;
    allWhere?: WhereModel;
    selectedRows?: any[];
    selectedRowKeys?: string[];
    showModal?: boolean;
    submitHandle?: "Submitted" | "Cleared" | "Reworked";
    Comments?: string;
    confirmLoading?: boolean;
    clientType?: string;
    isScSecretariat?: boolean;
    isReadOnly?: boolean;
    sorter?: any;
    tabKey?: 'Proposal' | 'Cancel' | 'Drop';
    userGrops?: UserGroupsModel[];
    backPageIndex?: number;
    columns: any[];
    inputSearch?: string;
}

@withRouter
@AkForm.create()
@connect(state => { return { isAdmin: state.aiib.isAIIBAdmin } })
export default class ProposalListTable extends React.Component<ProposalListTableProps, ProposalListTableState> implements AiibWhereMethod {
    title: string;
    pageSize?: number;
    pageIndex?: number;
    inputSearch?: string;
    isSmallScreen?: boolean;
    sortColumns = [
        "ProposalID",
        "FinancingMethod",
        "Created",
        "Sector",
        "SubmissionDate",
        "ScreeningCommitteeApprovedDate",
        "ExComApprovalDate",
        "Stage",
        "Status",
        "ProcessStage",
        "ExComApprove"
    ];
    constructor(props, context) {
        super(props, context);
        this.isSmallScreen = document.body.clientWidth < 1500;
        this.state = {
            loading: true,
            selectedRows: [],
            allWhere: {
                PageWhere: [],
                SimpleWhere: [],
                TabWhere: [],
                AdvancedWhere: [],
            },
            showModal: false,
            Comments: "",
            clientType: "Sovereign",
            isScSecretariat: false,
            isReadOnly: true,
            tabKey: 'Proposal',
            userGrops: [],
            backPageIndex: 1,
            columns: [],
            inputSearch: ''
        };
        this.title = "Project";
        this.pageSize = this.isSmallScreen ? 12 : 15;
        this.pageIndex = 1;
        this.inputSearch = this.props.location.query.InPutSearch;
    }
    componentWillMount() {
        this.loadCheckUser();
    }
    componentDidMount() {
        this.loadColumns();
    }

    columnsDisplayName(field: AiibContentListDefs) {
        let name = field.DisplayName;
        if (field.InternalName === "Created") {
            name = "Created Date";
        } else if (field.InternalName === "TotalEstimatedCost") {
            name = "Total Estimated Cost (US$MM)";
        } else if (field.InternalName === "Stage") {
            name = "Project Stage";
        } else if (field.InternalName === "DropStatus") {
            name = "Sub-Status";
        } else if (field.InternalName === "ProcessStage") {
            name = "Workflow Status";
        } else if (field.InternalName === "Status") {
            name = "Proposal Status";
        }

        return name;
    }

    loadColumns() {
        const listDefs: AiibContentListDefs[] = AiibCommonFun.getlocalStorageListDefsData();
        let columns = [];
        let proposalColumns = [
            "ProposalID",
            "CountryName",
            "ProjectName",
            "FinancingMethod",
            "CreatedBy",
            "Created",
            "Sector",
            "FinancingType",
            "TotalEstimatedCost",
            "Financing",
            "DGIO"
        ];
        if (this.state.tabKey === "Cancel") {
            proposalColumns[0] = "ProjectID";
        }
        if (this.props.state === ProposalState.ManagerReview
            || this.props.state === ProposalState.DGReview
            || this.props.state === ProposalState.ScSecretariat
            || this.props.state === ProposalState.PendingScrCom) {
            proposalColumns = [
                ...proposalColumns,
                "SubmissionDate"
            ];
        } else if (this.props.state === ProposalState.ScrComApproved) {
            proposalColumns.splice(1, 0, "SCRecommend");
            proposalColumns = [
                ...proposalColumns,
                "ScreeningCommitteeApprovedDate"
            ];
        } else if (this.props.state === ProposalState.AllProposal) {
            proposalColumns = [
                "ProposalID",
                "CountryName",
                "ProjectName",
                "Status",
                "DropStatus",
                "SCRecommend",
                "ExComApprove",
                "FinancingMethod",
                "CreatedBy",
                "Created",
                "ScreeningCommitteeApprovedDate",
                "ExComApprovalDate",
                "Stage",
                "ProcessStage",
                "Sector",
                "FinancingType",
                "TotalEstimatedCost",
                "Financing",
                "DGIO"
            ];
        }

        proposalColumns.forEach((item, index) => {
            if (!listDefs) return;
            const field = listDefs.find(j => j.InternalName === item);
            columns[index] = {
                title: this.columnsDisplayName(field),
                key: item,
                sorter: this.sortColumns.findIndex(i => i === item) > -1,
                dataIndex: item,
                render: (txt, recode) => {
                    if (item === "ProjectName") {
                        return <a onClick={() => {
                            const { tabKey } = this.state;
                            let SearchUrl;
                            if (this.inputSearch) {
                                SearchUrl = "&InPutSearch=" + this.inputSearch;
                            } else {
                                SearchUrl = "";
                            }
                            if (tabKey === "Cancel") {
                                this.props.router.replace({
                                    pathname: PathConfig.ProposalPage,
                                    query: {
                                        listdataid: recode.ListDataID,
                                        state: ProjectState.ConceptStage,
                                        backUrl: this.props.location.pathname + "?PendingUrl=Cancel&PageIndex=" + this.pageIndex + SearchUrl,
                                    }
                                });
                            } else if (tabKey === "Drop") {
                                this.props.router.replace({
                                    pathname: PathConfig.ProposalPage,
                                    query: {
                                        listdataid: recode.ListDataID,
                                        state: ProjectState.ConceptStage,
                                        backUrl: this.props.location.pathname + "?PendingUrl=Drop&PageIndex=" + this.pageIndex + SearchUrl,
                                    }
                                });
                            } else {
                                this.props.router.replace({
                                    pathname: PathConfig.ProposalPage,
                                    query: {
                                        listdataid: recode.ListDataID,
                                        state: ProjectState.ConceptStage,
                                        backUrl: this.props.location.pathname + "?PendingUrl=Proposal&PageIndex=" + this.pageIndex + SearchUrl,
                                    }
                                });
                            }

                        }}>{txt}</a>;
                    } else if (item === "Sector") {
                        return <AkMetadataLabel optionID={txt} parentCode="Sector" categoryCode="Sector" />;
                    } else if (item === "Stage") {
                        return <span className={txt === SATGE_PROPOSAL ? "color-green" : "color-blue"}>{txt}</span>;
                    } else if (item === "DropStatus") {
                        if (txt !== AiibProjectDropStatus.Default + "" && txt !== "") {
                            return <span>{AkGlobal.intl.formatMessage({ id: "project.process.drop.status." + txt })}</span>;
                        } else if (recode.CancelStatus !== AiibProjectCancelStatus.Default + "" && recode.CancelStatus !== "") {
                            return <span>{AkGlobal.intl.formatMessage({ id: "project.process.cancel.status." + recode.CancelStatus })}</span>;
                        } else if (recode.Status === "Inactive") {
                            return <span>Inactive</span>;
                        }
                    }
                    else if (field.Type === "datepicker") {
                        return AiibFormatDate(txt);
                    } else if (field.Type === "identity-picker") {
                        return <AkAvatar type="text" value={txt} />;
                    } else {
                        return txt;
                    }
                }
            };
        });
        this.setState({ columns });
    }

    getPageWhere() {
        const { state } = this.props;
        let where: ContentListWhereModel[] = [whereTransform("Status", 'Active'), whereTransform("Stage", 'Proposal')];

        let promissionWhere = {
            WhereName: "",
            Type: ContentListWhereType.Eq,
            Pre: "and",
            Child: [{
                WhereName: "",
                Type: ContentListWhereType.Eq,
                Pre: "or",
                Child: [
                    {
                        WhereName: "FinancingMethod",
                        Type: ContentListWhereType.Eq,
                        Value: NONSOVEREIGN_BACKEDFINACING,
                        Pre: "and"
                    }, {
                        WhereName: "",
                        Type: ContentListWhereType.Eq,
                        Pre: "and",
                        Child: [{
                            WhereName: "CreatedBy",
                            Type: ContentListWhereType.Eq,
                            Value: currentUser,
                            Pre: "or",
                        }, {
                            WhereName: "Members",
                            Type: ContentListWhereType.Contains,
                            Value: currentUser,
                            Pre: "or",
                        }, {
                            WhereName: "Approvers",
                            Type: ContentListWhereType.Contains,
                            Value: currentUser,
                            Pre: "or",
                        }, {
                            WhereName: "ProjectLeader",
                            Type: ContentListWhereType.Contains,
                            Value: currentUser,
                            Pre: "or",
                        }]
                    }]
            }, {
                WhereName: "FinancingMethod",
                Type: ContentListWhereType.Eq,
                Value: SOVEREIGN_BACKEDFINACING,
                Pre: "or"
            }]
        }
        if (!AiibCommonFun.UserIsManager(this.state.userGrops)) {
            where.push(promissionWhere);
        }
        switch (state) {
            case ProposalState.NewProposal:
                where[0].Value = "Unsubmitted";
                where.push(whereTransform("State", STATE_NEWPROPOSAL));
                break;
            case ProposalState.MyProposal:
                where = [whereTransform("CreatedBy", '', ContentListWhereType.Me)];
                break;
            case ProposalState.ManagerReview:
                where.push(whereTransform("State", STATE_MANAGERIOREVIEW));
                if (!AiibCommonFun.UserIsManager(this.state.userGrops)) {
                    where.push(whereTransform("", "", ContentListWhereType.Eq, "and", [
                        whereTransform("ManagerIO", "", ContentListWhereType.Me, "or"),
                        whereTransform("CreatedBy", "", ContentListWhereType.Me, "or"),
                    ]));
                }
                break;
            case ProposalState.DGReview:
                where.push(whereTransform("State", STATE_DGIOREVIRE));
                if (!AiibCommonFun.UserIsManager(this.state.userGrops)) {
                    where.push(whereTransform("", "", ContentListWhereType.Eq, "and", [
                        whereTransform("DGIO", "", ContentListWhereType.Me, "or"),
                        whereTransform("CreatedBy", "", ContentListWhereType.Me, "or"),
                    ]));
                }
                break;
            case ProposalState.ScSecretariat:
                where.push(whereTransform("State", STATE_SCSECREVIEW));
                break;
            case ProposalState.PendingScrCom:
                where.push(whereTransform("State", STATE_PENDINGSCREENINGCOMMITTEE));
                break;
            case ProposalState.ScrComApproved:
                where.push(whereTransform("State", STATE_SCREENINGCOMMITTEE));
                where.push(whereTransform("SCRecommend", "Not Recommended", ContentListWhereType.Neq));
                break;
            case ProposalState.AllProposal:
                if (!AiibCommonFun.UserIsManager(this.state.userGrops)) {
                    where = [promissionWhere];
                } else {
                    where = [];
                }
                break;
        }
        return where;
    }

    setPageWhere(): void {
        let { allWhere } = this.state;
        allWhere.PageWhere = this.getPageWhere();
        this.setStateLoadData({ allWhere });
    }
    setSimpleWhere(value: ContentListWhereModel[]): void {
        let { allWhere } = this.state;
        allWhere.SimpleWhere = value;
        allWhere.AdvancedWhere = [];
        this.setStateLoadData({ allWhere }, true);
    }

    setTabWhere(tabPosition: 'Proposal' | 'Cancel' | 'Drop'): void {
        let where = [];
        const { allWhere } = this.state;
        allWhere.PageWhere = [];
        allWhere.SimpleWhere = [];
        allWhere.AdvancedWhere = [];
        if (tabPosition === "Cancel") {

            if (this.props.state === ProposalState.PendingScrCom) {
                where = [
                    whereTransform("CancelStage", AiibProjectCancelStage.PendingScrCom + ""),
                    whereTransform("Status", "Inactive", ContentListWhereType.Neq),
                ];
            }
            if (this.props.state === ProposalState.ScrComApproved) {
                where = [
                    whereTransform("CancelStage", AiibProjectCancelStage.ScrComApproved + ""),
                    whereTransform("Status", "Inactive", ContentListWhereType.Neq),
                ];
            }
        }
        if (tabPosition === "Drop") {
            where = [
                whereTransform("DropStatus", "1"),
                whereTransform("Status", "Inactive", ContentListWhereType.Neq),
            ];
        }
        if (tabPosition === "Proposal") {
            allWhere.TabWhere = [];
            allWhere.PageWhere = this.getPageWhere();
        }
        allWhere.TabWhere = where;

        this.pageIndex = 1;

        this.setState({ tabKey: tabPosition, allWhere }, () => {
            this.loadColumns();
            this.loadData();
        });
    }

    setAdvancedWhere(value: ContentListWhereModel[]): void {
        let { allWhere } = this.state;
        allWhere.AdvancedWhere = value;
        allWhere.SimpleWhere = [];
        this.setStateLoadData({ allWhere }, true);

    }
    setWheresFileds(): ContentListWhereModel[] {
        const { allWhere: { PageWhere, SimpleWhere, TabWhere, AdvancedWhere } } = this.state;
        let where: ContentListWhereModel[] = [...PageWhere, ...SimpleWhere, ...TabWhere, ...AdvancedWhere];
        return where;
    }
    loadData() {
        const { sorter } = this.state;
        const request: CustonDataGetTitleRequest = {
            Title: this.title,
            Wheres: this.setWheresFileds(),
            Columns: ColumnsArr.proposalListColumns,
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            FilterValue: "",
            Verification: false
        };

        let sorterparam = {};
        if (sorter && sorter.field && sorter.order) {
            sorterparam = {
                Sorts: {
                    SortName: sorter.field,
                    SortByDesc: sorter.order === "descend"
                }
            };
        } else {
            sorterparam = {
                Sorts: {
                    SortName: "Created",
                    SortByDesc: true
                }
            };
        }

        const params = Object.assign({}, request, sorterparam);
        this.setState({ loading: true });
        ContentListApi.GetDataByTitle(params).then(data => {
            if (data.Status === 0) {
                this.setState({ listData: data.Data, totalCount: data.TotalCount });
            } else {
                AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
            }
            this.setState({ loading: false });
        });

    }

    async loadCheckUser() {
        /**判断当前用户是否在SC Secretariat组中*/
        const data = await ProjectAPI.getUserGroups({ userID: currentUser });
        if (data.Status === 0) {
            const userGrops = data.Data.filter(item => item && item.Ext1 === "UserGroup");
            const isScSecretariat = userGrops.find(item => item.Code === "SC Secretariat");
            const isReadOnly = userGrops.find(item => item.Code === "Readonly");
            
            this.setState({ userGrops, isScSecretariat: !isNullOrUndefined(isScSecretariat), isReadOnly: !isNullOrUndefined(isReadOnly) }, () => {
                
                let queryUrl = this.props.location.query.PendingUrl;
                let backPageIndex = this.props.location.query.PageIndex;
                this.pageIndex = backPageIndex ? parseInt(backPageIndex) : this.pageIndex;
                if (queryUrl === "Cancel") {
                    this.setTabWhere("Cancel");
                } else if (queryUrl === "Drop") {
                    this.setTabWhere("Drop");
                } else {
                    this.setPageWhere();
                }

            });
        }
    }

    setStateLoadData(value: object, firstPage?: boolean) {
        if (firstPage) this.pageIndex = 1;
        this.setState(value, () => this.loadData());
    }
    onTableChange(sorter) {

        this.setStateLoadData({ sorter });
    }

    onAddWorkflowHistory(status, recode, title?: string, category?: string) {
        const workflowHistory: addAiibWorkflowHistory = {
            Title: "ActionLog",
            DicList: [{
                Title: title ? title : recode.State,
                ProjectDataID: recode.ListDataID,
                ActionType: status,
                Comment: this.state.Comments,
                StartNum: recode.StartNum,
                Category: category ? category : "Proposal"
            }]
        };
        ContentListApi.AddBatchDataByTitle(workflowHistory);
    }

    onSendEmail(actionType: string, listDate) {
        const { state } = this.props;
        let code: string = "";
        if (actionType === "Submitted") {
            code = "Proposal-Approve";
            AiibSendEmailCommom.sendEmail(code, [listDate.ManagerIO], listDate.ListDataID);
        }

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }

    SelectRadio(e) {
        this.setState({ clientType: e.target.value });
    }

    rowSelectionDisable(record): boolean {
        const { state: { tabKey }, props: { isAdmin } } = this;
        const user = AkContext.getUser().AccountID;
        if (tabKey === "Proposal") {
            if (record.State === STATE_MANAGERIOREVIEW) {
                return !(record.ManagerIO === user || isAdmin);
            }
            else if (record.State === STATE_DGIOREVIRE) {
                return !(record.DGIO === user || isAdmin);
            } else {
                return !(this.state.isScSecretariat || isAdmin);
            }
        } if (tabKey === "Drop") {
            return !(this.state.isScSecretariat || isAdmin);
        }
        if (tabKey === "Cancel") {
            return !(this.state.isScSecretariat || isAdmin);
        }

    }
    onInputChange(value) {
        this.setState({ inputSearch: value });
        this.inputSearch = value;
    }
    renderTabTable() {
        if (this.props.state === ProposalState.PendingScrCom || this.props.state === ProposalState.ScrComApproved) {
            let defaultTabList: React.ReactNode[] = [
                <AkTabPane tab='Proposal' key='Proposal'>
                    {this.renderTable()}
                </AkTabPane>,
                <AkTabPane tab='To Be Cancelled' key='Cancel'>
                    {this.renderTable()}
                </AkTabPane>,
            ];
            if (this.props.state === ProposalState.PendingScrCom) {
                defaultTabList.push(
                    <AkTabPane tab='To Be Dropped' key='Drop'>
                        {this.renderTable()}
                    </AkTabPane>
                );
            }
            return <AkTab
                activeKey={this.state.tabKey}
                type='card'
                onChange={this.setTabWhere.bind(this)}
                className='aiib-list-tab'>
                {defaultTabList}
            </AkTab>;
        } else {
            return this.renderTable();
        }
    }

    renderTable() {
        const { props: { state }, state: { isScSecretariat, columns, selectedRowKeys,isReadOnly} } = this;
        const rowSelection = {
            onChange: this.onSelectChange.bind(this),
            getCheckboxProps: (record) => ({
                disabled: this.rowSelectionDisable(record)
            }),
            selectedRowKeys: selectedRowKeys
        };

        return <AkSpin spinning={this.state.loading}>
            <AkResponsiveTable
                onChange={(pagination, filters, sorter) => {
                    this.pageIndex = pagination['current'];
                    this.onTableChange(sorter);
                }}
                rowKey="ListDataID"
                defaultView={ListView.table}
                hideViewSwitch={true}
                columns={columns}
                loading={this.state.loading}
                dataSource={this.state.listData}
                rowSelection={(state === ProposalState.ScSecretariat || state === ProposalState.PendingScrCom || state === ProposalState.ScrComApproved) && (isScSecretariat || this.props.isAdmin) && !isReadOnly ? rowSelection : null}
                pagination={{
                    total: this.state.totalCount,
                    pageSize: this.pageSize,
                    current: this.pageIndex,
                }} />
        </AkSpin>;
    }

    render() {
        const { allWhere } = this.state;
        return <div className="aiib-content">
            <AiibProposalListHeader
                isScSecretariat={this.state.isScSecretariat}
                isReadOnly={this.state.isReadOnly}
                allWhere={allWhere}
                state={this.props.state}
                selectedRows={this.state.selectedRows}
                tabKey={this.state.tabKey}
                loadData={() => {
                    this.loadData();
                }}
                onClearSelectRow={() => {
                    this.setState({ selectedRows: [], selectedRowKeys: [] });
                }}
                setSimpleWhere={this.setSimpleWhere.bind(this)}
                onAdvancedSearch={this.setAdvancedWhere.bind(this)}
                onInputChange={this.onInputChange.bind(this)}
            />

            {this.renderTabTable()}
        </div>;
    }
}
