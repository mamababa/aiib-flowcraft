import * as React from 'react';
import { PathConfig } from '../../config/pathconfig';
import { withRouter } from 'react-router';
import { AkFormComponentProps, AkForm, AkInput,  RouterProps, AkDatePicker, AkRow, AkButton, AkModal, AkCheckbox } from 'akmii-yeeoffice-common';
import { SATGE_CONCEPT, SATGE_INTERM_FINALREVIEW, SATGE_APPRAISAL, SATGE_NEGOTIATION, SATGE_BOARDAPPROVAL, SATGE_BOARDAPPROVED, NONSOVEREIGN_BACKEDFINACING, isMobile, SOVEREIGN_BACKEDFINACING } from '../../util/aiib-common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import { MyDelegatedLocal, AIIBLocale } from '../../locales/localeid';
import { AiibProjectResponse } from './common/aiib-response-tip';
export interface AiibProjectNextStageModalState {
    confirmLoading?: boolean;
    fieldKey?: string;
    nextStage?: string;
    isChecked?: boolean;
}

export interface AiibProjectNextStageModalProps extends AkFormComponentProps, RouterProps {
    onCancel?: () => void;
    listData: any;
    CloseNextModal?: () => void;
    disabled?: boolean;
}
@withRouter
@AkForm.create()
export class AiibProjectNextStageModal extends React.Component<AiibProjectNextStageModalProps, AiibProjectNextStageModalState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            confirmLoading: false,
            isChecked: true
        };
    }

    componentDidMount() {
        const { listData } = this.props;
        let fieldKey = "";
        let nextStage = "";
        switch (listData.Stage) {
            case SATGE_CONCEPT:
                fieldKey = "Concept";
                if (listData.FinancingMethod === NONSOVEREIGN_BACKEDFINACING) {
                    nextStage = SATGE_INTERM_FINALREVIEW;
                } else {
                    nextStage = SATGE_APPRAISAL;
                }

                break;
            case SATGE_APPRAISAL:
                fieldKey = "Appraisal";
                nextStage = SATGE_NEGOTIATION;
                break;
            case SATGE_INTERM_FINALREVIEW:
                fieldKey = "Appraisal";
                nextStage = SATGE_BOARDAPPROVAL;
                break;
            case SATGE_NEGOTIATION:
                fieldKey = "Negotiation";
                nextStage = SATGE_BOARDAPPROVAL;
                break;
            case SATGE_BOARDAPPROVAL:
                fieldKey = "BoardApproval";
                nextStage = SATGE_BOARDAPPROVED;
                break;
        }
        this.setState({ fieldKey, nextStage });
    }


    onOk() {
        if (!this.state.isChecked) {
            AiibProjectResponse.errorTip(MyDelegatedLocal.CheckboxQequire);
            return;
        }
        const { props: { listData } } = this;

        this.props.form.validateFieldsAndScroll(null, {}, (err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                const reqest = {
                    Title: "Project",
                    CurrentStage: listData.Stage,
                    ProjectID: listData.ProjectID,
                    ListDataID: listData.ListDataID,
                    RowVersion: listData.RowVersion,
                    Dic: {
                        ProcessStatus: listData.Stage === SATGE_BOARDAPPROVAL ? "4" : "0",
                        Stage: this.state.nextStage,
                        ...values
                    }
                };
                ProjectAPI.nextStage(reqest).then(data => {
                    if (data.Status === 0) {
                        this.props.onCancel();
                        this.setState({ confirmLoading: false });
                        AiibProjectResponse.successTip(AIIBLocale.SubmisionSuccess);
                        this.props.router.replace({
                            pathname: this.props.location.query['backUrl'] || PathConfig.NewProject
                        });
                    } else if (data.Status === 101) {
                        this.setState({ confirmLoading: false });
                        AiibProjectResponse.errorStringTip(data.Message);
                    }
                    else {
                        this.setState({ confirmLoading: false });
                        AiibProjectResponse.errorTip(AIIBLocale.SubmisionFail);
                    }
                });
            }
        });
    }

    onCancelHandle() {
        this.props.form.resetFields();
        this.props.onCancel();
        this.setState({ confirmLoading: false });
    }

    renderFooter() {
        const { isChecked } = this.state;
        return <AkRow>
            <div>
                <AkButton icon="close-circle-o" size="large" className="btn-footer btn-cancel" onClick={() => { this.props.CloseNextModal(); }}>Cancel</AkButton>
                <AkButton loading={this.state.confirmLoading} type="primary" icon="fly" size="large" className="btn-footer btn-search" style={{ background: isChecked ? "#00acac" : "#e0e0e0" }}
                    onClick={this.onOk.bind(this)}>Submit</AkButton>
            </div>

        </AkRow>;
    }
    ChangeCheckBox(boolean) {
        this.setState({
            isChecked: !boolean
        });
    }
    render() {
        const { confirmLoading, fieldKey, isChecked } = this.state;
        const { listData } = this.props;
        return <AkModal
            visible
            wrapClassName="aiib-adv-search-modal"
            confirmLoading={confirmLoading}
            title="Go To Next Stage"
            footer={this.renderFooter()}
            onCancel={() => {
                this.props.form.resetFields();
                this.props.onCancel();
            }}
        >
            <AkForm>
                {/* {AIIBWorkflowHelper.renderFormItemInModal(this.props, "Decision Date", `${fieldKey}Date`, <AkDatePicker format="MM-DD-YYYY" />, true)} */}
                {AIIBWorkflowHelper.renderFormItemInModal(this.props, "Comments", `${fieldKey}Comment`, <AkInput.TextArea />, false)}
                {
                    listData.Stage === "Concept" && listData.FinancingMethod === SOVEREIGN_BACKEDFINACING ?
                        <AkCheckbox checked={isChecked} onChange={this.ChangeCheckBox.bind(this, isChecked)}>Carrying out of various of assessments</AkCheckbox> : null
                }
            </AkForm>
        </AkModal>;
    }

}
