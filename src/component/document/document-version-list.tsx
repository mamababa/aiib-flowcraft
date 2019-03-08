import * as React from 'react';
import { AkTable } from 'akmii-yeeoffice-common';
import * as moment from 'moment';
import DocumentMenu from './document-menu';
import { DocumentPermissionType } from '../../util/document-common';
import { AiibFormatDate } from '../aiib/index';

interface DocumentVersionListProps {
    versions?: DocumentVersionModel[];
    changeVersion: (item?: DocumentVersionModel) => void;
    documentPermissionType: DocumentPermissionType;
}
interface DocumentVersionListStates { }
export default class DocumentVersionList extends React.Component<DocumentVersionListProps, DocumentVersionListStates>{
    constructor(props, context) {
        super(props, context);
    }
    column = [{
        title: 'Version',
        key: 'version',
        dataIndex: "Version",
    }, {
        title: 'Created',
        key: 'Create',
        dataIndex: 'Create',
        render: (txt) => {
            return AiibFormatDate(txt, "MM-DD-YYYY HH:mm:ss");
        }
    }, {
        title: 'Created By',
        key: 'createby',
        dataIndex: 'Createby'
    }, {
        title: 'Size',
        key: 'size',
        dataIndex: 'Size'
    }, {
        title: '',
        key: 'menu',
        dataIndex: 'Menu',
        width: "5%",
        className: "ak_align_r",
        render: (txt, record: DocumentVersionModel) => {
            return <DocumentMenu versionItem={record} type='version' {...this.props} />;
        }
    }]
    render() {
        return <AkTable
            rowKey="Id"
            columns={this.column}
            dataSource={this.props.versions}
            pagination={false}
            scroll={{ x: true }} />;
    }
}