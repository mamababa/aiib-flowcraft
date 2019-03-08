import * as React from "react";
import { AkButton, AkUpload, AkGlobal } from 'akmii-yeeoffice-common';
import { AIIBLocale } from '../../locales/localeid';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AiibProjectResponse } from "../aiib/index";

export interface DataBaseImportState {
    confirmLoading: boolean;

}

export interface DataBaseImportProps {
    loadData: () => void;
}

export class DataBaseImport extends React.Component<DataBaseImportProps, DataBaseImportState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            confirmLoading: false
        }

    }
    render() {
        const { formatMessage } = AkGlobal.intl;
        return <AkUpload action=''
            showUploadList={false}
            customRequest={(file) => {
                const formData = new FormData();
                formData.append("file", file.file);
                ProjectAPI.ProjectDataBaseImport(formData).then(data => {
                    if (data.Status === 0) {
                        AiibProjectResponse.successTip(AIIBLocale.ImportSuccess);
                        this.props.loadData();
                        this.setState({
                            confirmLoading: false
                        });
                    } else {
                        this.setState({ confirmLoading: false });
                        let description = null;
                        let message = data.ServerMessage;
                        const importStatus = "project.import.status.";
                        switch (data.Status) {
                            case 540009: description = formatMessage({ id: importStatus + data.Status }, { name: message });
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

                            default: description = message;
                        }

                        AiibProjectResponse.errorStringTip(description);
                    }
                });
            }}>
            <AkButton loading={this.state.confirmLoading} icon="upload" className="aiib-button dark">{formatMessage({ id: AIIBLocale.Import })}</AkButton>
        </AkUpload>;
    }
}
