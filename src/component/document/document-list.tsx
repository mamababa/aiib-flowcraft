import * as React from 'react';
import { AkColumnProps, AkTable, AkImg, AkTableRowSelection, AkColumnLayout, FlowcraftCommon, AkDateLabel, AkUtil } from 'akmii-yeeoffice-common';
import * as moment from 'moment';
import DocumentMenu from './document-menu';
import DocumentCommon from '../../util/document-common';
import { DocumentPermissionType } from '../../util/document-common';

interface DocumentListProps {
    documentData: DocumentModel[];
    // clickName?:(item?:DocumentModel)=>void;
    changeFolder?: (item?: DocumentModel) => void;
    changeItem?: (item: DocumentModel, visible: boolean) => void;
    renameItem?: (item: DocumentModel, visible: boolean) => void;
    rowSelection?: AkTableRowSelection<any>;
    // disable?:boolean;
    deleteFile?: (item: DocumentModel) => void;
    stage?: number;
    documentPermissionType: DocumentPermissionType;
    ProcessStatus?: string;//当流程在runing 和 Completed 的时候删除是禁用状态
    onOpenPDF?: (item: DocumentModel) => void;
    // pagination:any;
    isPagination?: boolean;
    selectFolder?: boolean;//只选择文件夹
    IsAutoOpenFolder?:boolean;
    isReadOnly?:boolean;
}
interface DocumentListStates { 
    documentData?: DocumentModel[];
}
class DocumentTable extends AkTable<DocumentModel> {
}
export default class DocumentList extends React.Component<DocumentListProps, DocumentListStates>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            documentData:[]
        };
    }
    componentWillReceiveProps(nextProps) {
        if ("documentData" in nextProps && nextProps.documentData !== this.props.documentData && nextProps.IsAutoOpenFolder) {
           this.setState({documentData:nextProps.documentData},()=> {
               this.AutoOpenFolder(this.state.documentData);
           });
        }
    }
    AutoOpenFolder(Data:DocumentModel[]) {
        const PDFDocument = Data.find(i=> i.Name === "ScrCom Meeting Documents");
        this.onNameClick(PDFDocument);
    }
    loadColumns() {
        let columns = new Array<AkColumnProps<DocumentModel>>();
        columns = [
            {
                title: null,
                layout: AkColumnLayout.Img,
                key: 'icon',
                dataIndex: "Icon",
                width: "5%",
                render: (txt, record) => <AkImg src={txt} width={20} height={20} />
            },
            {
                title: 'File Name',
                layout: AkColumnLayout.LeftTop,
                key: 'filename',
                dataIndex: 'NameWithoutFileExtension',
                width: "30%",
                render: (txt, record) => {
                    // if(this.props.selectFolder){
                    //     return <span>{txt}</span>;
                    // }
                    return <a href="javascript:void(0)" onClick={() => this.onNameClick(record)}>{txt}</a>;
                }
            },
            {
                title: 'Type',
                key: 'filetype',
                width: "10%",
                layout: AkColumnLayout.LeftBottom,
                dataIndex: 'FileType',
            },
            {
                title: 'Size',
                key: 'size',
                width: "10%",
                layout: AkColumnLayout.RightBottom,
                dataIndex: 'Size',
            },
            {
                title: 'Created By',
                key: 'CreateBy',
                dataIndex: 'CreateBy',
                width: this.props.selectFolder ? "15%" : "10%",
                render: text => {
                    return text;
                },
            }, {
                title: 'Created Date',
                key: 'Created',
                dataIndex: 'Created',
                width: "15%",
                render: (text, record) => {
                    return moment(text).format("MM-DD-YYYY HH:mm");
                },
            }, {
                title: 'Modified By',
                key: 'ModifyBy',
                dataIndex: 'ModifyBy',
                width: this.props.selectFolder ? "15%" : "10%",
                render: (text, record) => {
                    return text;
                },
            }, {
                title: 'Modified Date',
                key: 'Modified',
                dataIndex: 'Modified',
                width: "15%",
                render: (text, record) => {
                    return moment(text).format("MM-DD-YYYY HH:mm");
                },
            }, {
                title: '',
                key: 'menu',
                layout: AkColumnLayout.Option,
                dataIndex: 'Menu',
                width: "5%",
                className: "ak_align_r",
                render: (txt, record) => {
                    return <DocumentMenu
                        item={record}
                        type='document'
                        {...this.props} />;
                }
            }
        ];
        if (this.props.selectFolder) {
            AkUtil.remove(columns, i => i.key === 'filetype' || i.key === 'size');
        }
        return columns;
    }
    //点击名称发生事件
    onNameClick(item?: DocumentModel) {
        if(!item) return;
        if (item.IsFolder) {
            this.props.changeFolder && this.props.changeFolder(item);
        } else if (DocumentCommon.isPdfFile(item.Name)) {
            // this.props.onOpenPDF(item);
            window.open(DocumentCommon.getOnlineViewPdf(item));
        } else {
            window.open(DocumentCommon.getOnlineViewUrl(item));
        }
    }
    render() {
        return <div className="aiib-document">
            <div className="aiib-content aiib-project-submission">
                <DocumentTable
                    rowKey="UniqueId"
                    columns={this.loadColumns()}
                    dataSource={this.props.documentData}
                    rowSelection={this.props.rowSelection}
                    pagination={false}
                    scroll={{ x: true }} />
            </div>
        </div>;
    }
}
