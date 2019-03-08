import * as React from 'react';
import DocumentSharePointAPI from '../../api/document/document-sp-api';
import { AkModal } from 'akmii-yeeoffice-common/lib';
import DocumentVersionList from './document-version-list';
import { AkSpin, AkNotification } from 'akmii-yeeoffice-common';
import { DocumentPermissionType } from '../../util/document-common';

interface DocumentVersionProps {
    item?: DocumentModel;
    onChangeVisibleVersion?: (visible?: boolean) => void;
    documentPermissionType: DocumentPermissionType;
}
interface DocumentVersionStates {
    documentVersions: DocumentVersionModel[];
    loding?: boolean;
}
export default class DocumentVersion extends React.Component<DocumentVersionProps, DocumentVersionStates>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            documentVersions: [],
            loding: false
        };
    }
    componentWillMount() {
        this.loadData();
    }
    loadData() {
        if (!this.props.item) return null;
        this.setState({ loding: true })
        DocumentSharePointAPI.Instance.getDocumentVersion(this.props.item).then(d => {
            if (d) {
                this.setState({ documentVersions: d, loding: false });
            }
        }, (msg) => {
            AkNotification.error({
                message: 'Tip',
                description: msg
            });
        });
    }
    changeVersion(versionItem?: DocumentVersionModel) {
        this.setState({ loding: true })
        const { item } = this.props;
        DocumentSharePointAPI.Instance.changeDocumentVersion(item, versionItem.Version).then(d => {
            if (d) {
                AkNotification.success({
                    message: 'Tip',
                    description: 'Operation is successful'
                });
                this.loadData();
            }
        }, (msg) => {
            AkNotification.error({
                message: 'Tip',
                description: msg
            });
            this.setState({ loding: false });
        });
    }
    render() {
        return <AkModal
            title='Version history'
            visible={true}
            onCancel={() => this.props.onChangeVisibleVersion(false)}
            footer={false}
        >
            <AkSpin spinning={this.state.loding}>
                <DocumentVersionList
                    versions={this.state.documentVersions}
                    changeVersion={this.changeVersion.bind(this)}
                    {...this.props}
                />
            </AkSpin>

        </AkModal>;
    }
}
