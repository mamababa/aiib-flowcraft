import * as React from "react";
import { AkLayout, AkButton, AkGlobal, AkNotification, ContentListWhereType, ContentListWhereModel, RouterProps, AkMetadataLabel, AkContext, AppKeys, AkRow, AkCol, AkTable, CommonLocale, AkFormIdentityPicker } from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import AiibAdvancedSearch from '../aiib/aiib-advanced-search';
import { SearchType } from '../aiib/aiib-advanced-modal';
import { PathConfig } from '../../config/pathconfig';
import { SATGE_PROPOSAL, STATE_PENDINGSCREENINGCOMMITTEE, STATE_SCREENINGCOMMITTEE, SATGE_BOARDAPPROVED, currentUser } from '../../util/aiib-common';
import { ReportQueryModal, ReportQuery } from './report-query';
import { ProcessReportPageLocale } from '../../locales/localeid';
import { AiibContentListDefs } from '../../api/aiibworkflow/aiib-content-list';
import { AiibCommonFun, AiibCommon } from '../aiib/common/aiib-common';
import { ReportAPI, ReportRequest } from '../../api/report';
import { AIIBGeneralSearch } from '../aiib/aiib-general-search';
import { WhereModel, AiibWhereMethod, whereTransform } from '../../util/aiib-where';
import { AiibFormatDate } from "../aiib/index";
import { ReportCenterTitleSortAPI } from '../../api/aiibworkflow/aiib-workflow';
import { AiibReportAPI } from '../../api/aiibworkflow/aiib-report';
import { AiibSelectState, AiibSelectStage, AiibReportStage } from '../aiib/aiib-select-operation';
import { DataBaseImport } from './data-base-import';
import { AiibProjectCancelStatus } from "../../api/aiibworkflow/common";
import { ProjectAPI } from "../../api/aiibworkflow/project";
import { isNullOrUndefined } from "util";

interface AiibReportPageProps extends RouterProps {
    isProposal?: boolean;
    isMetadata?: boolean;
}
interface AiibReportPageStatus {
    visibleModal?: boolean;
    queryData?: string[];
    listData?: any[];
    loading?: boolean;
    inputSearch?: string;
    allWhere?: WhereModel;
    ExportqueryData: ReportQueryModal[];
    sorts?: any[];
    selectState: string;
    selectStage: string;
}
export interface ReportQueryModal {
    FieldID: string;
    DisplayName: string;
    InternalName: string;
    SortNum: number;
    Show: boolean;
}
@withRouter
export default class AiibReportPage extends React.Component<AiibReportPageProps, AiibReportPageStatus> implements AiibWhereMethod {
    title: string;
    columns: any[];
    pageSize?: number;
    pageIndex?: number;
    totalCount?: number;
    listDefs: AiibContentListDefs[] = AiibCommonFun.getlocalStorageListDefsData();
    defaultSelect?: string = 'ScrCom Review';
    defaultSelectStage?: string = "All";
    proposalColumns = [
        'ProposalID',
        'CountryName',
        'ProjectName',
        'Sector',
        'FinancingMethod',
        'FinancingType',
        'TotalEstimatedCost',
        'Financing',
        'ProjectDescription',
        // 'ThematicPriorities',
        "AIIBPrioritiesRelation",
        "CountryPrioritiesRelation",
        "ProjectValueAddition",
        "AIIBValueAddition",
        "AIIBPrioritiesRelationRating",
        "CountryPrioritiesRelationRating",
        "ProjectValueAdditionRating",
        "AIIBValueAdditionRating",
    ];

    proposalDataColumns = [
        ...this.proposalColumns,
        "ScreeningCommitteeApprovedDate",
        "ExComApprovalDate",
        "State",
        "Stage",
        "Status",
        "SCRecommend"
    ];
    projectColums = [
        'ProposalID',
        'CountryName',
        'ProjectName',
        'Sector',
        'FinancingMethod',
        'Product',
        'FinancingType',
        'Financing',
        "BODPipelinePresentation",
        'BoardApprovalDate'
    ];

    projectDataColums = [
        ...this.projectColums,
        "ThematicPriorities",
        "ThematicPrioritiesComment",
        "Stage",
        "CancelStatus"
    ];

