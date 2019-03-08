import { FormHelper, AkColProps, AkCol, ComparisonOperator, AkForm, CommonLocale } from 'akmii-yeeoffice-common';
import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';

export class AIIBWorkflowHelper {
    /**完整表单Item
 *
 *
 * @static
 * @param {*} props
 * @param {string} id  表单控件的多语言id和标签的多语言id
 * @param {string} key   表单控件的key值
 * @param {*} formControl  表单Control Element
 * @param {boolean} [required=false]  该表单是否必填？默认为否  如果为true的话，标签需要会出现红色星号，表单Control为必填项
 * @param {*} [rules=null]  验证规则，为null时自动生成必填验证以及长度验证
 * @param {AkColProps} [labelLayout=FormHelper.colLabelLayout]  表单标签栅格Props
 * @param {AkColProps} [controlLayout=FormHelper.colControlLayout] 表单Control栅格Props
 * @param {(string | React.ReactNode)} [extra=null] 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
 * @returns
 *
 *
 */
    public static renderFormItem(
        props: any,
        id: string,
        key: string,
        formControl: any,
        required: boolean = false,
        rules: any = null,
        labelLayout: AkColProps = FormHelper.colLabelLayout,
        controlLayout: AkColProps = FormHelper.colControlLayout,
        extra: string | React.ReactNode = null,
        initialValue?: any) {
        const label = AIIBWorkflowHelper.renderFormItemLabel(props, id, required, labelLayout);
        const control = AIIBWorkflowHelper.renderFormItemControl(props, id, key, formControl, required, rules, controlLayout, extra, initialValue);
        return [label, control];
    }

    /**
     * 表单标签
     *
     * @static
     * @param {*} props
     * @param {string} id  标签的多语言id
     * @param {boolean} [required=false]  是否必需？需要会出现红色星号
     * @param {AkColProps} [labelLayout=FormHelper.colLabelLayout]标签栅格Props
     * @returns
     *
     *
     */
    public static renderFormItemLabel(
        props: any,
        id: string,
        required: boolean = false,
        labelLayout: AkColProps = FormHelper.colLabelLayout) {
        return <AkCol {...labelLayout} key="label">
            <label className={classNames({ "ant-form-item-required": required })}>
                {id}
            </label>
        </AkCol>;
    }



    /**
 * 表单Control元素
 *
 * @static
 * @param {*} props
 * @param {string} id 表单控件的多语言id
 * @param {string} key 表单控件key值
 * @param {*} formControl   表单Control元素
 * @param {boolean} [required=false]  该表单是否必填？默认为否
 * @param {*} [rules=null]验证规则，为null时自动生成必填验证以及长度验证
 * @param {AkColProps} [controlLayout=FormHelper.colControlLayout]表单Control栅格Props
 * @param {(string | React.ReactNode)} [extra=null] 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
 * @returns
 *
 * @memberof FormHelper
 */
    public static renderFormItemControl(
        props: any,
        id: string,
        key: string,
        formControl: any,
        required: boolean = false,
        rules: any = null,
        controlLayout: AkColProps = FormHelper.colControlLayout,
        extra: string | React.ReactNode = null,
        initialValue: any = null) {
        const { getFieldDecorator } = props.form;

        if (rules === null) {
            rules = [];
            // rules.push(AIIBWorkflowHelper.ruleForComparisonLength(props, id, ComparisonOperator.LessOrEqualsThan, 50));
            if (required) rules.push(AIIBWorkflowHelper.ruleForRequire(props, id));
        }

        return <AkCol {...controlLayout} key="control">
            <AkForm.Item extra={extra}>
                {getFieldDecorator(key, { rules: rules, initialValue: initialValue })(formControl)}
            </AkForm.Item>
        </AkCol>;
    }

    public static renderFormListItem(
        props: any,
        id: string,
        key: string,
        formControl: any,
        required: boolean = false,
        rules: any = null,
        labelLayout: AkColProps = FormHelper.colLabelLayout,
        controlLayout: AkColProps = FormHelper.colControlLayout,
        extra: string | React.ReactNode = null,
        initialValue?: any) {
        const label = AIIBWorkflowHelper.renderFormItemLabel(props, id, required, labelLayout);
        const control = AIIBWorkflowHelper.renderFormItemListControl(props, id, key, formControl, required, rules);
        return [label, control];
    }


