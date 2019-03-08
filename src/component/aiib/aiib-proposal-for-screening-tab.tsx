import { AkRow, AkCol, FormHelper, AkInput, RouterProps, AkFormComponentProps, AkRadio, ComparisonOperator, AkForm, AkGlobal } from 'akmii-yeeoffice-common';
import * as React from 'react';
import { withRouter } from 'react-router';
import { ProposalArr } from '../../api/aiibworkflow/model/proposal';
import { AiibListUtil, AiibProposalActions, AiibFormCountry, AiibFormSector, AiibFormContent } from './index';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import { CountryValueModal, ProjectAllFieldsModal } from '../../api/aiibworkflow/index';
import { NONSOVEREIGN_BACKEDFINACING } from '../../util/aiib-common';
import { AIIBLocale } from '../../locales/localeid';
interface AiibProposalForScreeningState {
    listData?: ProjectAllFieldsModal;
    showNSBF?: boolean;
}
interface AiibProposalForScreeningProps extends RouterProps, AkFormComponentProps {
    listData?: ProjectAllFieldsModal;
    onSave?: (value, actionType?: string) => void;
    disabled?: boolean;
    isEdit?: boolean;
    isReadOnly?:boolean;
}

@AkForm.create()
@withRouter
export class AiibProposalForScreening extends React.Component<AiibProposalForScreeningProps, AiibProposalForScreeningState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: props.listData,
            showNSBF: props.listData ? (props.listData).FinancingMethod === NONSOVEREIGN_BACKEDFINACING : false
        };
    }

    componentWillReceiveProps(nextProps) {
        if ("listData" in nextProps && nextProps.isEdit && nextProps.listData.RowVersion !== this.props.listData.RowVersion) {
            this.setState({ listData: nextProps.listData, showNSBF: (nextProps.listData).FinancingMethod === NONSOVEREIGN_BACKEDFINACING });
        }
    }

    async componentDidMount() {
        const { props: { isEdit, listData } } = this;
        if (isEdit && listData) {
            await this.setFormValue(listData);
        }
    }

    getObj(values) {
        let obj = {};
        const FinancingMethod = values.FinancingMethod;
        let SubsectorArr;
        if (values.Subsector && typeof (values.Subsector) === "string") {
            if (Array.isArray(JSON.parse(values.Subsector))) {
                SubsectorArr = JSON.parse(values.Subsector);
            } else {
                SubsectorArr = [values.Subsector];   // 兼容 Subsector历史数据 “9097787878”
            }

        } else {
            SubsectorArr = values.Subsector;
        }
        values.Subsector = SubsectorArr;
        if (FinancingMethod === NONSOVEREIGN_BACKEDFINACING) {
            ProposalArr.nonsovereignproposalScreeningArr.forEach(i => {
                obj[i] = values[i];
            });
        } else {
            ProposalArr.proposalScreeningArr.forEach(i => {
                obj[i] = values[i];
            });
        }

        return obj;
    }

    setFormValue(values) {
        const { listData } = this.props;
        if (listData) {
            let SubsectorArr;
            if (values.Subsector && typeof (values.Subsector) === "string") {
                SubsectorArr = JSON.parse(values.Subsector);
            } else {
                SubsectorArr = values.Subsector;
            }
            values.Subsector = SubsectorArr;
            this.props.form.setFieldsValue(this.getObj(values));

            setTimeout(() => {
                this.props.form.setFieldsValue({
                    NonSovereignNSBFType: values.NonSovereignNSBFType,
                    SovereignSBFType: values.SovereignSBFType,
                    FinancingType: values.FinancingType ? values.FinancingType : "Standalone"
                });
                this.props.form.validateFields(null, { force: true }, null);
            });
        }
    }

    renderForm() {
        const { props, state: { listData, showNSBF }, props: { disabled,isReadOnly } } = this;
        const { colLabelLayout, largeControlLayout } = FormHelper;
        let subSector: string[] = listData.Subsector ? listData.Subsector : [];
        return <AkForm>
            {this.props.form.getFieldDecorator("CountrySymbol", {})}
            {this.props.form.getFieldDecorator("CountryName", {})}
            {this.props.form.getFieldDecorator("Region", {})}
            <AiibFormContent title="Project Information">
                {listData.SubmissionDate ? <AkRow {...FormHelper.rowLayout} className="Impledate">
                    {AiibListUtil.ConvertDefToFormItem(props, "SubmissionDate", true, false)}
                </AkRow> : null}
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, 'ProjectName', disabled, true, null)}
                    {AiibListUtil.ConvertDefToFormItem(props, 'ProjectShortName', disabled, true, null)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AIIBWorkflowHelper.renderFormItem(props, 'Country ID', 'Country', <AiibFormCountry
                        onChange={(v, value: CountryValueModal) => {
                            this.props.form.setFieldsValue({
                                Region: value.Region,
                                CountrySymbol: value.CountrySymbol,
                                CountryName: value.CountryName,
                            });
                        }}
                        disabled={isReadOnly || disabled}
                    />, true)}
                </AkRow>

                <AiibFormSector form={this.props.form} sector={listData ? listData.Sector : ""} subSector={subSector} {...props} />
                <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                       {AiibListUtil.ConvertDefToFormItem(props,"ProjectObjective",disabled,true,null,colLabelLayout, largeControlLayout)}
                 </AkRow>
                <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                    {AiibListUtil.ConvertDefToFormItem(props, 'ProjectDescription', disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="financing">
                    {AiibListUtil.ConvertDefToFormItem(props, 'Financing', true, false, [AIIBWorkflowHelper.ruleForComparisonNumber(props, "AIIB Financing(Requested) (Million)", ComparisonOperator.GreaterOrEqualsThan, 0)])}
                    {AiibListUtil.ConvertDefToFormItem(props, 'EstimatedLoanAmount', disabled, false, null, FormHelper.colLabelLayout, FormHelper.colControlLayout, " This field is only for SPB to fill")}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, 'FinancingType', disabled, true)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, 'LeadFinancier', disabled, false)}
                    {AiibListUtil.ConvertDefToFormItem(props, 'OtherFinanciers', disabled, false)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, 'SocialCategory', disabled, true)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    <AkCol {...FormHelper.colLabelLayout}>
                    </AkCol>
                    <AkCol {...FormHelper.largeControlLayout}>
                        {AIIBWorkflowHelper.renderFormItem(props, "", 'CategoryNotDecidedComment', <AkInput.TextArea disabled={disabled} />, false, [], { xs: 24, sm: 24, md: 24, lg: 24 }, { xs: 24, sm: 24, md: 24, lg: 24 }, "Please provide your comment in this textbox if the category has not been decided")}
                    </AkCol>
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="Impledate">
                    {AiibListUtil.ConvertDefToFormItem(props, 'StartDate', disabled, showNSBF ? false : true, showNSBF ? [] : [AIIBWorkflowHelper.ruleForRequire(props, "Projected Implementation Start Date"), AIIBWorkflowHelper.ruleForRangeFrom(props, "EndDate")])}
                    {AiibListUtil.ConvertDefToFormItem(props, 'EndDate', disabled, showNSBF ? false : true, showNSBF ? [] : [AIIBWorkflowHelper.ruleForRequire(props, "Projected Implementation End Date"), AIIBWorkflowHelper.ruleForRangeTo(props, "StartDate", "End Date", "Start Date")])}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="Impledate">
                    {AiibListUtil.ConvertDefToFormItem(props, 'ExecutiveCommitteeApprovedDate', disabled, false, null, )}
                </AkRow>

                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, 'ProjectCostAndFinancingPlan', disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="financing">
                    {AiibListUtil.ConvertDefToFormItem(props, 'CoFinancingAmount', disabled, false, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, 'AIIBLoan', disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="Priorities">
                    {AiibListUtil.ConvertDefToFormItem(props, 'ThematicPriorities', disabled, true, null,
                        { xs: 24, sm: 24, md: 7, lg: 3 },
                        { xs: 24, sm: 24, md: 19, lg: 9 })}
                    {AIIBWorkflowHelper.renderFormItem(
                        props,
                        '',
                        'ThematicPrioritiesComment',
                        <AkInput disabled={disabled} />,
                        false,
                        [],
                        { xs: 24, sm: 24, md: 0, lg: 0 },
                        { xs: 24, sm: 24, md: 24, lg: 12 },
                        AkGlobal.intl.formatMessage({ id: AIIBLocale.ProjectFormThematicPrioritiesCommentTip })
                    )}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {
                        AIIBWorkflowHelper.renderFormItem(this.props, "Client Type", "FinancingMethod",
                            <AkRadio.Group disabled={disabled} onChange={(value) => {
                                if (value.target.value === "Sovereign-backed Financing") {
                                    this.props.form.resetFields(ProposalArr.nonsovereignArr);
                                    if (this.props.form.getFieldValue("Product") === "Equity") {
                                        this.props.form.setFieldsValue({ Product: "" });
                                    }
                                }
                                this.setState({ showNSBF: value.target.value === NONSOVEREIGN_BACKEDFINACING });
                            }}>
                                <AkRadio value="Sovereign-backed Financing">Sovereign-backed Financing</AkRadio>
                                <AkRadio value="Nonsovereign-backed Financing">Nonsovereign-backed Financing</AkRadio>
                            </AkRadio.Group>, true, null)
                    }
                </AkRow>
                {
                    !showNSBF ?
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, 'Borrower', disabled, true, null)}
                            {AiibListUtil.ConvertDefToFormItem(props, 'ImplementationAgency', disabled, true, null)}

                        </AkRow> : null
                }
                {
                    showNSBF ?
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, 'Sponsor', disabled, false, null)}
                            {AiibListUtil.ConvertDefToFormItem(props, 'ImplementationEntity', disabled, false, null)}
                        </AkRow> : null
                }
            </AiibFormContent>
            <AiibFormContent title="PPQ Criteria I: Strategic Alignment">
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "AIIBPrioritiesRelation", disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "CountryPrioritiesRelation", disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "AIIBPrioritiesRelationRating", disabled, true, null)}
                    {AiibListUtil.ConvertDefToFormItem(props, "CountryPrioritiesRelationRating", disabled, true, null)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    <AkCol {...FormHelper.colLabelLayout}>
                    </AkCol>
                    <AkCol {...FormHelper.largeControlLayout}>
                        <div className="proposal-note">
                            <p>Note:</p>
                            <p>Briefly Describe:</p>
                            <p>(1) Alilgment with AIIB thematic or sector priorties as relevant</p>
                            <p>(2) Alilgment with Country's own infrastructure, sector or reform strategies as relevant Provide Snaoshot ratinas</p>
                        </div>
                    </AkCol>
                </AkRow>
            </AiibFormContent>
            <AiibFormContent title="PPQ Criteria II: Value Addition">
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "ProjectValueAddition", disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "AIIBValueAddition", disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "ProjectValueAdditionRating", disabled, true)}
                    {AiibListUtil.ConvertDefToFormItem(props, "AIIBValueAdditionRating", disabled, true)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    <AkCol {...FormHelper.colLabelLayout}>
                    </AkCol>
                    <AkCol {...FormHelper.largeControlLayout}>
                        <div className="proposal-note">
                            <p>(1) What is AIIB value-add through project improvement, resource mobilization,partnership as relevant?</p>
                            <p>(2) What is value-add to AIIB in diversification, institutional brand, staff learning?</p>
                        </div>
                    </AkCol>
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "AdditionalRelevantInformation", disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
            </AiibFormContent>
        </AkForm>;
    }

    render() {
        return <div>
            {
                this.props.isReadOnly ? null :
                <AiibProposalActions activeKey={"screening"} onSave={(isCloseModal) => {
                    const value = this.props.form.getFieldsValue();
                    this.props.onSave(value, isCloseModal ? "Close" : "");
                }} listData={this.props.listData} />
            }
            {this.renderForm()}
        </div>;
    }

}
