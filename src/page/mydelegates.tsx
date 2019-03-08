import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import {
    IntlProps,
    AkTable,
    AkColumnProps,
    AkRow,
    AkCol,
    AkInput,
    AkModal,
    AkNotification,
    AkMenu,
    AkIcon,
    AkDropDown,
    AkIdentityPicker,
    AkIdentity,
    AkGlobal,
    CommonLocale,
    AkColumnLayout,
    AkDateLabel,
    AkAvatar,
    AkButton,
    AkUtil,
    ApplyContentLocale
} from "akmii-yeeoffice-common";
import { CommonLocationLocale, MyDelegatedLocal, WaitingTaskPageLocale, ProcessInstItemPageLocale, ActivityTaskPageLocale, FinishTaskPageLocale } from '../locales/localeid';
import { DelegatesAPI } from "../api/delegate";
import { MainContent } from "./components/maincontent";
import { FlowcraftCommon } from "../util/common";
import * as moment from "moment";
import { AkMessage } from 'akmii-yeeoffice-common';
import { PathConfig } from "../config/pathconfig";
import { TaskAPI, TaskOutcomeLocale } from '../api/task';
import { RouterProps } from 'akmii-yeeoffice-common';

class DelegateTable extends AkTable<OwnerTaskModel> { }
interface DelegateAkColumn extends AkColumnProps<OwnerTaskModel> { }

