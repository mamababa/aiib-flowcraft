import * as React from "react";
import { FormHelper, AkFormComponentProps, AkForm, AkRow, AkInput, AkModal, AkDatePicker, AkUtil, RouterProps, AkIcon, AkButton, AkFormIdentityPicker, AkGlobal } from 'akmii-yeeoffice-common';
import Document from '../document/document';
import { ProcessSubmitKey, ListWorkflowValues } from '../../api/aiibworkflow/proposalModal';
import { ListWorkflowStart } from '../../api/aiibworkflow/proposal-request';
import { withRouter } from 'react-router';
import { isMobile, currentUser } from '../../util/aiib-common';
import { DocumentPermissionType } from '../../util/document-common';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import { AIIBWorkflowAPI } from '../../api/aiibworkflow/aiib-workflow';
import { PathConfig } from '../../config/pathconfig';
import { AIIBWorkflowHelper } from "../../page/aiib/index";
import { AiibCommonFun } from "./index";
import { ProcessApprovers } from '../../api/aiibworkflow/common';
import { AiibContentListDefs } from "../../api/aiibworkflow/index";
import { AIIBLocale } from '../../locales/localeid';
import { ProjectAPI } from "../../api/aiibworkflow/project";
import { AiibProjectResponse } from './common/aiib-response-tip';

interface AiibProjectInfoSubmitProps extends AkFormComponentProps, RouterProps {
    modalTitle: string;
    listData?: any;
    processKey?: string;
    onCancel?: () => void;
    disabled?: boolean;
}

interface AiibProjectInfoSubmitState {
    listData?: any;
    selectDocument?: any;
    confirmLoading?: boolean;
    showApprovers?: boolean;
    ApproversArr?: string[];
}