    metaDataColums = [
        "ProposalID",
        "ExComApprovalDate",
        "ConceptDate",
        "AppraisalDate",
        "BoardApprovalDate",
        "FiscalYear",
        "Quarter",
        "CountryName",
        "ProjectName",
        "Sector",
        "Subsector",
        "FinancingMethod",
        "FinancingType",
        "LeadFinancier",
        "OtherFinanciers",
        "ThematicPriorities",
        "ThematicPrioritiesComment",
        "CreditRating",
        "PreferredBeforeRating",
        "PreferredAfterRating",
        "InvestmentGrade",
        "Financing",
        "EstimatedLoanAmount",
        "EconomicCapital",
        "EcapPercentage",
        "Membership",
        "Region",
        "PopulationWorldBank",
        "IncomeLevelWorldBank",
        "ProjectLeader",
        "Procurement expert",
        "Financial management expert",
        "Social expert",
        "Environmental expert",
        "Economist",
        "SocialCategory",
        "ProjectDescription",
        "CancelStatus"
    ];

    sortList = [
        'ProjectID',
        'ProposalID',
        'BoardApprovalDate',
        'ExecutiveCommitteeApprovedDate',
    ];

    ThematicPrioritiesColumns = [
        { title: "Thematic Priority:Sustainable Infrastructure", value: "Sustainable Infrastructure" },
        { title: "Thematic Priority:Cross Border Connectivity", value: "Cross Border Connectivity" },
        { title: "Thematic Priority:Private Capital Mobilization", value: "Private Capital Mobilization" },
    ];

    SpecialList = [
        "Procurement expert",
        "Financial management expert",
        "Social expert",
        "Environmental expert",
        "Economist",
    ]
    constructor(props, context) {
        super(props, context);
        this.pageSize = 15;
        this.pageIndex = 1;
        this.totalCount = 0;
        this.state = {
            visibleModal: false,
            listData: [],
            loading: false,
            queryData: this.props.isProposal ? this.proposalColumns : props.isMetadata ? this.metaDataColums : this.projectColums,
            ExportqueryData: [],
            inputSearch: "",
            allWhere: {
                PageWhere: [],
                SimpleWhere: [],
                TabWhere: [],
                AdvancedWhere: [],
            },
            sorts: this.getSorts(),
            selectState: this.defaultSelect,
            selectStage: this.defaultSelectStage,
        };
        this.title = "Project";
        this.columns = [];
    }
    setPageWhere(): void {
        let { allWhere } = this.state;
        allWhere.PageWhere = this.setWhere();
        if (this.props.isProposal) {
            allWhere.SimpleWhere = [whereTransform("State", STATE_PENDINGSCREENINGCOMMITTEE, ContentListWhereType.Eq, "and")]
        }

        this.setStateLoadData({ allWhere });
    }

    setSimpleWhere(value: ContentListWhereModel[]): void {
        let { allWhere } = this.state;
        allWhere.SimpleWhere = value;
        allWhere.AdvancedWhere = [];
        // const booleanvalue = Report ? false : true;
        this.setStateLoadData({ allWhere });
    }

    setTabWhere(value: string): void {
        throw new Error("Method not implemented.");
    }
    setAdvancedWhere(value: ContentListWhereModel[]): void {
        let { allWhere } = this.state;
        allWhere.AdvancedWhere = value;
        if (this.props.isProposal) {
            allWhere.SimpleWhere = [whereTransform("State", STATE_PENDINGSCREENINGCOMMITTEE, ContentListWhereType.Eq, "and")];
        } else {
            allWhere.SimpleWhere = [];
        }
        this.setStateLoadData({ allWhere, selectState: this.defaultSelect }, true);
    }
    setWheresFileds(): ContentListWhereModel[] {
        const { allWhere: { PageWhere, SimpleWhere, TabWhere, AdvancedWhere } } = this.state;
        let where: ContentListWhereModel[] = [...PageWhere, ...SimpleWhere, ...TabWhere, ...AdvancedWhere];
        return where;
    }

    setStateLoadData(value: object, firstPage?: boolean) {
        if (firstPage) this.pageIndex = 1;
        this.setState(value, () => this.loadData());
    }

