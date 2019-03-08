import * as React from 'react';
import {
    AkButton,
    AkRow,
    AkModal,
    AkInput,
    ContentListApi,
    AkForm,
    AkFormComponentProps,
    RouterProps
} from 'akmii-yeeoffice-common';
import { AiibCommonFun } from './index';
import { stateValue } from './aiib-proposal-list-header';
import { STATE_DGIOREVIRE, STATE_NEWPROPOSAL, STATE_MANAGERIOREVIEW } from '../../util/aiib-common';
import { ProjectContentList, AiibSendEmailCommom } from '../../api/aiibworkflow/content-list';
import { addAiibWorkflowHistory } from '../../api/aiibworkflow/common';
import { AIIBLocale } from '../../locales/localeid';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import { withRouter } from 'react-router';
import { AiibProjectResponse } from './common/aiib-response-tip';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow/aiib-content-list';
export interface AiibProposalClearOrReworkProps extends AkFormComponentProps, RouterProps {
    actionType: 'Cleared' | 'Reworked';
    listData: any;
    afterClick?: () => void;
}

export interface AiibProposalClearOrReworkState {
    confirmLoading?: boolean;
    showModal?: boolean;
    comments?: string;
}
@AkForm.create()
@withRouter
export class AiibProposalClearOrRework extends React.Component<
AiibProposalClearOrReworkProps,
AiibProposalClearOrReworkState
> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            confirmLoading: false,
            showModal: false
        };
    }

    onModalOkHandle() {
        const { props: { actionType, listData }, state: { comments } } = this;

        let variable: ProjectAllFieldsModal = listData;
        let addWorkflowVariable = Object.assign({}, variable);

        if (actionType === 'Cleared') {
            if (variable.State === STATE_DGIOREVIRE) {
                // variable.ProcessStage = "Recommended by ScrCom";
                variable.ProcessStage = "Proposal documents complete";
            }
            const stateIndex = stateValue.indexOf(variable.State);
            variable.State = stateValue[stateIndex + 1];

        } else if (actionType === 'Reworked') {
            if (!comments) {
                AiibProjectResponse.errorTip(AIIBLocale.ReworkCommentRequire);
                return;
            }

            variable.Status = 'Unsubmitted';
            variable.State = STATE_NEWPROPOSAL;
            variable.ProcessStage = "";
            variable.CancelledComment = comments;
        }
        this.onEditProjectByTitle(variable, addWorkflowVariable);
    }

    onEditProjectByTitle(variable, AddHistoryValue) {
        for (const key in variable) {
            if (variable[key] && Array.isArray(variable[key])) {
                variable[key] = JSON.stringify(variable[key]);
            }
        }
        this.setState({ confirmLoading: true });
        const request = {
            ListDataID: variable.ListDataID,
            RowVersion: variable.RowVersion,
            Dic: {
                ...variable
            }
        };
        ProjectContentList.editContentList(request).then((data) => {
            if (data.Status === 0) {
                this.onSendEmail(AddHistoryValue);
                this.onAddWorkflowHistory(AddHistoryValue);
                AiibProjectResponse.successTip(AIIBLocale.SubmisionSuccess);
                this.setState({ showModal: false, confirmLoading: false });
                this.props.afterClick();
            } else {
                this.setState({ confirmLoading: false });
                AiibProjectResponse.errorTip(AIIBLocale.SubmisionFail);
            }
        });
    }

    onSendEmail(listDate) {
        const { actionType } = this.props;
        let code: string = '';
        if (listDate.State === STATE_MANAGERIOREVIEW) {
            code = actionType === 'Reworked' ? 'Proposal-ManagerIO-Rework' : 'Proposal-ManagerIO-Cleared';
            AiibSendEmailCommom.sendEmail(code, null, listDate.ListDataID);
        } else if (listDate.State === STATE_DGIOREVIRE) {
            code = actionType === 'Reworked' ? 'Proposal-DGIO-Rework' : 'Proposal-DGIO-Cleared';
            AiibSendEmailCommom.sendEmail(code, null, listDate.ListDataID);
        }
    }

    onAddWorkflowHistory(recode) {
        const { actionType } = this.props;
        let ActionLogTitle = recode.State;
        if (recode.State === STATE_MANAGERIOREVIEW) {
            ActionLogTitle = "Manager IO Review";
        }
        else if (recode.State === STATE_DGIOREVIRE) {
            ActionLogTitle = "DG IO Review";
        }
        const workflowHistory: addAiibWorkflowHistory = {
            Title: 'ActionLog',
            DicList: [
                {
                    Title: ActionLogTitle,
                    ProjectDataID: recode.ListDataID,
                    ActionType: actionType,
                    Comment: this.state.comments,
                    StartNum: recode.StartNum,
                    Category: 'Proposal'
                }
            ]
        };
        ContentListApi.AddBatchDataByTitle(workflowHistory);
    }

    onBtnClick() {
        const { listData } = this.props;
        if (!AiibCommonFun.ValidateProposalForm(listData)) {
            this.setState({ showModal: true });
        }
    }

    renderFooter() {
        return (
            <AkRow>
                <AkButton
                    loading={this.state.confirmLoading}
                    type="primary"
                    icon="check-circle-o"
                    size="large"
                    className="aiib-button dark"
                    onClick={this.onModalOkHandle.bind(this)}
                >
                    Submit
				</AkButton>
            </AkRow>
        );
    }

    renderModal() {
        const { state: { showModal, confirmLoading } } = this;
        const { actionType } = this.props;
        let content = null;
        content = (
            <AkForm>
                {AIIBWorkflowHelper.renderFormItemInModal(
                    this.props,
                    'Comments',
                    'Comments',
                    <AkInput.TextArea
                        onChange={(value) => {
                            this.setState({ comments: value.target.value });
                        }}
                    />,
                    actionType === 'Cleared' ? false : true
                )}
            </AkForm>
        );
        const modalProps = {
            title: 'Comments',
            visible: true,
            width: 1000,
            okText: 'Submit',
            cancelText: 'Cancel',
            confirmLoading: confirmLoading,
            wrapClassName: 'aiib-adv-search-modal',
            footer: this.renderFooter(),
            onCancel: () => {
                this.setState({ showModal: false, confirmLoading: false });
            }
        };

        return showModal ? (
            <AkModal {...modalProps}>
                {content}
            </AkModal>
        ) : (
                false
            );
    }

    render() {
        const { actionType, listData } = this.props;
        if (listData.DropStatus === "2") return null;
        if (this.props.location.query["backUrl"]) {
            if (this.props.location.query["backUrl"].indexOf("/pending/scrcom?PendingUrl=Drop") > -1) return null;
        }
        return (
            <div>
                {actionType === 'Cleared' ? (
                    <AkButton className="aiib-button dark" onClick={() => this.onBtnClick()}>
                        Clear
					</AkButton>
                ) : (
                        <AkButton className="aiib-button red" onClick={() => this.onBtnClick()}>
                            Rework
					</AkButton>
                    )}
                {this.renderModal()}
            </div>
        );
    }
}
