import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { WaitingTaskPageLocale } from "../locales/localeid";
import { TaskAPI } from "../api/task";
import {
    AkTable,
    AkColumnProps,
    AkInput,
    AkCol,
    AkRow,
    AkButton,
    AkIdentityPicker,
    AkIdentity,
    AkGlobal,
    AkUtil,
    AkAvatar,
    AkDateLabel,
    AkHtml,
    AkIcon,
    RouterProps
} from "akmii-yeeoffice-common";
import { MainContent } from "./components/maincontent";
import * as moment from "moment";
import { FlowcraftCommon } from "../util/common";
import { TaskAction } from "../actions/index";
import { AkColumnLayout } from "akmii-yeeoffice-common/lib/components/controls/ak-table";
import { PathConfig } from "../config/pathconfig";
import * as classNames from 'classnames';

class TaskTable extends AkTable<TaskModel> {
}
interface TaskAkColumn extends AkColumnProps<TaskModel> {
}

interface WaitintTaskProps extends RouterProps {
    onChangePage?: (type?: PageType) => void;
    type?: PageType;
}
interface WaitintTaskStates {
    taskData?: TaskModel[];
    loading?: boolean;
    taskRequest?: GetTaskRequest;
    totalCount?: number;
}

/** 待办任务 */
@withRouter
export default class WaitintTask extends Component<WaitintTaskProps,
WaitintTaskStates> {
    columns: TaskAkColumn[];
    /** 消息格式化 */
    format = AkGlobal.intl.formatMessage;
    /** 排序方式 */
    sortUp?: boolean;
    /** pageSize */
    pageSize = 20;

    constructor(props, context) {
        super(props, context);
        this.columns = [
            // {
            //     title: this.format({ id: WaitingTaskPageLocale.ColumnProcessID }),
            //     key: WaitingTaskPageLocale.ColumnProcessID,
            //     dataIndex: "FlowNo",
            //     sorter: true, // a.FlowNo - b.FlowNo,
            //     layout: AkColumnLayout.LeftTop,
            //     render: (txt, record, index) => {
            //         if (record.TaskURL.startsWith("FormDesigner:")) {
            //             return <Link to={{
            //                 pathname: PathConfig.FormDisplay,
            //                 query: {
            //                     "pageid": record.TaskURL,
            //                     "taskid": record.TaskID,
            //                     "instid": record.ProcInstID
            //                 }
            //             }}>{txt}</Link>;
            //         }
            //         return <a
            //             href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}`}>{txt}</a>;
            //     }
            // }, 
            {
                title: this.format({ id: WaitingTaskPageLocale.ColumnProcessName }),
                key: WaitingTaskPageLocale.ColumnProcessName,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "Name",
                render: (txt, record) => {
                    // return <AkHtml>{txt}</AkHtml>
                    // return <a
                    //     href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}`}>{txt}</a>;
                    if (record.TaskURL.startsWith("FormDesigner:")) {
                        return <Link to={{
                            pathname: PathConfig.FormDisplay,
                            query: {
                                "pageid": record.TaskURL,
                                "taskid": record.TaskID,
                                "instid": record.ProcInstID
                            }
                        }}>{txt}</Link>;
                    }
                    return <a
                        href={`${record.TaskURL}?taskid=${record.TaskID}&instid=${record.ProcInstID}`}>{txt}</a>;
                }
            }, {
                title: this.format({ id: WaitingTaskPageLocale.ColumnName }),
                key: WaitingTaskPageLocale.ColumnName,
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "ProcDefName"
            }, {
                title: this.format({ id: WaitingTaskPageLocale.ColumnProcessCreateBy }),
                key: WaitingTaskPageLocale.ColumnProcessCreateBy,
                layout: AkColumnLayout.RightTop,
                dataIndex: "CreatedBy",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: this.format({ id: WaitingTaskPageLocale.ColumnProcessCreateted }),
                key: WaitingTaskPageLocale.ColumnProcessCreateted,
                dataIndex: "CreatedStr",
                // layout:AkColumnLayout.RightBottom,
                hidden: FlowcraftCommon.minSM,
                sorter: (a, b) => a.CreatedStr >= b.CreatedStr ? 1 : -1,
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }, {
                title: this.format({ id: WaitingTaskPageLocale.ColumnProcessDuedate }),
                key: WaitingTaskPageLocale.ColumnProcessDuedate,
                // hidden: FlowcraftCommon.minSM,
                layout: AkColumnLayout.RightBottom,
                dataIndex: "DueDateStr",
                render: (txt, record) => {
                    let now = moment();
                    let dueDate = moment(txt);
                    return dueDate < now
                        ? <AkDateLabel style={{ color: "red" }} value={txt} format="MM-DD-YYYY HH:mm" />
                        : <AkDateLabel value={txt} format="MM-DD-YYYY HH:mm" />;
                }
            }
        ];
        this.state = {
            loading: true,
            taskData: [],
            taskRequest: {
                type: PageType.waittingTask,
                pageIndex: 1,
                pageSize: this.pageSize,
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
        TaskAPI.getTask(this.state.taskRequest).then(data => {
            this.setState({ loading: false, taskData: data.Data, totalCount: data.TotalCount });
        });
        this.props.router.push({ pathname: PathConfig.WaitingTask, query: this.state.taskRequest });
    }
    /**修改页面渲染内容 */
    changeContent(type: PageType) {
        this.setState({ taskRequest: { type } });
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
    renderButton() {
        return <div className='ak-tab-actions'>
            <AkButton className='aiib-actions-button active'>Assigned To Me</AkButton>
            <AkButton className='aiib-actions-button' onClick={() => {
                this.props.onChangePage && this.props.onChangePage(PageType.waittingDelegates);
            }}>Alternate Tasks</AkButton>
        </div>;
    }
    renderSearch() {
        let { taskRequest } = this.state;
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
                                this.state.taskRequest.pageIndex = 1;
                                this.state.taskRequest.type = 1;
                                this.loadData();
                            }}
                            placeholder={this.format({ id: WaitingTaskPageLocale.SearchInputName })} />
                    </AkCol>
                    <AkCol span={8}>
                        <AkIdentityPicker
                            multiple={false}
                            value={taskRequest.applicantID}
                            placeholder={this.format({ id: WaitingTaskPageLocale.SearchInputCreatedBy })}
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
                                taskRequest.type = 1;
                                this.loadData();
                            }}></AkButton>
                    </AkCol>
                </AkRow>
            </AkCol>
            <AkCol span={12}>

            </AkCol>
        </AkRow>;
    }
    renderHeader() {
        // const { context } = this.state;
        // return <AkRow type="flex" gutter={2}>
        //     <AkCol>{this.format({ id: WaitingTaskPageLocale.HeaderTitle })}</AkCol>
        //     <AkCol>
        //         {/* <AkIcon type="swap" style={WaitintTaskStyle.translateStyle} onClick={() => {this.changeContent(PageType.waittingDelegates)}}>
        //         </AkIcon> */}
        //         <AkIcon type="swap" style={WaitintTaskStyle.translateStyle} onClick={() => {
        //             this.props.onChangePage && this.props.onChangePage(PageType.waittingDelegates);
        //         }}>
        //         </AkIcon>
        //     </AkCol>
        // </AkRow>
        return <div>
            <span>Workflow Center</span> / <span>To do</span>
        </div>;
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
            Header={topThis.renderHeader()}
            onReload={() => topThis.onCloseSearch()}>
            <div className="aiib-content">
                {topThis.renderButton()}
                {topThis.renderSearch()}
                <TaskTable
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
                    loading={this.state.loading}
                    dataSource={this.state.taskData}>
                </TaskTable>
            </div>
        </MainContent>;
    }
}
export class WaitintTaskStyle {
    static translateStyle: React.CSSProperties = {
        fontSize: 20,
        verticalAlign: 'middle',
        cursor: 'pointer'
    }
}
