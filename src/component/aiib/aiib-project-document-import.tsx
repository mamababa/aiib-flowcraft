import * as React from 'react';
import { AkButton, AkModal, AkGlobal, AkDateLabel, AkUpload, AkRow, AkFile } from 'akmii-yeeoffice-common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBLocale } from '../../locales/localeid';
import DocumentCommon from '../../util/document-common';
import { AiibProjectResponse } from './index';
export interface AiibHistotyDocumentImportProps {
    type: "proposal" | "project";
}

export interface AiibHistotyDocumentImportStates {
    showModal?: boolean;
    confirmLoading?: boolean;
    file?: any;
}
export class AiibHistotyDocumentImport extends React.Component<AiibHistotyDocumentImportProps, AiibHistotyDocumentImportStates> {
    templateUrl: string;

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            confirmLoading: false,
        }
        this.templateUrl = this.getTemplateUrl()
    }

    getTemplateUrl() {
        const baseUrl = _spPageContextInfo.webAbsoluteUrl;
        const { type } = this.props;
        let url;
        if (type === "proposal") {
            url = `${baseUrl}/SitePages/pages/template/Proposal Documents.zip`;
        } else {
            url = `${baseUrl}/SitePages/pages/template/Project Documents.zip`;
        }

        return url;
    }

    importHandler() {
        const { formatMessage } = AkGlobal.intl;
        const { type } = this.props;
        this.setState({ confirmLoading: true });

        const formData = new FormData();
        if (!this.state.file) {
            this.setState({ confirmLoading: false });
            AiibProjectResponse.errorTip(AIIBLocale.PleaseImportTemplate);
            return;
        }
        formData.append("file", this.state.file);
        ProjectAPI.ProjectDocumentImport({ Type: type }, formData).then(data => {
            if (data.Status === 0) {
                AiibProjectResponse.successTip(AIIBLocale.ImportSuccess);
                this.setState({ showModal: false, confirmLoading: false, file: null });
            } else {
                this.setState({ confirmLoading: false });
                let description = null;
                let message = data.Message;
                const importStatus = "project.import.status.";
                switch (data.Status) {
                    case 1: description = data.Message;
                        break;
                    case 540009: description = message;
                        break;
                    case 540011: description = formatMessage({ id: importStatus + data.Status }, { name: JSON.parse(data.ServerMessage).key, type: JSON.parse(data.ServerMessage).type, value: JSON.parse(data.ServerMessage).value });
                        break;
                    case 500002:
                        description = formatMessage({ id: importStatus + data.Status });
                        break;
                    case 540013: description = formatMessage({ id: importStatus + data.Status }, { name: message });
                        break;
                    case 540018:
                        description = formatMessage({ id: importStatus + data.Status }, { name: data.Message });
                        break;

                    default: description = formatMessage({ id: AIIBLocale.ImportFail });
                }
                AiibProjectResponse.errorStringTip(description);
            }
        });
    }

    beforeUpload(file: AkFile) {
        const officeSuffix = ["zip",];
        const isOfficeFile = officeSuffix.indexOf(DocumentCommon.getFileExtension(file.name.toLowerCase()).replace(".", "")) > -1;
        if (!isOfficeFile) {
            AiibProjectResponse.errorStringTip(`You can only upload ${officeSuffix.join(',')} file!`);
        }
        return isOfficeFile;
    }

    renderFooter() {
        return <AkRow>
            <AkButton loading={this.state.confirmLoading} size="large" className="aiib-button dark"
                onClick={this.importHandler.bind(this)}>Ok</AkButton>
            <AkButton size="large" className="btn-footer btn-cancel"
                onClick={() => {
                    this.setState({ showModal: false, file: null });
                }}>Cancel</AkButton>
        </AkRow>;
    }

    renderModal() {
        const { type } = this.props;
        const { formatMessage } = AkGlobal.intl;

        const importModalProps = {
            confirmLoading: this.state.confirmLoading,
            title: "Import Document",
            visible: true,
            onOk: () => this.importHandler(),
            wrapClassName: "aiib-adv-search-modal",
            footer: this.renderFooter(),
            onCancel: () => {
                this.setState({ showModal: false, file: null });
            }
        };
        return <AkModal {...importModalProps}>
            <div className="ak-import-text">1、<a href={this.templateUrl}>Click To Download</a> Document Template  </div>
            <div className="ak-import-text">2、Fill in the template file, select the file, and start importing</div>
            <div className="ak-import-text">3、<AkUpload
                action=''
                showUploadList={false}
                beforeUpload={(file) => this.beforeUpload(file)}
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
            <AkButton icon="file" className='aiib-button dark' onClick={() => {
                this.setState({ showModal: true });
            }}>{formatMessage({ id: AIIBLocale.DocumentImport })}</AkButton>
            {showModal ? this.renderModal() : null}
        </div>;
    }
}