    componentWillMount() {
        this.setPageWhere();
        // this.onLoadData();
    }
    closeModal() {
        this.setState({ visibleModal: false });
    }
    setWhere() {
        let where = [];
        let CancelStatusWhere = {};
        if (this.props.isMetadata) {
            CancelStatusWhere = {
                WhereName: "",
                Pre: "and",
                Type: ContentListWhereType.Contains,
                Child: [
                    whereTransform("CancelStatus", AiibProjectCancelStatus.Default + '', ContentListWhereType.LikeLast, 'or'),
                    whereTransform("CancelStatus", '', ContentListWhereType.LikeLast, 'or')
                ]
            };
            where = [
                whereTransform("Stage", SATGE_PROPOSAL, ContentListWhereType.Neq, 'and'),
                CancelStatusWhere
            ];
        } else if (this.props.isProposal) {
            where = [
                whereTransform("Stage", SATGE_PROPOSAL, ContentListWhereType.Eq, 'and'),
                whereTransform("Status", "Active", ContentListWhereType.Eq, 'and'),
                // whereTransform("ExComApprovalDate", "", ContentListWhereType.IsNull, 'and'),
            ];
        } else {
            where = [whereTransform("Stage", SATGE_PROPOSAL, ContentListWhereType.Neq, 'and')];
        }
        return where;
    }

    getSorts() {
        let SortsList = [];
        if (this.props.isMetadata) {
            SortsList = [{
                SortName: "Created",
                SortByDesc: true
            }];
        } else if (this.props.isProposal) {
            SortsList = [{
                SortName: "ScreeningCommitteeApprovedDate",
                SortByDesc: true
            },
            {
                SortName: "CountryName",
                SortByDesc: true
            },
            {
                SortName: "ProposalID",
                SortByDesc: true
            }]
        } else {
            SortsList = [{
                SortName: "BoardApprovalDate",
                SortByDesc: true
            },
            {
                SortName: "CountryName",
                SortByDesc: true
            },
            {
                SortName: "ProposalID",
                SortByDesc: true
            }];
        }
        return SortsList;
    }

