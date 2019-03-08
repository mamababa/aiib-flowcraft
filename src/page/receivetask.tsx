import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { injectIntl } from "react-intl";
import { ReciveTaskPageLocale, CommonLocationLocale } from "../locales/localeid";
import { TaskAPI } from "../api/task";
import {
    IntlProps,
    AkTable,
    AkColumnProps,
    AkRow,
    AkCol,
    AkInput,
    AkButton,
    AkIdentityPicker,
    AkIdentity,
    AkIcon,
    AkModal,
    AkNotification,
    AkTooltip,
    AkGlobal,
    AkUtil,
    AkColumnLayout,
    AkMessage,
    AkAvatar,
    AkDateLabel,
    AkHtml
} from "akmii-yeeoffice-common";
import { MainContent } from "./components/maincontent";
import { FlowcraftCommon } from "../util/common";
import { TaskAction } from "../actions/index";
import { PathConfig } from "../config/pathconfig";
import * as moment from "moment";

class TaskTable extends AkTable<TaskModel> { }
interface TaskAkColumn extends AkColumnProps<TaskModel> { }

interface ReceiveTaskProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> { }
interface ReceiveTaskStates {
    taskData?: TaskModel[];
    loading?: boolean;
    taskRequest?: GetReceiveTaskRequest;
    totalCount?: number;
}

