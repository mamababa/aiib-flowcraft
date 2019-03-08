import * as React from 'react';
import { withRouter } from 'react-router';
import { AkForm, AkFormComponentProps, RouterProps, AkRow, AkButton, ComparisonOperator, AkInputNumber, FormHelper, ContentListWhereType, ContentListApi, AkRadio, AkInput, AkGlobal } from 'akmii-yeeoffice-common';
import { ProjectContentList } from '../../api/aiibworkflow/content-list';
import { ProposalSaveHandle, AiibFormNonSovereign, AiibProjectInfoSubmitModal, AiibListUtil, AiibCommonFormInfo, AiibCommonFormFinanInfo, AiibPromissionControl, AiibProjectNextStageModal, AiibFormSector, AiibFormContent } from './index';
import { ProcessSubmitKey } from '../../api/aiibworkflow/proposalModal';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow';
import { NONSOVEREIGN_BACKEDFINACING, SATGE_CONCEPT, SOVEREIGN_BACKEDFINACING, } from '../../util/aiib-common';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import { AiibCommonFun, AiibCommon } from './common/aiib-common';
import { connect } from 'react-redux';
import { PrintPageType } from './print/aiib-print-util';
import { AiibProjectResponse } from './common/aiib-response-tip';
import { AIIBLocale } from '../../locales/localeid';
import { ProposalArr } from '../../api/aiibworkflow/model/proposal';
export interface ProjectInfoProps extends AkFormComponentProps, RouterProps {
    loadData?: () => void;
    disabled?: boolean;
    listData?: ProjectAllFieldsModal;
    isAdmin?: boolean;
    isReadOnly?:boolean;
}

export interface ProjectInfoState {
    listData?: ProjectAllFieldsModal;
    showModal?: boolean;
    showNextStageModal?: boolean;
    title?: string;
    processKey?: string;
    disabled?: boolean;
    showNSBF?: boolean;
}

