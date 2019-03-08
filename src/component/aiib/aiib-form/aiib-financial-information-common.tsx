import * as React from "react";
import { AkRow, AkInputNumber, FormHelper, ComparisonOperator, AkFormComponentProps, AkRadio, WorkflowFormHelper, AkInput, AkButton } from 'akmii-yeeoffice-common';
import { AIIBWorkflowHelper } from "../../../page/aiib/index";
import { AiibListUtil } from "../index";
import { AkCol } from 'akmii-yeeoffice-common/lib/components/controls';
import { AiibFormProduct } from './aiib-form-product';
import { OtherFoundsDetailsModel } from '../../../api/aiibworkflow/aiib-content-list';

export interface AiibFormFinacialInformationCommonProps extends AkFormComponentProps {
    disabled?: boolean;
    showNSBF?: boolean;
    isProposal?: boolean;
    otherFundValue?: string;
    otherFoundsDetails?: OtherFoundsDetailsModel[];
    productValue?: string[];
}
export interface AiibFormFinacialInformationCommonState {
    showNSBF?: boolean;
    otherFundValue?: string;
    disabled?: boolean;
    uuidsForOtherFounds?: number[];
    uuidForOtherFounds?: number;
    otherFoundsDetails?: OtherFoundsDetailsModel[];
}

