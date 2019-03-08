import * as React from 'react';
import {
    AkRow,
    AkCol,
    ContentListWhereModel,
    ContentListWhereType,
    RouterProps,
    AkFormComponentProps,
    AkForm,
    AkButton,
    AkInput,
    AkDatePicker,
    AkModal,
    ContentListApi,
    AkNotification,
    AkGlobal, CommonLocale, AkUtil
} from 'akmii-yeeoffice-common';
import {
    AIIBGeneralSearch,
    AiibAdvancedSearch,
    AiibProjectImport,
    AiibHistotyDocumentImport,
    AiibPromissionControl,
    AiibCommonFun
} from './index';
import { SearchType } from './aiib-advanced-modal';
import { withRouter } from 'react-router';
import { PathConfig } from '../../config/pathconfig';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import {
    STATE_NEWPROPOSAL,
    SATGE_CONCEPT,
    STATE_MANAGERIOREVIEW,
    STATE_DGIOREVIRE,
    STATE_SCREENINGCOMMITTEE,
    STATE_SCSECREVIEW,
    STATE_PENDINGSCREENINGCOMMITTEE,
    SATGE_PROPOSAL,
    NONSOVEREIGN_BACKEDFINACING,
    STATE_EXCUTIVECOMMITTEE
} from '../../util/aiib-common';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
import {
    addAiibWorkflowHistory,
    validateProposalFields,
    AiibProjectCancelStatus,
    AiibProjectCancelStage,
    validateNSBFProposalFields,
    validateSBFProposalFields,
} from '../../api/aiibworkflow/common';
import { ProposalAPI } from '../../api/aiibworkflow/proposal';
import { WhereModel } from '../../util/aiib-where';
import { AiibSendEmailCommom } from '../../api/aiibworkflow/content-list';
import { AIIBWorkflowAPI } from '../../api/aiibworkflow/aiib-workflow';
import * as moment from 'moment';
import { connect } from 'react-redux';
import Document from '../document/document';
import { DocumentPermissionType } from '../../util/document-common';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBLocale } from '../../locales/localeid';
import { AiibProjectResponse } from './common/aiib-response-tip';
import DocumentCommon from '../../util/document-common';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow/aiib-content-list';

export interface AiibProposalListHeaderProps extends RouterProps, AkFormComponentProps {
    allWhere?: WhereModel;
    state?: ProposalState;
    tabKey?: 'Proposal' | 'Cancel' | 'Drop';
    selectedRows?: any[];
    setSimpleWhere: (value: ContentListWhereModel[]) => void;
    onTabChange?: () => void;
    onAdvancedSearch?: (value: ContentListWhereModel[]) => void;
    loadData?: () => void;
    isAdmin?: boolean;
    isScSecretariat?: boolean;
    isReadOnly?:boolean;
    onInputChange?: (value) => void;
    onClearSelectRow?: () => void;
}

export interface AiibProposalListHeaderStates {
    inputSearch: string;
    selectStatus: string;
    showModal?: boolean;
    submitHandle?: string;
    confirmLoading?: boolean;
    tabKey?: 'Proposal' | 'Cancel' | 'Drop';
    selectedRows?: any[];
    currentState?: string;
    isScSecretariat?: boolean;
    isReadOnly?:boolean;
    showDocumentModal?: boolean;
    selectDocument?: any;
    emailCode?: string;
}

export const stateValue = [
    STATE_NEWPROPOSAL,
    STATE_MANAGERIOREVIEW,
    STATE_DGIOREVIRE,
    STATE_SCSECREVIEW,
    STATE_PENDINGSCREENINGCOMMITTEE,
    STATE_SCREENINGCOMMITTEE,
    STATE_EXCUTIVECOMMITTEE
];

