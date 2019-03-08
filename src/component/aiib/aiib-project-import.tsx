import * as React from 'react';
import { AkButton, AkModal, AkGlobal, AkDateLabel, AkDatetimeUtil, AkUpload, AkRow, AkRadio } from 'akmii-yeeoffice-common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBLocale } from '../../locales/localeid';
import { AdminMetadataAPI } from '../../api/aiib-metadata';
import { AiibProjectResponse, AiibCommonFun } from './index';
import { AiibContentListDefs } from '../../api/aiibworkflow';
export interface AiibProjectImportProps {
    template: "proposal" | "project" | "ratings";
    loadData?: () => void;
    btnText?: string;
}

export interface AiibProjectImportStates {
    showModal?: boolean;
    confirmLoading?: boolean;
    file?: any;
    clientType?: string;
    templateUrl?: string;
}
export class AiibProjectImport extends React.Component<AiibProjectImportProps, AiibProjectImportStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            confirmLoading: false,
            clientType: "Sovereign-backed Financing",
            templateUrl: this.getTemplateUrl("Sovereign-backed Financing")
        }
    }

    getTemplateUrl(clientType?: string) {
        clientType = clientType ? clientType : this.state.clientType;
        const baseUrl = _spPageContextInfo.webAbsoluteUrl;
        let url = `${baseUrl}/SitePages/pages/template/Proposal Import Template.xlsx`;
        if (this.props.template === "project" && clientType === "Sovereign-backed Financing") {
            url = `${baseUrl}/SitePages/pages/template/Project Import Template-SBF.xlsx`;
        } else if (this.props.template === "project" && clientType === "Nonsovereign-backed Financing") {
            url = `${baseUrl}/SitePages/pages/template/Project Import Template-NSBF.xlsx`;
        } else if (this.props.template === "proposal" && clientType === "Sovereign-backed Financing") {
            url = `${baseUrl}/SitePages/pages/template/Proposal Import Template-SBF.xlsx`;
        } else if (this.props.template === "proposal" && clientType === "Nonsovereign-backed Financing") {
            url = `${baseUrl}/SitePages/pages/template/Proposal Import Template-NSBF.xlsx`;
        } else if (this.props.template === "ratings") {
            url = `${baseUrl}/SitePages/pages/template/Ratings.xlsx`;
        }
        return url;
    }

    importHandler() {
        const { formatMessage } = AkGlobal.intl;
        const { template } = this.props;
        this.setState({ confirmLoading: true });

        const formData = new FormData();

        if (!this.state.clientType) {
            this.setState({ confirmLoading: false });
            AiibProjectResponse.errorStringTip("Please choose Client Type");
            return;
        }

        if (!this.state.file) {
            this.setState({ confirmLoading: false });
            AiibProjectResponse.errorTip(AIIBLocale.PleaseImportTemplate)
            return;
        }
        const momentObj = AkDatetimeUtil.toCSTMoment(new Date());

        let action = null;
        let request: any = {
            ClientHour: momentObj.utcOffset() / 60,
            ClientType: this.state.clientType
        };
        if (template === "proposal") {
            action = ProjectAPI.ProposalImport;
        } else if (template === "project") {
            action = ProjectAPI.ProjectImport;
        } else if (template === "ratings") {
            request = {
                ListID: "983646342767316992",
                uniqueKeyName: 'Country'
            }
            action = AdminMetadataAPI.postImportMetadata;
        }

        formData.append("file", this.state.file);
        action(request, formData).then(data => {
            if (data.Status === 0) {
                AiibProjectResponse.successTip(AIIBLocale.ImportSuccess);
                this.setState({ showModal: false, confirmLoading: false, file: null, clientType: "Sovereign-backed Financing" });
                this.props.loadData();
            } else {
                this.setState({ confirmLoading: false });
                let description = null;
                let message = data.ServerMessage;
                const importStatus = "project.import.status.";
                switch (data.Status) {
                    case 540009: description = formatMessage({ id: importStatus + data.Status }, { name: message });
                        break;
                    case 540011:
                        const defs: AiibContentListDefs[] = AiibCommonFun.getlocalStorageListDefsData();
                        const def = defs && defs.find(item => item.FieldName === JSON.parse(data.ServerMessage).key);
                        description = formatMessage({ id: importStatus + data.Status }, { name: def ? def.DisplayName : JSON.parse(data.ServerMessage).key, type: JSON.parse(data.ServerMessage).type, value: JSON.parse(data.ServerMessage).value });
                        break;
                    case 500002:
                        description = formatMessage({ id: importStatus + data.Status });
                        break;
                    case 540013: description = formatMessage({ id: importStatus + data.Status }, { name: data.Message });
                        break;
                    case 540018:
                        description = formatMessage({ id: importStatus + data.Status }, { name: data.Message });
                        break;

                    default: description = message;
                }

                AiibProjectResponse.errorStringTip(description);
            }
        });
    }

    renderFooter() {
        return <AkRow>
            <AkButton loading={this.state.confirmLoading} size="large" className="aiib-button dark"
                onClick={this.importHandler.bind(this)}>Ok</AkButton>
            <AkButton size="large" className="btn-footer btn-cancel"
                onClick={() => {
                    this.setState({ showModal: false, file: null, clientType: "Sovereign-backed Financing" });
                }}>Cancel</AkButton>
        </AkRow>;
    }

    renderModal() {
        const { template } = this.props;
        const { formatMessage } = AkGlobal.intl;
        const projectorProposal = template === "project" ? "Project" : "Proposal";
        let Template = (template === "ratings") ? "Country Data" : projectorProposal;
        const importModalProps = {
            confirmLoading: this.state.confirmLoading,
            title: "Import Data",
            visible: true,
            width: 600,
            onOk: () => this.importHandler(),
            wrapClassName: "aiib-adv-search-modal",
            footer: this.renderFooter(),
            onCancel: () => {
                this.setState({ showModal: false, file: null, clientType: "Sovereign-backed Financing" });
            }
        };
        return <AkModal {...importModalProps}>
            {this.props.template === "ratings" ? null : <div className="ak-import-text">
                1、Client Type <span className="ant-form-item-required"></span>:
                <AkRadio.Group className="ml10" value={this.state.clientType} onChange={(e) => {
                    this.setState({ clientType: e.target.value, templateUrl: this.getTemplateUrl(e.target.value) });

                }}>
                    <AkRadio value="Sovereign-backed Financing">Sovereign-backed Financing</AkRadio>
                    <AkRadio value="Nonsovereign-backed Financing">Nonsovereign-backed Financing</AkRadio>
                </AkRadio.Group>
            </div>}

            <div className="ak-import-text">
                {this.props.template === "ratings" ? "1、" : " 2、"}
                <a href={this.state.templateUrl}>Click To Download</a>  {Template} Template  </div>
            <div className="ak-import-text">
                {this.props.template === "ratings" ? "2、" : " 3、"}
                Fill in the template file, select the file, and start importing</div>
            <div className="ak-import-text">
                {this.props.template === "ratings" ? "3、" : " 4、"}
                <AkUpload
                    action=''
                    showUploadList={false}
                    customRequest={(file) => {
                        this.setState({ file: file.file });
                    }}>
                    <AkButton size="small" type="primary">{formatMessage({ id: AIIBLocale.FileUpload })}</AkButton>
                    <span className="ak-import-name"> {this.state.file ? this.state.file.name : "No file selected"}</span>
                </AkUpload></div>
            <AkDateLabel />
        </AkModal>;
    }

    render() {
        const { showModal } = this.state;
        const { formatMessage } = AkGlobal.intl;
        return <div style={{ display: "inline-block" }}>
            <AkButton icon="upload" className='aiib-button dark' onClick={() => {
                this.setState({ showModal: true });
            }}>{this.props.btnText ? this.props.btnText : formatMessage({ id: AIIBLocale.Import })}</AkButton>
            {showModal ? this.renderModal() : null}
        </div>;

    }

}
