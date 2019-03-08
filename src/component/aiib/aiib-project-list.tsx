import * as React from 'react';
import { withRouter } from 'react-router';
import { ContentListCraftStates } from 'akmii-yeeoffice-crafts/lib';
import { PathConfig } from '../../config/pathconfig';
import { AkForm, AkRow, AkCol, ContentListWhereType, ContentListWhereModel, ContentListApi, CustonDataGetTitleRequest, AkResponsiveTable, RouterProps, AkMetadataLabel, AkContext, AkColumnProps, AkTable, AkGlobal, CommonLocale } from 'akmii-yeeoffice-common';
import { AIIBGeneralSearch, AiibAdvancedSearch, AiibSelectStage, AiibProjectImport, AiibHistotyDocumentImport, AiibCommonFun, AiibPromissionControl } from './index';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { SATGE_PROPOSAL, SATGE_CONCEPT, SATGE_APPRAISAL, SATGE_INTERM_FINALREVIEW, SATGE_NEGOTIATION, SATGE_BOARDAPPROVAL, SATGE_BOARDAPPROVED, currentUser, SOVEREIGN_BACKEDFINACING, NONSOVEREIGN_BACKEDFINACING } from '../../util/aiib-common';
import { SearchType } from './aiib-advanced-modal';
import { AiibWhereMethod, WhereModel, whereTransform } from '../../util/aiib-where';
import { ColumnsArr } from '../../api/aiibworkflow/model/proposal';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { UserGroupsModel } from '../../api/aiibworkflow/aiib-content-list';
import { ListView } from 'akmii-yeeoffice-common/lib/components/controls/ak-responsive-table';
import { AiibProjectResponse } from './common/aiib-response-tip';

export interface ProjectListTableProps extends RouterProps {
    state?: ProjectState;
    privateColumns?: AkColumnProps<any>[];
}

export interface ProjectListTableState {
    loading?: boolean;
    listData?: any[];
    totalCount?: number;
    listCraft?: ContentListCraftStates;
    inputSearch?: string;
    selectStage: string;
    allWhere?: WhereModel;
    sorter?: any;
    userGrops?: UserGroupsModel[];
}


const stageValue = {
    7: SATGE_CONCEPT,
    8: SATGE_APPRAISAL,
    9: SATGE_NEGOTIATION,
    10: SATGE_BOARDAPPROVAL,
    11: SATGE_BOARDAPPROVED,
};

