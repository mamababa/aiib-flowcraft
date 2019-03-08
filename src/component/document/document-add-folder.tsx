import * as React from 'react';
import { AkModal, AkRow, AkCol, AkInput, AkNotification, AkSpin } from 'akmii-yeeoffice-common';
interface DocumentAddFolderProps {
    onClose?: () => void;
    onSave?: (value?: string) => void;
    value?: string;
    loading?: boolean;
}
interface DocumentAddFolderStates {
    value?: string;
}
export default class DocumentAddFolder extends React.Component<DocumentAddFolderProps, DocumentAddFolderStates>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value,
        };
    }
    onSave() {
        const { value } = this.state;
        if (!value) {
            AkNotification.error({
                message: 'Tip',
                description: 'Please enter a folder name'
            });
            return;
        }
        if (value !== this.props.value) {
            this.props.onSave(value);
        }
    }
    render() {
        return <div>
            <AkModal
                visible={true}
                maskClosable={false}
                title='New Folder'
                okText="Save"
                cancelText="Cancel"
                onOk={this.onSave.bind(this)}
                onCancel={() => this.props.onClose()}
                confirmLoading={this.props.loading}
            >
                <AkRow align="middle" justify="space-around" type="flex">
                    <AkCol span={24}>
                        <AkInput type="text" value={this.state.value} onChange={(value) => this.setState({ value })}></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
        </div>;
    }
}