    columnTitle() {
        const { isProposal } = this.props;
        const { queryData } = this.state;
        queryData.forEach((item, index) => {
            const field = this.listDefs.find(j => j.InternalName === item);
            this.columns[index] = {
                title: field.DisplayName,
                key: item,
                sorter: this.sortList.findIndex(i => i === item) > -1,
                dataIndex: item,
                render: (txt, record) => {
                    let context = txt;
                    if (item === 'Sector') {
                        context = <AkMetadataLabel optionID={record[item]} parentCode="Sector" categoryCode="Sector" />;
                    }
                    if (item === "ThematicPriorities" || item === "Product") {
                        let val = txt;
                        if (txt && txt.startsWith("[")) {
                            txt = JSON.parse(txt).filter(i => i !== "");
                            val = txt.join(",");
                        }
                        context = <span title={val}>{val}</span>;
                    }
                    if (field.Type === "datepicker") {
                        context = AiibFormatDate(txt);
                    }
                    return <div className='aiib-print-listtable'>
                        {context}
                    </div>;
                }
            };
        });
        if (isProposal) {
            this.columns.push({
                title: 'Project Document',
                key: 'Hyperlink',
                render: (txt, record) => {
                    return <AkButton className='aiib-button green' onClick={() => {
                        let pathname = PathConfig.ProposalPage;
                        this.props.router.replace({
                            pathname: pathname,
                            query: {
                                listdataid: record.ListDataID,
                                backUrl: this.props.location.pathname,
                                tab: "document",
                                IsAutoOpenFolder:true
                            }
                        });
                    }}>Support Document</AkButton>;
                }
            });
        } else {
            this.columns.push({
                title: 'Rationale',
                key: 'Rationale',
                render: (txt, recode) => {
                    return <span>
                        {recode.ThematicPriorities.startsWith("[") ? JSON.parse(recode.ThematicPriorities).join(",") : ""}
                        {recode.ThematicPriorities.startsWith("[") ?
                            recode.ThematicPrioritiesComment ? "," + recode.ThematicPrioritiesComment : ""
                            :
                            recode.ThematicPrioritiesComment}
                    </span>;
                }
            });
        }
    }
    metaDataColumnsTitle() {
        // const sectorInfo = AiibCommonFun.getlocalStorageSectorCategory();
        this.metaDataColums.forEach((item, index) => {
            const field = this.listDefs.find(j => j.InternalName === item);
            if (item === "ThematicPriorities") {
                this.ThematicPrioritiesColumns.forEach((i) => {
                    this.columns.push({
                        title: i.title,
                        key: i.value,
                        dataIndex: item,
                        render: (txt, record) => {
                            if (txt.indexOf(i.value) > -1) {
                                return <span>{i.value}</span>;
                            }
                            else {
                                return null;
                            }
                        }
                    });
                });
            } else if (item === "ThematicPrioritiesComment") {
                this.columns.push({
                    title: field.DisplayName,
                    key: item,
                    dataIndex: item,
                }, {
                        title: 'Rationale',
                        key: 'Rationale',
                        render: (txt, recode) => {
                            return <span>
                                {recode.ThematicPriorities.startsWith("[") ? JSON.parse(recode.ThematicPriorities).join(",") : ""}
                                {recode.ThematicPriorities.startsWith("[") ?
                                    recode.ThematicPrioritiesComment ? "," + recode.ThematicPrioritiesComment : ""
                                    :
                                    recode.ThematicPrioritiesComment}
                            </span>;
                        }
                    })
            }
            else if (this.SpecialList.indexOf(item) !== -1) {
                return;
            }
            else {
                this.columns.push({
                    title: field.DisplayName,
                    key: item,
                    sorter: this.sortList.findIndex(i => i === item) > -1,
                    dataIndex: item,
                    render: (txt, record) => {
                        let context = txt;
                        let subSectorID;
                        if (item === 'Sector') {
                            context = <AkMetadataLabel optionID={record[item]} parentCode="Sector" categoryCode="Sector" />;
                        }
                        if (item === 'Subsector') {
                            // context = record[item] ? <AkMetadataLabel optionID={record[item]} parentID={record.Sector} categoryID={sectorInfo.CategoryID} /> : null;
                            if (record[item] && Array.isArray(JSON.parse(record[item]))) {
                                subSectorID = JSON.parse(record[item]).map((item1) => {
                                    return <div key={item1} style={{ display: "inline-block", marginRight: "5px" }}><AkMetadataLabel key={item1} parentID={record.Sector} categoryID="983283246664392704" optionID={item1} /></div>;
                                });
                            }
                            context = record[item] ? subSectorID : null;
                        }
                        if (field.Type === "datepicker") {
                            context = AiibFormatDate(txt);
                        }
                        if (field.Type === "identity-picker") {
                            context = txt && txt.startsWith("[") ? <AkFormIdentityPicker readonly value={JSON.parse(txt)} multiple /> : "";
                        }
                        return <div className='aiib-print-listtable'>
                            {context}
                        </div>;
                    }
                });
            }
        });
    }
    loadData(sorter = null) {
        this.setState({ loading: true });
        if (this.columns.length === 0) {
            if (this.props.isMetadata) {
                this.metaDataColumnsTitle();
            } else {
                this.columnTitle();
            }
        }

        let SortsList = [];
        if (sorter && sorter.field && sorter.order) {
            SortsList = [{
                SortName: sorter.field,
                SortByDesc: sorter.order === "descend"
            }];
            this.setState({ sorts: SortsList });
        } else {
            SortsList = this.getSorts();
        }

        const reportCoumns = this.props.isProposal ? this.proposalDataColumns : this.projectDataColums;
        const metaDataColums = this.metaDataColums.filter(item => this.SpecialList.indexOf(item) === -1);

        const request = {
            Title: this.title,
            Columns: this.props.isMetadata ? metaDataColums : reportCoumns,
            Wheres: this.setWheresFileds(),
            Sorts: SortsList,
            FilterValue: "",
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            Verification: false,
        };
        ReportCenterTitleSortAPI.ReportCenterTitle(request).then(data => {
            if (data.Status === 0) {
                this.totalCount = data.TotalCount;
                this.setState({ listData: data.Data, loading: false });
            } else {
                AkNotification.error({
                    message: "Tip",
                    description: "Get Error!"
                });
            }
        });
    }
    onSearch(value: ContentListWhereModel[]) {
        this.setState({
            inputSearch: '',
            selectStage: "All"
        });
        this.setAdvancedWhere(value);
    }
    onTableChange(sorter) {
        this.loadData(sorter);
    }
    onGeneralSearch(value) {
        this.setState({
            inputSearch: value
        }, () => this.mergeSearch());
    }
    getQueryFields(data) {
        if (data.length === 0) {
            AkNotification.error({
                message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                description: AkGlobal.intl.formatMessage({ id: ProcessReportPageLocale.ListCheck }),
            });
            return null;
        }
        const host = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings);
        const where = JSON.stringify(this.setWheresFileds());
        const columns = JSON.stringify(data);
        const fileName = this.props.isProposal ? "New_Project_List" + new Date().toLocaleDateString() : "Investment_Program_Report" + new Date().toLocaleDateString();
        let DetailUrl = '';
        if (this.props.isProposal) {
            const Url = _spPageContextInfo.webAbsoluteUrl + "/sitepages/pages/index.aspx?_hash_=/proposal-page?listdataid={0}&tab=document";
            DetailUrl = Url;
        }

