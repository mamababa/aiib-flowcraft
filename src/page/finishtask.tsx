import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import {
    AkTable,
    AkColumnProps,
    AkRow,
    AkCol,
    AkInput,
    AkButton,
    AkIdentityPicker,
    AkIdentity,
    AkUtil,
    AkAvatar,
    AkDateLabel,

} from "akmii-yeeoffice-common";
import { FinishTaskPageLocale } from "../locales/localeid";
import { TaskAPI, TaskOutcomeLocale } from "../api/task";
import { MainContent } from "./components/maincontent";
import { FlowcraftCommon } from "../util/common";
import { AkColumnLayout } from "akmii-yeeoffice-common/lib/components/controls/ak-table";
import { PathConfig } from "../config/pathconfig";
import { RouterProps, AkGlobal } from 'akmii-yeeoffice-common';

class TaskTable extends AkTable<TaskModel> {
}
interface TaskAkColumn extends AkColumnProps<TaskModel> {
}

interface FinishTaskProps extends RouterProps {
    onChangePage?: (type?: PageType) => void;
}
interface FinishTaskStates {
    totalCount?: number;
    taskData?: TaskModel[];
    loading?: boolean;
    search?: boolean;
    taskRequest?: GetTaskRequest;
}

/** 已办任务列表 */
@withRouter
export default class FinishTask extends Component<FinishTaskProps,
FinishTaskStates> {
    columns: TaskAkColumn[];
    /** 消息格式化 */
    format = AkGlobal.intl.formatMessage;
    constructor(props, context) {
        super(props, context);

        this.columns = [
            // {
            //     title: this.format({ id: FinishTaskPageLocale.ColumnProcessID }),
            //     key: FinishTaskPageLocale.ColumnProcessID,
            //     layout: AkColumnLayout.LeftTop,
            //     dataIndex: "FlowNo",
            //     render: (txt, record, index) => {
            //         if (record.TaskURL.startsWith("FormDesigner:")) {
            //             return <Link to={{
            //                 pathname: PathConfig.FormDisplay,
            //                 query: {
            //                     "pageid": record.TaskURL,
            //                     "taskid": record.TaskID,
            //                     "instid": record.ProcInstID
            //                 }
            //             }}>
            //                 {txt}
            //             </Link>;
            //         }
            //         return <a href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}&disableapprove=true`}>{txt}</a>;
            //     }
            // },
            {
                title: this.format({ id: FinishTaskPageLocale.ColumnTaskName }),
                key: FinishTaskPageLocale.ColumnTaskName,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "Name",
                render: (txt, record) => {
                    if (record.TaskURL.startsWith("FormDesigner:")) {
                        return <Link to={{
                            pathname: PathConfig.FormDisplay,
                            query: {
                                pageid: record.TaskURL,
                                taskid: record.TaskID,
                                instid: record.ProcInstID,
                                delegateurl: "/completed",
                                pageIndex: this.state.taskRequest.pageIndex
                            }
                        }}>
                            {txt}
                        </Link>;
                    }
                    return <a href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}&disableapprove=true`}>{txt}</a>;
                }
            }, {
                title: this.format({ id: FinishTaskPageLocale.ColumnProcessName }),
                key: FinishTaskPageLocale.ColumnProcessName,
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "ProcDefName"
            }, {
                title: this.format({ id: FinishTaskPageLocale.ColumnProcessCreateBy }),
                key: FinishTaskPageLocale.ColumnProcessCreateBy,
                layout: AkColumnLayout.RightTop,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: this.format({ id: FinishTaskPageLocale.ColumnProcessCreated }),
                key: FinishTaskPageLocale.ColumnProcessCreated,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "CreatedStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: this.format({ id: FinishTaskPageLocale.ColumnProcessEndTime }),
                key: FinishTaskPageLocale.ColumnProcessEndTime,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "EndTimeStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: this.format({ id: FinishTaskPageLocale.ColumnTaskOutcome }),
                key: FinishTaskPageLocale.ColumnTaskOutcome,
                layout: AkColumnLayout.RightBottom,
                dataIndex: "Outcome",
                render: (text, record) => {
                    let texts = text === "Revoked" ? "Cancelled" : text;
                    return record.Outcome
                        ? this.format({
                            id: TaskOutcomeLocale + texts
                        })
                        : null;
                }
            }
        ];
        this.state = {
            taskData: [],
            taskRequest: {
                type: PageType.finishTask,
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

    /**
     * 加载全部流程数据
     */
    loadData() {
        var request = this.state.taskRequest;
        //{type: "2", pageIndex: "1", pageSize: "20"}
        request.type = 2;
        this.setState({ loading: true, taskRequest: request });
        TaskAPI
            .getTask(this.state.taskRequest)
            .then(data => {
                this.setState({ loading: false, totalCount: data.TotalCount, taskData: data.Data });
            });
        this.props.router.push({ pathname: PathConfig.FinishTask, query: this.state.taskRequest });
    }
    /**修改页面渲染内容 */
    // changeContent(type: "waiting" | "delegate") {
    //     this.setState({ context: type });
    // }
    /**Search*/
    renderSearch() {
        let { taskRequest } = this.state;
        return <AkRow className='ak-tab-actions'>
            <AkCol span={12}>
                <AkRow>
                    <AkCol span={8}>
                        <AkInput
                            allowClear={true}
                            value={taskRequest.flowName}
                            onChange={(value) => {
                                taskRequest.flowName = value;
                                this.setState({ taskRequest });
                            }}
                            onPressEnter={() => {
                                taskRequest.pageIndex = 1;
                                this.loadData();
                            }}
                            placeholder={this.format({ id: FinishTaskPageLocale.SearchInputProcessName })}></AkInput>
                    </AkCol>
                    <AkCol span={8}>
                        <AkIdentityPicker
                            multiple={false}
                            value={taskRequest.applicantID}
                            placeholder={this.format({ id: FinishTaskPageLocale.SearchInputCreateBy })}
                            onChange={(v) => {
                                let value = v as AkIdentity;
                                taskRequest.applicantID = value
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
                                this.setState({ taskRequest });
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
            <AkButton className='aiib-actions-button active'>Assigned To Me</AkButton>
            <AkButton className='aiib-actions-button' onClick={() => {
                this.props.onChangePage && this.props.onChangePage(PageType.finishDelegates);
            }}>Alternate Tasks</AkButton>
        </div>;
    }
    renderHeader() {
        // const { context } = this.state;
        // return <AkRow type="flex" gutter={2}>
        //     <AkCol>{this.format({ id: FinishTaskPageLocale.HeaderTitle})}</AkCol>
        //     <AkCol>
        //         <AkIcon type="swap" style={WaitintTaskStyle.translateStyle} onClick={() => {
        //             // this.changeContent("delegate");
        //             this.props.onChangePage && this.props.onChangePage(PageType.finishDelegates);
        //         }}></AkIcon>
        //     </AkCol>
        // </AkRow>
        return <div>
            <span>Workflow Center</span> / <span>Completed Tasks</span>
        </div>
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
        // const { context, taskRequest } = topThis.state;
        // if (context === "delegate") {
        //     return <MyDelegatesPage isCompleted={true} flowNo={taskRequest.flowNo} flowName={taskRequest.flowName} assigneeID={taskRequest.applicantID} onChange={() => topThis.changeContent("waiting")}></MyDelegatesPage>;
        // }

        return <MainContent
            Header={topThis.renderHeader()}
            onReload={() => this.onCloseSearch()}>
            <div className="aiib-content">
                {topThis.renderButton()}
                {topThis.renderSearch()}
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
                    rowKey="TaskID"
                    columns={this.columns}
                    loading={this.state.loading}
                    dataSource={this.state.taskData} />
            </div>
        </MainContent>;
    }
}
