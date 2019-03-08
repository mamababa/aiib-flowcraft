import * as React from 'react';
import { AkCol, AkAvatar, AkRow, AkColumnLayout, FlowcraftCommon, AkTable } from 'akmii-yeeoffice-common';
import { AiibFormatDate } from './index';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow/index';
export interface AiibWorkflowHistoryProposalState {

}

export interface AiibWorkflowHistoryProposalProps {
    dataSource: any[];
    listData: ProjectAllFieldsModal;
    category?: "Proposal" | "Cancel";
}

export class AiibWorkflowHistoryProposal extends React.Component<AiibWorkflowHistoryProposalProps, AiibWorkflowHistoryProposalState>{
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    renderTable() {
        let ProcessStage = "Processing";
        const { listData, category } = this.props;
        if (category === "Cancel" && listData && (listData.CancelStatus === "2" || listData.CancelStatus === "0")) {
            ProcessStage = "Completed";
        }
        if (category === "Proposal" && listData && listData.Stage !== "Proposal") {
            ProcessStage = "Completed";
        }
        let columns = [
            {
                title: "",
                dataIndex: "CreatedBy",
                key: "CreatedBy",
                layout: AkColumnLayout.LeftTop,
                width: "20%",
                render: (txt) => {

                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: "",
                key: "Title",
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "Title",
                width: "30%"
            }, {
                title: "",
                key: "ActionType",
                layout: AkColumnLayout.RightBottom,
                dataIndex: "ActionType",
                width: "10%",
                render: (txt) => {
                    if (txt === "Rejected") {
                        txt = "Not Approved";
                    }
                    return txt;
                }
            }
            , {
                title: "",
                key: "Created",
                layout: AkColumnLayout.RightTop,
                dataIndex: "Created",
                width: "15%",
                render: (txt) => {
                    return AiibFormatDate(txt, "MM-DD-YYYY HH:mm");
                }
            }, {
                title: "",
                key: "Comment",
                dataIndex: "Comment",
                width: "25%",
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
            }
        ];

        let title = <AkRow type="flex" align="middle" justify="start">
            <AkCol>
                <h2>Proposal Stage</h2>
            </AkCol>
            <AkCol style={{ marginLeft: "15px" }}>
                <h2 style={{ color: "#5cb85c" }}>{ProcessStage}</h2>
            </AkCol>
        </AkRow>;

        if (this.props.category === "Cancel") {
            title = <AkRow key="historylog" type="flex" justify="space-between" align="middle">
                <AkCol>
                    <AkRow type="flex" gutter={12} justify="start" align="middle">
                        <AkCol style={{ fontWeight: "bold" }}>
                            <span>Cancel Process</span>
                        </AkCol>
                        < AkCol>
                            <span>submitted on</span>
                        </AkCol>
                        <AkCol style={{ fontWeight: "bold" }}>
                            {AiibFormatDate(listData && listData.CancelledDate, "MM-DD-YYYY HH:mm")}
                        </AkCol>
                        <AkCol><span>by</span></AkCol>
                        <AkCol style={{ fontWeight: "bold" }}>
                            <AkAvatar value={listData && listData.CancelledUser} type="text" />
                        </AkCol>
                        <AkCol style={{ color: "#5cb85c" }}>
                            <span style={{ fontWeight: "bold" }}>{ProcessStage}</span>
                        </AkCol>
                    </AkRow>
                </AkCol>

            </AkRow>;
        }

        return <AkTable pagination={false} showHeader={false} className="ak-form-workflow-history"
            title={() => title}
            dataSource={this.props.dataSource}
            rowClassName={record => { return "hide parentstyle"; }}
            columns={columns}
            rowKey="ListDataID">
        </AkTable>;
    }

    render() {
        return <div className="aiib-workflow-history-proposal-stage">
            {this.renderTable()}
        </div>;
    }

}