        let loginToken = AkContext.getToken();
        loginToken = encodeURIComponent(loginToken);

        if (this.props.isMetadata) {
            const dataBaseExport = {
                Columns: columns,
                Wheres: where,
                Sorts: JSON.stringify(this.state.sorts),
                FileName: "Investment_Program_Database",
            };
            AiibReportAPI.DataBaseExportCreate(dataBaseExport).then(d => {
                if (d.Status === 0) {
                    let href = `${host}/api/aiib/report/databaseexportdownload?exportID=${d.Data}&akmiisecret=${loginToken}`;
                    window.open(href);
                }
            });
        } else {
            const ProjectExport = {
                Columns: columns,
                Wheres: where,
                Sorts: JSON.stringify(this.state.sorts),
                FileName: fileName,
                ReportType: this.props.isProposal ? 1 : 2,
                DetailUrl
            };
            AiibReportAPI.ProjectExportCreate(ProjectExport).then(d => {
                if (d.Status === 0) {
                    let href = `${host}/api/aiib/report/projectexportdownload?exportID=${d.Data}&akmiisecret=${loginToken}`;
                    window.open(href);
                }
            });
        }
    }

    mergeSearch() {
        const { inputSearch, selectState, selectStage } = this.state;
        let where = [];
        // let CancelStatusWhere = {
        //     WhereName: "",
        //     Pre: "and",
        //     Type: ContentListWhereType.Contains,
        //     Child: [
        //         whereTransform("CancelStatus", AiibProjectCancelStatus.Default + '', ContentListWhereType.LikeLast, 'or'),
        //         whereTransform("CancelStatus", '', ContentListWhereType.LikeLast, 'or')
        //     ]
        // };
        if (inputSearch) {
            if (this.props.isProposal || this.props.isMetadata) {
                where = [{
                    WhereName: "",
                    Pre: "and",
                    Type: ContentListWhereType.Contains,
                    Child: [{
                        WhereName: "ProposalID",
                        Value: inputSearch,
                        Type: ContentListWhereType.LikeLast,
                        Pre: "or"
                    }, {
                        WhereName: "ProjectName",
                        Value: inputSearch,
                        Type: ContentListWhereType.LikeLast,
                        Pre: "or"
                    }]
                }]
            } else {
                where = [{
                    WhereName: "",
                    Pre: "and",
                    Type: ContentListWhereType.Contains,
                    Child: [{
                        WhereName: "ProposalID",
                        Value: inputSearch,
                        Type: ContentListWhereType.LikeLast,
                        Pre: "or"
                    }, {
                        WhereName: "ProjectName",
                        Value: inputSearch,
                        Type: ContentListWhereType.LikeLast,
                        Pre: "or"
                    }]
                }]
            }
        }

        if (selectState && this.props.isProposal) {
            if (selectState === STATE_SCREENINGCOMMITTEE) {
                where.push(whereTransform('SCRecommend', "Not Recommended", ContentListWhereType.Neq, 'and'));
            }
            where.push(whereTransform('State', selectState, ContentListWhereType.Eq, 'and'));
        }
        // if (!this.props.isProposal && !this.props.isMetadata) {
        //     if (selectStage && selectStage !== 'All' && selectStage !== SATGE_BOARDAPPROVED && selectStage !== "Planned") {
        //         where.push(whereTransform("CancelStatus",selectStage,ContentListWhereType.Eq,"and"));
        //     } else if (selectStage && selectStage === SATGE_BOARDAPPROVED) {
        //         where.push(whereTransform("Stage", SATGE_BOARDAPPROVED, ContentListWhereType.Eq, "and"),
        //             CancelStatusWhere);
        //     } else if (selectStage && selectStage === "Planned") {
        //         where.push(whereTransform("Stage", SATGE_BOARDAPPROVED, ContentListWhereType.Neq, "and"),
        //             CancelStatusWhere);
        //     }
        // }
        this.setSimpleWhere(where);
    }

    onChangeSelectState(value) {
        this.setState({ selectState: value }, () => this.mergeSearch());
    }
    // onChangeSelectStage(value, Report?: string) {
    //     this.setState({ selectStage: value }, () => this.mergeSearch(Report));
    // }

    // onLoadData() {
    //     const { queryData } = this.state;
    //     const { isProposal } = this.props;
    //     const objFields = isProposal ? AiibCommon.proposalNonsovereignFormField : AiibCommon.projectNonsovereignFormField;
    //     const formFields = objFields.map(i => i.InternalName);
    //     const currentFields = queryData;
    //     const allFields = currentFields.concat(formFields).filter((item, index, array) => array.indexOf(item) === index);
    //     const ExportqueryData = allFields.map((item, index) => {
    //         let field = this.listDefs.find(i => i.InternalName === item);
    //         let obj: ReportQueryModal = {
    //             FieldID: field.FieldID,
    //             DisplayName: field.DisplayName,
    //             InternalName: field.InternalName,
    //             SortNum: index + 1,
    //             Show: !!queryData.find(i => item === i),
    //         };
    //         return obj;
    //     });
    //     this.setState({ ExportqueryData });
    // }

    render() {
        const { listData, inputSearch, selectState, selectStage, visibleModal, queryData } = this.state;
        if (!this.listDefs) return null;
        const stateProps = {
            value: selectState,
            handleSelectChange: this.onChangeSelectState.bind(this)
        };
        // const stageProps = {
        //     value: selectStage,
        //     handleSelectChange: (v) => this.onChangeSelectStage(v, "Report")
        // }
        return <AkLayout className="aiib-report">
            <AkLayout.Header className="ak-header-title">
                {
                    this.props.isProposal ?
                        <div>
                            <span className="ak-header-title-sub1">Report Center</span>
                            <span className="ak-header-title-line">/</span>
                            <span className="ak-header-title-sub2">New Project List</span>
                        </div>
                        :
                        this.props.isMetadata ? <div>
                            <span className="ak-header-title-sub1">Report Center</span>
                            <span className="ak-header-title-line">/</span>
                            <span className="ak-header-title-sub2">Investment Program Data</span>
                        </div> :
                            <div>
                                <span className="ak-header-title-sub1">Report Center</span>
                                <span className="ak-header-title-line">/</span>
                                <span className="ak-header-title-sub2">Investment Program Report</span>
                            </div>
                }


            </AkLayout.Header>
            <AkLayout.Content>
                <div className='aiib-content'>
                    <div className='ak-tab-actions'>
                        <AkRow>
                            <AkCol span={12} style={{ textAlign: 'left' }}>
                                <AkRow type="flex" align="middle" justify="start">
                                    <AkCol className="mr10">
                                        <AIIBGeneralSearch
                                            placeholder="Proposal ID or Project Name"
                                            value={inputSearch}
                                            onChange={(value) => this.setState({ inputSearch: value })}
                                            onSearch={(value) => {
                                                this.onGeneralSearch(value);
                                            }} />
                                    </AkCol>
                                    <AkCol>
                                        <AiibAdvancedSearch
                                            type={this.props.isProposal ? SearchType.NewProjectList : SearchType.InvestmentProgramReport}
                                            onChange={(value) => this.onSearch(value)}
                                            value={this.state.allWhere.AdvancedWhere} />
                                    </AkCol>

                                    <AkCol>
                                        {this.props.isProposal ? AiibSelectState(stateProps) : null}
                                    </AkCol>
                                    {/* <AkCol>
                                        {
                                            (!this.props.isProposal && !this.props.isMetadata) ?
                                                AiibReportStage(stageProps) : null
                                        }
                                    </AkCol> */}
                                </AkRow>
                            </AkCol>
                              <AkCol span={12} style={{ textAlign: 'right' }}>
                              <AkButton
                                  className='aiib-button dark'
                                  icon="export"
                                  onClick={() => {
                                      this.setState({ visibleModal: true });
                                  }}>
                                  Export to Excel
                              </AkButton>
                              {this.props.isMetadata ? <DataBaseImport loadData={() => {
                                  this.loadData();
                              }} /> : null}
                              </AkCol>
                          
                           
                        </AkRow>
                    </div>

                    <AkTable
                        rowKey="ListDataID"
                        onChange={(pagination, filters, sorter) => {
                            this.pageIndex = pagination['current'];
                            this.onTableChange(sorter);
                        }}
                        columns={this.columns}
                        loading={this.state.loading}
                        scroll={{
                            x: true
                        }}
                        pagination={{
                            total: this.totalCount,
                            pageSize: this.pageSize,
                            current: this.pageIndex,
                        }}
                        dataSource={listData} />
                </div>
                {
                    visibleModal
                        ?
                        <ReportQuery
                            listDefs={this.listDefs}
                            onClose={this.closeModal.bind(this)}
                            onQuery={this.getQueryFields.bind(this)}
                            value={queryData}
                            isProposal={this.props.isProposal} />
                        :
                        null
                }
            </AkLayout.Content>
        </AkLayout>;
    }
}
