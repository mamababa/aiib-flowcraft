import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { injectIntl } from "react-intl";
import { ApplicationPageLocale, WaitingTaskPageLocale } from "../locales/localeid";
import { ApplyAPI } from "../api/apply";
import {
    IntlProps,
    AkTable,
    AkColumnProps,
    AkCol,
    AkRow,
    AkSelect,
    AkInput,
    AkButton,
    AkIdentityPicker,
    AkIdentity,
    AkTooltip,
    AkGlobal,
    AkUtil,
    AkDateLabel,
    AkAvatar
} from "akmii-yeeoffice-common";
import { MainContent } from "./components/maincontent";
import { ApplicationStatusEnum, ApplicationStatusColor } from "../api/procinst";
import { FlowcraftCommon } from "../util/common";
import { AkColumnLayout } from "akmii-yeeoffice-common/lib/components/controls/ak-table";
import { PathConfig } from "../config/pathconfig";

class ApplicationTable extends AkTable<ApplicationModel> {
}
interface ApplicationAkColumn extends AkColumnProps<ApplicationModel> {
}

interface ApplicationProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> {
}
interface ApplicationStates {
    visible?: boolean;
    totalCount?: number;
    loading?: boolean;
    search?: boolean;
    applyData?: ApplicationModel[];
    applyRequest?: GetApplyRequest;
    statusList?: {
        key?: string;
        value?: string;
    }[];
}

