import * as React from 'react';
import { AkColumnProps, ContentListDatasByQueryRequest, ContentListApi, AkResponsiveTable, AkRow, AkForm, AkInput, AkMetadataSelect, AkSelect, AkFormComponentProps, AkInputNumber, ContentListWhereType, AkMetadataLabel, ComparisonOperator, AkButton, AkModal, ContentListEditDatasRequest, ContentListAddDatasRequest, ContentListDatasRequest, CommonLocale } from 'akmii-yeeoffice-common';
import { ProposalState, SubProjectInfoModal } from '../../api/aiibworkflow/proposalModal';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import { AiibFormCountry } from './index';
import { AiibProjectResponse } from './common/aiib-response-tip';
export interface AIIBSubProjectInfoProps extends AkFormComponentProps {
    state?: ProposalState;
    disabled?: boolean;
    projectLeader?: string;
    projectID: string;
}

export interface AIIBSubProjectInfoState {
    loading?: boolean;
    listData?: any[];
    totalCount?: number;
    showModal?: boolean;
    isEdit?: boolean;
    detailData?: any;
    disabled?: boolean;
}

@AkForm.create()
export default class AIIBSubProjectInfo extends React.Component<AIIBSubProjectInfoProps, AIIBSubProjectInfoState>{
    confirmLoading?: boolean;
    columns: AkColumnProps<any>[];
    title?: string;
    pageSize?: number;
    pageIndex?: number;
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            showModal: false,
            isEdit: false,
            detailData: {},
            disabled: props.disabled
        };
        this.confirmLoading = false;
        this.pageSize = 15;
        this.pageIndex = 1;
        this.title = "Sub-Project";
        this.columns = [{
            title: "Sub-Project ID",
            dataIndex: "SubProjectID",
            key: "SubProjectID"
        }, {
            title: "Sub-Project Name",
            dataIndex: "SubProjectName",
            key: "SubProjectName",
            render: (txt) => {
                const txt1 = txt.toString().substring(0, 200);
                return <span>{txt1}</span>;
            }
        }, {
            title: "Country",
            dataIndex: "CountryName",
            key: "CountryName"
        }, {
            title: "Sector",
            dataIndex: "Sector",
            key: "Sector",
            render: (txt) => {
                return <AkMetadataLabel optionID={txt} parentCode="Sector" categoryCode="Sector" />;
            }
        }, {
            title: "Sponsors",
            dataIndex: "Sponsors",
            key: "Sponsors"
        }, {
            title: "Borrower",
            dataIndex: "Borrower",
            key: "Borrower"
        }, {
            title: "AIIB Financing(US$ MM)",
            dataIndex: "AIIBFinancing",
            key: "AIIBFinancing"
        }, {
            title: "E&S Category",
            dataIndex: "SocialCategory",
            key: "SocialCategory"
        }, {
            title: "Operate",
            layout: 6,
            dataIndex: "",
            render: (txt, recode) => {
                return this.state.disabled ? null : <div>
                    <AkButton
                        onClick={() => {
                            this.setState({
                                isEdit: true, detailData: recode, showModal: true
                            });
                            setTimeout(() => {
                                this.props.form.setFieldsValue(recode);
                            });
                        }} className="mr5 aiib-button blue" type="primary">Edit</AkButton>
                    <AkButton
                        onClick={() => {
                            this.setState({ detailData: recode });
                            this.renderDeleteModal();
                        }} className='aiib-button red' >Remove</AkButton>
                </div>;
            }
        }];
    }

    componentWillReceiveProps(nextProps) {
        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.setState({ disabled: nextProps.disabled });
        }
    }


    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ loading: true });
        const request: ContentListDatasByQueryRequest = {
            Wheres: [{
                WhereName: "ProjectID",
                Value: this.props.projectID,
                Type: ContentListWhereType.Eq
            }],
            Columns: [
                "ProjectID",
                "SubProjectID",
                "SubProjectName",
                "Country",
                "CountryName",
                "Sector",
                "Sponsors",
                "Borrower",
                "SocialCategory",
                "AIIBFinancing",
            ],
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            FilterValue: "",
            IsExport: false,
            Title: this.title,
            Verification: false
        };
        ContentListApi.GetDataByTitle(request).then(data => {
            if (data.Status === 0) {
                this.setState({ loading: false, listData: data.Data, totalCount: data.TotalCount });
            } else {
                AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
            }
        });

    }

    onOkHandle() {
        const { isEdit, detailData } = this.state;
        if (this.confirmLoading) return;


        this.props.form.validateFieldsAndScroll(null, {}, (err, values: SubProjectInfoModal) => {
            if (!err) {
                this.confirmLoading = true;
                this.setState({ loading: true });
                const variable = {
                    ProjectID: this.props.projectID,
                    ...values
                };
                if (isEdit) {
                    const request: ContentListEditDatasRequest = {
                        Title: this.title,
                        Dic: variable,
                        ListDataID: detailData.ListDataID,
                        RowVersion: detailData.RowVersion,
                    };
                    ContentListApi.EditDataByTitle(request).then(data => {
                        this.confirmLoading = false;
                        if (data.Status === 0) {
                            this.onCancel();
                            this.setState({ loading: false });
                            this.loadData();
                            AiibProjectResponse.successTip(CommonLocale.EditSuccess);
                        } else {
                            this.setState({ loading: false });
                            AiibProjectResponse.errorTip(CommonLocale.EditFail);
                        }
                    });
                } else {
                    const request: ContentListAddDatasRequest = {
                        Title: this.title,
                        Dic: variable
                    };
                    ProjectAPI.addSubProject(request).then(data => {
                        this.confirmLoading = false;
                        if (data.Status === 0) {
                            this.onCancel();
                            this.setState({ loading: false });
                            this.loadData();
                            AiibProjectResponse.successTip(CommonLocale.AddSuccess);
                        } else {
                            this.setState({ loading: false });
                            AiibProjectResponse.errorTip(CommonLocale.AddFail);
                        }
                    });
                }
            }
        });
    }

    onCancel() {
        this.props.form.resetFields();
        this.setState({ showModal: false });
    }

    onDeleteHandle() {
        if (this.confirmLoading) return;
        this.confirmLoading = true;
        this.setState({ loading: true });
        const request: ContentListDatasRequest = {
            Title: this.title,
            ListDataID: this.state.detailData.ListDataID
        };
        ContentListApi.DelListDataByTitle(request).then(data => {
            this.confirmLoading = false;
            if (data.Status === 0) {
                this.loadData();
                this.setState({ loading: false });
                AiibProjectResponse.successTip(CommonLocale.DeleteSuccess);
            } else {
                this.setState({ loading: true });
                AiibProjectResponse.errorTip(CommonLocale.DeleteFail);
            }
        });
    }

    renderDeleteModal() {
        AkModal.confirm({
            title: "Tip",
            content: "Confirm to delete?",
            onOk: () => this.onDeleteHandle()
        });
    }

    renderActions() {
        return this.state.disabled ? null : <AkRow type="flex" align="middle" justify="end" className="ak-tab-actions mb15">
            <AkButton
                icon="plus"
                className='aiib-button dark'
                onClick={() => {
                    this.setState({ showModal: true, isEdit: false });
                    setTimeout(() => {
                        this.props.form.resetFields();
                    });
                }}>Add Sub Project</AkButton>
        </AkRow>;
    }

    renderFooter() {
        return <AkRow>
            <AkButton type="primary" size="large" className="btn-footer btn-search"
                onClick={this.onOkHandle.bind(this)}>Save</AkButton>
            <AkButton size="large" className="btn-footer btn-cancel"
                onClick={this.onCancel.bind(this)}>Cancel</AkButton>
        </AkRow>;
    }

    rendenModal() {
        const { props, state: { showModal, isEdit } } = this;
        const modalProps = {
            title: isEdit ? "Edit Sub Project" : "Add Sub Project",
            visible: true,
            width: 800,
            wrapClassName: "aiib-adv-search-modal",
            cancelText: "Cancel",
            footer: this.renderFooter(),
            onCancel: () => this.onCancel()

        };
        return showModal ? <AkModal {...modalProps}>
            <AkForm>
                {this.props.form.getFieldDecorator("CountryName", null)}
                {isEdit ? AIIBWorkflowHelper.renderFormItemInModal(props, "Sub-Project ID", "SubProjectID", <AkInput disabled />, false) : null}
                {AIIBWorkflowHelper.renderFormItemInModal(props, "Sub-Project Name", "SubProjectName", <AkInput />, true)}
                {AIIBWorkflowHelper.renderFormItemInModal(props, 'Country', 'Country', <AiibFormCountry
                    onChange={(value, obj) => {
                        if (value) {
                            this.props.form.setFieldsValue({
                                CountryName: obj.CountryName
                            });
                        } else {
                            this.props.form.setFieldsValue({
                                CountryName: ""
                            });
                        }
                    }}
                />, false)}
                {AIIBWorkflowHelper.renderFormItemInModal(props, 'Sector', 'Sector', <AkMetadataSelect parentCode="Sector" categoryCode="Sector" />, false)}
                {AIIBWorkflowHelper.renderFormItemInModal(props, "Sponsors", "Sponsors", <AkInput />, false)}
                {AIIBWorkflowHelper.renderFormItemInModal(props, "Borrower", "Borrower", <AkInput />, false)}
                {AIIBWorkflowHelper.renderFormItemInModal(props, 'E&S Category', 'SocialCategory', <AkSelect>
                    <AkSelect.Option value={"A"}>A</AkSelect.Option>
                    <AkSelect.Option value={"B"}>B</AkSelect.Option>
                    <AkSelect.Option value={"C"}>C</AkSelect.Option>
                    <AkSelect.Option value={"FI"}>FI</AkSelect.Option>
                </AkSelect>, false)}
                {AIIBWorkflowHelper.renderFormItemInModal(props, "AIIB Financing (US$ MM)", "AIIBFinancing", <AkInputNumber onBlur={(e) => AIIBWorkflowHelper.setFloatFieldValue(e, props, "AIIBFinancing", 3)} />, false, [AIIBWorkflowHelper.ruleForComparisonNumber(props, "AIIB Financing (US$ MM)", ComparisonOperator.GreaterOrEqualsThan, 0)])}
            </AkForm>
        </AkModal> : null;
    }

    render() {
        return <div>
            {this.renderActions()}
            <AkResponsiveTable
                hideViewSwitch={true}
                rowKey="ListDataID"
                columns={this.columns}
                loading={this.state.loading}
                dataSource={this.state.listData}
                pagination={{
                    total: this.state.totalCount,
                    pageSize: this.pageSize,
                    current: this.pageIndex,
                    onChange: (current) => {
                        this.pageIndex = current;
                        this.loadData();
                    }
                }} />
            {this.rendenModal()}
        </div>;
    }

}
