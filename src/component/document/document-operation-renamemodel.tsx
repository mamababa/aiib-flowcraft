import * as React from "react";
import { AkModal, AkRow, AkCol, AkInput, AkNotification, AkGlobal } from "akmii-yeeoffice-common";
import { DocumentPageLocale } from "akmii-yeeoffice-crafts/lib";
import DocumentSharePointAPI from "../../api/document/document-sp-api";
import { AiibProjectResponse } from "../aiib/index";
import { AIIBLocale } from "../../locales/localeid";
// import DocumentCommon from "../../util/document-common";
interface DocumentOperationnameModalProps {
    item: DocumentModel;
    onCloseModal: () => void;
    loadDocument: () => void;
}
interface DocumentOperationnameModalStates {
    confirmLoading: boolean;
}
export default class DocumentOperationRenameModal extends React.Component<DocumentOperationnameModalProps, DocumentOperationnameModalStates> {
    refs: {
        inputFileName: AkInput
    };
    constructor(props, context: any) {
        super(props, context);
        this.state = {
            confirmLoading: false
        };
    }
    getFilePreName() {
        const { item } = this.props;
        console.log(item.Name);
        if (item) {
            if (item.IsFolder) {
                return item.Name;
            } else {
                let lastDotIndex = item.Name.lastIndexOf(".");
                return item.Name.substring(0, lastDotIndex);
            }
        }

    }
    getFileSuffName() {
        const { item } = this.props;
        if (item) return '.' + item.Name.split('.').pop();
    }
    onOk() {
        this.setState({ confirmLoading: true });
        const { item } = this.props;
        if (this.refs.inputFileName.state.value === null || this.refs.inputFileName.state.value.length === 0) {
            AkNotification.warning({
                message: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationTips }),
                description: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationFileNameIsEmpty })
            });
            this.setState({ confirmLoading: false });
            return;
        }
        let fileName;
        if (item.IsFolder) {
            fileName = this.refs.inputFileName.state.value;
        } else {
            fileName = this.refs.inputFileName.state.value + this.getFileSuffName();
        }
        //验证不合法字符
        if (DocumentSharePointAPI.Instance.validateFileName(fileName) === false) {
            AkNotification.warning({
                message: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationTips }),
                description: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationUploadErrorHasInvalidateChars })
            });
            this.setState({ confirmLoading: false });
            return;
        }
        // //验证同名文件
        // DocumentSharePointAPI.Instance.confirmNotExitsTheSameFile(item.Path, fileName).then(d => {
        //     console.log(d);
        //     if (d === false) {
        //         AkNotification.warning({
        //             message: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationTips }),
        //             description: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationNameAlreadyExists })
        //         });
        //         return;
        //     }
        // });
        const request: DocumentRenameRequest = {
            Name: fileName,
            IsFolder: item.IsFolder,
            Path: item.Path,
            Id: item.Id
        }
        DocumentSharePointAPI.Instance.rename(request).then(
            () => {
                this.setState({ confirmLoading: false });
                AiibProjectResponse.successTip(AIIBLocale.ProjectFileRename);
                this.props.loadDocument();
                this.props.onCloseModal();
            }, (message) => {
                AkNotification.error({
                    message: AkGlobal.intl.formatMessage({ id: DocumentPageLocale.OperationTips }),
                    description: message
                });
            }
        );
    }
    render() {
        const { item } = this.props;
        return <AkModal
            visible={true}
            maskClosable={false}
            confirmLoading={this.state.confirmLoading}
            title="Rename"
            onOk={() => { this.onOk(); }}
            onCancel={() => { this.props.onCloseModal(); }}>
            <AkRow align="middle" justify="space-around" type="flex">
                <AkCol span={24}>
                    <AkInput type="text" ref="inputFileName"
                        defaultValue={this.getFilePreName()}></AkInput>
                </AkCol>
            </AkRow>
        </AkModal>;
    }
}