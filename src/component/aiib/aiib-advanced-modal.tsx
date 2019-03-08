import * as React from "react";
import { Component } from "react";
import { AiibContentListDefs } from '../../api/aiibworkflow/aiib-content-list';
import {
    ContentListWhereModel,
    AkModal,
    AkRow,
    AkButton,
    AkColProps,
    AkForm,
    FormHelper,
    AkFormComponentProps,
    AkFormIdentityPicker,
    AkDatePicker,
    AkUtil,
    AkInput,
    AkInputNumber,
    ContentListWhereType,
    RouterProps,
} from 'akmii-yeeoffice-common';
import { decodeWhere } from '../../util/aiib-where';
import { AIIBWorkflowHelper } from "../../page/aiib/index";
import { AiibAdvancedFormSelect, AiibFormSector } from "./index";
import { AiibFormCountry } from './aiib-form/aiib-form-country';
import { withRouter } from "react-router";
import { AiibGeneralFormatDate } from './common/aiib-format-date';
const { RangePicker } = AkDatePicker;
interface AiibAdvancedModalProps extends RouterProps, AkFormComponentProps {
    value?: ContentListWhereModel[];
    onChange?: (value?: ContentListWhereModel[]) => void;
    onCloseModal?: () => void;
    listDefs: AiibContentListDefs[];
    type: SearchType;
    Sector?: MetadataCategoryModel;
}
interface AiibAdvancedModalStatus {
    SectorValue?: string;
    CategoryID?: string;
    selectStatus?: string;
}
export enum SearchType {
    Proposal,
    Project,
    NewProjectList,
    InvestmentProgramReport,
    MyProjectList
}

@withRouter
@AkForm.create()
export default class AiibAdvancedModal extends Component<AiibAdvancedModalProps, AiibAdvancedModalStatus>{

