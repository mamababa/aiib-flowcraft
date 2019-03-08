import * as React from 'react';
import { AkButton, AkModal, AkRow, AkCol, AkInput, ContentListApi, CommonLocale } from 'akmii-yeeoffice-common';
import { EditProposalStatusRequest } from '../../api/aiibworkflow/proposal-request';
import { ProposalAPI } from '../../api/aiibworkflow/proposal';
import { AiibSendEmailCommom } from '../../api/aiibworkflow/content-list';
import { addAiibWorkflowHistory } from '../../api/aiibworkflow/common';
import { STATE_NEWPROPOSAL } from '../../util/aiib-common';
import { AiibProjectResponse, AiibCommonFun } from './index';
import { AIIBLocale } from '../../locales/localeid';
export interface AiibProposalDropProps {
    listData?: any;
    afterClick?: () => void;
    actionType?: "Drop" | "Active" | "Inactive";
}

export interface AiibProposalDropState {
    loading?: boolean;
    comments?: string;
    showModal?: boolean;
}

export class AiibProposalDrop extends React.Component<AiibProposalDropProps, AiibProposalDropState>{
    static defaultProps: AiibProposalDropProps = {
        actionType: "Drop"
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            showModal: false
        }
    }

    onBtnClick() {
        const { listData, actionType } = this.props;
        if (actionType === "Drop" && !AiibCommonFun.ValidateProposalForm(listData)) {
            this.setState({ showModal: true });
        } else {
            this.setState({ showModal: true });
        }
    }

    onSaveHandle() {
        const { listData, actionType } = this.props;
        if (!this.state.comments && actionType !== "Active") {
            AiibProjectResponse.errorStringTip("Please input comments");
            return;
        }
        this.setState({ loading: true });
        let request: EditProposalStatusRequest = {
            Title: "Project",
            ListDataID: listData.ListDataID,
            RowVersion: listData.RowVersion,
            ProposalID: listData.ProposalID,
            Dic: {
                DropStatus: "1",
                CancelledComment: this.state.comments
            }
        };

        if (actionType === "Active") {
            request.Dic = {
                DropStatus: "0",
                Status: "Unsubmitted",
                State: STATE_NEWPROPOSAL,
                ProcessStage: ""
            }
        } else if (actionType === "Inactive") {
            request.Dic = {
                DropStatus: "0",
                Status: "Inactive",
                State: STATE_NEWPROPOSAL,
                ProcessStage: "",
                CancelledComment: this.state.comments
            }
        }

        ProposalAPI.editProposalStatus(request).then(data => {
            if (data.Status === 0) {
                if (actionType === "Drop") {
                    this.onSendEmail();
                }
                this.onAddWorkflowHistory();
                this.props.afterClick();
                AiibProjectResponse.successTip(CommonLocale.TipOperationSuccess);
                this.onCancel();
                this.setState({ loading: false });
            } else if (data.Status === 540010) {
                this.setState({ loading: false });
                AiibProjectResponse.errorTip(AIIBLocale.OperationFailByVersion);
            }
            else {
                this.setState({ loading: false });
                AiibProjectResponse.errorTip(CommonLocale.TipOperationFail);
            }
        });
    }

    onSendEmail() {
        const { listData } = this.props;
        AiibSendEmailCommom.sendEmail("Proposal-Droping", null, listData.ListDataID);
    }

    onAddWorkflowHistory() {
        const { listData, actionType } = this.props;

        let LogTitle = "";
        let LogActionType = "";

        switch (actionType) {
            case "Drop":
                LogTitle = "Request for drop";
                LogActionType = "Drop";
                break;
            case "Active":
                LogTitle = "Request for activate";
                LogActionType = "Activated";
                break;
            case "Inactive":
                LogTitle = "Request for inactive";
                LogActionType = "Inactivated";
                break;
        }

        const workflowHistory: addAiibWorkflowHistory = {
            Title: "ActionLog",
            DicList: [{
                Title: LogTitle,
                ProjectDataID: listData.ListDataID,
                ActionType: LogActionType,
                Comment: this.state.comments,
                StartNum: listData.StartNum,
                Category: actionType === "Drop" ? "Drop" : "Proposal"
            }]
        };
        ContentListApi.AddBatchDataByTitle(workflowHistory);
    }

    onCancel() {
        this.setState({ showModal: false, comments: "" });
    }

    renderFooter() {
        return (
            <AkRow>
                <AkButton
                    loading={this.state.loading}
                    type="primary"
                    icon="check-circle-o"
                    size="large"
                    className="aiib-button dark"
                    onClick={this.onSaveHandle.bind(this)}>
                    Ok
				</AkButton>
                <AkButton
                    loading={this.state.loading}
                    icon="close-circle-o"
                    size="large"
                    className="btn-footer btn-cancel"
                    onClick={this.onCancel.bind(this)}
                >
                    Cancel
				</AkButton>
            </AkRow>
        );
    }

    renderModal() {
        const { actionType } = this.props;
        const modalProps = {
            title: `Are you sure to change this state to ${actionType}?`,
            visible: true,
            width: 600,
            okText: 'Ok',
            cancelText: 'Cancel',
            confirmLoading: this.state.loading,
            wrapClassName: 'aiib-adv-search-modal',
            footer: this.renderFooter(),
            onCancel: () => {
                this.setState({ showModal: false, loading: false });
            }
        };
        return <AkModal {...modalProps}>
            <AkRow type="flex" align="middle" justify="space-between">
                <AkCol span={4}><span>
                    Comments
                {actionType === "Active" ? null : <span className="ant-form-item-required"></span>}
                </span></AkCol>
                <AkCol span={20}>
                    <AkInput.TextArea onChange={(value) => {
                        this.setState({ comments: value.target.value });
                    }} />
                </AkCol>
            </AkRow>
        </AkModal>;

    }

    render() {
        const { actionType } = this.props;
        return <div>
            <AkButton loading={this.state.loading} className={actionType === "Inactive" ? "aiib-button warn" : "aiib-button blue"} onClick={() => this.onBtnClick()} type="primary">{actionType}</AkButton>
            {this.state.showModal ? this.renderModal() : null}
        </div>;
    }
}
