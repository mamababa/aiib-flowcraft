import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { MainContent } from "../components/maincontent";
import {
    IntlProps,
    RouterProps,
    AkResponsiveTable,
    AkColumnProps,
    AkRow,
    AkCol,
    AkButton,
    AkUtil,
    AkContext,
    AppKeys,
    AkNotification,
    CommonLocale,
    AkGlobal,
} from "akmii-yeeoffice-common";
import { injectIntl } from "react-intl";
import { ReportPageLocale, ProcessReportPageLocale } from '../../locales/localeid';
import { ReportAPI } from '../../api/report';
import { PathConfig } from '../../config/pathconfig';
import CustomSearchPanel from '../components/custom-search';
import { isNullOrUndefined } from 'util';
import { ReportFilterCompare } from '../components/filtersettings-report';
import * as moment from 'moment';

interface GeneralReportPageProps extends RouterProps,
    IntlProps { }
interface GeneralReportPageStates {
    loading?: boolean;
    columns?: AkColumnProps<any>[];
    model?: any[];
    totalCount?: number;
    downloadUrl?: string;
    tableWidth: number;
    searchList?: any[];
    listName?: string;
}
/** 通用报表页面 */
class GeneralReportPage extends Component<GeneralReportPageProps,
    GeneralReportPageStates> {
    title: string;
    startDate?: any;
    endDate?: any;
    defKey: string;

    reportID: string;
    filter: string;
    pageIndex?: number = 1;
    pageSize?: number = 20;

    constructor(props, context) {
        super(props, context);
        this.defKey = this.props.location.query["defKey"]; //'leaverequest';//
        this.reportID = this.props.location.query["reportID"]; //'leaverequest';//
        this.title = this.props.location.query["title"]; //'page.report.leaverequest.title';//;
        this.state = {
            columns: [],
            totalCount: 0,
            tableWidth: 1200,
            searchList: [],
        };
    }

    componentDidMount() {
        this.loadSearchData();

    }

    loadSearchData() {
        const { formatMessage } = AkGlobal.intl;
        this.setState({ loading: true });
        const getReportSearchRequest: GetReportsVariableByKeyRequest = {
            reportID: this.reportID,
        };
        ReportAPI.getReportSearchValue(getReportSearchRequest).then(data => {
            this.setState({ loading: false });
            if (data.Status === 0) {
                let searchList = [];
                //内置变量
                if (data.Data.InternalFilters && data.Data.InternalFilters.length > 0) {
                    (data.Data.InternalFilters).forEach(item => {
                        if (item.Compare === 12) {
                            item.Value = AkContext.getUser().AccountID;
                        }
                        searchList.push(item);
                    });
                }
                //自定义变量
                if (data.Data.CustomFilters && data.Data.CustomFilters.length > 0) {
                    (data.Data.CustomFilters).forEach(item => {
                        if (item.Compare === 12) {
                            item.Value = AkContext.getUser().AccountID;
                        }
                        searchList.push(item);
                    });
                };

                if (isNullOrUndefined(data.Data.InternalFilters) && isNullOrUndefined(data.Data.CustomFilters)) {
                    searchList = [{
                        Compare: 1,
                        ID: "flowno",
                        Name: "编号",
                        Type: "string",
                        Value: null,
                    }, {
                        Compare: 1,
                        ID: "applicantuserid",
                        Name: "申请人",
                        Type: "user",
                        Value: null,
                    }, {
                        Compare: 1,
                        ID: "departmentid",
                        Name: "部门",
                        Type: "organization",
                        Value: null,
                    }, {
                        Compare: 1,
                        ID: "created",
                        Ext1: null,
                        Name: "提交时间",
                        Type: "date",
                        Value: null,
                    }, {
                        Compare: 1,
                        Ext1: null,
                        ID: "modified",
                        Name: "完成时间",
                        Type: "date",
                        Value: null,
                    }, {
                        Compare: 1,
                        ID: "ApplicationStatus",
                        Ext1: null,
                        Name: "流程状态",
                        Type: "number",
                        Value: null,
                    }];
                }
                searchList = searchList.filter(item => item.ID !== "applicantusername_cn" && item.ID !== "departmentname_cn" && item.ID !== "applicantusername_en");
                const value = searchList.filter(item => ((item.Value !== null) && (item.Value !== "")) || ((item.Ext1 !== null) && (item.Ext1 !== "")) || (item.Compare === ReportFilterCompare.IsNotNull) || (item.Compare === ReportFilterCompare.IsNull));
                const filter = value.map(item => {
                    let value = {
                        Compare: item.Compare === 0 ? 1 : item.Compare,
                        Ext1: item.Ext1 ? moment(item.Ext1).add(1, 'days').format("MM-DD-YYYY") : null,
                        ID: item.ID,
                        Type: item.Type,
                        Value: item.Value ? item.Value : null,
                    }
                    return value;
                });

                this.filter = JSON.stringify(filter);
                this.setState({ loading: false });
                this.changeOrder(searchList, true);
                this.loadData();
            } else {
                AkNotification.error({
                    message: formatMessage({ id: CommonLocale.Tip }),
                    description: formatMessage({ id: CommonLocale.GetInfoError })
                });
            }
        });
    }

    loadData() {
        const { formatMessage } = AkGlobal.intl;
        this.setState({ loading: true });
        //获取列信息
        let getTitleRequest: GetTitleRequest = {
            reportID: this.reportID,
            defKey: this.defKey
        };

        //获取报表列名数据
        let getReportRequest: GetUserReportRequest = {
            reportID: this.reportID,
            defKey: this.defKey,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        };

        if (this.filter) {
            getReportRequest.filter = this.filter;
        }

        ReportAPI.getTitle(getTitleRequest).then(data => {
            if (data.Status === 0) {
                var columnsRes = data.Data;

                const list = data.Data.filter(i => i.Type === "list");
                if (list && list.length > 0) {
                    this.setState({ listName: (list[0].ID).substring(6) })
                    getReportRequest.listName = (list[0].ID).substring(6);
                } else {
                    this.setState({ listName: null });
                }

                ReportAPI.getUserReport(getReportRequest).then(data => {
                    if (data.Status === 0) {
                        var reportRes = data;
                        let visibleclumns = {};
                        let num = 0;
                        let tableColums = [];
                        columnsRes.forEach(element => {
                            if (element.Type !== "list") {
                                tableColums.push(element);
                            } else {
                                const list = columnsRes.filter(i => i.Type === "list");
                                const listValue = list.length > 0 ? JSON.parse(list[0].Value) : [];
                                if (listValue.length > 0) {
                                    listValue.forEach(item => {
                                        tableColums.push(item);
                                    });
                                }
                            }
                        });
                        tableColums.map(d => {
                            let p = d.ID;
                            if (d.Checked && !(d.Type === "file" || d.Type === "lookup" || d.Type === "dict" || d.Type === "img" || d.Type === "budget" ||
                                d.Type === "vacation" || d.Type === "vacation-confirmation" || d.Type === "signature") && !(p === "applicationid" || p === "applicantuserid" || p === "departmentid" || p === "procdefid" || p === 'FormURL' || p === 'InstanceID' || p === "v___attachments")) {
                                visibleclumns[d.ID] = d.DisplayName ? d.DisplayName : d.Name;
                                num++;
                            }
                        });
                        if (num === 0) {
                            tableColums.map(d => {
                                visibleclumns[d.ID] = d.DisplayName ? d.DisplayName : d.Name;
                            });
                        };
                        let columns = [];
                        if (visibleclumns) {
                            for (let p in visibleclumns) {
                                if (p === "applicationid" || p.indexOf("vlist_") === 0 || p === "procdefid" || p === 'FormURL' || p === 'InstanceID' || p === "v___attachments")
                                    continue;
                                columns.push({
                                    key: AkUtil.guid(),
                                    title: <span title={visibleclumns[p].toString()} className="report-colums">{visibleclumns[p].toString()}</span>,
                                    dataIndex: p.toString(),
                                    render: (txt, record, index) => {
                                        if (p === "flowno") {
                                            if (record.formurl.startsWith("FormDesigner:")) {
                                                return <Link
                                                    to={{
                                                        pathname: PathConfig.FormDisplay,
                                                        query: {
                                                            "pageid": record.formurl,
                                                            "appid": record.applicationid,
                                                            "defkey": record.defkey,
                                                            "instid": record.instanceid
                                                        }
                                                    }}>
                                                    {txt}
                                                </Link>;
                                            }
                                            let hrefStr = `${record.formurl}?appid=${record.applicationid}&defkey=${record.defkey}&instid=${record.instanceid}`;
                                            return (
                                                <a href={hrefStr}>{txt}</a>
                                            );
                                        } else if (p === "applicationstatus") {
                                            return (
                                                <span>{txt ? formatMessage({ id: "page.report.modal.reportfilter.checkbox." + txt }) : txt}</span>
                                            );
                                        } else {
                                            let control = null;

                                            tableColums.map(item => {
                                                if (item.ID === p) {
                                                    if (item.Type === "boolean") {
                                                        control = txt === "true" ? <span>{formatMessage({ id: ProcessReportPageLocale.FilterBooleanOptionTrue })}</span> : <span>{formatMessage({ id: ProcessReportPageLocale.FilterBooleanOptionFalse })}</span>;
                                                    }
                                                    else {
                                                        control = <span>{txt}</span>;
                                                    }
                                                }
                                            });
                                            return control;
                                        }
                                    }
                                });
                            }
                            let tabelWidth = columns.length * 80;
                            this.setState({ loading: false, columns: columns, model: reportRes.Data, totalCount: reportRes.TotalCount, tableWidth: tabelWidth });
                        } else {
                            this.setState({ loading: false });
                        }
                    } else if (data.Status === 401) {
                        AkNotification.error({
                            message: formatMessage({ id: CommonLocale.Tip }),
                            description: formatMessage({ id: "flowcraft.server.status." + data.Status })
                        });
                    }
                    else {
                        AkNotification.error({
                            message: formatMessage({ id: CommonLocale.Tip }),
                            description: formatMessage({ id: CommonLocale.GetInfoError })
                        });
                    }
                });
            } else {
                AkNotification.error({
                    message: formatMessage({ id: CommonLocale.Tip }),
                    description: formatMessage({ id: CommonLocale.GetInfoError })
                });
            }
        });
    }


    handleDownload = () => {
        const { formatMessage } = AkGlobal.intl;
        let fileName: string = formatMessage({ id: this.title });
        let url = `${AkContext.getAppInfoAPI_URL(AppKeys.Flowcraft)}/api/reports/exportfile?reportID=${this.reportID}&filename=${encodeURIComponent(fileName)}&defkey=${this.defKey}`;

        if (AkContext.getBranch() !== AkContext.YeeOffice) {
            let loginToken = AkContext.getToken();
            loginToken = encodeURIComponent(loginToken);
            if (loginToken && loginToken !== undefined && loginToken !== '' && loginToken !== "undefined") {
                url += `&akmiisecret=${loginToken}`;
            }
        }

        if (this.state.listName && this.state.listName !== undefined && this.state.listName !== '' && this.state.listName !== null) {
            url += `&listName=${this.state.listName}`;
        }
        if (this.filter && this.filter.length > 0) {
            url += `&filter=${encodeURIComponent(this.filter)}`;
        }
        this.setState({ downloadUrl: url });
    }

    /**更改顺序 */
    changeOrder(data: Array<any>, isInit: boolean, setStateElement?: any) {
        const order = data.findIndex(d => "Order" in d);
        let result = [];
        let lth = data.length;
        if (order > -1) {
            for (let i = 0; i < lth; i++) {
                const d = data[i];
                if (d.ID) {
                    if (!("IsHide" in d) || !d['IsHide']) {
                        if (!("Order" in d)) {
                            const maxSortBy = p => (a, b) => a[p] < b[p] ? 1 : -1;
                            const maxOrder = data.sort(maxSortBy("Order"))[0];
                        }
                        result = AkUtil.insert(result, d, Number(d.Order) - 1);
                    } else {
                        result.push(d);
                    }
                }
            }
        }
        this.setState({ searchList: result });
    }

    onSearchClick(filter) {
        this.pageIndex = 1;
        this.filter = JSON.stringify(filter);
        this.loadData();
    }

    renderExport() {
        const { formatMessage } = AkGlobal.intl;
        return <AkRow type="flex" justify="end" align="middle" className="row-w150">
            <AkCol >
                <AkButton icon="export" onClick={this.handleDownload}>
                    {formatMessage({ id: ReportPageLocale.ExportButtonTitle })}</AkButton>
            </AkCol>
        </AkRow >;
    }

    render() {
        let header = <span>{this.title}</span>;
        return <MainContent
            className="wfull autoheight ak-general-report"
            Header={header}
            WithBack={true}
            Search={this.renderExport()}>
            <CustomSearchPanel list={this.state.searchList} onSearch={(filter) => this.onSearchClick(filter)}></CustomSearchPanel>
            <AkResponsiveTable className="ak-general-report-table akfc-form-list-table"
                hideViewSwitch={true}
                rowKey="id"
                loading={this.state.loading}
                columns={this.state.columns}
                dataSource={this.state.model}
                pagination={{
                    total: this.state.totalCount,
                    pageSize: this.pageSize,
                    current: this.pageIndex,
                    onChange: (current) => {
                        this.pageIndex = current;
                        this.loadData();
                    }
                }}
                scroll={{
                    x: this.state.tableWidth
                }}
                style={{
                    marginLeft: "10px",
                    marginRight: "13px"
                }}></AkResponsiveTable>
            <iframe
                key="downloadIframe"
                src={this.state.downloadUrl}
                style={{
                    display: "none"
                }}></iframe>
        </MainContent>;
    }
}

export default injectIntl(withRouter(GeneralReportPage));