@AkForm.create()
@withRouter
export class AiibProjectInfoSubmitModal extends React.Component<AiibProjectInfoSubmitProps, AiibProjectInfoSubmitState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: props.listData,
            selectDocument: "",
            showApprovers: true,
            ApproversArr: []
        };
    }

    static contextTypes = {
        documentFolderType: React.PropTypes.number,
    }

    componentDidMount() {
        const { processKey } = this.props;
        const Approvers = ProcessApprovers[processKey];

        if (Approvers.Group && (Approvers.Group).length > 0) {
            const request: GetUserByCode = {
                groupCode: Approvers.Group[0],
                pageIndex: 1,
                pageSize: 20
            };
            ProjectAPI.getUserGroupsByCode(request).then(d => {
                if (d.Status === 0) {
                    const userGroup = d.Data.map(i => i.AccountID);
                    this.setState({ ApproversArr: userGroup });
                }
            });
        }

    }

    onChangeShowContent(val, boolean) {
        switch (val) {
            case "showApprovers":
                this.setState({ showApprovers: boolean });
                break;
        }
    }

    onOkHandle() {
        const { props: { listData, processKey }, state: { selectDocument } } = this;

        if (processKey !== ProcessSubmitKey.Cancel && (!selectDocument || selectDocument.length === 0)) {
            AiibProjectResponse.errorStringTip("Please select at least one document!");
            return;
        }
        this.props.form.validateFieldsAndScroll(null, {}, (err, values: ListWorkflowValues) => {
            if (!err) {
                this.setState({ confirmLoading: true });

                values.AssignTo = JSON.stringify(values.AssignTo);
                values.Documents = JSON.stringify(selectDocument);

                values.ProjectUrl = `${_spPageContextInfo.webAbsoluteUrl}/sitepages/pages/index.aspx?_hash_=/project-page?listdataid=${listData.ListDataID}`;
                if (processKey === ProcessSubmitKey.Cancel) {
                    const val = {
                        CancelledDate: "__currentdate:yyyy-MM-dd HH:mm:ss",
                        CancelledComment: values.Comment,
                        CancelledUser: currentUser
                    };
                    values.____customListFields = JSON.stringify(val);
                    values.ProposalUrl = `${_spPageContextInfo.webAbsoluteUrl}/sitepages/pages/index.aspx?_hash_=/proposal-page?listdataid=${listData.ListDataID}`;
                }
                // 启动流程接口
                const request: ListWorkflowStart = {
                    ListID: listData.ListID,
                    ListDataID: listData.ListDataID,
                    Key: processKey,
                    Variables: JSON.stringify(values),
                    BatchNo: listData.StartNum || "1",
                    RowVersion: listData.RowVersion
                };
                AIIBWorkflowAPI.startWorkFlow(request).then(data => {
                    if (data.Status === 0) {
                        this.props.onCancel();
                        AiibProjectResponse.successTip(AIIBLocale.SubmisionSuccess);
                        this.setState({ confirmLoading: false });
                        setTimeout(() => {
                            this.props.router.replace({
                                pathname: this.props.location.query['backUrl'] || PathConfig.MyProject
                            });
                        }, 500);

                    } else {
                        this.setState({ confirmLoading: false });
                        AiibProjectResponse.errorTip(AIIBLocale.SubmisionFail);
                    }
                });
            }
        });

    }

    onCancelHandle() {
        this.props.form.resetFields();
        this.props.onCancel();
        this.setState({ confirmLoading: false });
    }

    renderDocumentList() {
        const { listData } = this.props;
        return <div className="mb15">
            <Document
                documentPermissionType={DocumentPermissionType.Select}
                id={listData.ProjectID}
                isSubmissionModal={true}
                stage={DocumentFolderType.Working}
                onSelectChange={(value) => {
                    let values = AkUtil.deepClone(value);
                    const variables = values.map(item => {
                        delete item.Icon;
                        delete item.Thumb;
                        return item;
                    });
                    this.setState({ selectDocument: variables });
                }} />
        </div>;
    }

    renderFooter() {
        return <AkRow>
            {isMobile ? <AkIcon type="fly" className="btn-search-text btn-footer-text" onClick={this.onOkHandle.bind(this)} /> : <AkButton loading={this.state.confirmLoading} type="primary" icon="fly" size="large" className="btn-footer btn-search"
                onClick={this.onOkHandle.bind(this)}>Submit</AkButton>}
            <AkButton icon="close-circle-o" size="large" className="btn-footer btn-cancel"
                onClick={() => {
                    this.onCancelHandle();
                }}>Cancel</AkButton>
        </AkRow>;
    }

    renderModal() {
        const { props: { modalTitle, processKey, disabled }, state: { listData, confirmLoading }, props } = this;
        const { colLabelLayout, largeControlLayout } = FormHelper;
        const filedName = processKey !== ProcessSubmitKey.Cancel ? "Expected Clearance Date" : "Expected Cancellation Date";
        return <AkModal
            wrapClassName="aiib-adv-search-modal"
            visible
            title={modalTitle}
            confirmLoading={confirmLoading}
            width={1200}
            footer={this.renderFooter()}
            onCancel={() => {
                this.onCancelHandle();
            }}>
            {processKey === ProcessSubmitKey.Cancel ? null : this.renderDocumentList()}
            <AkForm>
                <AkRow {...FormHelper.rowLayout} className="aiib-project-submit">
                    {processKey !== ProcessSubmitKey.Cancel ? AIIBWorkflowHelper.renderFormItem(props, filedName, "ExpiredAt", <AkDatePicker format="MM-DD-YYYY" disabled={disabled} />, false) : null}
                </AkRow>
                <AkRow {...FormHelper.rowLayout} >
                    {AIIBWorkflowHelper.renderFormItem(props, "Comments", "Comment", <AkInput.TextArea />, processKey === ProcessSubmitKey.Cancel, null, colLabelLayout, largeControlLayout)}
                </AkRow>
            </AkForm>
            {processKey === ProcessSubmitKey.Cancel ? null : this.renderApprovel()}
        </AkModal>;
    }

    renderRowsItems() {
        const { processKey, listData } = this.props;
        const { ApproversArr } = this.state;
        const listDef: AiibContentListDefs[] = AiibCommonFun.getlocalStorageListDefsData();

        if (!listDef && !processKey) return;
        const Approvers = ProcessApprovers[processKey];
        let Fields = [], Group = [];
        if (Approvers.Feild && (Approvers.Feild).length > 0) {
            Fields = (Approvers.Feild).map(item => {

                const Field = listDef.find(i => i.InternalName === item);
                return AIIBWorkflowHelper.renderApprovalItem(this.props, Field.DisplayName, <AkFormIdentityPicker readonly multiple value={listData[item]} />);
            });
        }
        if (Approvers.Group && (Approvers.Group).length > 0) {
            Group = (Approvers.Group).map(item => {
                return AIIBWorkflowHelper.renderApprovalItem(this.props, item, <AkFormIdentityPicker readonly multiple value={ApproversArr} />);
            });
        }

        return [...Fields, ...Group];
    }

    renderApprovel() {
        const { state: { showApprovers } } = this;
        return <div className="ak-form">
            <div className='aiib-contact-header' onClick={() => this.onChangeShowContent("showApprovers", !showApprovers)}>
                <span className='aiib-contact-left'></span>
                <span className='aiib-contact-word'>Approvers</span>
                <span className='aiib-contact-right'>
                    {
                        showApprovers
                            ?
                            <AkIcon type='up' />
                            :
                            <AkIcon type='down' />
                    }
                </span>
            </div>
            <div className='aiib-contact-form' style={{ display: showApprovers ? 'block' : 'none' }}>
                <AkRow {...FormHelper.rowLayout}>
                    {this.renderRowsItems()}
                </AkRow>
            </div>
        </div>;
    }

    render() {
        return <div>
            {this.renderModal()}
        </div>;
    }

}
