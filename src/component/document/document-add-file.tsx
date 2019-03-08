import * as React from 'react';
import { AkUpload, AkButton, AkFile, AkNotification, AkIcon } from 'akmii-yeeoffice-common';
import DocumentCommon from '../../util/document-common';
interface DocumentAddFileProps {
    onUpload?: (file: File) => void;
}
interface DocumentAddFileStates { }
export default class DocumentAddFile extends React.Component<DocumentAddFileProps, DocumentAddFileStates>{
    constructor(props, context) {
        super(props, context);
    }
    beforeUpload(file: AkFile) {
        const officeSuffix = ["ppt", "pptx", "doc", "docx", "xls", "xlsx", "vsdx", "vsd", "pdf"];
        const isOfficeFile = officeSuffix.indexOf(DocumentCommon.getFileExtension(file.name.toLowerCase()).replace(".", "")) > -1;
        const isLt100M = file.size / 1024 / 1024 < 100;
        const isSL0M = file.size > 0;
        if (!isOfficeFile) {
            AkNotification.error({
                message: 'Tip',
                description: `You can only upload ${officeSuffix.join(',')} file!`
            });
        }
        if (!isSL0M) {
            AkNotification.error({
                message: 'Tip',
                description: 'File must be greater than 0MB!'
            });
        }
        if (!isLt100M) {
            AkNotification.error({
                message: 'Tip',
                description: 'File must smaller than 100MB!'
            });
        }

        return isOfficeFile && isLt100M && isSL0M;
    }
    onUpload(option: any) {
        this.props.onUpload && this.props.onUpload(option.file);
    }
    render() {
        return <AkUpload
            action=''
            beforeUpload={this.beforeUpload.bind(this)}
            // multiple={true}
            showUploadList={false}
            customRequest={this.onUpload.bind(this)}
        >
            <AkButton className="aiib-button green" icon="upload">File Upload</AkButton>
        </AkUpload>;
    }
}
