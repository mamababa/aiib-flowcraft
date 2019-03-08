import * as React from 'react';
import { AkRow, FormHelper, AkFormComponentProps, AkInput, ComparisonOperator, AkInputNumber } from 'akmii-yeeoffice-common';
import { AiibListUtil } from "../control/aiib-list-util";
import { AIIBWorkflowHelper } from '../../../page/aiib/aiib-workflow-helper';
import { AiibFormFinacialInformationCommon } from '../index';

export interface AiibCommonFormFiananInfoProps extends AkFormComponentProps {
    disabled?: boolean;
    listData?: any;
    showNSBF?: boolean;
    onFinancingMethodChange?: (showNSBF?: boolean) => void;
}

export interface AiibCommonFormFiananInfoStatus {
    disabled?: boolean;
    showNSBF?: boolean;

}

export class AiibCommonFormFinanInfo extends React.Component<AiibCommonFormFiananInfoProps, AiibCommonFormFiananInfoStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled: props.disabled,
            showNSBF: props.showNSBF
        };
    }

    componentWillReceiveProps(nextProps) {
        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.setState({ disabled: nextProps.disabled });
        }
        if ("showNSBF" in nextProps && nextProps.showNSBF !== this.props.showNSBF) {
            this.setState({ showNSBF: nextProps.showNSBF });
        }
    }
    renderInputNumberItem(name: string, id: string) {
        const { state: { disabled }, props } = this;
        return AIIBWorkflowHelper.renderFormItem(props, name, id, <AkInputNumber disabled={disabled} onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, id, 3)} />, false, [AIIBWorkflowHelper.ruleForComparisonNumber(props, name, ComparisonOperator.GreaterOrEqualsThan, 0)])
    }

    render() {
        const { props, props: { listData }, state: { disabled, showNSBF } } = this;
        const { colLabelLayout, largeControlLayout } = FormHelper;
        return <div>
            <AiibFormFinacialInformationCommon
                showNSBF={showNSBF}
                disabled={disabled}
                productValue={listData ? listData.Product : [""]}
                otherFundValue={listData ? listData.OtherFund : ""}
                otherFoundsDetails={listData ? listData.OtherFoundsDetails : []}
                isProposal={false} {...this.props} />

            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "LeadFinancier", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "OtherFinanciers", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "SocialCategory", disabled, true, null)}
                {AiibListUtil.ConvertDefToFormItem(props, "ProjectRisk", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "Probability", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "BODPipelinePresentation", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "DisbursementConditions", disabled, false, null, colLabelLayout, largeControlLayout)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "KeyCovenants", disabled, false, null, colLabelLayout, largeControlLayout)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AIIBWorkflowHelper.renderFormItem(props, "Policy Assurance", 'PolicyAssuranceComment', <AkInput.TextArea disabled={disabled} />, false, [], colLabelLayout, largeControlLayout, "Please leave your comments")}
            </AkRow>
        </div>;
    }
}