/** 我的申请 */
class Application extends Component<ApplicationProps,
    ApplicationStates> {
    columns: ApplicationAkColumn[];

    constructor(props, context) {
        super(props, context);

        this.state = {
            statusList: [],
            applyData: [],
            applyRequest: {
                pageIndex: 1,
                pageSize: 20
            },
            visible: false
        };
        this.columns = [
            {
                title: AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.ColumnProcessID }),
                key: ApplicationPageLocale.ColumnProcessID,
                dataIndex: "FlowNo",
                layout: AkColumnLayout.LeftTop,
                render: (txt, record) => {
                    if (record.FormUrl.startsWith("FormDesigner:")) {
                        return <Link to={{
                            pathname: PathConfig.FormDisplay,
                            query: {
                                "pageid": record.FormUrl,
                                "appid": record.ApplicationID,
                                "defkey": record.DefKey,
                                "instid": record.CurrentProcInstID
                            }
                        }}>{txt}</Link>;
                    }
                    return <a href={`${record.FormUrl}?appid=${record.ApplicationID}&defkey=${record.DefKey}&instid=${record.CurrentProcInstID}`}>{txt}</a>;
                }
            }, {
                title: AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.ColumnProcessName }),
                key: ApplicationPageLocale.ColumnProcessName,
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "FlowName"
            }, {
                title: AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.ColumnProcessCategory }),
                key: ApplicationPageLocale.ColumnProcessCategory,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "CategoryName"
            }, {
                title: AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.ColumnProcessCreated }),
                key: ApplicationPageLocale.ColumnProcessCreated,
                // hidden: FlowcraftCommon.minSM,
                layout: AkColumnLayout.RightBottom,
                dataIndex: "CreatedStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: AkGlobal.intl.formatMessage({ id: WaitingTaskPageLocale.ColumnProcessCreateBy }),
                key: WaitingTaskPageLocale.ColumnProcessCreateBy,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.ColumnProcessStatus }),
                key: ApplicationPageLocale.ColumnProcessStatus,
                layout: AkColumnLayout.RightTop,
                dataIndex: "Status",
                render: (text, record) => {
                    let tag = AkGlobal.intl.formatMessage({
                        id: "model.application.status." + text
                    });
                    switch (record.Status) {
                        case ApplicationStatusEnum.Running:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Running
                                }}>
                                {tag}
                            </span>;
                        case ApplicationStatusEnum.Complete:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Complete
                                }}>
                                {tag}
                            </span>;
                        case ApplicationStatusEnum.Rejected:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Rejected
                                }}>
                                <AkTooltip
                                    placement="right"
                                    title={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.StatusTip })}>
                                    {tag}
                                </AkTooltip>
                            </span>;
                        case ApplicationStatusEnum.Revoked:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Revoked
                                }}>
                                <AkTooltip
                                    placement="right"
                                    title={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.StatusTip })}>
                                    {tag}
                                </AkTooltip>
                            </span>;
                        case ApplicationStatusEnum.Revoking:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Revoked
                                }}>
                                <AkTooltip
                                    placement="right"
                                    title={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.StatusTip })}>
                                    {tag}
                                </AkTooltip>
                            </span>;
                        case ApplicationStatusEnum.Canceled:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Cancelled
                                }}>
                                {tag}
                            </span>;
                        case ApplicationStatusEnum.Cancelling:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Cancelled
                                }}>
                                {tag}
                            </span>;
                        case ApplicationStatusEnum.Error:
                            return <span
                                style={{
                                    color: ApplicationStatusColor.Error
                                }}>{tag}</span>;
                        default:
                            return <span>{tag}</span>;
                    }
                }
            }
        ];
    }

    componentDidMount() {
        let { query } = this.props.location;
        let { applyRequest } = this.state;
        if (query) {
            for (let key in query) {
                applyRequest[key] = query[key];
            }
            this.setState({ applyRequest });
        }
        this.loadData();
        this.initData();
    }

    /**
     * 加载全部流程数据
     */
    loadData() {
        this.setState({ loading: true });
        ApplyAPI
            .getApply(this.state.applyRequest)
            .then(data => {
                this.setState({ loading: false, totalCount: data.TotalCount, applyData: data.Data });
            });
        this.props.router.push({ pathname: PathConfig.Application, query: this.state.applyRequest });
    }
    initData() {
        const { statusList } = this.state;
        for (var prop in ApplicationStatusEnum) {
            if (isNaN(parseInt(prop))) {
                statusList
                    .push({
                        key: ApplicationStatusEnum[prop] + "",
                        value: AkGlobal.intl.formatMessage({
                            id: "model.application.status." + ApplicationStatusEnum[prop]
                        })
                    });
            }
        }
    }

    renderSearch() {
        let option = this
            .state
            .statusList
            .map((entry) => {
                return <AkSelect.Option key={entry.key} value={entry.key}>{entry.value}</AkSelect.Option>;
            });
        let { applyRequest } = this.state;
        return <AkRow type="flex" justify="end" align="middle">
            <AkCol xs={0} lg={5}>
                <AkSelect
                    allowClear
                    value={applyRequest.status}
                    onChange={(value) => {
                        applyRequest.status = value as string;
                        this.setState({ applyRequest });
                    }}
                    placeholder={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.SearchSelectStatus })}>
                    {option}
                </AkSelect>
            </AkCol>
            <AkCol xs={10} lg={5}>
                <AkInput
                    allowClear={true}
                    value={applyRequest.flowNo}
                    onChange={(value) => {
                        applyRequest.flowNo = value;
                        this.setState({ applyRequest });
                    }}
                    onPressEnter={() => {
                        applyRequest.pageIndex = 1;
                        this.loadData();
                    }}
                    placeholder={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.SearchInputProcessID })}></AkInput>
            </AkCol>
            <AkCol xs={10} lg={5}>
                <AkInput
                    allowClear={true}
                    value={applyRequest.flowName}
                    onChange={(value) => {
                        applyRequest.flowName = value;
                        this.setState({ applyRequest });
                    }}
                    onPressEnter={() => {
                        applyRequest.pageIndex = 1;
                        this.loadData();
                    }}
                    placeholder={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.SearchInputProcessName })}></AkInput>
            </AkCol>
            <AkCol xs={0} lg={5}>
                <AkIdentityPicker
                    multiple={false}
                    value={applyRequest.applicantID}
                    placeholder={AkGlobal.intl.formatMessage({ id: ApplicationPageLocale.SearchInputCreateBy })}
                    onChange={(v) => {
                        let value = v as AkIdentity;
                        applyRequest.applicantID = value
                            ? value.ID
                            : "0";
                        this.setState({ applyRequest });
                    }} />
            </AkCol>
            <AkCol xs={4} lg={1}>
                <AkButton
                    icon="search"
                    onClick={() => {
                        applyRequest.pageIndex = 1;
                        this.loadData();
                    }}></AkButton>
            </AkCol>
        </AkRow>;
    }
    //手机端 关闭搜索框
    onCloseSearch() {
        const { applyRequest } = this.state;
        if (applyRequest.flowNo || applyRequest.flowName) {
            applyRequest.flowNo = "";
            applyRequest.flowName = "";
            applyRequest.pageIndex = 1;
            applyRequest.pageSize = 20;
            this.loadData();
        }
    }

    render() {
        let topThis = this;
        return <MainContent
            Header={ApplicationPageLocale.HeaderTitle}
            Search={topThis.renderSearch()} onReload={() => topThis.onCloseSearch()}>
            <ApplicationTable
                rowKey="FlowNo"
                loading={this.state.loading}
                pagination={{
                    total: this.state.totalCount,
                    pageSize: 20,
                    current: Number(topThis.state.applyRequest.pageIndex),
                    onChange: (current) => {
                        this.state.applyRequest.pageIndex = current;
                        topThis.loadData();
                        AkUtil.ScrollToTop();
                    }
                }}
                columns={this.columns}
                dataSource={this.state.applyData}></ApplicationTable>
        </MainContent>;
    }
}
class ApplicationStyle {
}

export default injectIntl(withRouter(Application));
