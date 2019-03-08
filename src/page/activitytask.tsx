import * as React from "react";
import { Component } from "react";
import { withRouter, Link, RouteComponentProps } from "react-router";
import {
    IntlProps,
    AkIdentityPicker,
    AkIdentity,
    AkTable,
    AkColumnProps,
    AkDatePicker,
    AkInput,
    AkIcon,
    AkNotification,
    AkRow,
    AkCol,
    AkButton,
    AkModal,
    CommonLocale,
    AkMenu,
    AkDropDown,
    AkGlobal,
    AkUtil,
    AkColumnLayout,
    AkSelect,
    AkDateLabel,
    AkAvatar,
    AkDatetimeUtil,
    AkMessage,
    ApplyContentLocale,
    AkHtml
} from "akmii-yeeoffice-common";
import { injectIntl, FormattedMessage } from "react-intl";
import {
    ActivityTaskPageLocale,
    NavLocale,
    CommonLocationLocale,
    ProcessInstItemPageLocale
} from "../locales/localeid";
import { TaskAPI, disableAssigned } from "../api/task";
import * as moment from "moment";
import { PathConfig } from "../config/pathconfig";
import { FlowcraftCommon } from "../util/common";
import { MainContent } from './components/maincontent';
import { ProjectAPI } from "../api/aiibworkflow/project";
import { isNullOrUndefined } from "util";

class TaskTable extends AkTable<TaskModel> {
}
interface TaskAkColumn extends AkColumnProps<TaskModel> {
}

