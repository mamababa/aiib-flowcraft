import * as React from 'react';
import { withRouter } from 'react-router';
import {
    AkRow,
    FormHelper,
    AkFormComponentProps,
    RouterProps,
    AkInputNumber,
    AkInput,
    AkRadio,
    AkForm,
    AkIcon,
    AkFormIdentityPicker,
    ComparisonOperator,
} from 'akmii-yeeoffice-common';
import { CountryValueModal, ProjectAllFieldsModal } from '../../api/aiibworkflow';
import { ProposalArr } from '../../api/aiibworkflow/model/proposal';
import { STATE_MANAGERIOREVIEW, NONSOVEREIGN_BACKEDFINACING, SOVEREIGN_BACKEDFINACING } from '../../util/aiib-common';
import { AiibProjectCancelStatus } from '../../api/aiibworkflow/common';
import {
    AiibFormNonSovereign,
    AiibProposalActions,
    AiibCommonFormInfo,
    AiibCommonFun,
    AiibFormCountry,
    AiibFormSector,
    AiibListUtil,
    AiibFormFinacialInformationCommon,
    AiibFormContent,
} from './index';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import DocumentSharePointAPI from '../../api/document/document-sp-api';
import { AiibProjectResponse } from './common/aiib-response-tip';
import { AIIBLocale } from '../../locales/localeid';
import { AkGlobal } from 'akmii-yeeoffice-common';

interface AiibNewProposalState {
    listData?: ProjectAllFieldsModal;
    isDisabled?: boolean;
    showNSBF?: boolean;
    otherFundValue?: string;
}

