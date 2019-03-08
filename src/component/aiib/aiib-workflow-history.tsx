import * as React from 'react';
import { Component } from 'react'
import {
    AkTable,
    AkColumnProps,
    AkRow,
    AkCol,
    AkColumnLayout,
    AkAvatar,
    AkGlobal,
    FlowcraftCommon,
    CommonLocale,
    TaskInfo,
    ProcessLog,
    AkUtil, AkIcon
} from "akmii-yeeoffice-common";
import { HistoryLogLocale } from 'akmii-yeeoffice-common/lib/locales/localeid';
import { AiibWorkflowHistoryProposal, AiibFormatDate } from './index';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow/index';

/** 自定义表单 流程日志 */
export class TaskTable extends AkTable<TaskInfo> {
}
export class ChildrenTable extends AkTable<TaskInfo> {
}
export interface TaskAkColumn extends AkColumnProps<TaskInfo> {
}

export interface AIIBWorkFlowHistoryProps {
    taskID?: string;
    appID?: string;
    defID?: string;
    resID?: string;
    isPreview?: boolean;
    isFlowChart?: boolean;
    stageText?: string;
    dataSource?: Array<any>;
    listData?: ProjectAllFieldsModal;
}
export interface AIIBWorkFlowHistoryStates {
    showFlowChart?: boolean;
    processLogList?: ProcessLog[];
    renderRowKey: any;
    fullscreen: boolean;
    isApplication: boolean;
}