/** 我委托的*/
interface MyDelegatesProps extends RouterProps, IntlProps {
    flowNo?: string;
    flowName?: string;
    assigneeID?: string;
    onChange?: (type?: PageType) => void;
    /**待办为false,已办为true */
    isCompleted?: boolean;
}
interface MyDelegatesStates {
    totalCount?: number;
    delegateData?: OwnerTaskModel[];
    loading?: boolean;
    visible?: boolean;
    /**选人数据信息 */
    directValue?: AkIdentity;
    taskRequest?: GetTaskRequest;
}
@withRouter
export class MyDelegatesPage extends Component<MyDelegatesProps,
MyDelegatesStates> {
    columns: DelegateAkColumn[];
    pageSize: number;
    changeRequest?: TaskChangeRequest;
    itemInfo?: OwnerTaskModel;

    constructor(props, context) {
        super(props, context);
        const { formatMessage } = AkGlobal.intl;
        this.pageSize = 20;
        this.columns = [
            // {
            //     title: formatMessage({ id: WaitingTaskPageLocale.ColumnProcessID }),
            //     key: WaitingTaskPageLocale.ColumnProcessID,
            //     layout: AkColumnLayout.LeftTop,
            //     sorter: true,
            //     dataIndex: "FlowNo",
            //     render: (txt, record, index) => {
            //         if (record.TaskURL.startsWith("FormDesigner:")) {
            //             return <Link to={{
            //                 pathname: PathConfig.FormDisplay,
            //                 query: {
            //                     "pageid": record.TaskURL,
            //                     "taskid": record.TaskID,
            //                     "instid": record.ProcInstID,
            //                     "owner":true
            //                 }
            //             }}>{txt}</Link>;
            //         }
            //         return <a href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}&owner=true`}>{txt}</a>;
            //     }
            // },
            {
                title: formatMessage({ id: WaitingTaskPageLocale.ColumnProcessName }),
                key: WaitingTaskPageLocale.ColumnProcessName,
                // layout: AkColumnLayout.RightTop,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "Name",
                render: (txt, record) => {
                    if (record.TaskURL.startsWith("FormDesigner:")) {
                        return <Link to={{
                            pathname: PathConfig.FormDisplay,
                            query: {
                                pageid: record.TaskURL,
                                taskid: record.TaskID,
                                instid: record.ProcInstID
                            }
                        }}>{txt}</Link>;
                    }
                    return <a href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}`}></a>;
                }
            }, {
                title: formatMessage({ id: WaitingTaskPageLocale.ColumnName }),
                layout: AkColumnLayout.LeftBottom,
                key: WaitingTaskPageLocale.ColumnName,
                dataIndex: "ProcDefName"
            }, {
                title: formatMessage({ id: ProcessInstItemPageLocale.ColumnAlternateAgent }),
                layout: AkColumnLayout.RightBottom,
                key: ProcessInstItemPageLocale.ColumnAlternateAgent,
                // dataIndex: "DelegateID",
                dataIndex: "AssigneeID",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: formatMessage({ id: WaitingTaskPageLocale.ColumnProcessCreateBy }),
                key: WaitingTaskPageLocale.ColumnProcessCreateBy,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: formatMessage({ id: WaitingTaskPageLocale.ColumnProcessCreateted }),
                key: WaitingTaskPageLocale.ColumnProcessCreateted,
                dataIndex: "CreatedStr",
                layout: AkColumnLayout.RightTop,
                sorter: true,
                // hidden: FlowcraftCommon.minSM
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: formatMessage({ id: FinishTaskPageLocale.ColumnProcessEndTime }),
                key: FinishTaskPageLocale.ColumnProcessEndTime,
                dataIndex: "EndTimeStr",
                hidden: !this.props.isCompleted || FlowcraftCommon.minSM,
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: formatMessage({ id: WaitingTaskPageLocale.ColumnProcessDuedate }),
                key: WaitingTaskPageLocale.ColumnProcessDuedate,
                layout: AkColumnLayout.RightBottom,
                hidden: this.props.isCompleted,
                dataIndex: "DueDateStr",
                render: (txt, record) => {
                    let now = moment();
                    let dueDate = moment(txt);
                    return dueDate < now
                        ? <AkDateLabel style={{ color: "red" }} value={txt} format="MM-DD-YYYY HH:mm" />
                        : <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: formatMessage({ id: FinishTaskPageLocale.ColumnTaskOutcome }),
                key: FinishTaskPageLocale.ColumnTaskOutcome,
                layout: AkColumnLayout.RightBottom,
                dataIndex: "Outcome",
                hidden: !this.props.isCompleted,
                render: (text, record) => {
                    let texts = text === "Revoked" ? "Cancelled" : text;
                    return record.Outcome
                        ? formatMessage({
                            id: TaskOutcomeLocale + texts
                        })
                        : null;
                }
            }
            // {
            //     title: "",
            //     key: "",
            //     dataIndex: "",
            //     className: "ak_align_r",
            //     render: (txt, record) => {
            //         let akmenu = <AkMenu>
            //             <AkMenu.Item>
            //                 <a onClick={() => {
            //                     this.itemInfo = record;
            //                     this.setState({ visible: true });
            //                 }}>
            //                     <AkIcon type="edit"></AkIcon>
            //                     <FormattedMessage id={ActivityTaskPageLocale.OperationForward}></FormattedMessage>
            //                 </a>
            //             </AkMenu.Item>
            //         </AkMenu>
            //         return <AkDropDown trigger={['click']} overlay={akmenu}>
            //             <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
            //         </AkDropDown>
            //     }
            // }
        ];
        this.state = {
            directValue: null,
            delegateData: [],
            taskRequest: {
                type: PageType.waittingDelegates,
                pageIndex: 1,
                pageSize: this.pageSize,
                assigneeID: this.props.assigneeID || "0",
                isCompleted: this.props.isCompleted,
            }
        };
    }
    componentDidMount() {
        let { taskRequest } = this.state;
        let { query } = this.props.location;
        if (query) {
            for (let key in query) {
                taskRequest[key] = query[key];
            }
            this.setState({ taskRequest }, () => {
                this.loadData();
            });
        }
    }
    /**加载全部数据*/
    loadData() {
        const { formatMessage } = AkGlobal.intl;
        this.setState({ loading: true });
        DelegatesAPI.getOwnerDelegateList(this.state.taskRequest).then(data => {
            if (data.Status === 0) {
                this.setState({ loading: false, totalCount: data.TotalCount, delegateData: data.Data });
            } else {
                AkNotification.warning({
                    message: formatMessage({ id: CommonLocationLocale.Tip }),
                    description: data.Message
                });
                this.setState({ loading: false });
            }
            if (this.props.isCompleted) {
                this.props.router.push({ pathname: PathConfig.FinishTask, query: this.state.taskRequest });
            } else {
                this.props.router.push({ pathname: PathConfig.WaitingTask, query: this.state.taskRequest });
            }

        });
    }
    //手机端 关闭搜索框
    onCloseSearch() {
        const { taskRequest } = this.state;
        if (taskRequest.flowNo || taskRequest.flowName) {
            taskRequest.flowNo = "";
            taskRequest.flowName = "";
            taskRequest.pageIndex = 1;
            taskRequest.pageSize = this.pageSize;
            this.loadData();
        }
    }
    /**转让 */
    OperationForward() {
        let topThis = this;
        let format = AkGlobal.intl.formatMessage;
        let newAssignee = topThis.state.directValue;
        if (!newAssignee) {
            AkNotification.warning({
                message: format({ id: CommonLocationLocale.Tip }),
                description: format({ id: ActivityTaskPageLocale.TipChooseAssignee })
            });
            return;
        }
        if (newAssignee.ID === topThis.itemInfo.AssigneeID) {
            this.setState({ directValue: null });
            return AkNotification.warning({
                message: format({ id: CommonLocale.Tip }),
                description: format({ id: MyDelegatedLocal.TipAssigneeNotMe })
            })
        }
        topThis.changeRequest = {
            TaskID: topThis.itemInfo.TaskID,
            AssigneeID: (newAssignee.ID)
        };
        AkModal.confirm({
            title: AkGlobal.intl.formatMessage({ id: CommonLocationLocale.Tip }),
            content: format({ id: ProcessInstItemPageLocale.TipReassignedTo }, { name: newAssignee.Name }),
            onOk() {
                TaskAPI.changeTask(topThis.changeRequest).then((data: AkResponse) => {
                    if (data.Status === 0) {
                        AkMessage.success(format({ id: ProcessInstItemPageLocale.TipTransferSuccess }));
                        topThis.setState({ visible: false });
                    } else {
                        AkNotification.warning({
                            message: format({ id: CommonLocationLocale.Tip }),
                            description: data.Message
                        });
                    }
                    topThis.loadData();
                });
            },
            onCancel() {
            }
        });
    }
    /**排序*/
    sortData(filed, order) {
        if (filed === "FlowNo") {
            this.state.taskRequest.orderbyIndex = order === "ascend"
                ? TaskRuntimeOrderByEnum.FlowNoUp
                : TaskRuntimeOrderByEnum.FlowNoDown;
        } else {
            this.state.taskRequest.orderbyIndex = order === "ascend"
                ? TaskRuntimeOrderByEnum.CreatedUp
                : TaskRuntimeOrderByEnum.CreatedDown;
        }
        this.state.taskRequest.pageIndex = 1;
        this.loadData();
    }
    renderSearch() {
        let { taskRequest } = this.state;
        const format = AkGlobal.intl.formatMessage;
        return <AkRow className='ak-tab-actions'>
            <AkCol span={12}>
                <AkRow>
                    <AkCol span={8}>
                        <AkInput
                            allowClear={true}
                            onChange={value => {
                                taskRequest.flowName = value;
                                this.setState({ taskRequest });
                            }}
                            value={taskRequest.flowName}
                            onPressEnter={() => {
                                taskRequest.pageIndex = 1;
                                this.loadData();
                            }}
                            placeholder={format({ id: WaitingTaskPageLocale.SearchInputName })} />
                    </AkCol>
                    <AkCol span={8}>
                        <AkIdentityPicker
                            multiple={false}
                            value={taskRequest.assigneeID}
                            placeholder={format({ id: WaitingTaskPageLocale.SearchInputCreatedBy })}
                            onChange={(v) => {
                                let value = v as AkIdentity;
                                taskRequest.assigneeID = value
                                    ? value.ID
                                    : "0";
                                this.setState({ taskRequest });
                            }} />
                    </AkCol>
                    <AkCol span={8}>
                        <AkButton
                            icon="search"
                            onClick={() => {
                                taskRequest.pageIndex = 1;
                                this.loadData();
                            }}></AkButton>
                    </AkCol>
                </AkRow>
            </AkCol>
            <AkCol span={12}>

            </AkCol>
        </AkRow>;
    }
    renderButton() {
        return <div className='ak-tab-actions'>
            <AkButton className='aiib-actions-button' onClick={() => {
                this.props.onChange(this.props.isCompleted ? PageType.finishTask : PageType.waittingTask);
            }}>Assigned To Me</AkButton>
            <AkButton className='aiib-actions-button active'>Alternate Tasks</AkButton>
        </div>;
    }
    renderHeader() {
        // let format=AkGlobal.intl.formatMessage;
        // return <AkRow type="flex" gutter={2}>
        //     <AkCol>{format({ id: MyDelegatedLocal.MyDelegate })}</AkCol>
        //     <AkCol>
        //         <AkIcon type="swap" style={WaitintTaskStyle.translateStyle} onClick={() => {
        //             this.props.onChange(this.props.isCompleted ? PageType.finishTask: PageType.waittingTask);
        //         }}></AkIcon>
        //     </AkCol>
        // </AkRow>
        return <div>
            <span>Workflow Center</span> / <span>My Alternate</span>
        </div>;
    }
    /**选择转办人 Modal*/
    renderForwardModal() {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        return topThis.state.visible
            ? <AkModal
                maskClosable={false}
                visible={this.state.visible}
                onCancel={() => {
                    topThis.setState({ visible: false, directValue: null });
                }}
                onOk={() => {
                    topThis.OperationForward();
                }}
                title={formatMessage({ id: ApplyContentLocale.ButtonForward })}>
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

    render() {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        const { loading, delegateData } = topThis.state;

        return <MainContent
            Header={topThis.renderHeader()}
            onReload={() => topThis.onCloseSearch()}>
            <div className="aiib-content">
                {topThis.renderButton()}
                {topThis.renderSearch()}
                <DelegateTable
                    pagination={{
                        total: this.state.totalCount,
                        pageSize: this.pageSize,
                        current: Number(this.state.taskRequest.pageIndex),
                        onChange: (current) => {
                            topThis.state.taskRequest.pageIndex = current;
                            topThis.loadData();
                            AkUtil.ScrollToTop();
                        }
                    }}
                    onChange={(pagination, filters, sorter) => {
                        let field = sorter["field"];
                        let order = sorter["order"];
                        if (field) {
                            topThis.sortData(field, order);
                        }
                    }}
                    rowKey="TaskID"
                    columns={topThis.columns}
                    loading={loading}
                    dataSource={delegateData}>
                </DelegateTable>
            </div>
            {topThis.renderForwardModal()}
        </MainContent>;
    }
}
class MyDelegatesPageStyle { }
