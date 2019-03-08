import * as React from 'react';
import DocumentSharePointAPI from '../../api/document/document-sp-api';
import DocumentList from './document-list';
import DocumentHeader from './document-header';
import DocumentVersion from './document-version';
import { AkSpin, AkTableRowSelection, AkMessage, AkNotification, RouterProps, AkModal, AkRow, AkButton } from 'akmii-yeeoffice-common';
import DocumentCommon, { DocumentPermissionType } from '../../util/document-common';
import { IAkPdfViewerProps } from 'akmii-yeeoffice-crafts/lib/components/document/AkPdfViewer';
import { AkPdfViewer } from 'akmii-yeeoffice-crafts/lib/components/document/AkPdfViewer';
import { DocumentPagination } from './document-pagination';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import DocumentOperationRenameModal from './document-operation-renamemodel';
import { withRouter } from 'react-router';

interface DocumentProps extends RouterProps {
    selectValue?: DocumentModel[];
    onSelectChange?: (selectValue?: DocumentModel[]) => void;
    id?: string;
    stage?: number;
    documentPermissionType: DocumentPermissionType;
    hideFolder?: boolean;
    ProcessStatus?: string;//当流程在runing 和 Completed 的时候删除是禁用状态
    isPagination?: boolean;//是否分页
    selectFolder?: boolean;//只选择文件夹
    path?: string;
    pageSize?: number;
    isReadOnly?:boolean;
    isSubmissionModal?:boolean;
}
interface DocumentStates {
    searchKeyword?: string;
    orderByField?: string;
    orderByAscending?: boolean;
    pageIndex?: number;
    pageSize?: number;
    folderPath?: string;
    documentData: DocumentModel[];
    loading?: boolean;
    totalCount?: number;
    breadcrumbList: BreadcrumbModel[];
    item?: DocumentModel;
    renameItem?: DocumentModel;
    visibleVersion?: boolean;
    // selectedRowKeys?: DocumentModel[];
    selectedItems?: DocumentModel[];
    visibleRename?: boolean;
    selectedRowKeys?: DocumentModel[];
    pdfData?: IAkPdfViewerProps;
}
@withRouter
export default class Document extends React.Component<DocumentProps, DocumentStates>{
    IsAutoOpenFolder?:boolean;
    // public static defaultProps={
    //     disable:true
    // }
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            searchKeyword: '',
            orderByField: 'Last_x0020_Modified',
            orderByAscending: false,
            pageIndex: DocumentCommon.DefaultFirstPageIndex,
            pageSize: props.pageSize ? props.pageSize : DocumentCommon.DefaultPageSize,
            folderPath: this.getPath(),
            documentData: [],
            loading: false,
            totalCount: 0,
            breadcrumbList: [{
                Name: this.getDefaultPathName(),
                UrlPath: DocumentCommon.getDocumentPath(this.props.id, this.props.stage, this.props.hideFolder),
            }],
            item: null,
            renameItem: null,
            visibleVersion: false,
            visibleRename: false,
            selectedRowKeys: this.props.selectValue || [],
            pdfData: {
                visible: false
            },
            selectedItems: this.props.selectValue || []
        };
        this.IsAutoOpenFolder = this.props.router["location"]['query']["IsAutoOpenFolder"];
        DocumentSharePointAPI.CurrentLibraryPath = this.state.folderPath;
    }
    getPath() {
        const path = this.props.path;
        if (path) {
            // const defaultPath = DocumentCommon.getDocumentPath('', this.props.stage);
            // console.log(path.substr((defaultPath.length)+1).split('/'));
            return path;
        } else {
            return DocumentCommon.getDocumentPath(this.props.id, this.props.stage, this.props.hideFolder);
        }
    }
    getDefaultPathName() {
        const { stage } = this.props;
        if (stage === DocumentFolderType.MeetingMaterials || stage === DocumentFolderType.MeetingMinutes) {
            return 'All';
        } else if(stage === DocumentFolderType.ProposalID || stage === DocumentFolderType.Working) {
            return "Working";
        }else {
            return 'Archived';
        }
    }
    componentWillMount() {
        this.loadDocuments();
        this.getBreadcrumbList();
        this.getPdfData();
    }

    getPdfData() {
        const { location: { query } } = this.props;
        if (query.isPdf && query.pdfData) {
            const pdfitem = JSON.parse(query.pdfData);
            const pdfData = {
                visible: true,
                fileUrl: pdfitem.fileUrl,
                fileName: pdfitem.fileName,
                fileSize: pdfitem.fileSize,
                fileModified: pdfitem.fileModified,
                downloadable: false,
                onClose: () => {
                    this.setState({
                        pdfData: {
                            visible: false,
                        }
                    });
                }
            }
            this.setState({ pdfData });
        }
    }

    setKeyword(value?: string) {
        const { searchKeyword } = this.state;
        if (value !== searchKeyword) {
            this.setState({
                searchKeyword: value,
                pageIndex: 1,
            }, () => {
                this.loadDocuments();
            });
        }

    }
    setStateAndLoad(folder: string, breadcrumbList) {
        this.setState({
            folderPath: folder,
            breadcrumbList,
            searchKeyword: ''
        }, () => {
            DocumentSharePointAPI.CurrentLibraryPath = this.state.folderPath;
            this.loadDocuments();
        });
    }
    getBreadcrumbList() {
        const path = this.props.path;
        if (path && !this.IsAutoOpenFolder) {
            const defaultPath = DocumentCommon.getDocumentPath('', this.props.stage);
            const pathList = path.substr((defaultPath.length) + 1) ? path.substr((defaultPath.length) + 1).split('/') : [];
            let tempPath = defaultPath + '/';
            if (pathList.length > 0) {
                const pathData = pathList.map(i => {
                    tempPath += i + "/";
                    return {
                        Name: i,
                        UrlPath: tempPath,
                    };
                });
                let { breadcrumbList } = this.state;
                breadcrumbList = breadcrumbList.concat(pathData);
                this.setState({ breadcrumbList });
            }

        }
    }
    setBreadcrumbList(item?: BreadcrumbModel) {
        this.IsAutoOpenFolder = false;
        const { breadcrumbList, folderPath } = this.state;
        if (folderPath !== item.UrlPath) {
            const index = breadcrumbList.findIndex(i => i.UrlPath === item.UrlPath);
            let newBreadcrumbList = breadcrumbList;
            if (index > -1) {
                newBreadcrumbList = breadcrumbList.slice(0, (index + 1));
            }
            this.setStateAndLoad(item.UrlPath, newBreadcrumbList);
            // this.setState({
            //     selectedRowKeys: []
            // });
        }
    }
    setFolderPath(item?: DocumentModel) {
        const { breadcrumbList } = this.state;
        breadcrumbList.push({
            Name: item.Name,
            UrlPath: item.Path,
        });
        this.setStateAndLoad(item.Path, breadcrumbList);
    }
    changeLoding(loading: boolean) {
        this.setState({ loading });
    }
    changeDocumentItem(item: DocumentModel, visible: boolean) {
        this.setState({ item, visibleVersion: visible });
    }
    renameDocumentItem(item: DocumentModel, visibleRename: boolean) {
        this.setState({ renameItem: item, visibleRename });
    }
    dataSort(data) {
        data.sort((a, b) => {
            return Date.parse(b.Modified) - Date.parse(a.Modified);
        });
    }

    loadDocuments() {
        this.setState({ loading: true });
        const { selectFolder } = this.props;
        const { orderByField, orderByAscending, searchKeyword, pageIndex, pageSize, folderPath } = this.state;
        let request = {
            folderPath: folderPath,
            keyword: searchKeyword,
            orderByField: orderByField,
            orderByAscending: orderByAscending,
            pageIndex: pageIndex,
            pageSize: pageSize,
            selectFolder
        };
        DocumentSharePointAPI.Instance.paginate(request).then((data: DocumentModelListResponse) => {
            if (data.loadPrevPage === true) {
                this.setState({
                    loading: false,
                    pageIndex: this.state.pageIndex - 1
                }, () => {
                    this.loadDocuments();
                });

            }
            else if (data.Status === 2) {
                this.setState({
                    loading: false,
                    totalCount: data.TotalCount,
                    documentData: data.Data
                },()=> {
                    if(this.props.isSubmissionModal) {
                        const documentData = this.state.documentData.filter(i=>!i.IsFolder);
                        this.setState({documentData});
                    }
                });
            }
        }, (err) => {
            AkNotification.error({
                message: 'Tip',
                description: 'Get error, the file or folder has been deleted or modified.'
            });
            this.setState({ loading: false });
        });
    }

    onChangeVisibleVersion(visible?: boolean) {
        this.setState({
            visibleVersion: visible
        });
    }
    setListFunc() {
        let rowSelection: AkTableRowSelection<DocumentModel> = null;
        let { selectedItems } = this.state;
        let selectedItemKeys = [...selectedItems].map(i => i.UniqueId);
        if (this.props.documentPermissionType === DocumentPermissionType.Select) {
            rowSelection = {
                selectedRowKeys: selectedItemKeys,
                onChange: (selectedRowKeys: string[], selectedRows: DocumentModel[]) => {
                    selectedRows.forEach((row) => {
                        if (selectedItemKeys.every(key => key !== row.UniqueId) === true) {
                            this.state.selectedItems.push(row);
                        }
                    });
                    selectedItems.forEach(item => {
                        let selected = selectedRowKeys.some(rowKey => rowKey === item.UniqueId);
                        if (!selected)
                            selectedItems = selectedItems.filter(i => i.UniqueId !== item.UniqueId);
                    });

                    this.setState({
                        selectedItems: selectedItems
                    });
                    this.props.onSelectChange && this.props.onSelectChange(selectedItems);
                },
            };
        }
        return rowSelection;
    }
    deleteFile(item: DocumentModel) {
        DocumentSharePointAPI.Instance.delete(item).then(d => {
            if (d.code !== 'error') {
                AkMessage.success(d.message);
                this.loadDocuments();
            } else {
                AkNotification.error({
                    message: 'Tip',
                    description: d.message
                });
            }
        });
    }
    onChangePage(pageIndex?: number) {
        this.setState({
            pageIndex
        }, () => this.loadDocuments());
    }
    onOpenPDF(item: DocumentModel) {
        const pdfData = {
            visible: true,
            fileUrl: item.Path,
            fileName: item.NameWithoutFileExtension,
            fileSize: item.Size,
            fileModified: item.FormattedModified,
            downloadable: false,
            onClose: () => {
                this.setState({
                    pdfData: {
                        visible: false,
                    }
                });
            }
        };
        this.setState({ pdfData });
    }
    onCloseModal() {
        this.setState({ visibleRename: false });
    }
    render() {
        const { loading, folderPath, item, renameItem, visibleVersion, visibleRename, searchKeyword, totalCount, pageIndex, pageSize } = this.state;
        const { documentPermissionType } = this.props;
        // const pagination={
        //     total:totalCount,
        //     current:pageIndex,
        //     pageSize,
        //     onChange: (current) => this.onChangePage(current),
        // };
        return <div className="aiib-document">
            <AkSpin spinning={loading}>
                {
                    documentPermissionType === DocumentPermissionType.Select && this.props.stage !== DocumentFolderType.MeetingMaterials
                        ?
                        null
                        :
                        <DocumentHeader
                            breadcrumbList={this.state.breadcrumbList}
                            onChangeBreadcrumb={this.setBreadcrumbList.bind(this)}
                            folderPath={folderPath}
                            onLoadDocument={this.loadDocuments.bind(this)}
                            changeLoading={this.changeLoding.bind(this)}
                            onSearchInput={this.setKeyword.bind(this)}
                            searchKeyword={searchKeyword}
                            {...this.props}
                        />
                }

                <DocumentList
                    documentData={this.state.documentData}
                    // pagination={pagination}
                    changeFolder={this.setFolderPath.bind(this)}
                    changeItem={this.changeDocumentItem.bind(this)}
                    renameItem={this.renameDocumentItem.bind(this)}
                    rowSelection={this.setListFunc()}
                    deleteFile={this.deleteFile.bind(this)}
                    onOpenPDF={this.onOpenPDF.bind(this)}
                    IsAutoOpenFolder={this.IsAutoOpenFolder}
                    {...this.props}
                />
                {
                    this.props.isPagination
                        ?
                        <DocumentPagination
                            pageIndex={this.state.pageIndex}
                            totalCount={this.state.totalCount}
                            pageSize={this.state.pageSize}
                            onChange={this.onChangePage.bind(this)}
                        />
                        :
                        null
                }

            </AkSpin>
            {
                visibleVersion
                    ?
                    <DocumentVersion
                        item={item}
                        onChangeVisibleVersion={this.onChangeVisibleVersion.bind(this)}
                        {...this.props}
                    />
                    :
                    null
            }
            {
                visibleRename ?
                    <DocumentOperationRenameModal item={renameItem}
                        loadDocument={this.loadDocuments.bind(this)}
                        onCloseModal={this.onCloseModal.bind(this)}></DocumentOperationRenameModal>
                    : null
            }

            <AkPdfViewer {...this.state.pdfData} />
        </div>;
    }
}