interface AiibNewProposalProps extends RouterProps, AkFormComponentProps {
    listData?: ProjectAllFieldsModal;
    onSave?: (value, actionType?: string) => void;
    disabled?: boolean;
    isEdit?: boolean;
    isReadOnly?:boolean;
}
@AkForm.create()
@withRouter
export class AiibNewProposal extends React.Component<AiibNewProposalProps, AiibNewProposalState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: props.listData,
            isDisabled: false,
            showNSBF: props.listData ? (props.listData).FinancingMethod === NONSOVEREIGN_BACKEDFINACING : false,
            otherFundValue: props.listData ? props.listData.OtherFund : "Yes",
        };

    }

    componentWillReceiveProps(nextProps) {
        if (
            'listData' in nextProps &&
            nextProps.isEdit &&
            nextProps.listData.RowVersion !== this.props.listData.RowVersion
        ) {
            this.setState({
                listData: nextProps.listData,
                showNSBF: (nextProps.listData).FinancingMethod === NONSOVEREIGN_BACKEDFINACING,
                otherFundValue: (nextProps.listData).OtherFund,
            });
        }
    }

    async componentDidMount() {
        const { state: { listData }, props: { isEdit } } = this;
        if (isEdit && listData) {
            await this.setFormValue(listData);
        } else {
            this.props.form.setFieldsValue({
                FinancingMethod: 'Sovereign-backed Financing',
                OtherFund: 'Yes',
                Subsector: [],
            });
        }
    }

    getObj(Arr) {
        const values = this.state.listData;
        let SubsectorArr;
        // 首次进来 Subsector id闪现 Arr 去除Subsector
        if (Arr.indexOf("Subsector") !== -1) {
            Arr.splice(Arr.indexOf("Subsector"), 1);
        }
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
        let obj = {};
        Arr.forEach((i) => {
            obj[i] = values[i];
        });
        return obj;
    }

    resetNonSover() {
        let obj = {};
        ProposalArr.nonsovereignArr.forEach((i) => {
            obj[i] = '';
        });
        return obj;
    }

    setFormValue(values) {
        const FinancingMethod = values.FinancingMethod;
        this.props.form.setFieldsValue(this.getObj(ProposalArr.commonArr));
        if (FinancingMethod === NONSOVEREIGN_BACKEDFINACING) {
            this.props.form.setFieldsValue(this.getObj(ProposalArr.nonsovereignArr));
            this.props.form.validateFields(null, { force: true }, null);
        } else {
            this.props.form.setFieldsValue(this.getObj(ProposalArr.sovereignArr));
            this.props.form.validateFields(null, { force: true }, null);
        }

    }

    renderInputNumberItem(name: string, id: string, isRequire: boolean = false) {
        const { props: { disabled }, props } = this;
        return AIIBWorkflowHelper.renderFormItem(
            props,
            name,
            id,
            <AkInputNumber
                disabled={disabled}
                onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, id, 3)}
            />,
            isRequire,
            [AIIBWorkflowHelper.ruleForComparisonNumber(props, name, ComparisonOperator.GreaterOrEqualsThan, 0)]
        );
    }

    getValue() {
        let value = null;
        if (this.props.form.getFieldValue('FinancingMethod') === 'Sovereign-backed Financing') {
            value = this.props.form.getFieldsValue();
            value = {
                ...value,
                ...this.resetNonSover()
            };
        } else {
            value = this.props.form.getFieldsValue();
        }
        return value;
    }

    onSubmitHandle() {
        const { listData } = this.state;
        let variable = Object.assign({}, listData);
        variable.SCRecommend = "";
        DocumentSharePointAPI.Instance.getFileCount(_spPageContextInfo.siteServerRelativeUrl + "/AIIBWorkflow/" + listData.ProposalID).then((data: any) => {
            if (data) {
                if (data.d.ItemCount === 0) {
                    AiibProjectResponse.errorTip(AIIBLocale.AIIBRequireformtips);
                    return;
                } else {
                    this.props.form.validateFieldsAndScroll((err, values) => {
                        for (const key in values) {
                            if (values.hasOwnProperty(key)) {
                                variable[key] = values[key];
                            }
                        }
                        if (AiibCommonFun.ValidateProposalForm(variable)) return;
                        variable.State = STATE_MANAGERIOREVIEW;
                        variable.Status = 'Active';
                        variable.DropStatus = "0";
                        variable.CancelStatus = AiibProjectCancelStatus.Default + '';
                        variable.SubmissionDate = '__currentdate:yyyy-MM-dd HH:mm:ss';
                        this.props.onSave(variable, 'Submitted');
                    });
                }
            } else {
                AiibProjectResponse.errorStringTip("Get error, the file or folder has been deleted or modified.");
            }
        }, (err) => {
            AiibProjectResponse.errorStringTip("Get error, the file or folder has been deleted or modified.");
        });
    }

    renderForm() {
        const {
            props,
            state: {
                showNSBF,
                listData,
                otherFundValue
            },
            props: { disabled, isEdit }
        } = this;
        const { colLabelLayout, largeControlLayout } = FormHelper;

        return (
            <AkForm>
                {this.props.form.getFieldDecorator('CountrySymbol', {})}
                {this.props.form.getFieldDecorator('CountryName', {})}

                <AiibFormContent title="Project Information">
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(props, 'ProjectName', disabled, true, null)}
                        {AiibListUtil.ConvertDefToFormItem(props, 'ProjectShortName', disabled, true, null)}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout}>
                        {AIIBWorkflowHelper.renderFormItem(
                            props,
                            'Country ID',
                            'Country',
                            <AiibFormCountry
                                disabled={disabled}
                                onChange={(v, value: CountryValueModal) => {
                                    this.props.form.setFieldsValue({
                                        Region: value.Region,
                                        CountrySymbol: value.CountrySymbol,
                                        CountryName: value.CountryName,
                                    });
                                }}
                            />,
                            true
                        )}
                        {AiibListUtil.ConvertDefToFormItem(props, 'Region', true, false)}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(props, 'Location', disabled, false, null, colLabelLayout, largeControlLayout, AkGlobal.intl.formatMessage({ id: AIIBLocale.ProjectFormLocationTip }))}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                       {AiibListUtil.ConvertDefToFormItem(props,"ProjectObjective",disabled,true,null,colLabelLayout, largeControlLayout)}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                        {AiibListUtil.ConvertDefToFormItem(props, 'ProjectDescription', disabled, true, null, colLabelLayout, largeControlLayout, AkGlobal.intl.formatMessage({ id: AIIBLocale.ProjectFormProjectDescriptionTip }))}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(props, 'PreparationStatus', disabled, true, null)}
                    </AkRow>

                    <AiibFormSector form={this.props.form} sector={listData ? listData.Sector : ""} subSector={listData ? listData.Subsector : []} {...props} />

                    <AkRow {...FormHelper.rowLayout} className="financing">
                        {AiibListUtil.ConvertDefToFormItem(props, 'FiscalYear', disabled, false, [
                            AIIBWorkflowHelper.ruleForInteger(props, 'Fiscal Year'),
                            AIIBWorkflowHelper.ruleForComparisonNumber(props, 'Fiscal Year', ComparisonOperator.GreaterOrEqualsThan, 0)])}
                        {AiibListUtil.ConvertDefToFormItem(props, 'Quarter', disabled, false, null)}
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
                    {/* 非主权 */}
                    {showNSBF ? (
                        <AiibCommonFormInfo disabled={disabled} {...props} />
                    ) : null}
                    <AkRow {...FormHelper.rowLayout}>
                        {AIIBWorkflowHelper.renderFormItem(
                            this.props,
                            'Client Type',
                            'FinancingMethod',
                            <AkRadio.Group
                                onChange={(e) => {
                                    if (e.target.value === SOVEREIGN_BACKEDFINACING && this.props.form.getFieldValue("Product") === "Equity") {
                                        this.props.form.setFieldsValue({ Product: [""] });
                                    }
                                    this.setState({ showNSBF: e.target.value === NONSOVEREIGN_BACKEDFINACING });
                                }}
                                disabled={disabled}>
                                <AkRadio value="Sovereign-backed Financing">Sovereign-backed Financing</AkRadio>
                                <AkRadio value="Nonsovereign-backed Financing">Nonsovereign-backed Financing</AkRadio>
                            </AkRadio.Group>,
                            true
                        )}
                    </AkRow>
                    {
                        showNSBF ?
                            <AkRow {...FormHelper.rowLayout}>
                                {AiibListUtil.ConvertDefToFormItem(props, 'Sponsor', disabled, false, null)}
                                {AiibListUtil.ConvertDefToFormItem(props, 'ImplementationEntity', disabled, false, null)}
                            </AkRow> : null
                    }
                    {
                        !showNSBF ?
                            <AkRow {...FormHelper.rowLayout}>
                                {AiibListUtil.ConvertDefToFormItem(props, 'Borrower', disabled, true, null)}
                                {AiibListUtil.ConvertDefToFormItem(props, 'ImplementationAgency', disabled, true, null)}
                            </AkRow> : null
                    }
                </AiibFormContent>

                <AiibFormContent title="Financial Information">
                    <AiibFormFinacialInformationCommon
                        productValue={listData ? listData.Product : [""]}
                        otherFoundsDetails={listData ? listData.OtherFoundsDetails : []}
                        showNSBF={showNSBF}
                        otherFundValue={otherFundValue}
                        disabled={disabled} isProposal={true} {...this.props} />
                    {showNSBF ? (
                        <AiibFormNonSovereign disabled={disabled} {...this.props} />
                    ) : null}
                </AiibFormContent>
                <AiibFormContent title="Other Information">
                    {showNSBF ? (
                        <div>
                            <AkRow {...FormHelper.rowLayout}>
                                {AiibListUtil.ConvertDefToFormItem(props, 'S_Address', disabled, false)}
                                {AiibListUtil.ConvertDefToFormItem(props, 'S_PercentageOwnership', disabled, false)}
                            </AkRow>
                            <AkRow {...FormHelper.rowLayout}>
                                {AiibListUtil.ConvertDefToFormItem(props, 'S_MainShareHolder', disabled, false)}
                                {AiibListUtil.ConvertDefToFormItem(props, 'S_Listed', disabled, false, null)}
                            </AkRow>
                            <AkRow {...FormHelper.rowLayout} className="aiib-technical">
                                {AiibListUtil.ConvertDefToFormItem(
                                    props,
                                    'SponsorIntroduction',
                                    disabled,
                                    false,
                                    null,
                                    colLabelLayout,
                                    largeControlLayout,
                                    AkGlobal.intl.formatMessage({ id: AIIBLocale.ProjectFormSponsorIntroductionTip })
                                )}
                            </AkRow>
                            <AkRow {...FormHelper.rowLayout}>
                                {AiibListUtil.ConvertDefToFormItem(
                                    props,
                                    'ExternalConsultants',
                                    disabled,
                                    false,
                                    null,
                                    colLabelLayout,
                                    largeControlLayout,
                                    AkGlobal.intl.formatMessage({ id: AIIBLocale.ProjectFormTechnicalAdvisorTip })
                                )}
                            </AkRow>
                        </div>
                    ) : null}
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(
                            props,
                            'PreliminaryAssessment',
                            disabled,
                            false,
                            null,
                            colLabelLayout,
                            largeControlLayout,
                            AkGlobal.intl.formatMessage({ id: AIIBLocale.ProjectFormPreliminaryAssessmentTip })
                        )}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(props, 'GovernmentSupport', disabled, false)}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(props, 'OutlineAndConditions', disabled, false, [], colLabelLayout, largeControlLayout)}
                    </AkRow>
                    <AkRow {...FormHelper.rowLayout}>
                        {isEdit ? (
                            AIIBWorkflowHelper.renderFormItem(
                                props,
                                'Created By',
                                'CreatedBy',
                                <AkFormIdentityPicker readonly />,
                                false,
                                []
                            )
                        ) : null}
                    </AkRow>
                </AiibFormContent>
                <AiibFormContent title="To Be Cleared By">
                    <AkRow {...FormHelper.rowLayout}>
                        {AiibListUtil.ConvertDefToFormItem(props, 'ManagerIO', disabled, true)}
                        {AiibListUtil.ConvertDefToFormItem(props, 'DGIO', disabled, true)}
                    </AkRow>
                </AiibFormContent>
                {showNSBF ?
                    <AiibFormContent title="Project Company">
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, 'CompanyName', disabled, true, null)}
                        </AkRow>
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, 'PI_Address', disabled, false, null)}
                            {AiibListUtil.ConvertDefToFormItem(props, 'PI_Rating', disabled, false, null)}
                        </AkRow>
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, 'PI_MainShareHolder', disabled, false, null)}
                            {AiibListUtil.ConvertDefToFormItem(props, 'PI_Listed', disabled, false, null)}
                        </AkRow>
                    </AiibFormContent>

                    : null}
            </AkForm>
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.isReadOnly ? null :
                    <AiibProposalActions
                    listData={this.state.listData}
                    activeKey={'proposal'}
                    onSave={(isCloseModal) => {
                        const value = this.getValue();
                        // value.Subsector = JSON.stringify(value.Subsector);
                        this.props.onSave(value, isCloseModal ? "Close" : "");
                    }}
                    onSubmit={() => {
                        this.onSubmitHandle();
                    }}
                />
                }
               
                {this.renderForm()}
            </div>
        );
    }
}