/** 领用任务 */
class ReceiveTask extends Component<ReceiveTaskProps,
    ReceiveTaskStates> {

    columns: TaskAkColumn[];
    /**领用任务*/
    taskClaimRequest?: TaskClaimRequest;

    constructor(props, context) {
        super(props, context);
        const { formatMessage } = AkGlobal.intl;
        this.columns = [
            {
                title: formatMessage({ id: ReciveTaskPageLocale.ColumnProcessID }),
                key: ReciveTaskPageLocale.ColumnProcessID,
                dataIndex: "FlowNo",
                layout: AkColumnLayout.LeftTop,
                sorter: (a, b) => a.TaskID >= b.TaskID ? 1 : -1,
                render: (txt, record, index) => {
                    if (record.TaskURL.startsWith("FormDesigner:")) {
                        return <Link to={{
                            pathname: PathConfig.FormDisplay,
                            query: {
                                "pageid": record.TaskURL,
                                "taskid": record.TaskID,
                                "instid": record.ProcInstID
                            }
                        }}>
                            {txt}
                        </Link>;
                    }
                    return <a
                        href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}&disableapprove=true&isclaim=true`}>{txt}</a>;
                }
            }, {
                title: formatMessage({ id: ReciveTaskPageLocale.ColumnTaskName }),
                key: ReciveTaskPageLocale.ColumnTaskName,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "Name",
                render: (txt, record) => {
                    return <AkHtml>{txt}</AkHtml>
                }
            }, {
                title: formatMessage({ id: ReciveTaskPageLocale.ColumnProcessName }),
                key: ReciveTaskPageLocale.ColumnProcessName,
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "ProcDefName"
            }, {
                title: formatMessage({ id: ReciveTaskPageLocale.ColumnProposer }),
                key: ReciveTaskPageLocale.ColumnProposer,
                layout: AkColumnLayout.RightTop,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: formatMessage({ id: ReciveTaskPageLocale.ColumnApplyTime }),
                key: ReciveTaskPageLocale.ColumnApplyTime,
                // hidden: FlowcraftCommon.minSM,
                layout: AkColumnLayout.RightBottom,
                dataIndex: "CreatedStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: formatMessage({ id: ReciveTaskPageLocale.ColumnExpireTime }),
                key: ReciveTaskPageLocale.ColumnExpireTime,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "DueDateStr",
                render: (txt, record) => {
                    let now = moment();
                    let dueDate = moment(txt);
                    return dueDate < now
                        ? <AkDateLabel style={{ color: "red" }} value={txt} format="MM-DD-YYYY HH:mm" />
                        : <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: "",
                key: "operation",
                render: (txt, record) => {
                    return FlowcraftCommon.minSM
                        ? <a
                            onClick={() => {
                                this.receiveTask(record);
                            }}>
                            <AkIcon type="receive-task"></AkIcon>
                        </a>
                        : <AkTooltip
                            title={formatMessage({ id: ReciveTaskPageLocale.OperationReceiveTask })}>
                            <a onClick={() => { this.receiveTask(record); }}>
                                <AkIcon type="receive-task"></AkIcon>
                            </a>
                        </AkTooltip>;
                }
            }
        ];
        this.taskClaimRequest = {};
        this.state = {
            taskData: [],
            totalCount: 0,
            taskRequest: {
                pageIndex: 1,
                pageSize: 20
            }
        };
    }

    componentDidMount() {
        let { query } = this.props.location;
        let { taskRequest } = this.state;
        if (query) {
            for (let key in query) {
                taskRequest[key] = query[key];
            }
            this.setState({ taskRequest });
        }
        this.loadData();
    }

    /**加载全部流程数据*/
    loadData() {
        this.setState({ loading: true });
        AkGlobal.store.dispatch(TaskAction.requestTaskCount());
        TaskAPI
            .getReceiveTaskList(this.state.taskRequest)
            .then(data => {
                this.setState({ loading: false, taskData: data.Data, totalCount: data.TotalCount });
            });
        this.props.router.push({ pathname: PathConfig.ReceiveTask, query: this.state.taskRequest });
    }
    /**领用任务*/
    receiveTask(record?: TaskModel) {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        AkModal.confirm({
            title: formatMessage({ id: CommonLocationLocale.Tip }),
            content: <AkHtml>{formatMessage({
                id: ReciveTaskPageLocale.TipReceiveTask
            }, {
                    taskName: record.Name,
                    prcessName: record.ProcDefName
                })}</AkHtml>,
            onOk() {
                topThis.setState({ loading: true });
                topThis.taskClaimRequest = {
                    TaskID: record.TaskID
                };
                TaskAPI.claimTask(topThis.taskClaimRequest).then(data => {
                    if (data.Status === 0) {
                        AkMessage.success(formatMessage({ id: ReciveTaskPageLocale.TipReceiveSuccess }));
                        // window.openWithHash(PathConfig.ReceiveTask);
                        topThis.loadData();
                    } else {
                        AkNotification.warning({
                            message: formatMessage({ id: CommonLocationLocale.Tip }),
                            description: data.Message
                        })
                        topThis.setState({ loading: false });
                    }
                    AkGlobal.store.dispatch(TaskAction.requestTaskCount());
                });
            },
            onCancel() { }
        });
    }
    renderSearch() {
        let { taskRequest } = this.state;
        const { formatMessage } = AkGlobal.intl;
        return <AkRow type="flex" justify="end" align="middle">
            <AkCol xs={10} lg={5}>
                <AkInput
                    allowClear={true}
                    value={taskRequest.flowNo}
                    onChange={value => {
                        taskRequest.flowNo = value;
                        this.setState({ taskRequest });
                    }}
                    onPressEnter={() => {
                        taskRequest.pageIndex = 1;
                        this.loadData();
                    }}
                    placeholder={formatMessage({ id: ReciveTaskPageLocale.InputProcessID })}></AkInput>
            </AkCol>
            <AkCol xs={10} lg={5}>
                <AkInput
                    allowClear={true}
                    value={taskRequest.flowName}
                    onChange={value => {
                        taskRequest.flowName = value;
                        this.setState({ taskRequest });
                    }}
                    onPressEnter={() => {
                        taskRequest.pageIndex = 1;
                        this.loadData();
                    }}
                    placeholder={formatMessage({ id: ReciveTaskPageLocale.InputProcessName })}></AkInput>
            </AkCol>
            <AkCol xs={0} lg={5}>
                <AkIdentityPicker
                    multiple={false}
                    value={taskRequest.applicantID}
                    placeholder={formatMessage({ id: ReciveTaskPageLocale.InputProposer })}
                    onChange={(v) => {
                        let value = v as AkIdentity;
                        taskRequest.applicantID = value
                            ? value.ID
                            : "0";
                        this.setState({ taskRequest });
                    }} />
            </AkCol>
            <AkCol xs={4} lg={1}>
                <AkButton
                    icon="search"
                    onClick={() => {
                        taskRequest.pageIndex = 1;
                        this.loadData();
                    }}></AkButton>
            </AkCol>
        </AkRow>;
    }

    //手机端 关闭搜索框
    onCloseSearch() {
        const { taskRequest } = this.state;
        if (taskRequest.flowNo || taskRequest.flowName) {
            taskRequest.flowNo = "";
            taskRequest.flowName = "";
            taskRequest.pageIndex = 1;
            taskRequest.pageSize = 20;
            this.loadData();
        }
    }

    render() {
        let topThis = this;
        return <MainContent
            Header={ReciveTaskPageLocale.PropsHeaderTitle}
            Search={this.renderSearch()}
            onReload={() => topThis.onCloseSearch()}>
            <TaskTable
                pagination={{
                    total: this.state.totalCount,
                    pageSize: 20,
                    current: Number(topThis.state.taskRequest.pageIndex),
                    onChange: (current) => {
                        topThis.state.taskRequest.pageIndex = current;
                        topThis.loadData();
                        AkUtil.ScrollToTop();
                    }
                }}
                rowKey="TaskID"
                loading={this.state.loading}
                columns={topThis.columns}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>;
    }
}
class ReceiveTaskStyle {
    static leftHeaderStyle: React.CSSProperties = {
        fontSize: '18px',
        marginLeft: '20px'
    };
}

export default injectIntl(withRouter(ReceiveTask));