interface ActivityTaskPageProps extends IntlProps, RouteComponentProps<any, any> {
}
interface ActivityTaskPageStates {
    loading?: boolean;
    taskData?: TaskModel[];
    taskRequest?: GetAdminTaskRequest;
    /**督办 */
    warnTaskRequest?: TaskWarnRequest;
    /**批量督办 */
    warnTaskListRequest?: TaskWarnBatchRequest;
    /**普通搜索 */
    normalSearch?: boolean;
    /**高级搜索 */
    advSearch?: boolean;
    /**批量操作 */
    batchOperation?: boolean;
    /**显示转办人 */
    showForwardModal?: boolean;
    /**表 总行数 */
    totalCount?: number;
    /**选人数据信息 */
    directValue?: AkIdentity;
    /**批量选择 */
    selectedRowKeys?: string[];
    /**批量选择的数据*/
    selectedRows?: TaskModel[];
    /** 是否在 ReadOnly組中*/
    isReadOnly?:boolean;
}
@withRouter
/** 流程任务页面 */
class ActivityTaskPage extends Component<ActivityTaskPageProps,
ActivityTaskPageStates> {
    columns: TaskAkColumn[];
    /**转办 */
    changeTaskAssigneeRequest?: TaskChangeRequest;
    /**批量转办 */
    changeTaskAssigneeListRequest?: TaskChangeBatchRequest;
    /**消息格式化 */
    format = this.props.intl.formatMessage;

    constructor(props, context) {
        super(props, context);

        this.state = {
            taskRequest: {
                type: TaskStatus.Pending + "",
                pageSize: 20
            },
            warnTaskRequest: {
                TaskID: "0"
            },
            warnTaskListRequest: {
                TaskIDs: []
            },
            normalSearch: true,
            selectedRowKeys: [],
            selectedRows: [],
            isReadOnly:false
        };
        this.columns = [
            {
                title: this.format({ id: ActivityTaskPageLocale.ColumnTaskName }),
                key: ActivityTaskPageLocale.ColumnTaskName,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "Name",
                render: (txt, record) => {
                    return <AkHtml>{txt}</AkHtml>
                }
            }, {
                title: this.format({ id: ActivityTaskPageLocale.ColumnCreatedBy }),
                key: ActivityTaskPageLocale.ColumnCreatedBy,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: this.format({ id: ActivityTaskPageLocale.ColumnAssigneeName }),
                key: ActivityTaskPageLocale.ColumnAssigneeName,
                dataIndex: "AssigneeID",
                layout: AkColumnLayout.RightTop,
                render: (txt, record) => {
                    if (txt != "0") {
                        return <AkAvatar value={txt} type="text" />;
                    } else {
                        return null;
                    }
                }
            }, {
                title: this.format({ id: ActivityTaskPageLocale.ColumnProcName }),
                key: ActivityTaskPageLocale.ColumnProcName,
                dataIndex: "ProcDefName",
                layout: AkColumnLayout.LeftBottom,
                // hidden: FlowcraftCommon.minSM,
            }, {
                title: this.format({ id: ActivityTaskPageLocale.ColumnCreated }),
                key: ActivityTaskPageLocale.ColumnCreated,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "CreatedStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: this.format({ id: ActivityTaskPageLocale.ColumnDueDate }),
                key: ActivityTaskPageLocale.ColumnDueDate,
                dataIndex: "DueDateStr",
                layout: AkColumnLayout.RightBottom,
                render: (txt, record) => {
                    let now = moment();
                    let dueDate = moment(txt);
                    return dueDate < now
                        ? <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" style={{ color: "red" }} />
                        : moment(txt).format("MM-DD-YYYY HH:mm");
                }
            }, {
                key: ActivityTaskPageLocale.ColumnOperation,
                className: "ak_align_r",
                render: (text, record, index) => {
                    if (this.state.isReadOnly || record.AssigneeID ===  "0") {
                        return null;
                    }
                    let menuChild = <AkMenu>
                        <AkMenu.Item>
                            <a onClick={() => {
                                this.changeTaskAssigneeRequest = {
                                    TaskID: (record.TaskID),
                                    AssigneeID: record.AssigneeID
                                };
                                // 413 流程中心-点击任务单号后的操作按钮中的转办，提示“请选择操作记录行”
                                this.setState({ showForwardModal: true, selectedRowKeys: [record.TaskID] });
                            }}>
                                <AkIcon type="export"></AkIcon>
                                <FormattedMessage id={ActivityTaskPageLocale.OperationForward}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                    </AkMenu>;
                    let canAssigned = (record.ActivityID !== disableAssigned);
                    return canAssigned ? <div onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}><AkDropDown trigger={['click']} overlay={menuChild}>
                            <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
                        </AkDropDown></div> : null;
                }
            }
        ];
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
        ProjectAPI.getUserGroups({ userID: "" }).then(d=> {
            if(d.Status === 0) {
                const userGrops = d.Data.filter(item => item && item.Ext1 === "UserGroup");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
               this.setState({isReadOnly:!isNullOrUndefined(isReadOnly)});
            }
        });
    }

    loadData() {
        let endDate = this.state.taskRequest.endTimeStr;
        if (endDate) {
            endDate = moment(endDate).add(1, "day").format("YYYY-MM-DD HH:mm:ss");
        }
        this.state.taskRequest.type = this.state.taskRequest.type ? this.state.taskRequest.type : TaskStatus.Pending + "";
        this.setState({ loading: true });
        TaskAPI
            .getAdminTask(this.state.taskRequest)
            .then(data => {
                if (data.Status === 0) {
                    this.setState({
                        loading: false,
                        taskData: data.Data,
                        totalCount: data.TotalCount,
                        directValue: null
                    });
                } else {
                    this.setState({ loading: false });
                }
            });
        this.props.router.push({ pathname: PathConfig.ActivityTask, query: this.state.taskRequest });
    }

    /**转让 */
    OperationForward() {
        let topThis = this;
        let newAssignee = topThis.state.directValue;
        if (!newAssignee) {
            AkNotification.warning({
                message: topThis.format({ id: CommonLocationLocale.Tip }),
                description: topThis.format({ id: ActivityTaskPageLocale.TipChooseAssignee })
            });
            return;
        }
        if (newAssignee.ID === topThis.changeTaskAssigneeRequest.AssigneeID) {
            this.setState({ directValue: null });
            return AkNotification.warning({
                message: topThis.format({ id: CommonLocale.Tip }),
                description: topThis.format({ id: ActivityTaskPageLocale.TipTransfereesNotManagers }),//412流程中心-活动任务连续转办时转办人可是经办人
            })
        }

        AkModal.confirm({
            title: AkGlobal.intl.formatMessage({ id: CommonLocationLocale.Tip }),
            content: topThis.format({ id: ProcessInstItemPageLocale.TipReassignedTo }, { name: newAssignee.Name }),
            onOk() {
                topThis.changeTaskAssigneeRequest = {
                    TaskID: (topThis.changeTaskAssigneeRequest.TaskID),
                    AssigneeID: (newAssignee.ID)
                };
                TaskAPI.adminPutChangeTaskAssignee(topThis.changeTaskAssigneeRequest).then((data: AkResponse) => {
                    if (data.Status === 0) {
                        AkMessage.success(topThis.format({ id: ProcessInstItemPageLocale.TipTransferSuccess }));
                        topThis.changeTaskAssigneeRequest = {
                            TaskID: topThis.changeTaskAssigneeRequest.TaskID,
                            AssigneeID: (newAssignee.ID)
                        };
                        topThis.setState({ showForwardModal: false });
                    } else {
                        AkNotification.warning({
                            message: topThis.format({ id: CommonLocationLocale.Tip }),
                            description: data.Message // this.format({ id: ProcessInstItemPageLocale.TipTransferFail })
                        });
                    }
                    topThis.loadData();
                });
            },
            onCancel() {
            }
        });
    }

    /**批量转办 */
    OperationForwardList() {
        let topThis = this;
        const { state: { selectedRowKeys, selectedRows, directValue } } = topThis;
        let request = topThis.changeTaskAssigneeRequest;

        if (selectedRowKeys && selectedRowKeys.length > 0) {
            if (!directValue) {
                AkNotification.warning({
                    message: topThis.format({ id: CommonLocationLocale.Tip }),
                    description: topThis.format({ id: ActivityTaskPageLocale.TipChooseAssignee })
                });
                return;
            }
            /** Bug 40117: 流程中心-活动任务-批量操作时可设置转办人为本人(同一人)*/
            if (selectedRows.findIndex(row => row.AssigneeID === directValue.ID) !== -1) {
                AkNotification.warning({
                    message: topThis.format({ id: CommonLocationLocale.Tip }),
                    description: topThis.format({ id: ActivityTaskPageLocale.TipTransfereesNotManagers })
                });
                return;
            }
            //436 流程中心-活动任务批量操作时，使用流程后菜单内的转办可转办人是经办人
            if (request && request.AssigneeID === directValue.ID) {
                AkNotification.warning({
                    message: topThis.format({ id: CommonLocationLocale.Tip }),
                    description: topThis.format({ id: ActivityTaskPageLocale.TipTransfereesNotManagers })
                });
                return;
            }

            topThis.changeTaskAssigneeListRequest = {
                TaskIDs: selectedRowKeys,
                AssigneeID: (directValue.ID)
            };
            AkModal.confirm({
                title: AkGlobal.intl.formatMessage({ id: CommonLocationLocale.Tip }),
                content: topThis.format({ id: ProcessInstItemPageLocale.TipReassignedTo }, { name: directValue.Name }),
                onOk() {
                    TaskAPI
                        .adminPutChangeTaskAssigneeList(topThis.changeTaskAssigneeListRequest)
                        .then(data => {
                            if (data.Status === 0) {
                                AkMessage.success(topThis.format({ id: ActivityTaskPageLocale.TipTransferSuccess }));
                                topThis.setState({ showForwardModal: false });
                                selectedRows.map(item => item.AssigneeID = directValue.ID);
                                topThis.loadData();
                            } else {
                                AkNotification.warning({
                                    message: topThis.format({ id: CommonLocationLocale.Tip }),
                                    description: data.Message
                                });
                            }
                        });
                },
                onCancel() {
                }
            });
        } else {
            AkNotification.warning({
                message: topThis.format({ id: CommonLocationLocale.Tip }),
                description: topThis.format({ id: ActivityTaskPageLocale.TipChooseRow })
            });
        }
    }

    /** 批量转办时判断是否显示转办人Modal */
    showForwardModal() {
        let selectRows = this.state.selectedRowKeys;
        if (selectRows && selectRows.length > 0) {
            this.setState({ showForwardModal: true });
        } else {
            AkNotification.warning({
                message: this.format({ id: CommonLocationLocale.Tip }),
                description: this.format({ id: ActivityTaskPageLocale.TipChooseRow })
            });
        }
    }

    /** 批量转办时获取选择行的Key */
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }

    /**顶部普通搜索 Row*/
    renderSearch() {
        const { formatMessage } = AkGlobal.intl;
        let { taskRequest } = this.state;
        let searchButton = <AkIcon
            className="cursor"
            type="search"
            onClick={() => {
                taskRequest.pageIndex = 1;
                this.loadData();
            }}></AkIcon>;

        return this.state.normalSearch
            ? <AkRow type="flex" justify="end" align="middle" gutter={2} key="normalSearch">
                <AkCol lg={11}></AkCol>
                <AkCol lg={3}>
                    <AkSelect
                        defaultValue={TaskStatus.Pending + ""}
                        value={taskRequest.type}
                        onChange={(value) => {
                            taskRequest.type = value + "";
                            taskRequest.pageIndex = 1;
                            this.setState({ taskRequest });
                            this.loadData();
                        }}
                        placeholder={formatMessage({ id: CommonLocale.Status })}
                        allowClear={false}>
                        <AkSelect.Option key={TaskStatus.Pending} value={TaskStatus.Pending + ""}>
                            {formatMessage({ id: ActivityTaskPageLocale.SearchStuats + TaskStatus.Pending })}
                        </AkSelect.Option>
                        <AkSelect.Option key={TaskStatus.Normal} value={TaskStatus.Normal + ""}>
                            {formatMessage({ id: ActivityTaskPageLocale.SearchStuats + TaskStatus.Normal })}
                        </AkSelect.Option>
                        <AkSelect.Option key={TaskStatus.OverTime} value={TaskStatus.OverTime + ""}>
                            {formatMessage({ id: ActivityTaskPageLocale.SearchStuats + TaskStatus.OverTime })}
                        </AkSelect.Option>
                    </AkSelect>
                </AkCol>
                {
                    this.state.isReadOnly ? null :
                   <AkCol lg={2} style={{ textAlign: "center" }}>
                    <a
                        onClick={() => {
                            this.setState({
                                batchOperation: !this.state.batchOperation,
                                normalSearch: false,
                                selectedRowKeys: []
                            });
                        }}>
                        <FormattedMessage id={ActivityTaskPageLocale.BatchOperation}></FormattedMessage>
                    </a>
                  </AkCol>
                }
                
                {/* {FlowcraftCommon.minXS ? null : <AkCol lg={5} xs={10}>
                    <AkInput
                        addonAfter={searchButton}
                        placeholder={formatMessage({ id: ActivityTaskPageLocale.SearchTaskIDHolder })}
                        onPressEnter={() => {
                            taskRequest.pageIndex = 1;
                            this.loadData();
                        }}
                        allowClear={true}
                        value={taskRequest.flowNo}
                        onChange={(value) => {
                            value = value.replace(/\s/g, '');
                            taskRequest.flowNo = value;
                            this.setState({ taskRequest });
                        }}
                    ></AkInput>
                </AkCol>} */}
                {FlowcraftCommon.minSM ? null : <AkCol lg={4} style={{ textAlign: "center" }}>
                    <a
                        onClick={() => {
                            this.setState({
                                advSearch: !this.state.advSearch,
                                normalSearch: false
                            });
                        }}>
                        <FormattedMessage id={ActivityTaskPageLocale.SearchAdvance}></FormattedMessage>
                    </a>
                </AkCol>}
            </AkRow>
            : null;
    }

    /**高级搜索 Row */
    renderAdvSearch() {
        let topThis = this;
        let { taskRequest } = topThis.state;
        return this.state.advSearch
            ? <AkRow type="flex" justify="end" align="middle">
                <AkCol xs={8} lg={6}>
                    <AkIdentityPicker
                        value={taskRequest.assigneeID}
                        multiple={false}
                        placeholder={this.format({ id: ActivityTaskPageLocale.SearchAssigneeHolder })}
                        onChange={(v) => {
                            let value = v as AkIdentity;
                            taskRequest.assigneeID = value ? value.ID : "0";
                            this.setState({ taskRequest });
                        }} />
                </AkCol>
                <AkCol xs={8} lg={6}>
                    <AkIdentityPicker
                        value={taskRequest.applicantID}
                        multiple={false}
                        placeholder={this.format({ id: ActivityTaskPageLocale.SearchCreatedByHolder })}
                        onChange={(v) => {
                            let value = v as AkIdentity;
                            taskRequest.applicantID = value
                                ? value.ID
                                : "0";
                            this.setState({ taskRequest });
                        }} />
                </AkCol>
                <AkCol xs={0} lg={7}>
                    <AkDatePicker.RangePicker
                        value={taskRequest.startTimeStr
                            ? [
                                moment(taskRequest.startTimeStr),
                                moment(taskRequest.endTimeStr)
                            ]
                            : null}
                        onChange={(dates, datestr) => {
                            taskRequest.startTimeStr = AkDatetimeUtil.toCSTValue(moment(datestr[0]));
                            taskRequest.endTimeStr = AkDatetimeUtil.toCSTValue(moment(datestr[1]));
                            this.setState({ taskRequest });
                        }}></AkDatePicker.RangePicker>
                </AkCol>
                <AkCol xs={3} lg={1} style={{ textAlign: "center" }}>
                    <AkButton icon="search" style={ActivityTaskPageStyle.advSearchStyle}
                        onClick={() => {
                            taskRequest.pageIndex = 1;
                            this.loadData();
                        }}></AkButton>
                </AkCol>
                <AkCol
                    xs={0}
                    lg={1}
                    style={{
                        textAlign: "center"
                    }}>
                    <a
                        onClick={() => {
                            taskRequest.applicantID = null;
                            taskRequest.assigneeID = null;
                            taskRequest.pageIndex = 1;
                            taskRequest.startTimeStr = null;
                            taskRequest.endTimeStr = null;
                            this.setState({ taskRequest });
                        }}>
                        <FormattedMessage id={CommonLocale.Clear}></FormattedMessage>
                    </a>
                </AkCol>
                <AkCol xs={5} lg={1}>
                    <AkButton
                        onClick={() => {
                            // taskRequest.applicantID = null;
                            // taskRequest.assigneeID = null;
                            // taskRequest.startTimeStr = null;
                            // taskRequest.endTimeStr = null;
                            // taskRequest.pageIndex = 1;
                            this.setState({ advSearch: false, normalSearch: true });
                        }}>
                        <FormattedMessage id={CommonLocale.Close}></FormattedMessage>
                    </AkButton>
                </AkCol>
            </AkRow>
            : null;
    }

    /**批量操作 Row*/
    renderBatchOperation() {

        return this.state.batchOperation
            ? <AkRow
                type="flex"
                justify="end"
                align="middle"
                gutter={6}
                className="cursor font14">
                <AkCol>
                    <span onClick={() => this.showForwardModal()}>
                        <AkIcon
                            type="export"
                            style={{
                                fontSize: "14px"
                            }}></AkIcon>
                        <FormattedMessage id={ActivityTaskPageLocale.OperationForward}></FormattedMessage>

                    </span>
                </AkCol>
                <AkCol>
                    <AkButton
                        onClick={() => {
                            this.setState({
                                selectedRowKeys: [],
                                selectedRows: [],
                                batchOperation: !this.state.batchOperation,
                                normalSearch: true
                            });
                        }}>
                        <FormattedMessage id={ActivityTaskPageLocale.OperationClose}></FormattedMessage>
                    </AkButton>
                </AkCol>
            </AkRow>
            : null;
    }

    /**选择转办人 Modal*/
    renderForwardModal() {
        let topThis = this;
        return topThis.state.showForwardModal
            ? <AkModal
                maskClosable={false}
                visible={this.state.showForwardModal}
                onCancel={() => {
                    //451流程中心-活动任务转办人默认出现之前选择过的人
                    topThis.setState({ showForwardModal: false, directValue: null });
                }}
                onOk={() => {
                    if (!topThis.state.batchOperation) {
                        topThis.OperationForward();
                    } else {
                        topThis.OperationForwardList();
                    }
                    {/*topThis.setState({showForwardModal: false});*/ }
                }}
                title={this.format({ id: ApplyContentLocale.ButtonForward })}>
                <AkRow type="flex" justify="end" align="middle" className="mb20">
                    <AkCol span={4}>
                        <FormattedMessage id={ApplyContentLocale.PropsForwardAssignee}></FormattedMessage>
                    </AkCol>
                    <AkCol span={20}>
                        <AkIdentityPicker
                            multiple={false}
                            defaultValue={this.state.directValue}
                            onChange={(v) => {
                                let value = v as AkIdentity;
                                this.setState({ directValue: value });
                            }} />
                    </AkCol>
                </AkRow>
            </AkModal >
            : null;
    }

    //手机端 关闭搜索框
    onCloseSearch() {
        const { taskRequest } = this.state;
        if (taskRequest.flowNo) {
            taskRequest.flowNo = "";
            taskRequest.pageIndex = 1;
            taskRequest.pageSize = 20;
            this.loadData();
        }
    }

    render() {
        let search = null;
        if (this.state.advSearch) {
            search = this.renderAdvSearch();
        } else if (this.state.batchOperation) {
            search = this.renderBatchOperation();
        } else {
            search = this.renderSearch();
        }

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return <MainContent Header={NavLocale.FlowActivityTask} Search={search}
            onReload={() => this.onCloseSearch()}>
            {this.renderForwardModal()}
            <TaskTable
                pagination={{
                    total: this.state.totalCount,
                    pageSize: 20,
                    current: Number(this.state.taskRequest.pageIndex),
                    onChange: (current) => {
                        this.state.taskRequest.pageIndex = current;
                        this.loadData();
                        AkUtil.ScrollToTop();
                    }
                }}
                onRowClick={(record) => {
                    {/*this.props.router.push(
                     {
                     pathname: PathConfig.ProcInstItme,
                     query: {
                     instId: record.ProcInstID
                     }
                     }
                     )*/
                    }
                }}
                rowKey="TaskID"
                rowSelection={this.state.batchOperation ? rowSelection : null}
                loading={this.state.loading}
                columns={this.columns}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>;
    }
}
class ActivityTaskPageStyle {
    static advSearchStyle: React.CSSProperties = {
        cursor: "pointer"
    };
}

export default injectIntl(withRouter(ActivityTaskPage));
