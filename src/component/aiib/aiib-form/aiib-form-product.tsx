import * as React from "react";
import { AkFormComponentProps, AkRow, FormHelper, AkCheckbox, AkInputNumber, ComparisonOperator, AkCol } from 'akmii-yeeoffice-common';
import { AIIBWorkflowHelper } from '../../../page/aiib/aiib-workflow-helper';
import { Checkbox } from "antd";

export interface AiibFormProductProps extends AkFormComponentProps {
    disabled?: boolean;
    showNSBF?: boolean;
    onAiibFinancing?: (value?: any, key?: string) => void;
    productValue?: string[];
}

export interface AiibFormProductState {
    disabled?: boolean;
    showNSBF?: boolean;
    productValue?: string[];
}

export class AiibFormProduct extends React.Component<AiibFormProductProps, AiibFormProductState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            showNSBF: props.showNSBF,
            disabled: props.disabled,
            productValue: props.productValue || []
        };
    }

    componentWillReceiveProps(nextProps) {
        if ("showNSBF" in nextProps && nextProps.showNSBF !== this.props.showNSBF) {
            this.setState({ showNSBF: nextProps.showNSBF }, () => {
                nextProps.onAiibFinancing();
            });
        }
        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.setState({ disabled: nextProps.disabled });
        }
        if ("productValue" in nextProps && JSON.stringify(nextProps.disabled) !== JSON.stringify(this.props.disabled)) {
            /**去掉空值*/
            const productValue = (nextProps.productValue).filter(item => item);
            this.setState({ productValue }, () => {
                this.props.form.setFieldsValue({
                    Product: productValue
                });
            });
        }
    }

    setValues() {
        const { productValue } = this.state;

        const KeyArr = [
            { key: "Loan", value: "Loan" },
            { key: "Guarantee", value: "GuaranteeRequest" },
            { key: "Mezzanine", value: "Mezzanine" },
            { key: "Equity", value: "Equity" }
        ];
        KeyArr.forEach(item => {
            if (productValue.indexOf(item.key) === -1) {
                this.props.form.resetFields([item.value]);
                this.props.onAiibFinancing(0, item.value);
            }
        });
    }

    onChange(checkedValues: string[]) {
        const productValue = checkedValues.filter(item => item);
        this.props.form.setFieldsValue({
            Product: productValue
        });
        this.setState({ productValue: productValue }, () => {
            this.setValues();
        });

    }

    render() {
        const { props, state: { disabled, showNSBF, productValue } } = this;

        return <AkCheckbox.Group disabled={disabled} value={productValue} onChange={(values) => this.onChange(values)}>
            {this.props.form.getFieldDecorator('Product', {})}
            <AkRow {...FormHelper.rowLayout}>
                <AkCol {...FormHelper.colLabelLayout}>
                    <span >Product Type</span>
                    <span className="ant-form-item-required" style={{ marginLeft: 4 }}></span>
                </AkCol>
                <AkCol {...FormHelper.colControlLayout}>
                    <Checkbox value="Loan">Loan</Checkbox>
                </AkCol>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Request for Loan from AIIB (US$ MM)',
                    'Loan',
                    <AkInputNumber
                        onChange={(value) => this.props.onAiibFinancing(value, "Loan")}
                        disabled={disabled || productValue.indexOf("Loan") === -1}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'Loan', 3);

                        }}
                    />,
                    false,
                    [
                        AIIBWorkflowHelper.ruleForComparisonNumber(
                            props,
                            'Request for Loan from AIIB(US$ MM)',
                            ComparisonOperator.GreaterOrEqualsThan,
                            0
                        )
                    ]
                )}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                <AkCol {...FormHelper.colLabelLayout}>
                </AkCol>
                <AkCol {...FormHelper.colControlLayout}>
                    <Checkbox value="Guarantee">Guarantee</Checkbox>
                    {!showNSBF && this.state.productValue.length === 0 ? <div style={{ color: "red" }}>
                        Please input Product Type
                    </div> : null}
                </AkCol>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Request for Guarantee from AIIB (US$ MM)',
                    'GuaranteeRequest',
                    <AkInputNumber
                        onChange={(value) => this.props.onAiibFinancing(value, "GuaranteeRequest")}
                        disabled={disabled || productValue.indexOf("Guarantee") === -1}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'GuaranteeRequest', 3);
                        }}
                    />,
                    false,
                    [
                        AIIBWorkflowHelper.ruleForComparisonNumber(
                            props,
                            'Request for Guarantee from AIIB (US$ MM)',
                            ComparisonOperator.GreaterOrEqualsThan,
                            0
                        )
                    ]
                )}
            </AkRow>

            {showNSBF ? <AkRow {...FormHelper.rowLayout}>
                <AkCol {...FormHelper.colLabelLayout}>
                </AkCol>
                <AkCol {...FormHelper.colControlLayout}>
                    <Checkbox value="Equity">Equity</Checkbox>
                </AkCol>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Request for Equity from AIIB (US$ MM)',
                    'Equity',
                    <AkInputNumber
                        disabled={disabled || productValue.indexOf("Equity") === -1}
                        onChange={(value) => this.props.onAiibFinancing(value, "Equity")}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'Equity', 3);
                        }}
                    />,
                    false,
                    []
                )}

            </AkRow> : null}
            {showNSBF ? <AkRow {...FormHelper.rowLayout}>
                <AkCol {...FormHelper.colLabelLayout}>
                </AkCol>
                <AkCol {...FormHelper.colControlLayout}>
                    <Checkbox value="Mezzanine">Mezzanine</Checkbox>
                    {showNSBF && this.state.productValue.length === 0 ? <div style={{ color: "#f04134", marginTop: 5 }}>
                        Please input Product Type
                    </div> : null}
                </AkCol>
                {AIIBWorkflowHelper.renderFormItem(
                    props,
                    'Request for Mezzanine from AIIB (US$ MM)',
                    'Mezzanine',
                    <AkInputNumber
                        onChange={(value) => this.props.onAiibFinancing(value, "Mezzanine")}
                        disabled={disabled || productValue.indexOf("Mezzanine") === -1}
                        onBlur={(e) => {
                            AIIBWorkflowHelper.setFloatFieldValue(e, props, 'Mezzanine', 3);
                        }}
                    />,
                    false,
                    [
                        AIIBWorkflowHelper.ruleForComparisonNumber(
                            props,
                            'Request for Mezzanine from AIIB (US$ MM)',
                            ComparisonOperator.GreaterOrEqualsThan,
                            0
                        )
                    ]
                )}
            </AkRow> : null}

        </AkCheckbox.Group>;
    }

}