    labelLayout: AkColProps = {
        lg: 5,
        md: 4,
        sm: 4,
        xs: 24,
        className: "aiib-proposal-adv-modal-label"
    };
    controlLayout: AkColProps = {
        lg: 7,
        md: 8,
        sm: 8,
        xs: 24
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            SectorValue: '',
        };
    }
    componentDidMount() {
        const { value } = this.props;
        const formValue = decodeWhere(value);
        this.setState({ SectorValue: formValue['Sector'] });
        this.props.form.setFieldsValue(formValue);
    }
    //拿到内容列表中字段配置选项
    getRules(InternalName: string) {
        const { listDefs } = this.props;
        const data = listDefs && listDefs.find(i => i.InternalName === InternalName);
        return data && JSON.parse(data.Rules);
    }

    renderItem(key, left, right?) {
        if (key === "SectorAndSubSector") {
            return left;
        } else {
            return <AkRow key={key} {...FormHelper.rowLayout}>
                {left}
                {right}
            </AkRow>;
        }
    }
    renderForm() {
        const { props, props: { value } } = this;
        const formValues: any = decodeWhere(value);
        const { type } = props;
        const SocialCategoryData: string[] = this.getRules('SocialCategory').choices;
        const ProjectRiskData: string[] = this.getRules('ProjectRisk').choices;
        const StatusData: string[] = this.getRules('Status').choices;
        const FinancingMethodData: string[] = this.getRules('FinancingMethod').choices;
        const StageData: string[] = this.getRules('Stage').choices;
        const ProductData: string[] = this.getRules('Product').choices;
        const FinancingTypeData: string[] = this.getRules('FinancingType').choices;
        let ScrComRecommendData:string[] = this.getRules("SCRecommend").choices;
          ScrComRecommendData.push("Pending");
        const ExComApproveData:string[] = ["Approved","Not Approved",'Pending'];

        const Country = AIIBWorkflowHelper.renderFormItem(props, 'Country', 'Country',
            <AiibFormCountry
                onChange={(a, b) => {
                    if (a && b) {
                        this.props.form.setFieldsValue({ Region: b.Region });
                    } else {
                        this.props.form.setFieldsValue({ Region: '' });
                    }

                }}
            />, false, [], this.labelLayout, this.controlLayout);
        const Region = AIIBWorkflowHelper.renderFormItem(props, 'Region', 'Region', <AkInput disabled />, false, [], this.labelLayout, this.controlLayout);
        const SectorAndSubSector = <AiibFormSector
            key="SectorAndSubSector"
            sector={formValues && formValues.Sector ? formValues.Sector : ""}
            subSector={formValues && formValues.Subsector ? formValues.Subsector : []}
            labelLayout={this.labelLayout}
            controlLayout={this.controlLayout}
            isSearch={true}
            {...this.props} />;
        const FinancingMethod = AIIBWorkflowHelper.renderFormItem(props, 'Client Type', 'FinancingMethod',
            <AiibAdvancedFormSelect
                data={FinancingMethodData}
            />, false, [], this.labelLayout, this.controlLayout);
        const Product = AIIBWorkflowHelper.renderFormItem(props, 'Product Type', 'Product',
            <AiibAdvancedFormSelect
                data={ProductData}
            />, false, [], this.labelLayout, this.controlLayout);
        const SCRecommend = AIIBWorkflowHelper.renderFormItem(props,"ScrCom Decision","SCRecommend",
        <AiibAdvancedFormSelect data={ScrComRecommendData} />,false,[],this.labelLayout,this.controlLayout
          )
        const ExComApprove = AIIBWorkflowHelper.renderFormItem(props,'ExCom Decision',"ExComApprove",
         <AiibAdvancedFormSelect data={ExComApproveData} />,false,[],this.labelLayout,this.controlLayout
        )
        const DGIO = AIIBWorkflowHelper.renderFormItem(props, 'DG IO', 'DGIO',
            <AkFormIdentityPicker />, false, [], this.labelLayout, this.controlLayout);
        const CreatedBy = AIIBWorkflowHelper.renderFormItem(props, 'Created By', 'CreatedBy',
            <AkFormIdentityPicker />, false, [], this.labelLayout, this.controlLayout);
        const Created = AIIBWorkflowHelper.renderFormItem(props, 'Proposal Created Date From', 'Created',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        const ExecutiveCommitteeApprovedDate = AIIBWorkflowHelper.renderFormItem(props, 'ExCom Meeting Date From', 'ExecutiveCommitteeApprovedDate',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        const Stage = AIIBWorkflowHelper.renderFormItem(props, 'Project Stage', 'Stage',
            <AiibAdvancedFormSelect
                filterValue={['Proposal']}
                data={StageData} />, false, [], this.labelLayout, this.controlLayout);
        const FinancingType = AIIBWorkflowHelper.renderFormItem(props, 'Standalone/Co-financing', 'FinancingType',
            <AiibAdvancedFormSelect
                data={FinancingTypeData} />, false, [], this.labelLayout, this.controlLayout);
        const SocialCategory = AIIBWorkflowHelper.renderFormItem(props, 'E&S Category', 'SocialCategory',
            <AiibAdvancedFormSelect
                data={SocialCategoryData}
            />, false, [], this.labelLayout, this.controlLayout);
        const ProjectRisk = AIIBWorkflowHelper.renderFormItem(props, 'Project Risk', 'ProjectRisk',
            <AiibAdvancedFormSelect
                data={ProjectRiskData}
            />, false, [], this.labelLayout, this.controlLayout);
        const ProjectLeader = AIIBWorkflowHelper.renderFormItem(props, 'PTL', 'ProjectLeader',
            <AkFormIdentityPicker />, false, [], this.labelLayout, this.controlLayout);
        const Members = AIIBWorkflowHelper.renderFormItem(props, 'Team Members', 'Members',
            <AkFormIdentityPicker />, false, [], this.labelLayout, this.controlLayout);
        const Status = AIIBWorkflowHelper.renderFormItem(props, 'Project Status', 'Status',
            <AiibAdvancedFormSelect
                data={StatusData} />, false, [], this.labelLayout, this.controlLayout);
        const ConceptDate = AIIBWorkflowHelper.renderFormItem(props, 'Concept Decision Date From', 'ConceptDate',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        const AppraisalDate = AIIBWorkflowHelper.renderFormItem(props, 'Appraisal/Interim/Final Decision Date From', 'AppraisalDate',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        const NegotiationDate = AIIBWorkflowHelper.renderFormItem(props, 'Negotiation Review Date From', 'NegotiationDate',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        const BoardApprovalDate = AIIBWorkflowHelper.renderFormItem(props, 'Board Approval Date From', 'BoardApprovalDate',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        const ProjectName = AIIBWorkflowHelper.renderFormItem(props, 'Project Name', 'ProjectName',
            <AkInput />, false, [], this.labelLayout, { lg: 19, md: 20, sm: 20, xs: 24 });
        const ProjectProposalID = AIIBWorkflowHelper.renderFormItem(props, 'Project ID/Proposal ID', 'ProjectProposalID',
            <AkInput />, false, [], this.labelLayout, this.controlLayout);
        const Financing = AIIBWorkflowHelper.renderFormItem(props, 'Amount of AIIB Financing/Investment (Required) (US$ MM)', 'Financing',
            <AkInputNumber />, false, [], this.labelLayout, this.controlLayout);
        const ExpectedBoardApprovalDate = AIIBWorkflowHelper.renderFormItem(props, 'ExCom Approval Date', 'ExComApprovalDate',
            <RangePicker format="MM-DD-YYYY" />, false, [], this.labelLayout, this.controlLayout);
        let items: React.ReactNode[] = [];


        switch (type) {
            case SearchType.Proposal:
                items = [
                    this.renderItem(1, Country, Region),
                    this.renderItem("SectorAndSubSector", SectorAndSubSector),
                    this.renderItem(3, FinancingMethod, Product),
                    this.renderItem(4, DGIO, CreatedBy),
                    this.renderItem(5, Created, ExecutiveCommitteeApprovedDate),
                    this.renderItem(6, Stage, FinancingType),
                    this.props.location.pathname === "/all/proposal" ? this.renderItem(7, Status,SCRecommend) : null,
                    this.props.location.pathname === "/all/proposal" ? this.renderItem(8,ExComApprove) : null
                ];
                break;
            case SearchType.Project:
                items = [
                    this.renderItem(1, Country, Region),
                    this.renderItem("SectorAndSubSector", SectorAndSubSector),
                    this.renderItem(3, FinancingMethod),
                    this.renderItem(4, SocialCategory, ProjectRisk),
                    this.renderItem(5, ProjectLeader, Members),
                    this.renderItem(6, ConceptDate, AppraisalDate),
                    this.renderItem(7, NegotiationDate, BoardApprovalDate),
                ];
                break;
            case SearchType.MyProjectList:
                items = [
                    this.renderItem(1, Country, Region),
                    this.renderItem("SectorAndSubSector", SectorAndSubSector),
                    this.renderItem(3, FinancingMethod),
                    this.renderItem(4, SocialCategory, ProjectRisk),
                    this.renderItem(5, ConceptDate, AppraisalDate),
                    this.renderItem(6, NegotiationDate, BoardApprovalDate),
                ];
                break;
            case SearchType.NewProjectList:
                items = [
                    this.renderItem(1, ProjectName),
                    this.renderItem("SectorAndSubSector", SectorAndSubSector),
                    this.renderItem(3, Country),
                    this.renderItem(4, FinancingMethod, Product),
                    this.renderItem(5, FinancingType, SocialCategory),
                ];
                break;
            case SearchType.InvestmentProgramReport:
                items = [
                    this.renderItem(1, ProjectName),
                    this.renderItem(2, ProjectProposalID, Country),
                    this.renderItem("SectorAndSubSector", SectorAndSubSector),
                    this.renderItem(4, FinancingMethod),
                    this.renderItem(5, Product, FinancingType),
                    this.renderItem(6, SocialCategory, Financing),
                    this.renderItem(7, BoardApprovalDate, ExpectedBoardApprovalDate),
                ];
                break;
        }
        return items;
    }
    onCloseModal() {
        this.props.onCloseModal && this.props.onCloseModal();
    }
    //处理表单的值
    getValue(values) {
        let data = AkUtil.deepClone(values);
        let obj = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] && data[key] !== 'All') {
                    if (Array.isArray(data[key]) && key !== "Subsector") {//日期为Array类型
                        obj[key] = data[key].map(i => {
                            return AiibGeneralFormatDate(i, "YYYY-MM-DD");
                        });
                    } else {
                        obj[key] = data[key];
                    }
                }
            }
        }
        return obj;
    }
    //转换为查询where语句
    convertWhere(values) {
        let wheres: ContentListWhereModel[] = [];
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                if (Array.isArray(values[key])) {
                    if (values[key].length > 0 && key !== "Subsector") {
                        let child: ContentListWhereModel[] = values[key].map((i, index) => {
                            return {
                                WhereName: key,
                                Value: i,
                                Type: index === 0 ? ContentListWhereType.Geq : ContentListWhereType.Leq,
                                Pre: "and",
                            };
                        });
                        wheres.push({
                            WhereName: '',
                            Type: ContentListWhereType.Eq,
                            Pre: "and",
                            Child: child
                        });
                    } else if (values[key].length > 0 && key === "Subsector") {     // Subsector类型
                        let child: ContentListWhereModel[] = values[key].map(i => {
                            return {
                                WhereName: key,
                                Value: i,
                                Type: ContentListWhereType.Contains,
                                Pre: "or"
                            };
                        });
                        wheres.push({
                            WhereName: '',
                            Type: ContentListWhereType.Eq,
                            Pre: "and",
                            Child: child
                        })
                    }
                } else if (key === 'ProjectProposalID') {
                    let child: ContentListWhereModel[] = [
                        {
                            WhereName: 'ProjectID',
                            Value: values[key],
                            Type: ContentListWhereType.Eq,
                            Pre: 'or',
                        },
                        {
                            WhereName: 'ProposalID',
                            Value: values[key],
                            Type: ContentListWhereType.Eq,
                            Pre: 'or',
                        }
                    ];
                    wheres.push({
                        WhereName: '',
                        Type: ContentListWhereType.Eq,
                        Pre: "and",
                        Child: child
                    });
                } else if (key === 'Members') {
                    let child: ContentListWhereModel[] = [
                        {
                            WhereName: 'Members',
                            Value: values[key],
                            Type: ContentListWhereType.Contains,
                            Pre: 'or',
                        },
                        {
                            WhereName: 'Approvers',
                            Value: values[key],
                            Type: ContentListWhereType.Contains,
                            Pre: 'or',
                        }
                    ];
                    wheres.push({
                        WhereName: '',
                        Type: ContentListWhereType.Eq,
                        Pre: "and",
                        Child: child
                    });
                } else if (key === 'ProjectLeader') {
                    wheres.push({
                        WhereName: 'ProjectLeader',
                        Value: values[key],
                        Type: ContentListWhereType.Contains,
                        Pre: "and",
                    });
                } else if (key === 'Product') {
                    wheres.push({
                        WhereName: key,
                        Value: values[key],
                        Type: ContentListWhereType.In,
                        Pre: "and",
                    });
                } else if((key === "ExComApprove" || key === "SCRecommend") && values[key] === "Pending") {
                      wheres.push({
                          WhereName:key,
                          Value:"",
                          Type:ContentListWhereType.IsNull,
                          Pre:"and"
                      });
                }else {
                    wheres.push({
                        WhereName: key,
                        Value: values[key],
                        Type: ContentListWhereType.Eq,
                        Pre: "and",
                    });
                }
            }
        }
        return wheres;
    }
    onOkModal() {
        this.props.form.validateFieldsAndScroll((err, values) => {
            const newValues = this.getValue(values);
            const where = this.convertWhere(newValues);
            this.props.onChange && this.props.onChange(where);
            this.props.onCloseModal && this.props.onCloseModal();
        });

    }
    onReset() {
        this.props.form.resetFields();
        this.props.onChange([]);
        this.props.onCloseModal && this.props.onCloseModal();
    }
    renderFooter() {
        return <AkRow>
            <AkButton key={1} type="primary" icon="search" size="large" className="btn-footer btn-search"
                onClick={this.onOkModal.bind(this)}>Search</AkButton>
            <AkButton key={2} type="primary" icon="rollback" size="large" className="btn-footer btn-search"
                onClick={this.onReset.bind(this)}>reset</AkButton>
            <AkButton key={3} icon="close-circle-o" size="large" className="btn-footer btn-cancel"
                onClick={this.onCloseModal.bind(this)}>Cancel</AkButton>
        </AkRow>;
    }
    render() {
        return <AkModal
            title="Advance Search"
            visible={true}
            okText="Search"
            onCancel={this.onCloseModal.bind(this)}
            onOk={this.onOkModal.bind(this)}
            wrapClassName="aiib-adv-search-modal"
            width={"70%"}
            footer={this.renderFooter()}
            cancelText="Cancel">
            {
                this.renderForm()
            }
        </AkModal>;
    }
}