export class AiibFormFinacialInformationCommon extends React.Component<AiibFormFinacialInformationCommonProps, AiibFormFinacialInformationCommonState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            showNSBF: props.showNSBF,
            disabled: props.disabled,
            otherFundValue: props.otherFundValue,
            otherFoundsDetails: props.otherFoundsDetails,
            uuidsForOtherFounds: [0],
            uuidForOtherFounds: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("showNSBF" in nextProps && nextProps.showNSBF !== this.props.showNSBF) {
            this.setState({ showNSBF: nextProps.showNSBF }, () => {
                this.onAiibFinancing();
            });
        }
        if ("otherFundValue" in nextProps && nextProps.otherFundValue !== this.props.otherFundValue) {
            this.setState({ otherFundValue: nextProps.otherFundValue });
        }

        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.setState({ disabled: nextProps.disabled });
        }
        if ("otherFoundsDetails" in nextProps && nextProps.otherFoundsDetails !== this.props.otherFoundsDetails) {
            this.setState({ otherFoundsDetails: nextProps.otherFoundsDetails });
        }
    }

    componentDidMount() {
        const OtherFoundsDetailsStr = this.state.otherFoundsDetails;
        const OtherFoundsDetails = OtherFoundsDetailsStr ? OtherFoundsDetailsStr : [];
        const uuidForOtherFounds = OtherFoundsDetails.length > 0 ? OtherFoundsDetails.length - 1 : 0;
        const uuidsForOtherFounds = WorkflowFormHelper.generateListUUIDs(uuidForOtherFounds);
        this.setState({ uuidForOtherFounds, uuidsForOtherFounds }, () => {
            this.props.form.setFieldsValue({
                OtherFoundsDetails: OtherFoundsDetails
            });
        });
    }

    onAiibFinancing(value?: any, key?: string) {
        let loanValue = key === "Loan" ? value : this.props.form.getFieldValue('Loan');
        let GuaranteeValue = key === "GuaranteeRequest" ? value : this.props.form.getFieldValue('GuaranteeRequest');
        let equityValue = key === "Equity" ? value : this.props.form.getFieldValue('Equity');
        let mezzanineValue = key === "Mezzanine" ? value : this.props.form.getFieldValue('Mezzanine');
        let OtherFinancingValue = key === "OtherFinancing" ? value : this.props.form.getFieldValue("OtherFinancing");
        if (!loanValue || Number(loanValue) <= 0) {
            loanValue = 0;
        }
        if (!equityValue || Number(equityValue) <= 0) {
            equityValue = 0;
        }
        if (!GuaranteeValue || Number(GuaranteeValue) <= 0) {
            GuaranteeValue = 0;
        }
        if (!mezzanineValue || Number(mezzanineValue) <= 0) {
            mezzanineValue = 0;
        }
        if (!OtherFinancingValue || Number(OtherFinancingValue) <= 0) {
            OtherFinancingValue = 0;
        }
        const Financingvalue = (Number(loanValue) + Number(GuaranteeValue) + Number(equityValue) + Number(mezzanineValue) + Number(OtherFinancingValue)).toFixed(3);
        this.props.form.setFieldsValue({
            Financing: Financingvalue
        });
        if (this.props.isProposal) {
            this.onTotalCost();
        }
        this.props.form.validateFields(["Financing"], { force: true }, null)
    }

    onTotalCost(value?: any, key?: string) {
        let totalCostvalue = key === "TotalEstimatedCost" ? value : this.props.form.getFieldValue('TotalEstimatedCost');
        let financingValue = key === "Financing" ? value : this.props.form.getFieldValue('Financing');
        let otherFundAmountValue = key === "OtherFundAmount" ? value : this.props.form.getFieldValue('OtherFundAmount');
        let EquitySponsorValue = key === "EquityFromSponsors" ? value : this.props.form.getFieldValue("EquityFromSponsors");
        if (!totalCostvalue || Number(totalCostvalue) <= 0) {
            totalCostvalue = 0;
        }
        if (!financingValue || Number(financingValue) <= 0) {
            financingValue = 0;
        }
        if (!otherFundAmountValue || Number(otherFundAmountValue) <= 0) {
            otherFundAmountValue = 0;
        }
        if (!EquitySponsorValue || Number(EquitySponsorValue) <= 0) {
            EquitySponsorValue = 0;
        }
        const financingGapvalue = (Number(totalCostvalue) - Number(financingValue) - Number(otherFundAmountValue) - Number(EquitySponsorValue)).toFixed(3);
        this.props.form.setFieldsValue({
            FinancingGap: financingGapvalue
        });
        this.props.form.validateFields(["FinancingGap"], { force: true }, null)
    }

    addOtherFoundsHandler() {
        let { uuidForOtherFounds, uuidsForOtherFounds } = this.state;
        uuidForOtherFounds++; uuidsForOtherFounds.push(uuidForOtherFounds);
        this.setState({ uuidForOtherFounds, uuidsForOtherFounds });
    }

    removeOtherFoundsHandler(k: number) {
        let { uuidsForOtherFounds } = this.state;
        if (uuidsForOtherFounds.length === 1) return;
        this.setState({ uuidsForOtherFounds: uuidsForOtherFounds.filter(key => key !== k) }, () => {
            this.calcTotalAmount();
        });
    }

    calcTotalAmount() {
        const { getFieldsValue, setFieldsValue, } = this.props.form;
        let sum = 0;

        const variables = getFieldsValue((this.state.uuidsForOtherFounds || []).map(i => `OtherFoundsDetails[${i}].Amount`)) as any;
        const values = (variables.OtherFoundsDetails || [].map(i => i.Amount));
        values.map(k => {
            var numberValue1 = parseFloat(k.Amount);
            if (numberValue1) sum += numberValue1;
        });
        setFieldsValue({ OtherFundAmount: sum.toFixed(3) });
        if (this.props.isProposal) {
            this.onTotalCost();
        }
        this.props.form.validateFields(["OtherFundAmount"], { force: true }, null)
    }

    renderOtherFoundsDetails() {
        const { state: { uuidsForOtherFounds, disabled }, props } = this;
        const formItems = uuidsForOtherFounds.map((k, index) => {
            const keyPrefix = `OtherFoundsDetails[${k}].`;
            return <div key={keyPrefix}>
                <ul className="application-detailed-ul clearfix">
                    <li>
                        {AIIBWorkflowHelper.renderFormItemListControl(props, "Source Name", `${keyPrefix}Name`, <AkInput disabled={disabled} />, false)}
                    </li>
                    <li>
                        {AIIBWorkflowHelper.renderFormItemListControl(props, "Amount(US$ MM)", `${keyPrefix}Amount`, <AkInputNumber
                            disabled={disabled}
                            onChange={() => {
                                setTimeout(() =>
                                    this.calcTotalAmount());
                            }}
                            // onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, `${keyPrefix}Amount`, 3)} />, true, [AIIBWorkflowHelper.ruleForRequire(this.props, "Amount"), AIIBWorkflowHelper.ruleForComparisonNumber(this.props, "Amount", ComparisonOperator.GreaterOrEqualsThan, 0)])}
                            onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, `${keyPrefix}Amount`, 3)} />, false, [AIIBWorkflowHelper.ruleForComparisonNumber(this.props, "Amount", ComparisonOperator.GreaterOrEqualsThan, 0)])}
                    </li>
                    <li className="delete-icon">
                        <AkButton shape="circle" icon="delete" onClick={() => this.removeOtherFoundsHandler(k)}
                            disabled={disabled}
                            style={{ display: uuidsForOtherFounds.length <= 1 ? "none" : "inline-block" }}
                        />
                    </li>
                </ul>
            </div>;
        });

        return <div className="application-detail-box">
            {formItems}

            {disabled ? null : <div className="application-detail-btn">
                <AkButton type="dashed" icon="plus" onClick={() => this.addOtherFoundsHandler()}
                    disabled={disabled}
                    style={{ display: disabled ? "none" : "inline-block" }} />
            </div>}
        </div>;
    }

    render() {

        const { props, props: { isProposal }, state: { showNSBF, otherFundValue, disabled } } = this;
        return <div>
            <AkRow {...FormHelper.rowLayout}>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Total Estimated Project Investment (US$ MM)',
                    'TotalEstimatedCost',
                    <AkInputNumber
                        onChange={(value) => {
                            if (this.props.isProposal) {
                                this.onTotalCost(value, "TotalEstimatedCost")
                            }
                        }}
                        disabled={disabled}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'TotalEstimatedCost', 3);
                        }}
                    />,
                    true,
                    [
                        AIIBWorkflowHelper.ruleForRequire(props, 'Total Estimated Project Investment (US$ MM)'),
                        AIIBWorkflowHelper.ruleForComparisonNumber(
                            props,
                            'Total Estimated Project Investment (US$ MM)',
                            ComparisonOperator.GreaterOrEqualsThan,
                            0
                        )
                    ]
                )}
            </AkRow>
            {
                showNSBF ?
                    <AkRow {...FormHelper.rowLayout}>
                        {AIIBWorkflowHelper.renderFormItem(props, "Equity from Sponsors (US$ MM)", "EquityFromSponsors", <AkInputNumber disabled={disabled}
                            onChange={(value) => {
                                if (this.props.isProposal)
                                    this.onTotalCost(value, "EquityFromSponsors");
                            }}
                            onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, "EquityFromSponsors", 3)}
                        />, false, [AIIBWorkflowHelper.ruleForComparisonNumber(props, "Equity from Sponsors (US$ MM)", ComparisonOperator.GreaterOrEqualsThan, 0)])}
                    </AkRow>
                    : null
            }

            <AiibFormProduct showNSBF={showNSBF} disabled={disabled} {...this.props} onAiibFinancing={(value, key) => {
                this.onAiibFinancing(value, key);
            }} />
            <AkRow {...FormHelper.rowLayout}>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Other Type of Financing from AIIB (US$ MM)',
                    'OtherFinancing',
                    <AkInputNumber
                        disabled={disabled}
                        onChange={(value) => this.onAiibFinancing(value, "OtherFinancing")}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'OtherFinancing', 3);
                        }}
                    />,
                    false,
                    [AIIBWorkflowHelper.ruleForComparisonNumber(
                        props,
                        'Other Type of Financing from AIIB (US$ MM)',
                        ComparisonOperator.GreaterOrEqualsThan,
                        0
                    )]
                )}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Amount of AIIB Financing/Investment (Required) (US$ MM)',
                    'Financing',
                    <AkInputNumber
                        disabled={true}
                        onChange={(value) => {
                            if (this.props.isProposal)
                                this.onTotalCost(value, "Financing");
                        }}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'Financing', 3);
                        }}
                    />,
                    false,
                    [
                        AIIBWorkflowHelper.ruleForComparisonNumber(
                            props,
                            'Amount of AIIB Financing/Investment (Required) (US$ MM)',
                            ComparisonOperator.GreaterOrEqualsThan,
                            0
                        )
                    ]
                )}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Estimated Financing Amount from AIIB (US$ MM)',
                    'EstimatedLoanAmount',
                    <AkInputNumber
                        disabled={disabled}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'EstimatedLoanAmount', 3);
                        }}
                    />,
                    false,
                    [
                        AIIBWorkflowHelper.ruleForComparisonNumber(
                            props,
                            'Estimated Financing Amount from AIIB (US$ MM)',
                            ComparisonOperator.GreaterOrEqualsThan,
                            0
                        )
                    ],
                    FormHelper.colLabelLayout,
                    FormHelper.colControlLayout,
                    'This field is only for SPB to fill'

                )}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="financing">
                {AIIBWorkflowHelper.renderFormItem(props, "Other Sources of Fund", "OtherFund", <AkRadio.Group
                    onChange={(e) => {
                        if (e.target.value === "No") {
                            this.props.form.setFieldsValue({ OtherFundAmount: 0, OtherFoundsDetails: "" });
                            this.onTotalCost();
                            this.setState({ uuidForOtherFounds: 0, uuidsForOtherFounds: [0] });
                        }
                        this.setState({ otherFundValue: e.target.value });
                    }}
                    disabled={disabled}>
                    <AkRadio value="Yes">Yes</AkRadio>
                    <AkRadio value="No">No</AkRadio>
                </AkRadio.Group>, true)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                <AkCol span={12}>
                    {otherFundValue === 'Yes' ? this.renderOtherFoundsDetails() : null}
                </AkCol>
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {otherFundValue === 'Yes' || !isProposal ? (
                    AIIBWorkflowHelper.renderFormItem(
                        props,
                        'Other Sources of Funds (US$ MM)',
                        'OtherFundAmount',
                        <AkInputNumber
                            onChange={(value) => {
                                if (this.props.isProposal) {
                                    this.onTotalCost(value, "OtherFundAmount")
                                }
                            }}
                            disabled
                        />,
                        false,
                        [
                            AIIBWorkflowHelper.ruleForComparisonNumber(
                                props,
                                'Other Sources of Funds (US$ MM)',
                                ComparisonOperator.GreaterOrEqualsThan,
                                0
                            ),
                            // AIIBWorkflowHelper.ruleForRequire(props, 'Other Sources of Funds (US$ MM)')
                        ]
                    )
                ) : (
                        AIIBWorkflowHelper.renderFormItem(
                            props,
                            'Other Sources of Funds (US$ MM)',
                            'OtherFundAmount',
                            <AkInputNumber
                                disabled={true}
                            />,
                            false,
                            [
                                AIIBWorkflowHelper.ruleForComparisonNumber(
                                    props,
                                    'Other Sources of Funds (US$ MM)',
                                    ComparisonOperator.GreaterOrEqualsThan,
                                    0
                                )
                            ]
                        )
                    )}

                {isProposal ? null : AiibListUtil.ConvertDefToFormItem(props, "FinancingType", disabled, true, null)}
            </AkRow>

            {isProposal ? <AkRow {...FormHelper.rowLayout} className="financing">
                {AiibListUtil.ConvertDefToFormItem(props, 'FinancingGap', true, false, [
                    AIIBWorkflowHelper.ruleForComparisonNumber(
                        props,
                        'Financing Gap',
                        ComparisonOperator.GreaterOrEqualsThan,
                        0
                    )
                ])}
            </AkRow> : null}
        </div>;
    }

}