@AkForm.create()
@withRouter
@connect(state => { return { isAdmin: state.aiib.isAIIBAdmin } })
export default class ProjectInfo extends React.Component<ProjectInfoProps, ProjectInfoState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            showNextStageModal: false,
            listData: props.listData,
            disabled: props.disabled,
            showNSBF: props.listData ? (props.listData).FinancingMethod === NONSOVEREIGN_BACKEDFINACING : false
        };
    }
    static contextTypes = {
        onOpenPrint: React.PropTypes.func,
    };
    componentWillReceiveProps(nextProps) {
        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.setState({ disabled: nextProps.disabled });
        }
        if ("listData" in nextProps && nextProps.listData.RowVersion !== this.props.listData.RowVersion) {
            this.setState({ listData: nextProps.listData, showNSBF: (nextProps.listData).FinancingMethod === NONSOVEREIGN_BACKEDFINACING });
        }
    }

    async  componentDidMount() {
        const { listData } = this.state;
        if (listData) {
            await this.setFormValues(listData);
            this.setState({ processKey: listData.ProcessKey ? listData.ProcessKey : ProcessSubmitKey[`${listData.FinancingMethod}-${listData.Stage}`] });
        }
    }

    getObj(Arr) {
        const values = this.state.listData;
        let SubsectorArr;
        if (Arr.findIndex(i => i.InternalName === "Subsector") > -1) {  //Id 閃現
            Arr.splice(Arr.findIndex(i => i.InternalName === "Subsector"), 1);
        }
        if (values.Subsector && typeof (values.Subsector) === "string") {
            if (Array.isArray(JSON.parse(values.Subsector))) {
                SubsectorArr = JSON.parse(values.Subsector);
            } else {
                SubsectorArr = [values.Subsector];   // 兼容 Subsector历史数据 "9097787878" 字符串
            }
        } else {
            SubsectorArr = values.Subsector;
        }
        values.Subsector = SubsectorArr;
        let obj = {};
        Arr.forEach(i => {
            obj[i.InternalName] = values[i.InternalName];
        });
        return obj;
    }

    setFormValues(values) {
        const FinancingMethod = values.FinancingMethod;
        if (FinancingMethod === NONSOVEREIGN_BACKEDFINACING) {
            this.props.form.setFieldsValue(this.getObj(AiibCommon.projectNonsovereignFormField));
            this.props.form.validateFields(null, { force: true }, null);
        } else {
            this.props.form.setFieldsValue(this.getObj(AiibCommon.projectSovereignFormField));
            this.props.form.validateFields(null, { force: true }, null);
        }
        setTimeout(() => {
            this.props.form.setFieldsValue({
                FinancingType: values.FinancingType ? values.FinancingType : "Standalone"
            });
            this.props.form.validateFields(null, { force: true }, null);
        });
    }

    onSave(variable?: any) {
        const values = variable ? variable : this.props.form.getFieldsValue();
        if (!values.ProjectName) {
            AiibProjectResponse.errorTip(AIIBLocale.AIIBRequireformtips);
            return;
        }

        for (const key in values) {
            if (values[key] && Array.isArray(values[key])) {
                values[key] = JSON.stringify(values[key]);
            }
        }

        let request: any = {
            ListDataID: this.state.listData.ListDataID,
            RowVersion: this.state.listData.RowVersion,
            Dic: {
                ...values
            }
        };
        ProjectContentList.editContentList(request).then(data => {
            if (data.Status === 0) {
                this.props.loadData();
                if (!variable) {
                    AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                }

            } else {
                if (!variable) {
                    AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
                }
            }
        });
    }

    validateSPBSpecialist(data) {
        const spbSpecialist = data.filter(item => item.Type === "SPBSpecialist");
        if (spbSpecialist.length === 0) {
            AiibProjectResponse.errorTip(AIIBLocale.AIIBRequireformtips);
            return true;
        }
        else {
            return false;
        }

    }

    loadMemberData(title, e) {
        e.target.blur();
        e.preventDefault();
        const { listData } = this.state;
        const requestData = {
            Title: 'Project-Member',
            Columns: ['Permission', 'Role', 'UserID', 'ListDataID', 'Type'],
            Wheres: [
                {
                    WhereName: 'ProjectID',
                    Value: listData.ProjectID,
                    Type: ContentListWhereType.Eq,
                    Pre: 'and'
                }
            ],
            FilterValue: '',
            PageIndex: 1,
            PageSize: 99999,
            Verification: false
        };
        ContentListApi.GetDataByTitle(requestData).then(data => {
            if (data.Status === 0) {
                if (!this.validateSPBSpecialist(data.Data)) {
                    this.onSubmitssion(title);
                }
            }
        });
    }

    onSubmitssion(title) {
        const { listData } = this.state;
        this.props.form.validateFieldsAndScroll(null, {}, (err, values) => {
            if (AiibCommonFun.validateMemberForm(listData)) return;
            if (!err) {
                this.onSave(values);
                this.setState({ title, showModal: true, processKey: listData.ProcessKey ? listData.ProcessKey : ProcessSubmitKey[`${listData.FinancingMethod}-${listData.Stage}`] });
            } else {
                AiibProjectResponse.errorTip(AIIBLocale.AIIBRequireformtips);
            }
        });
    }

    onBtnClick(title, processKey, e) {
        e.target.blur();
        e.preventDefault();
        const { listData } = this.state;
        this.props.form.validateFieldsAndScroll(null, {}, (err, values) => {
            if (AiibCommonFun.validateMemberForm(listData)) return;
            if (!err) {
                this.onSave(values);
                this.setState({ title, processKey, showModal: true });
            } else {
                AiibProjectResponse.errorTip(AIIBLocale.AIIBRequireformtips);
            }
        });
    }

    renderAction() {
        const { state: { disabled, listData }, props: { isAdmin } } = this;
        return <AkRow type="flex" align="middle" justify="end" className="ak-tab-actions mb15">
            {AiibPromissionControl.hasSaveElements(disabled, <ProposalSaveHandle className='aiib-button red' onClick={() => this.onSave()}></ProposalSaveHandle>)}

            {AiibPromissionControl.hasNextStageElements(listData, isAdmin, <AkButton icon="arrow-right" className="aiib-button warn" onClick={() => this.setState({ showNextStageModal: true })}>Go To Next Stage</AkButton>)}

            {AiibPromissionControl.hasCancelElements(listData, isAdmin, <AkButton icon="close" className='aiib-button red' onClick={(e) => this.onBtnClick("Request for Cancel", "Cancel", e)}>Request for Cancel</AkButton>)}

            {AiibPromissionControl.hasSubmitElements(listData, isAdmin, <AkButton icon="plus" className='aiib-button dark' onClick={(e) => this.loadMemberData("Create Submission", e)}>Create A Submission</AkButton>)}

            <AkButton icon="printer" className='aiib-button dark' onClick={() => this.context.onOpenPrint(PrintPageType.projectsheet)}>Print Project Summary Sheet</AkButton>

        </AkRow>;
    }

    renderInputNumberItem(name: string, id: string) {
        const { props: { disabled }, props } = this;
        return AIIBWorkflowHelper.renderFormItem(props, name, id, <AkInputNumber disabled={disabled} onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, id, 3)} />, false, [AIIBWorkflowHelper.ruleForComparisonNumber(props, name, ComparisonOperator.GreaterOrEqualsThan, 0)])
    }
    onFinancingMethodChange(showNSBF) { this.setState(showNSBF); }

    renderNonSovereign() {
        const { props, state: { disabled } } = this;
        return <div>
            <AiibFormContent title="Other Information">
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "S_Address", disabled, false)}
                    {AiibListUtil.ConvertDefToFormItem(props, "S_PercentageOwnership", disabled, false)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "S_MainShareHolder", disabled, false)}
                    {AiibListUtil.ConvertDefToFormItem(props, "S_Listed", disabled, false)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "CommitmentDate", disabled, false)}
                </AkRow>
            </AiibFormContent>
            <AiibFormContent title="Project Company">
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "CompanyName", disabled, true)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "PI_Address", disabled, false)}
                    {AiibListUtil.ConvertDefToFormItem(props, "PI_Rating", disabled, false)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "PI_MainShareHolder", disabled, false)}
                    {AiibListUtil.ConvertDefToFormItem(props, "PI_Listed", disabled, false)}
                </AkRow>
            </AiibFormContent>

        </div>;
    }
    renderForm() {
        const { colLabelLayout, largeControlLayout } = FormHelper;
        const { props, state: { disabled, showNSBF, listData } } = this;

        return <AkForm>
            <AiibFormContent title="Project Information">
                <AkRow {...FormHelper.rowLayout}>
                    {AiibListUtil.ConvertDefToFormItem(props, "ProjectName", disabled, true, null)}
                    {AiibListUtil.ConvertDefToFormItem(props, "ProjectShortName", disabled, true, null)}
                </AkRow>
                <AiibFormSector form={this.props.form} sector={listData ? listData.Sector : ""} subSector={listData ? listData.Subsector : []} {...props} />
                <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                    {AiibListUtil.ConvertDefToFormItem(props,"ProjectObjective",disabled,true,null,colLabelLayout, largeControlLayout)}
                 </AkRow>
                <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                    {AiibListUtil.ConvertDefToFormItem(props, "ProjectDescription", disabled, true, null, colLabelLayout, largeControlLayout)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="Impledate">
                    {AiibListUtil.ConvertDefToFormItem(props, 'StartDate', disabled, showNSBF ? false : true, [showNSBF ? [] : AIIBWorkflowHelper.ruleForRequire(props, "Projected Implementation Start Date"), AIIBWorkflowHelper.ruleForRangeFrom(props, "EndDate")])}
                    {AiibListUtil.ConvertDefToFormItem(props, 'EndDate', disabled, showNSBF ? false : true, [showNSBF ? [] : AIIBWorkflowHelper.ruleForRequire(props, "Projected Implementation End Date"), AIIBWorkflowHelper.ruleForRangeTo(props, "StartDate", "End Date", "Start Date")])}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="Impledate">
                    {AiibListUtil.ConvertDefToFormItem(props, 'ExpectedLoanClosingDate', disabled, false)}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} className="Impledate">
                    {AiibListUtil.ConvertDefToFormItem(props, 'ExecutiveCommitteeApprovedDate', disabled, false)}
                </AkRow>
                {
                    showNSBF ? <AiibCommonFormInfo disabled={disabled} {...props} /> : null
                }
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
                {/* client Type */}
                <AkRow {...FormHelper.rowLayout}>
                    {AIIBWorkflowHelper.renderFormItem(this.props, "Client Type", "FinancingMethod",
                        <AkRadio.Group disabled={disabled || !(listData.Stage === SATGE_CONCEPT && listData.ProcessStatus === "0")} onChange={(value) => {
                            if (value.target.value === SOVEREIGN_BACKEDFINACING) {
                                this.props.form.resetFields(ProposalArr.nonsovereignArr);
                                if (this.props.form.getFieldValue("Product") === "Equity") {
                                    this.props.form.setFieldsValue({ Product: [""] });
                                }
                            } else {
                                this.props.form.resetFields(ProposalArr.sovereignArr);
                            }
                            this.setState({ showNSBF: value.target.value === NONSOVEREIGN_BACKEDFINACING });
                        }}>
                            <AkRadio value="Sovereign-backed Financing">Sovereign-backed Financing</AkRadio>
                            <AkRadio value="Nonsovereign-backed Financing">Nonsovereign-backed Financing</AkRadio>
                        </AkRadio.Group>, true, null)}
                </AkRow>
                {
                    !showNSBF ?
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, "Borrower", disabled, true)}
                            {AiibListUtil.ConvertDefToFormItem(props, "ImplementationAgency", disabled, true)}
                        </AkRow> : null
                }
                {
                    showNSBF ?
                        <AkRow {...FormHelper.rowLayout}>
                            {AiibListUtil.ConvertDefToFormItem(props, "Sponsor", disabled, false)}
                            {AiibListUtil.ConvertDefToFormItem(props, "ImplementationEntity", disabled, false)}
                        </AkRow> : null
                }
            </AiibFormContent>

            <AiibFormContent title="Financial Information">
                <AiibCommonFormFinanInfo
                    disabled={disabled}
                    showNSBF={showNSBF}
                    listData={this.state.listData}
                    onFinancingMethodChange={(showNSBF) => this.setState({ showNSBF })}
                    {...props} />
                {showNSBF ? <AiibFormNonSovereign disabled={disabled} {...this.props} /> : null}
            </AiibFormContent>

            {showNSBF ? this.renderNonSovereign() : null}
        </AkForm>;
    }

    CloseNextModal() {
        this.setState({
            showNextStageModal: false
        });
    }
    render() {
        const { title, processKey, listData, showModal, showNextStageModal, disabled } = this.state;
        return <div>
            {this.props.isReadOnly ? null : this.renderAction()}
            {this.renderForm()}
            {showModal ?
                <AiibProjectInfoSubmitModal
                    modalTitle={title}
                    disabled={disabled}
                    processKey={processKey}
                    listData={listData}
                    onCancel={() => {
                        this.setState({ showModal: false });
                    }}
                /> : null}

            {showNextStageModal ? <AiibProjectNextStageModal
                listData={listData}
                disabled={disabled}
                CloseNextModal={this.CloseNextModal.bind(this)}
                onCancel={() => {
                    this.setState({ showNextStageModal: false });
                }}
            /> : null}
        </div>;
    }
}
