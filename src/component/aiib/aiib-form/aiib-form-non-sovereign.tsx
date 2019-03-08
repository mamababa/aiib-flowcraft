import * as React from 'react';
import { AkRow, FormHelper, AkInputNumber, ComparisonOperator } from 'akmii-yeeoffice-common';
import { AiibListUtil } from '../index';
import { AIIBWorkflowHelper } from '../../../page/aiib/index';
export interface AiibFormNonSovereignState { }

export interface AiibFormNonSovereignProps {
    disabled?: boolean;
}

export class AiibFormNonSovereign extends React.Component<AiibFormNonSovereignProps, AiibFormNonSovereignState>{
    constructor(props, context) {
        super(props, context);

    }

    renderInputNumberItem(name: string, id: string) {
        const { props: { disabled }, props } = this;
        return AIIBWorkflowHelper.renderFormItem(props, name, id, <AkInputNumber disabled={disabled}
            onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, id, 3)}
        />, false, [AIIBWorkflowHelper.ruleForComparisonNumber(props, name, ComparisonOperator.GreaterOrEqualsThan, 0)])
    }

    render() {
        const { props, props: { disabled } } = this;
        return <div>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "Guarantor", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "SecurityType", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="financing">
                {AiibListUtil.ConvertDefToFormItem(props, "SecurityLocation", disabled, false)}
                {this.renderInputNumberItem("Sen. Loan Amount (US$ MM)", "Sen_LoanAmount")}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "Sen_LoanRate", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="loandate">
                {AiibListUtil.ConvertDefToFormItem(props, "Sen_LoanTenorStartDate", disabled, false, [AIIBWorkflowHelper.ruleForRangeFrom(props, "Sen_LoanTenorEndDate")])}

                {AiibListUtil.ConvertDefToFormItem(props, "Sen_LoanTenorEndDate", disabled, false, [AIIBWorkflowHelper.ruleForRangeTo(props, "Sen_LoanTenorStartDate", "End Date", "Start Date")])}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="financing">
                {AiibListUtil.ConvertDefToFormItem(props, "Sen_LoanAmortizationMethod", disabled, false)}
                {this.renderInputNumberItem("Mobilization Amount (US$ MM)", "MobilizationAmount")}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "MobilizationRate", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="loandate">
                {AiibListUtil.ConvertDefToFormItem(props, "MobilizationMaturityStartDate", disabled, false, [AIIBWorkflowHelper.ruleForRangeFrom(props, "MobilizationMaturityEndDate")])}
                {AiibListUtil.ConvertDefToFormItem(props, "MobilizationMaturityEndDate", disabled, false, [AIIBWorkflowHelper.ruleForRangeTo(props, "MobilizationMaturityStartDate", "End Date", "Start Date")])}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "MobilizationAmortizationMethod", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "LikelyMobilizationSource", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="financing">
                {this.renderInputNumberItem("Sub-ordinated Loan Amount (US$ MM)", "SO_LoanAmount")}
                {AiibListUtil.ConvertDefToFormItem(props, "SO_LoanRate", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="loandate">
                {AiibListUtil.ConvertDefToFormItem(props, "SO_LoanMaturityStartDate", disabled, false, [AIIBWorkflowHelper.ruleForRangeFrom(props, "SO_LoanMaturityEndDate")])}
                {AiibListUtil.ConvertDefToFormItem(props, "SO_LoanMaturityEndDate", disabled, false, [AIIBWorkflowHelper.ruleForRangeTo(props, "SO_LoanMaturityStartDate", "End Date", "Start Date")])}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "SO_LoanAmortizationMethod", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="financing">
                {AiibListUtil.ConvertDefToFormItem(props, "E_StraightPreferred", disabled, false)}
                {this.renderInputNumberItem("Equity Amount (US$ MM)", "E_Amount")}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="financing">
                {AiibListUtil.ConvertDefToFormItem(props, "E_Percentage", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "SharesNumber", disabled, false)}
            </AkRow>
        </div>;
    }
}
