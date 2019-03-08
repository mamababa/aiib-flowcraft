import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import { IntlProps, AkTable, AkColumnProps, AkModal, AkNotification, AkGlobal, AkAvatar, AkDateLabel, AkMessage } from 'akmii-yeeoffice-common';
import { ProcDraftsPageLocale, CommonLocationLocale } from "../locales/localeid";
import { ProcDraftsAPI } from "../api/procdrafts";
import { MainContent } from "./components/maincontent";
import { AkColumnLayout } from "akmii-yeeoffice-common/lib/components/controls/ak-table";
import { PathConfig } from "../config/pathconfig";

class DraftTable extends AkTable<ProcDraftModel> { }
interface DraftAkColumn extends AkColumnProps<ProcDraftModel> { }

/** 草稿*/
interface ProcDraftsProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> { }
interface ProcDraftsStates {
    totalCount?: number;
    draftsData?: ProcDraftModel[];
    loading?: boolean;
    getRequest?: GetProcDraftRequest;
}

class ProcDraftsPage extends Component<ProcDraftsProps,
    ProcDraftsStates> {
    columns: DraftAkColumn[];
    /**删除草稿*/
    deleteDraftRequest?: DeleteProcDraftRequest;
    /**消息格式*/
    format = this.props.intl.formatMessage;

    constructor(props, context) {
        super(props, context);

        this.columns = [
            {
                title: this.format({ id: ProcDraftsPageLocale.ColumnProcDefName }),
                key: ProcDraftsPageLocale.ColumnProcDefName,
                dataIndex: "FlowName",
                layout: AkColumnLayout.LeftTop,
                render: (txt, record, index) => {
                    if (record.FormUrl.startsWith("FormDesigner:")) {
                        return <Link to={{
                            pathname: PathConfig.FormDisplay,
                            query: {
                                "pageid": record.FormUrl,
                                "defid": record.ProcDefID,
                                "defkey": record.DefKey,
                                "draftid": record.ProcDraftID
                            }
                        }}>{txt}</Link>
                    }
                    return <a
                        href={`${record.FormUrl}?defkey=${record.DefKey}&defid=${record.ProcDefID}&draftid=${record.ProcDraftID}`}>{txt}</a>
                }
            }, {
                title: this.format({ id: ProcDraftsPageLocale.ColumnCreatedBy }),
                key: ProcDraftsPageLocale.ColumnCreatedBy,
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: this.format({ id: ProcDraftsPageLocale.ColumnCreated }),
                key: ProcDraftsPageLocale.ColumnCreated,
                layout: AkColumnLayout.RightBottom,
                dataIndex: "CreatedStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: '',
                key: ProcDraftsPageLocale.ColumnControl,
                layout: AkColumnLayout.RightTop,
                dataIndex: "a",
                render: (txt, record, index) => {
                    return <a onClick={() => this.deleteDraft(record)}>
                        <FormattedMessage id={ProcDraftsPageLocale.RowDelete}></FormattedMessage>
                    </a>;
                }
            }
        ];
        this.state = {
            draftsData: [],
            getRequest: {
                pageIndex: 1,
                pageSize: 9999
            }
        };
        this.deleteDraftRequest = {}
    }

    componentDidMount() {
        this.loadData();
    }

    /**加载全部数据*/
    loadData() {
        this.setState({ loading: true });
        const { formatMessage } = AkGlobal.intl;
        ProcDraftsAPI
            .getProcDrafts(this.state.getRequest)
            .then(data => {
                if (data.Status === 0) {
                    this.setState({ loading: false, totalCount: data.TotalCount, draftsData: data.Data });
                } else {
                    AkNotification.warning({
                        message: formatMessage({ id: CommonLocationLocale.Tip }),
                        description: data.Message // formatMessage({ id: CommonLocationLocale.GetInfoError })
                    });
                    this.setState({ loading: false });
                }
            });
    }

    /**删除草稿*/
    deleteDraft(itemInfo?: ProcDraftModel) {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        AkModal.confirm({
            title: formatMessage({ id: CommonLocationLocale.Tip }),
            content: formatMessage({
                id: CommonLocationLocale.DeleteConfirm
            }, { name: itemInfo.FlowName }),
            onOk() {
                topThis.setState({ loading: true })
                topThis.deleteDraftRequest.procDraftID = itemInfo.ProcDraftID;
                ProcDraftsAPI
                    .deleteProcDrafts(topThis.deleteDraftRequest)
                    .then(data => {
                        if (data.Status === 0) {
                            AkMessage.success(formatMessage({ id: CommonLocationLocale.DeleteSuccess }));
                            topThis.loadData();
                        } else {
                            AkNotification.warning({
                                message: formatMessage({ id: CommonLocationLocale.Tip }),
                                description: data.Message // formatMessage({ id: CommonLocationLocale.DeleteFail })
                            });
                            return;
                        }
                    });
            },
            onCancel() { }
        });
    }

    render() {
        let topThis = this;
        return <MainContent Header={ProcDraftsPageLocale.PropsHeaderTitle}>
            <DraftTable
                pagination={false}
                rowKey="ProcDraftID"
                columns={this.columns}
                loading={this.state.loading}
                dataSource={this.state.draftsData}></DraftTable>
        </MainContent>
    }
}
class ProcDraftsPageStyle { }

export default injectIntl(withRouter(ProcDraftsPage))