    public static renderFormItemListControl(props: any, id: string, key: string, formControl: any, required: boolean, rules?: any) {
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, className: "" },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, className: "" }
        }
        if (rules === null) {
            rules = [];
            if (required) rules.push(AIIBWorkflowHelper.ruleForRequire(props, id));
        }
        return <AkForm.Item label={id} {...formItemLayout}>
            {getFieldDecorator(key, { rules: rules })(formControl)}
        </AkForm.Item>;

    }

    public static renderFormItemProductAmountControl(props: any, id: string, key: string, formControl: any, required: boolean, rules?: any) {
        const { getFieldDecorator } = props.form;
        if (rules === null) {
            rules = [];
            if (required) rules.push(AIIBWorkflowHelper.ruleForRequire(props, id));
        }
        return <AkForm.Item  {...FormHelper.formItemLayout}>
            {getFieldDecorator(key, { rules: rules })(formControl)}
        </AkForm.Item>;

    }
    /**
 * Approval页面表单
 *
 * @static
 * @param {*} props
 * @param {string} id  表单的多语言id
 * @param {*} value  表单的value值
 * @param {AkColProps} [labelLayout=FormHelper.colLabelLayout]表单标签栅格Props
 * @param {AkColProps} [controlLayout=FormHelper.colControlLayout]表单Control栅格Props
 * @returns
 *
 * @memberof FormHelper
 */
    public static renderApprovalItem(
        props: any,
        id: string,
        value: any,
        labelLayout: AkColProps = FormHelper.colLabelLayout,
        controlLayout: AkColProps = FormHelper.colControlLayout) {
        // controlLayout.className += ' text-overflow line line-3';
        const label = <AkCol {...labelLayout} key="label">{id}</AkCol>
        const control = <AkCol {...controlLayout} key="value">
            <div className="ant-form-item-control-wrapper">
                {value}
            </div>
        </AkCol>;
        return [label, control];
    }


    /**
 * 必填验证
 *
 * @static
 * @param {any} props
 * @param {string} name 多语言Key
 * @returns
 *
 * @memberof FormHelper
 */
    public static ruleForRequire(props: any, name: string) {
        return {
            required: true,
            message: "Please input " + name
        };
    }


    /**
 * 长度比较验证
 *
 * @static
 * @param {*} props
 * @param {string} name
 * @param {ComparisonOperator} op
 * @param {number} rightValue
 * @returns
 *
 *
 */
    public static ruleForComparisonLength(props: any, name: string, op: ComparisonOperator, rightValue: number) {
        return {
            validator: (rule, value, callback) => {
                if (value !== null && value !== undefined) {
                    const leftValue: number = value.toString().length;
                    switch (op) {
                        case ComparisonOperator.Equals:
                            if (leftValue === rightValue) {
                                callback();
                            } else {
                                callback(`${name} should equals ${rightValue}`);
                            }
                            break;
                        case ComparisonOperator.GreaterOrEqualsThan:
                            if (leftValue >= rightValue) {
                                callback();
                            } else {
                                callback(`${name} should greater or equals than ${rightValue}`);
                            }
                            break;
                        case ComparisonOperator.GreaterThan:
                            if (leftValue > rightValue) {
                                callback();
                            } else {
                                callback(`${name} should greater than  ${rightValue}`);
                            }
                            break;
                        case ComparisonOperator.LessOrEqualsThan:
                            if (leftValue <= rightValue) {
                                callback();
                            } else {
                                callback(`${name} should less or equals than ${rightValue}`);
                            }
                            break;
                        case ComparisonOperator.LessThan:
                            if (leftValue < rightValue) {
                                callback();
                            } else {
                                callback(`${name} should less than  ${rightValue}`);
                            }
                            break;
                    }
                } else {
                    callback();
                }
            }
        }
    }

    /**Modal框表单
 *
 *
 * @static
 * @param {*} props
 * @param {string} id  表单控件的多语言id和标签的多语言id
 * @param {string} key   表单控件的key值
 * @param {*} formControl  表单Control Element
 * @param {boolean} [required=false]  该表单是否必填？默认为否  如果为true的话，标签需要会出现红色星号，表单Control为必填项
 * @param {*} [rules=null]  验证规则，为null时自动生成必填验证以及长度验证
 * @param {AkColProps} [labelLayout=FormHelper.colLabelLayout]  表单标签栅格Props
 * @param {(string | React.ReactNode)} [extra=null] 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
 * @returns
 *
 *
 */
    public static renderFormItemInModal(props: any,
        id: string,
        key: string,
        formControl: any,
        required: boolean = false,
        rules: any = null,
        formItemLayout: any = FormHelper.formItemLayout,
        extra: string | React.ReactNode = null) {
        const { getFieldDecorator } = props.form;

        if (rules === null) {
            rules = [];
            if (required) rules.push(AIIBWorkflowHelper.ruleForRequire(props, id));
        }
        return <AkForm.Item label={id} {...formItemLayout}>
            {getFieldDecorator(key, { rules: rules })(formControl)}
        </AkForm.Item>;
    }

    public static ruleForOtherSourceOfFouds(props) {
        return {
            validator: (rule, value, callback) => {
                const otherFund = props.form.getFieldValue("OtherFund");
                if (otherFund === "Yes" && !value) {
                    callback("Please input Other Sources of Funds (US$ MM)");
                } else {
                    callback();
                }
            }
        };
    }

    public static ruleForOtherFouds(props) {
        return {
            validator: (rule, value, callback) => {
                if (value) {
                    props.form.validateFields(["OtherFundAmount"], { force: true });
                }
                // if (value && value === "Yes") {
                //     props.form.validateFields(["OtherFundAmount"], { force: true });
                // }
                callback();
            }
        };
    }


    /**
  * 范围验证（开始）
  *
  * @static
  * @param {*} props
  * @param {string} relatedId 相关结束值，表单Key
  * @returns
  *
  *
  */
    public static ruleForRangeFrom(props: any, relatedId: string) {
        const form = props.form;
        return {
            validator: (rule, value, callback) => {
                if (value) {
                    form.validateFields([relatedId], { force: true });
                }
                callback();
            }
        };
    }

    /**
 * 范围验证（结束）
 *
 * @static
 * @param {*} props
 * @param {string} relatedId 相关开始值，表单Key
 * @param {string} fromName 相关开始值，多语言Key
 * @param {string} toName 相关结束值，多语言Key
 * @returns
 *
 * @memberof FormHelper
 */
    public static ruleForRangeTo(props: any, relatedId: string, fromName: string, toName: string) {
        return {
            validator: (rule, value, callback) => {
                if (value && props.form.getFieldValue(relatedId) && moment(value).format("YYYY-MM-DD") < moment(props.form.getFieldValue(relatedId)).format("YYYY-MM-DD")) {
                    callback(`${fromName} should large than ${toName}`);
                } else {
                    callback();
                }
            }
        }
    }

    /**
 * 数值比较验证
 *
 * @static
 * @param {any} props
 * @param {string} name 多语言Key
 * @param {ComparisonOperator} op 操作符
 * @param {number} rightValue 比较值
 * @returns
 *
 * @memberof FormHelper
 */
    public static ruleForComparisonNumber(props: any, name: string, op: ComparisonOperator, rightValue: number) {
        return {
            validator: (rule, value, callback) => {
                let leftValue = parseFloat(value);
                if (!isNaN(leftValue)) {
                    switch (op) {
                        case ComparisonOperator.Equals:
                            if (leftValue === rightValue) {
                                callback();
                            } else {
                                callback(`${name} should equals ${rightValue.toString()}`);
                            }
                            break;
                        case ComparisonOperator.GreaterOrEqualsThan:
                            if (leftValue >= rightValue) {
                                callback();
                            } else {
                                callback(`${name} should greater or equals than ${rightValue.toString()}`);
                            }
                            break;
                        case ComparisonOperator.GreaterThan:
                            if (leftValue > rightValue) {
                                callback();
                            } else {
                                callback(`${name} should greater than ${rightValue.toString()}`);
                            }
                            break;
                        case ComparisonOperator.LessOrEqualsThan:
                            if (leftValue <= rightValue) {
                                callback();
                            } else {
                                callback(`${name} should less or equals than ${rightValue.toString()}`);
                            }
                            break;
                        case ComparisonOperator.LessThan:
                            if (leftValue < rightValue) {
                                callback();
                            } else {
                                callback(`${name} should less than ${rightValue.toString()}`);
                            }
                            break;
                    }
                } else {
                    callback();
                }
            }
        }
    }

    /**
 * 设置表单值为Float类型
 *
 * @static
 * @param {any} event on blur event
 * @param {any} props
 * @param {string} id 表单Key
 * @param {number} [fix=null] 保留几位小数
 *
 * @memberof FormHelper
 */
    public static setFloatFieldValue(event, props, id: string, fix: number = null) {
        const value = new Object();
        let floatValue = parseFloat(event.target.value);
        if (isNaN(floatValue)) floatValue = null;
        if (floatValue !== null && fix && fix > 0) value[id] = floatValue.toFixed(fix);
        else value[id] = floatValue;
        props.form.setFieldsValue(value);
        props.form.validateFields([id], { force: true });
    }


    /**
 * 整数验证
 *
 * @static
 * @param {*} props
 * @param {string} name 多语言Key
 * @returns
 *
 * @memberof FormHelper
 */
    public static ruleForInteger(props: any, name: string) {
        return FormHelper.ruleForRegExp(props, name, CommonLocale.FormInteger, /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/);
    }

    public static ruleForComparisonlength(props: any, name: string, op: ComparisonOperator, rightValue: number) {
        return {
            validator: (rule, value, callback) => {
                if (value && value.length >= rightValue) {
                    callback(`${name} should less or equals than ${rightValue}`);
                } else {
                    callback();
                }
            }
        }
    }

}