@withRouter
@AkForm.create()
@connect((state) => {
    return { isAdmin: state.aiib.isAIIBAdmin };
})
export class AiibProposalListHeader extends React.Component<AiibProposalListHeaderProps, AiibProposalListHeaderStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            inputSearch: '',
            selectStatus: 'All',
            showModal: false,
            confirmLoading: false,
            tabKey: props.tabKey,
            selectedRows: props.selectedRows,
            currentState: '',
            isScSecretariat: props.isScSecretariat,
            isReadOnly:props.isReadOnly,
            showDocumentModal: false,
            selectDocument: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('selectedRows' in nextProps && nextProps.selectedRows !== this.props.selectedRows) {
            this.setState({ selectedRows: nextProps.selectedRows });
        }
        if ('isScSecretariat' in nextProps && nextProps.isScSecretariat !== this.props.isScSecretariat) {
            this.setState({ isScSecretariat: nextProps.isScSecretariat });
        }
        if ('tabKey' in nextProps && nextProps.tabKey !== this.props.tabKey) {
            this.setState({ tabKey: nextProps.tabKey, inputSearch: '', selectStatus: 'All' });
        }
        if("isReadOnly" in nextProps && nextProps.isReadOnly !== this.props.isReadOnly) {
            this.setState({ isReadOnly: nextProps.isReadOnly });
        }

    }
    componentWillMount() {
        const inputSearch = this.props.location.query.InPutSearch;
        if (inputSearch) {
            this.setState({ inputSearch }, () => { this.mergeSearch(); });
        }
    }

    mergeSearch() {
        const { inputSearch, selectStatus } = this.state;
        let childWhere: ContentListWhereModel[] = [];
        if (inputSearch) {
            const newwhere = [
                {
                    WhereName: 'ProposalID',
                    Value: inputSearch,
                    Type: ContentListWhereType.LikeLast,
                    Pre: 'or'
                },
                {
                    WhereName: 'ProjectName',
                    Value: inputSearch,
                    Type: ContentListWhereType.LikeLast,
                    Pre: 'or'
                }
            ];
            childWhere = childWhere.concat(newwhere);
        }
        let where = [];
        if (inputSearch) {
            where = [
                {
                    WhereName: '',
                    Pre: 'and',
                    Type: ContentListWhereType.Contains,
                    Child: childWhere
                }
            ];
        }

        if (selectStatus && selectStatus !== 'All') {
            where.push({
                WhereName: 'Status',
                Value: selectStatus,
                Type: ContentListWhereType.Eq,
                Pre: 'and'
            });
        }
        this.props.setSimpleWhere(where);
    }

    onGeneralSearch(value) {
        this.setState({ inputSearch: value }, () => this.mergeSearch());
    }

    onAdvanceSearch(values) {
        this.setState({
            inputSearch: '',
        });
        this.props.onAdvancedSearch && this.props.onAdvancedSearch(values);
    }

    handleSelectChange(value) {
        this.setState({ selectStatus: value }, () => this.mergeSearch());
    }

    dropComfirme(selectedRows) {
        for (let i = 0; i < selectedRows.length; i++) {
            const d = selectedRows[i];
            if (d.Stage !== SATGE_PROPOSAL) {
                AkNotification.error({
                    message: 'Tip',
                    description: `${d.ProjectName} has become project`
                });
                this.setState({ confirmLoading: false, showModal: false });
                return true;
            }
        }
        return false;
    }


    onEditBatchProposal(request, addHistoryValue) {
        const { selectedRows } = this.state;
        let successSelecedRows = Object.assign([], selectedRows);
        ProposalAPI.editBatchProposal(request).then(data => {
            const responseList = data.Data;
            responseList.forEach(item => {
                if (item.Status === 0) {
                    AiibProjectResponse.successTip(AIIBLocale.SubmisionSuccess);
                } else {
                    const description = item.Status === 101 ? item.Message : AkGlobal.intl.formatMessage({ id: AIIBLocale.SubmisionFail })
                    const project = selectedRows.find((i) => i.ListDataID === item.Data);
                    AkUtil.remove(successSelecedRows, v => v.ListDataID === item.Data);
                    AkNotification.error({
                        message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                        description: [project.ProjectName] + ": " + description,
                        duration: 0
                    });
                }
            });

            this.onAddWorkflowHistory(addHistoryValue, successSelecedRows);
            this.onSendEmail(successSelecedRows);
            this.props.loadData();
            this.props.onClearSelectRow();
            this.setState({ showModal: false, confirmLoading: false });
        });
    }

    onSaveModalHandle(value) {
        const { submitHandle, selectedRows, tabKey } = this.state;
        const addHistoryValue = Object.assign({}, value);
        let successSelecedRows = Object.assign([], selectedRows);
        this.setState({ confirmLoading: true });
        let ParList = [];
        if (tabKey === "Proposal" && submitHandle === "Not Recommended") {
            value.SCRecommend = "Not Recommended";
        }

        // 点击 submit 或者 accept的操作
        if (tabKey === "Proposal" && (submitHandle === 'Cleared' || submitHandle === 'Recommended')) {
            if (this.props.state === ProposalState.ScrComApproved) {
                (value as ProjectAllFieldsModal).Stage = SATGE_CONCEPT;
                (value as ProjectAllFieldsModal).ProcessStage = "Approved by ExCom";
                (value as ProjectAllFieldsModal).ExComApprove = "Approved";
            }
            else if (this.props.state === ProposalState.PendingScrCom) {
                // (value as ProjectAllFieldsModal).ProcessStage = "Approved by ExCom";
                (value as ProjectAllFieldsModal).ProcessStage = "Recommended by ScrCom";
            }
            ParList =
                selectedRows &&
                selectedRows.map((item) => {
                    const stateIndex = stateValue.indexOf(item.State);
                    return {
                        ListDataID: item.ListDataID,
                        RowVersion: item.RowVersion,
                        Dic: {
                            State: stateValue[stateIndex + 1],
                            ...value
                        },
                        Wheres: [
                            {
                                WhereName: 'State',
                                Pre: 0,
                                Value: item.State
                            }
                        ]
                    };
                });
        } else if (tabKey === "Proposal" && (submitHandle === 'Reworked' || submitHandle === 'Not Recommended')) {
            // 点击reject的操作
            // Not recommend后返回 可以直接submit
            if (this.props.state === ProposalState.ScrComApproved) {
                (value as ProjectAllFieldsModal).ExComApprove = "Not Approved";
            }
            ParList =
                selectedRows &&
                selectedRows.map((item) => {
                    return {
                        ListDataID: item.ListDataID,
                        RowVersion: item.RowVersion,
                        Dic: {
                            Status: 'Unsubmitted',
                            State: STATE_NEWPROPOSAL,
                            ProcessStage: "",
                            CancelledComment:
                                value['ScreeningCommitteeApprovedComment'] ||
                                value['ExecutiveCommitteeApprovedComment'] ||
                                value['Comments'] ||
                                '',
                            ...value
                        },
                        Wheres: [
                            {
                                WhereName: 'State',
                                Pre: 0,
                                Value: item.State
                            }
                        ]
                    };
                });
        } else if (tabKey === "Cancel" && (submitHandle === 'Cleared' || submitHandle === 'Recommended')) {
            ParList =
                selectedRows &&
                selectedRows.map((item) => {
                    if (this.props.state === ProposalState.PendingScrCom) {
                        return {
                            ListDataID: item.ListDataID,
                            RowVersion: item.RowVersion,
                            Dic: {
                                CancelStage: AiibProjectCancelStage.ScrComApproved + ''
                            },
                            Wheres: [
                                {
                                    WhereName: 'CancelStage',
                                    Pre: 0,
                                    Value: AiibProjectCancelStage.PendingScrCom + ''
                                }
                            ]
                        };
                    }
                    if (this.props.state === ProposalState.ScrComApproved) {
                        return {
                            ListDataID: item.ListDataID,
                            RowVersion: item.RowVersion,
                            Dic: {
                                CancelStage: AiibProjectCancelStage.Default + '',
                                Status: 'Inactive',
                                CancelStatus: AiibProjectCancelStatus.Cancelled + '',
                                StartNum: (Number(item.StartNum) + 1).toString()
                            },
                            Wheres: [
                                {
                                    WhereName: 'CancelStage',
                                    Pre: 0,
                                    Value: AiibProjectCancelStage.ScrComApproved + ''
                                }
                            ]
                        };
                    }
                });
        } else if (tabKey === "Cancel" && submitHandle === 'Reworked') {
            ParList =
                selectedRows &&
                selectedRows.map((item) => {
                    return {
                        ListDataID: item.ListDataID,
                        RowVersion: item.RowVersion,
                        Dic: {
                            CancelStage: AiibProjectCancelStage.Default + '',
                            CancelStatus: AiibProjectCancelStatus.Default + ''
                        },
                        Wheres: [
                            {
                                WhereName: 'CancelStage',
                                Pre: 0,
                                Value: item.CancelStage
                            }
                        ]
                    };
                });
        } else if (tabKey === "Drop" && submitHandle === 'Recommended') {
            if (this.dropComfirme(selectedRows)) return;
            ParList =
                selectedRows &&
                selectedRows.map((item) => {
                    return {
                        ListDataID: item.ListDataID,
                        RowVersion: item.RowVersion,
                        Dic: {
                            DropStatus: '2',
                            Status: 'Inactive',
                        },
                        Wheres: [
                            {
                                WhereName: 'DropStatus',
                                Pre: 0,
                                Value: '1'
                            }
                        ]
                    };
                });
        } else if (tabKey === "Drop" && submitHandle === 'Reworked') {
            if (this.dropComfirme(selectedRows)) return;
            ParList =
                selectedRows &&
                selectedRows.map((item) => {
                    return {
                        ListDataID: item.ListDataID,
                        RowVersion: item.RowVersion,
                        Dic: {
                            DropStatus: '0'
                        },
                        Wheres: [
                            {
                                WhereName: 'DropStatus',
                                Pre: 0,
                                Value: '1'
                            }
                        ]
                    };
                });
        }
        const request = {
            Title: 'Project',
            ParList: ParList,
            Verification: false
        };

        if (this.props.state === ProposalState.ScrComApproved && tabKey === "Proposal" && submitHandle === 'Cleared') {
            this.onEditBatchProposal(request, addHistoryValue);
        } else {
            let actions = null;
            if (this.props.state === ProposalState.ScrComApproved && tabKey === "Cancel" && submitHandle === 'Cleared') {
                actions = AIIBWorkflowAPI.projectCancel;
            } else {
                actions = ContentListApi.EditWhereBatchByTitle;
            }

            actions(request).then((data) => {
                if (data.Status === 0) {
                    if (
                        this.props.state === ProposalState.ScrComApproved &&
                        Array.isArray(data.Data) &&
                        data.Data.length > 0
                    ) {
                        const failureProject =
                            data.Data &&
                            data.Data.length > 0 &&
                            data.Data.map((item) => {
                                return selectedRows.filter((i) => i.ListDataID === item)[0].ProjectName;
                            });
                        successSelecedRows = data.Data &&
                            data.Data.length > 0 &&
                            data.Data.map((item) => {
                                return selectedRows.filter((i) => i.ListDataID === item);
                            });

                        AkNotification.error({
                            message: 'Tip',
                            description: `Project ${failureProject.join(',')} Submission failure !`
                        });
                        this.setState({ confirmLoading: false });
                    } else {

                        AiibProjectResponse.successTip(AIIBLocale.SubmisionSuccess);
                    }

                    this.onAddWorkflowHistory(addHistoryValue, successSelecedRows);
                    this.onSendEmail(successSelecedRows);
                    this.props.loadData();
                    this.props.onClearSelectRow();
                    this.setState({ showModal: false, confirmLoading: false });
                } else {
                    this.setState({ confirmLoading: false });
                    AiibProjectResponse.errorTip(AIIBLocale.SubmisionFail);
                }
            });
        }
    }

    onAddWorkflowHistory(value, successSelecedRows) {
        const { submitHandle, tabKey } = this.state;
        let workflowHistory: addAiibWorkflowHistory = {
            Title: 'ActionLog',
            DicList: []
        };
        successSelecedRows &&
            successSelecedRows.map((item) => {
                let Title = item.State;
                let Category = 'Proposal';
                let ActionType = submitHandle;

                if (tabKey === 'Cancel') {
                    if (this.props.state === ProposalState.PendingScrCom) {
                        Title = 'Sc Sec Cancel Review';
                    }
                    if (this.props.state === ProposalState.ScrComApproved) {
                        Title = 'ScrCom Approved Cancel Review';
                    }
                    Category = 'Cancel';
                } else if (tabKey === 'Drop') {
                    Title = ActionType === 'Cleared' ? 'Drop clearance by SC Sec' : 'Drop rework by SC Sec';
                    Category = 'Droping';
                } else {
                    if (this.props.state === ProposalState.ScrComApproved) {
                        ActionType = ActionType === 'Cleared' ? "Approved" : "Not Approved";
                    }
                }
                const workflowDic = {
                    Title: Title,
                    ProjectDataID: item.ListDataID,
                    ActionType: ActionType,
                    Comment:
                        value['ScreeningCommitteeApprovedComment'] ||
                        value['ExecutiveCommitteeApprovedComment'] ||
                        value['Comments'] || '',
                    StartNum: item.StartNum,
                    Category: Category
                };
                workflowHistory.DicList.push(workflowDic);
            });
        ContentListApi.AddBatchDataByTitle(workflowHistory);
    }

    onSendEmail(successSelecedRows) {
        const { state: { submitHandle, tabKey }, props: { state } } = this;
        let code: string = '';

        if (tabKey === "Proposal" && (submitHandle === "Cleared" || submitHandle === 'Recommended')) {
            if (state === ProposalState.PendingScrCom)
                code = "Proposal-ScrCom-Cleared";
            else if (state === ProposalState.ScrComApproved)
                code = 'Proposal-ExCom-Cleared';
        } else if (tabKey === "Proposal" && submitHandle === 'Not Recommended') {
            code = 'Proposal-ScrCom-NotRecommend';
        } else if (tabKey === "Proposal" && submitHandle === "Reworked") {
            if (state === ProposalState.PendingScrCom)
                code = "Proposal-ScrCom-Rework";
            if (state === ProposalState.ScrComApproved)
                code = 'Proposal-ExCom-Rework';
        } else if (tabKey === "Cancel" && (submitHandle === "Cleared" || submitHandle === 'Recommended')) {
            if (state === ProposalState.PendingScrCom) code = 'Project-Cancel-SCCom-Approve';
            if (state === ProposalState.ScrComApproved) code = 'Project-Cancel-ExCom-Approve';
        } else if (tabKey === "Cancel" && submitHandle === "Reworked") {
            if (state === ProposalState.PendingScrCom) code = 'Project-Cancel-SCCom-Reject';
            if (state === ProposalState.ScrComApproved) code = 'Project-Cancel-ExCom-Reject';
        } else if (tabKey === "Drop" && submitHandle === "Recommended") {
            code = 'Proposal-Drop-SCApprove';
        } else if (tabKey === "Drop" && submitHandle === "Reworked") {
            code = 'Proposal-Drop-SCReject';
        }
        const listDataIDs = successSelecedRows.map((i) => i.ListDataID);

        if (listDataIDs.length > 0) {
            AiibSendEmailCommom.sendEmail(code, undefined, undefined, listDataIDs);
        }
    }

    validateProposalForm(listData) {
        let RequiredProposalFields = validateProposalFields;
        if (listData.FinancingMethod === NONSOVEREIGN_BACKEDFINACING) {
            RequiredProposalFields = [...validateProposalFields, ...validateNSBFProposalFields];
        } else {
            RequiredProposalFields = [...validateProposalFields, ...validateSBFProposalFields];
        }
        for (let i = 0; i < RequiredProposalFields.length; i++) {
            const d = RequiredProposalFields[i];
            if (listData.hasOwnProperty(d.key)) {
                if (!listData[d.key]) {
                    return d.label;
                }
            }
            if (listData.OtherFund === 'Yes') {
                if (!listData['OtherFundAmount']) {
                    return 'Other Sources of Funds (US$ MM)';
                }
            }
        }
        return null;
    }

    /**表单的必填验证*/
    selectedRowsValidate() {
        const { state: { selectedRows } } = this;
        for (let i = 0; i < selectedRows.length; i++) {
            if (AiibCommonFun.ValidateProposalForm(selectedRows[i])) {
                return true;
            }
        }
        return false;
    }

    onOkHandle() {
        const { state: { selectedRows } } = this;

        this.props.form.validateFieldsAndScroll(null, {}, (err, valus) => {
            if (!err) {
                if (selectedRows.length > 0) {
                    this.onSaveModalHandle(valus);
                }
            }
        });
    }

    onClickActions(actionType: string) {
        const { state: { selectedRows } } = this;
        if (selectedRows.length > 0) {
            if (this.selectedRowsValidate()) return;
            this.setState({ showModal: true, submitHandle: actionType });

        } else {
            AiibProjectResponse.errorTip(AIIBLocale.SelectRequire);
        }
    }

    renderClear(actionType: string, text?: string, ) {
        const { state: { isScSecretariat }, props: { isAdmin } } = this;
        return isScSecretariat || isAdmin ? (
            <AkButton
                key={text ? text : 'Clear'}
                className="aiib-button dark"
                onClick={() => {
                    this.onClickActions(actionType);
                    this.setState({ currentState: 'clear' });
                    if (text) {
                        setTimeout(() => {
                            this.props.form.setFieldsValue({
                                SCRecommend: "Recommended"
                            });
                        });
                    }
                }}
                icon="check-circle-o">
                {text ? text : 'Clear'}
            </AkButton>
        ) : null;
    }

    renderRework(actionType: string, text?: string) {
        const { state: { isScSecretariat }, props: { isAdmin } } = this;
        return isScSecretariat || isAdmin ? (
            <AkButton
                key={text ? text : 'Rework'}
                className="aiib-button red"
                onClick={() => {

                    this.onClickActions(actionType);
                    this.setState({ currentState: 'Reworked' });
                }}
                icon="close-circle-o"
            >
                {text ? text : 'Rework'}
            </AkButton>
        ) : null;
    }

    renderFooter() {
        return (
            <AkRow>
                <AkButton
                    loading={this.state.confirmLoading}
                    type="primary"
                    icon="fly"
                    size="large"
                    className="aiib-button dark"
                    onClick={this.onOkHandle.bind(this)}
                >
                    Submit
				</AkButton>
            </AkRow>
        );
    }


    onDocumentModalOk() {
        const { selectDocument, emailCode } = this.state;
        if (JSON.stringify(selectDocument) === "{}") {
            AiibProjectResponse.errorTip(AIIBLocale.SelectRequire);
            return;
        }
        this.setState({ confirmLoading: true });
        let request: SendEmailRequest = {
            Title: "Project",
            EmailCode: emailCode,
            Links: selectDocument
        };
        ProjectAPI.sendEmail(request).then(data => {
            if (data.Status === 0) {
                AiibProjectResponse.successTip(AIIBLocale.SendEmailSuccess);
                this.onDocumentModalCancel();
            } else {
                AiibProjectResponse.errorTip(AIIBLocale.SendEmailFailure);
                this.onDocumentModalCancel();
            }
        });
    }

    onDocumentModalCancel() {
        this.setState({
            showDocumentModal: false,
            selectDocument: null,
            confirmLoading: false
        });
    }

    renderDocumentFooter() {
        return <AkRow>
            <AkButton
                loading={this.state.confirmLoading}
                type="primary"
                icon="fly"
                size="large"
                className="aiib-button dark"
                onClick={this.onDocumentModalOk.bind(this)}>OK</AkButton>
            <AkButton
                type="primary"
                icon="close-circle-o"
                size="large"
                className="aiib-button dark"
                onClick={this.onDocumentModalCancel.bind(this)}>Cancel</AkButton>
        </AkRow>;
    }

    renderDocumentModal() {
        const { confirmLoading } = this.state;
        const modalProps = {
            title: "Select Document Folder",
            visible: true,
            width: 1000,
            okText: 'OK',
            cancelText: 'Cancel',
            confirmLoading: confirmLoading,
            wrapClassName: 'aiib-adv-search-modal',
            footer: this.renderDocumentFooter(),
            onCancel: () => {
                this.onDocumentModalCancel();
            }
        };
        return <AkModal {...modalProps}>
            <Document stage={DocumentFolderType.MeetingMaterials}
                isPagination={true}
                pageSize={10}
                documentPermissionType={DocumentPermissionType.Select}
                onSelectChange={(value) => {
                    if (value.length > 0) {
                        let selectDocument = {};
                        const baseUrl = _spPageContextInfo.webAbsoluteUrl + "/sitepages/pages/index.aspx?_hash_=" + PathConfig.AiibMeetingMaterials;
                        value.forEach(item => {
                            if (item.IsFolder) {
                                selectDocument[item.Name] = `${baseUrl}?path=${encodeURIComponent(item.Path)}`;
                            } else if (DocumentCommon.isPdfFile(item.Name)) {
                                selectDocument[item.Name] = DocumentCommon.getOnlineViewPdf(item);
                            } else {
                                selectDocument[item.Name] = DocumentCommon.getOnlineViewUrl(item, false);
                            }
                        });
                        this.setState({ selectDocument });
                    } else {
                        this.setState({ selectDocument: null });
                    }

                }} />
        </AkModal>;
    }

    renderModal() {
        const { props: { state }, state: { confirmLoading, submitHandle, tabKey, currentState } } = this;
        let title = '';
        let content = null;
        if (state === ProposalState.PendingScrCom && tabKey === 'Proposal') {
            title = 'Screening Committee';
            content = (
                <AkForm>
                    {submitHandle === 'Recommended' || submitHandle === 'Not Recommended' ? this.props.form.getFieldDecorator('SCRecommend', null) : null}
                    {AIIBWorkflowHelper.renderFormItemInModal(
                        this.props,
                        'Screening Committee Decision Date',
                        'ScreeningCommitteeApprovedDate',
                        <AkDatePicker
                            format="MM-DD-YYYY"
                            disabledDate={(current) => {
                                return current && current >= moment().endOf('day');
                            }}
                        />,
                        true
                    )}
                    {AIIBWorkflowHelper.renderFormItemInModal(
                        this.props,
                        'Comments',
                        'ScreeningCommitteeApprovedComment',
                        <AkInput.TextArea />,
                        currentState === 'clear' ? false : true
                    )}
                </AkForm>
            );
        } else if (state === ProposalState.ScrComApproved) {
            title = 'Executive Committee';
            content = (
                <AkForm>
                    {tabKey === 'Proposal' ? (
                        AIIBWorkflowHelper.renderFormItemInModal(
                            this.props,
                            'Executive Committee Decision Date',
                            'ExComApprovalDate',
                            <AkDatePicker
                                format="MM-DD-YYYY"
                                disabledDate={(current) => {
                                    return current && current >= moment().endOf('day');
                                }}
                            />,
                            true
                        )
                    ) : null}
                    {AIIBWorkflowHelper.renderFormItemInModal(
                        this.props,
                        'Comments',
                        'ExecutiveCommitteeApprovedComment',
                        <AkInput.TextArea />,
                        currentState === 'clear' ? false : true
                    )}
                </AkForm>
            );
        } else {
            title = 'Comments';
            content = (
                <AkForm>
                    {AIIBWorkflowHelper.renderFormItemInModal(
                        this.props,
                        'Comments',
                        'Comments',
                        <AkInput.TextArea />,
                        currentState === 'clear' ? false : true
                    )}
                </AkForm>
            );
        }

        const modalProps = {
            title: title,
            visible: true,
            width: 1000,
            okText: 'Submit',
            cancelText: 'Cancel',
            confirmLoading: confirmLoading,
            wrapClassName: 'aiib-adv-search-modal',
            footer: this.renderFooter(),
            onCancel: () => {
                this.props.form.resetFields();
                this.setState({ showModal: false, confirmLoading: false });
            }
        };
        return <AkModal {...modalProps}>{content}</AkModal>;
    }

    render() {
        const {
            props: { state, isAdmin, isReadOnly},
            state: { inputSearch, showModal, isScSecretariat, tabKey, showDocumentModal, }
        } = this;
        let actions: any[] = [];
        if (state === ProposalState.NewProposal || state === ProposalState.AllProposal) {
            actions.push(
                AiibPromissionControl.hasProposalCreatElements(
                    isAdmin,
                    isReadOnly,
                    <AkButton
                        key="CreatWeb"
                        className="aiib-button dark"
                        onClick={() => {
                            this.props.router.replace({
                                pathname: PathConfig.ProposalPage,
                                query: {
                                    backUrl: this.props.location.pathname
                                }
                            });
                        }}
                        icon="plus"
                    >
                        Create Proposal
					</AkButton>
                )
            );
        }
        // if (state === ProposalState.AllProposal && this.props.isAdmin) {
        //     actions.push(
        //         <AiibProjectImport loadData={() => this.props.loadData()} key="import" template="proposal" />,
        //         <AiibHistotyDocumentImport key="documentImport" type="proposal" />
        //     );
        // }

        if (state === ProposalState.ScSecretariat && (isScSecretariat || isAdmin) && !this.state.isReadOnly) {
            actions.push(<AkButton key="scemail" className="aiib-button dark" onClick={() => this.setState({ showDocumentModal: true, emailCode: "To-SC-Members" })}>
                <i className={"iconfont icon-redo"}></i>
                <span style={{ marginLeft: 7 }}>Send Email to SC Members</span>
            </AkButton>);
        }
        if (state === ProposalState.ScrComApproved && (isScSecretariat || isAdmin) && !this.state.isReadOnly) {
            actions.push(<AkButton key="scemail" className="aiib-button dark" onClick={() => this.setState({ showDocumentModal: true, emailCode: "To-EC-Members" })}>
                <i className={"iconfont icon-redo"}></i>
                <span style={{ marginLeft: 7 }}>Send Email to EC Members</span>
            </AkButton>);
        }

        if (state === ProposalState.ScSecretariat && !this.state.isReadOnly) {
            actions.push(this.renderClear("Cleared"), this.renderRework('Reworked'));
        } else if (state === ProposalState.PendingScrCom && tabKey === 'Proposal' && !this.state.isReadOnly) {
            actions.push(this.renderClear("Recommended", 'Recommend'), this.renderRework('Not Recommended', 'Not Recommend'), this.renderRework('Reworked'));
        } else if (state === ProposalState.PendingScrCom && tabKey !== 'Proposal' && !this.state.isReadOnly) {
            actions.push(this.renderClear('Recommended', 'Recommend'), this.renderRework('Reworked'));
        } else if (state === ProposalState.ScrComApproved && !this.state.isReadOnly) {
            actions.push(this.renderClear('Cleared', 'Approve'), this.renderRework('Reworked', "Not Approve"));
        }

        return (
            <div className="aiib-list-header">
                <div className="aiib-list-header-left">
                    <AkRow type="flex" align="middle" justify="start">
                        <AkCol className="mr10">
                            <AIIBGeneralSearch
                                placeholder="Proposal ID or Project Name"
                                value={inputSearch}
                                onChange={(value) => {
                                    this.setState({ inputSearch: value });
                                    this.props.onInputChange(value);
                                }}
                                onSearch={(value) => {
                                    this.onGeneralSearch(value);
                                }}
                            />
                        </AkCol>
                        <AkCol>
                            <AiibAdvancedSearch
                                onChange={this.onAdvanceSearch.bind(this)}
                                type={SearchType.Proposal}
                                value={this.props.allWhere.AdvancedWhere}
                            />
                        </AkCol>
                    </AkRow>
                </div>
                <div className="aiib-list-header-right">{actions}</div>
                {showModal ? this.renderModal() : null}
                {showDocumentModal ? this.renderDocumentModal() : null}
            </div>
        );
    }
}