class AIIBWorkFlowHistory extends Component<AIIBWorkFlowHistoryProps, AIIBWorkFlowHistoryStates> {
    static loadflowchart?: (instID, defResID) => any;
    instID?: string;
    defResID?: string;
    container?: any;
    static contextTypes = {
        listData: React.PropTypes.object,
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            renderRowKey: [],
            fullscreen: true,
            isApplication: false,
        };
    }
    renderTaskTable(item, index) {
        const { formatMessage } = AkGlobal.intl;
        let columns: TaskAkColumn[] = [
            {
                title: formatMessage({ id: HistoryLogLocale.HistoryLogActorUser }),
                dataIndex: "AssigneeName",
                key: "AssigneeName",
                layout: AkColumnLayout.LeftTop,
                width: "20%",
                render: (txt, record) => {
                    let reChild = record["Child"];
                    if (txt && txt === record.DelegateName) {
                        return txt;
                    } else if (reChild && reChild.length > 0) {
                        return '';
                    } else {
                        return <span>{txt} ({record.DelegateName})</span>
                    }
                }
            }, {
                title: formatMessage({ id: HistoryLogLocale.HistoryLogSubtask }),
                key: "Name",
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "Name",
                width: "30%"
            }, {
                title: formatMessage({ id: CommonLocale.Status }),
                key: "Outcome",
                layout: AkColumnLayout.RightBottom,
                dataIndex: "Outcome",
                width: "10%",
                render: (txt) => {
                    if (txt === "Rejected") {
                        txt = "Not Approved";
                    }
                    return txt;
                }
            }
            , {
                title: formatMessage({ id: HistoryLogLocale.HistoryLogStartTime }),
                key: "CreatedStr",
                layout: AkColumnLayout.RightTop,
                dataIndex: "CreatedStr",
                width: "15%",
                render: (txt) => {
                    return AiibFormatDate(txt, "MM-DD-YYYY HH:mm");
                }
            }, {
                title: formatMessage({ id: HistoryLogLocale.HistoryLogRemark }),
                key: "Comment",
                dataIndex: "Comment",
                width: "20%",
                hidden: FlowcraftCommon.minSM,
                render: (txt) => {
                    return <pre style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        paddingRight: "2%",
                        fontFamily: "inherit",
                        maxHeight: "150px",
                        overflow: "auto"
                    }}>{txt}</pre>;
                }
            }, {
                key: "Icon",
                layout: AkColumnLayout.Option,
                dataIndex: "Icon",
                width: "5%",
                render: (text, record) => {
                    let { renderRowKey } = this.state;
                    let rowKeyData = renderRowKey.find(l => l === record.TaskID);
                    let reChild = record["Child"];
                    return reChild && reChild.length > 0 ? rowKeyData && rowKeyData.length > 0 ? <AkIcon className="ak-form-workflow-history-btn" onClick={() => {
                        AkUtil.remove(renderRowKey, v => v === record.TaskID);
                        this.setState({ renderRowKey });
                    }} type="up"></AkIcon> :
                        <AkIcon className="ak-form-workflow-history-btn" onClick={() => {
                            renderRowKey.push(record.TaskID);
                            this.setState({ renderRowKey });
                        }} type="down"></AkIcon> : null;
                }
            }
        ];

        const ProcInstModel = item.ProcessLog[0].ProcInstModel;
        let title = ProcInstModel ? <AkRow key="historylog" type="flex" justify="space-between" align="middle">
            <AkCol>
                <AkRow type="flex" gutter={12} justify="start" align="middle">
                    <AkCol style={{ fontWeight: "bold" }}>
                        <span>{ProcInstModel.Name}</span>
                    </AkCol>
                    < AkCol>
                        <span>submitted on</span>
                    </AkCol>
                    <AkCol style={{ fontWeight: "bold" }}>
                        {AiibFormatDate(ProcInstModel.CreatedStr, "MM-DD-YYYY HH:mm")}
                    </AkCol>
                    <AkCol><span>by</span></AkCol>
                    <AkCol style={{ fontWeight: "bold" }}>
                        <AkAvatar value={ProcInstModel.CreatedBy} type="text" />
                    </AkCol>
                    <AkCol><span style={{ fontWeight: "bold", color: "#5cb85c" }}>
                        {AkGlobal.intl.formatMessage({ id: "project.history.log.status." + ProcInstModel.Status })}
                    </span></AkCol>
                </AkRow>
            </AkCol>
        </AkRow> : null;
        return <TaskTable pagination={false} showHeader={false} className="ak-form-workflow-history" rowKey="TaskID"
            dataSource={item.ProcessLog[0].TaskList}
            title={() => title}
            key={index}
            expandedRowKeys={this.state.renderRowKey}
            expandIconAsCell={false}
            rowClassName={record => { return "hide parentstyle"; }}
            expandedRowRender={record => this.renderChildrenTable(record.Child, columns, this.state.renderRowKey)}
            columns={columns} />;
    }

    renderChildrenTable(item, columns, renderRowKey) {
        return <AkRow style={{ position: "relative" }}>
            <AkCol className="ak-form-workflow-spaceBorder">
                <div className="leftBorder"></div>
            </AkCol>
            <AkCol>
                <ChildrenTable pagination={false}
                    className="ak-form-workflow-history"
                    rowKey="TaskID"
                    dataSource={item}
                    columns={columns}
                    expandIconAsCell={false}
                    expandedRowKeys={renderRowKey}
                    rowClassName={record => {
                        return "hide childrenstyle";
                    }}
                    expandedRowRender={record => this.renderChildrenTable(record.Child, columns, renderRowKey)}
                ></ChildrenTable>
            </AkCol>
        </AkRow>;
    }

    renderCancel() {
        const { listData } = this.props;
        const proposalActionLog = this.props.dataSource.find(item => item.Type === "ActionLog");
        let cancelActionLog = [];
        if (proposalActionLog) {
            cancelActionLog = proposalActionLog.ActionLogs.filter(item => item.Category === "Cancel");
        }
        if (cancelActionLog.length > 0) {
            return <AiibWorkflowHistoryProposal category="Cancel" key={"Cancel"} dataSource={cancelActionLog} listData={listData} />;
        }
    }

    renderTable() {
        const { dataSource, listData } = this.props;
        return dataSource && dataSource.map((entry, index) => {
            if (entry.Type === "ActionLog") {
                const proposalActionLog = entry.ActionLogs.filter(item => item.Category !== "Cancel");
                return entry && <AiibWorkflowHistoryProposal category="Proposal" key={index} dataSource={proposalActionLog} listData={listData} />;
            }
            if (entry.Type === "ProcessLog") {
                return entry && this.renderTaskTable(entry.ProcessLogs, index);
            }
        });
    }

    render() {
        const { dataSource } = this.props;
        return dataSource.length > 0 ? <div className="aiib-workflow-history">
            {this.renderCancel()}
            {this.renderTable()}
        </div> : null;
    }

}



export default AIIBWorkFlowHistory;