@withRouter
@AkForm.create()
export default class ProjectListTable extends React.Component<ProjectListTableProps, ProjectListTableState> implements AiibWhereMethod {
    title: string;
    columns: any[];
    baseColumns: any[];
    pageSize?: number;
    pageIndex?: number;
    wheresFileds?: ContentListWhereModel[];
    defaultSelect?: string = 'All';
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            selectStage: this.defaultSelect,
            inputSearch: '',
            allWhere: {
                PageWhere: [],
                SimpleWhere: [],
                TabWhere: [],
                AdvancedWhere: [],
            },
            userGrops: []
        };
        this.title = "Project";
        this.pageSize = 15;
        this.pageIndex = 1;
        this.columns = [];
        this.baseColumns = [{
            title: "Project ID",
            key: "ProjectID",
            dataIndex: "ProjectID",
            width: 100,
            sorter: true,
        }, {
            title: "Country",
            key: "Country",
            dataIndex: "CountryName",
        }, {
            title: "Project Name",
            key: "ProjectName",
            dataIndex: "ProjectName",
            render: (txt, recode) => {
                return <a href="javescript:;" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const { inputSearch } = this.state;
                    let SearchUrl = "";
                    if (inputSearch) {
                        SearchUrl = "&InPutSearch=" + inputSearch;
                    }
                    this.props.router.replace({
                        pathname: PathConfig.ProjectPage,
                        query: {
                            listdataid: recode.ListDataID,
                            state: this.props.state,
                            backUrl: this.props.location.pathname + "?PageIndex=" + this.pageIndex + SearchUrl
                        }
                    });
                }}>{txt}</a>;
            }
        }, this.props.state === ProjectState.NewProject ? {} : {
            title: "Process Status",
            key: "ProcessStatus",
            dataIndex: "ProcessStatus",
            render: (txt, recode) => {
                return AiibPromissionControl.hasProjectlistStatusElements(txt, recode);
            }
        }, this.props.state === ProjectState.AllProject ? {
            title: "Workflow Status",
            key: "ProcessStage",
            dataIndex: "ProcessStage",
        } : {},
        {
            title: "Client Type",
            key: "FinancingMethod",
            dataIndex: "FinancingMethod",
        }, {
            title: "Sector",
            key: "Sector",
            dataIndex: "Sector",
            render: (txt, recode) => {
                return <AkMetadataLabel optionID={txt} parentCode="Sector" categoryCode="Sector" />;
            }
        }, {
            title: "Amount of AIIB Financing (Requested)(US$ MM)",
            key: "Financing",
            dataIndex: "Financing",
        }];
    }


    componentWillMount() {
        let backPageIndex = this.props.location.query.PageIndex;
        const inputSearch = this.props.location.query.InPutSearch;
        if (backPageIndex) {
            this.pageIndex = parseInt(backPageIndex);
        } else {
            this.pageIndex = 1;
        }
        if (inputSearch) {
            this.setState({ inputSearch }, () => { this.mergeSearch(); });
        }


    }
    setStateLoadData(value: object, firstPage?: boolean) {
        if (firstPage) this.pageIndex = 1;
        this.setState(value, () => this.columsTitle());
    }
    getPageWhere() {
        let where: ContentListWhereModel[] = [whereTransform("Stage", SATGE_PROPOSAL, ContentListWhereType.Neq, "and")];
        if (!AiibCommonFun.UserIsManager(this.state.userGrops)) {
            where.push({
                WhereName: "",
                Type: ContentListWhereType.Eq,
                Pre: "and",
                Child: [{
                    WhereName: "",
                    Type: ContentListWhereType.Eq,
                    Pre: "or",
                    Child: [
                        whereTransform("FinancingMethod", NONSOVEREIGN_BACKEDFINACING, ContentListWhereType.Eq, "and"),
                        {
                            WhereName: "",
                            Type: ContentListWhereType.Eq,
                            Pre: "and",
                            Child: [
                                whereTransform("CreatedBy", currentUser, ContentListWhereType.Eq, "or"),
                                whereTransform("Members", currentUser, ContentListWhereType.Contains, "or"),
                                whereTransform("Approvers", currentUser, ContentListWhereType.Contains, "or"),
                                whereTransform("ProjectLeader", currentUser, ContentListWhereType.Contains, "or")
                            ]
                        }]
                },
                whereTransform("FinancingMethod", SOVEREIGN_BACKEDFINACING, ContentListWhereType.Eq, "or")
                ]
            });
        }
        switch (this.props.state) {
            case ProjectState.MyProject:
                where.push({
                    WhereName: "",
                    Pre: "and",
                    Type: 0,
                    Child: [
                        whereTransform("ProjectLeader", AkContext.getUser().AccountID, ContentListWhereType.ContainsMe, "or"),
                        whereTransform("Approvers", AkContext.getUser().AccountID, ContentListWhereType.ContainsMe, "or"),
                        whereTransform("Members", AkContext.getUser().AccountID, ContentListWhereType.ContainsMe, "or")
                    ]
                });
                break;
            case ProjectState.NegotiationStage:
            case ProjectState.BoardApprovalStage:
            case ProjectState.ApprovedProject:
                where.push(whereTransform("Stage", stageValue[this.props.state], ContentListWhereType.Eq, "and"));
                break;

            case ProjectState.NewProject:
                where.push(whereTransform("Stage", SATGE_CONCEPT, ContentListWhereType.Eq, "and"));
                where.push(whereTransform("ProjectLeader", "", ContentListWhereType.IsNull, "and"));
                break;
            case ProjectState.ConceptStage:
                where.push(whereTransform("Stage", SATGE_CONCEPT, ContentListWhereType.Eq, "and"));
                where.push(whereTransform("ProjectLeader", "", ContentListWhereType.IsNotNull, "and"));
                break;
            case ProjectState.AppraisalStage:
                where.push({
                    WhereName: "Stage",
                    Value: "",
                    Type: 0,
                    Pre: "and",
                    Child: [
                        whereTransform("Stage", SATGE_APPRAISAL, ContentListWhereType.Eq, "or"),
                        whereTransform("Stage", SATGE_INTERM_FINALREVIEW, ContentListWhereType.Eq, "or")]
                });
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
    setTabWhere(value: string): void {
        throw new Error("Method not implemented.");
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
    mergeSearch() {
        const { inputSearch, selectStage } = this.state;
        let where = [];
        if (inputSearch) {
            where = [{
                WhereName: "",
                Pre: "and",
                Type: ContentListWhereType.Contains,
                Child: [
                    whereTransform("ProjectID", inputSearch, ContentListWhereType.LikeLast, "or"),
                    whereTransform("ProjectName", inputSearch, ContentListWhereType.LikeLast, "or"),
                ]
            }];
        }
        if (selectStage && selectStage !== 'All') {
            where.push(whereTransform('Stage', selectStage, ContentListWhereType.Eq, 'and'));
        }
        this.setSimpleWhere(where);
    }
    componentDidMount() {
        // this.setPageWhere();
        this.loadCheckUser();
    }

    loadCheckUser() {
        ProjectAPI.getUserGroups({ userID: currentUser }).then(data => {
            if (data.Status === 0) {
                const userGrops = data.Data.filter(item => item && item.Ext1 === "UserGroup");
                this.setState({ userGrops }, () => {
                    this.setPageWhere();
                });
            }
        });
    }

    columsTitle() {
        const { state } = this.props;
        this.columns = [
            ...this.baseColumns,
            ...this.props.privateColumns,
        ];
        this.loadData();
    }

    loadData() {
        this.setState({ loading: true });
        const { sorter } = this.state;
        const request: CustonDataGetTitleRequest = {
            Title: this.title,
            Wheres: this.setWheresFileds(),
            Columns: ColumnsArr.projectListColumns,
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
        ContentListApi.GetDataByTitle(params).then(data => {
            if (data.Status === 0) {
                this.setState({ listData: data.Data, totalCount: data.TotalCount, loading: false });
            } else {
                AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
            }
        });
    }

    onTableChange(sorter) {
        this.setStateLoadData({ sorter });
    }

    onAdvanceSearch(values) {
        this.setState({
            inputSearch: '',
            selectStage: this.defaultSelect,
        });
        this.setAdvancedWhere(values);
    }

    onGeneralSearch(value) {
        this.setState({
            inputSearch: value
        }, () => this.mergeSearch());

    }

    onChangeSelectStage(value) {
        this.setState({ selectStage: value }, () => this.mergeSearch());
    }

    renderHeader() {
        const { inputSearch, selectStage } = this.state;
        const stageProps = {
            value: selectStage,
            handleSelectChange: this.onChangeSelectStage.bind(this)
        };
        return <AkRow type="flex" align="middle" justify="space-between" className="ak-tab-actions mb15">
            <AkRow type="flex" align="middle" justify="start">
                <AkCol className="mr10">
                    <AIIBGeneralSearch
                        placeholder="Project ID or Project Name"
                        value={inputSearch}
                        onChange={(value) => this.setState({ inputSearch: value })}
                        onSearch={(value) => {
                            this.onGeneralSearch(value);
                        }} />
                </AkCol>
                <AkCol>
                    <AiibAdvancedSearch
                        onChange={this.onAdvanceSearch.bind(this)}
                        type={this.props.state === ProjectState.MyProject ? SearchType.MyProjectList : SearchType.Project}
                        value={this.state.allWhere.AdvancedWhere}
                    />
                </AkCol>
                <AkCol>
                    {
                        this.props.location.pathname === PathConfig.AllProject
                            ||
                            this.props.location.pathname === PathConfig.MyProject
                            ?
                            AiibSelectStage(stageProps)
                            :
                            null
                    }
                </AkCol>
            </AkRow>
            {/* {this.props.state === ProjectState.AllProject && AkContext.getUser().IsAdmin ? <AkCol>
                <AiibProjectImport loadData={() => this.loadData()} template="project" />
                <AiibHistotyDocumentImport type="project" />
            </AkCol> : null} */}

        </AkRow>;
    }

    renderTable() {
        return <AkResponsiveTable
            onChange={(pagination, filters, sorter) => {
                this.pageIndex = pagination['current'];
                this.onTableChange(sorter);
            }}
            rowKey="ListDataID"
            defaultView={ListView.table}
            hideViewSwitch={true}
            columns={this.columns}
            loading={this.state.loading}
            pagination={{
                total: this.state.totalCount,
                pageSize: this.pageSize,
                current: this.pageIndex,
            }}
            dataSource={this.state.listData} />;
    }

    render() {
        return <div className="aiib-content">
            {this.renderHeader()}
            {this.renderTable()}
        </div>;
    }

}
