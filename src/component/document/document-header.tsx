import * as React from 'react';
import { AkRow, AkCol } from 'akmii-yeeoffice-common';
import DocumentAddFile from './document-add-file';
import DocumentSharePointAPI from '../../api/document/document-sp-api';
import { AkNotification, AkMessage, AkButton } from 'akmii-yeeoffice-common';
import { AkModal } from 'akmii-yeeoffice-common/lib';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import { DocumentPermissionType } from '../../util/document-common';
import DocumentCommon from '../../util/document-common';
import DocumentSearch from './document-search';
import DocumentAddFolder from './document-add-folder';
interface DocumentHeaderProps {
    breadcrumbList?: BreadcrumbModel[];
    onChangeBreadcrumb?: (item?: BreadcrumbModel) => void;
    folderPath?: string;
    onLoadDocument?: () => void;
    changeLoading?: (loading?: boolean) => void;
    onSearchInput?: (value?: string) => void;
    searchKeyword?: string;
    stage?: number;
    documentPermissionType: DocumentPermissionType;
    hideFolder?: boolean;
    isReadOnly?:boolean;
}
interface DocumentHeaderStates {
    visibileModal?: boolean;
    loading?: boolean;
}
export default class DocumentHeader extends React.Component<DocumentHeaderProps, DocumentHeaderStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibileModal: false,
            loading: false
        };
    }
    showModal() {
        this.setState({
            visibileModal: true
        });
    }
    onClose() {
        this.setState({
            visibileModal: false
        });
    }
    onAddFolderSave(value?: string) {
        if (this.state.loading) return;

        if (!DocumentSharePointAPI.Instance.validateFileName(value)) {
            AkNotification.warning({
                message: 'Tip',
                description: 'Name cannot contain special characters'
            });
            return;
        }
        this.setState({
            loading: true
        });
        DocumentSharePointAPI.Instance.addFolder(this.props.folderPath, value).then(
            () => {
                this.onClose();
                this.props.onLoadDocument();
                this.setState({ loading: false });
            },
            (message: string) => {
                AkNotification.error({
                    message: 'Tip',
                    description: message
                });
                this.setState({ loading: false });
            }
        );
    }
    async onFileUpload(file?: File) {
        const { folderPath } = this.props;
        let result = await DocumentSharePointAPI.Instance.confirmNotExitsTheSameFile(folderPath, file.name);
        if (result) {
            this.onSaveUpload(file, false);
        } else {
            AkModal.confirm({
                title: "Tip",
                content: 'Would you like to overwrite the file with the same name?',
                onOk: () => {
                    this.onSaveUpload(file, true);
                }
            });
        }
    }
    onSaveUpload(file: File, overwrite: boolean) {
        const { folderPath } = this.props;
        this.props.changeLoading && this.props.changeLoading(true);
        DocumentSharePointAPI.Instance.upload(file, folderPath, overwrite).then(
            (d) => {
                AkMessage.success('Uploaded successfully');
                this.props.onLoadDocument();
            },
            (msg) => {
                AkNotification.error({
                    message: 'Tip',
                    description: msg
                });
                this.props.changeLoading && this.props.changeLoading(false);
            }
        );
    }
    render() {
        const { documentPermissionType, stage, folderPath } = this.props;
        const { visibileModal, loading } = this.state;
        let title = '';
        if (stage === DocumentFolderType.Working || stage === DocumentFolderType.ProposalID) {
            title = 'Working Documents';
        } else if (stage === DocumentFolderType.MeetingMaterials) {
            title = 'Meeting Materials';
        } else if (stage === DocumentFolderType.MeetingMinutes) {
            title = 'Meeting Minutes';
        } else {
            title = 'Archived Documents';
        }
        return (
            <div className="aiib-document-header">
                <div className="ak-tab-actions">
                    <AkRow>
                        <AkCol lg={12} className="aiib-style-document">
                            {
                                <div>
                                    <div className="aiib-document-page-title aiib-style-lg">{title}</div>
                                    {this.props.hideFolder /* ||
                                          stage === DocumentFolderType.Working ||
                                        stage === DocumentFolderType.ProposalID */ ? null : (
                                            <div className="aiib-document-page-breadcrumb aiib-style-lg">
                                                <ul>
                                                    {this.props.breadcrumbList.map((item, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                onClick={() => this.props.onChangeBreadcrumb(item)}
                                                            >
                                                                <a href="javascript:void(0)">{item.Name}</a> /
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                </div>
                            }
                        </AkCol>
                        <AkCol lg={12} className="aiib-style-textAlign">
                            {DocumentCommon.canShowSearch(folderPath, documentPermissionType, stage) ? (
                                <div className="aiib-document-page-title aiib-style-lg">
                                    <DocumentSearch
                                        onSearch={this.props.onSearchInput}
                                        searchKeyword={this.props.searchKeyword}
                                    />
                                </div>
                            ) : null}
                            {!this.props.isReadOnly && DocumentCommon.canShowUpload(documentPermissionType, folderPath)  ? (
                                <div className="aiib-document-page-breadcrumb aiib-style-lg">
                                    <DocumentAddFile onUpload={this.onFileUpload.bind(this)} />
                                </div>
                            ) : null}
                            { !this.props.isReadOnly && DocumentCommon.cnaShowAddFolder(documentPermissionType) ? (
                                <div className="aiib-document-page-breadcrumb aiib-style-lg">
                                    <AkButton
                                        className="aiib-button green"
                                        icon="plus"
                                        onClick={() => this.showModal()}
                                    >
                                        Add Folder
									</AkButton>
                                </div>
                            ) : null}
                        </AkCol>
                    </AkRow>
                </div>
                {visibileModal ? (
                    <DocumentAddFolder
                        onClose={this.onClose.bind(this)}
                        onSave={this.onAddFolderSave.bind(this)}
                        loading={loading}
                    />
                ) : null}
            </div>
        );
        // return <div className="aiib-document-header">
        //     <AkRow>
        //         <AkCol lg={12}>
        //             <div className="aiib-document-page-title aiib-style-lg">
        //                 {
        //                     (this.props.stage === DocumentFolderType.Working) || (this.props.stage === DocumentFolderType.ProposalID)
        //                     ?
        //                     'Working Documents'
        //                     :
        //                     'Archived Documents'
        //                 }
        //             </div>
        //             {/* <div className="aiib-document-page-breadcrumb aiib-style-lg">
        //                 <ul>
        //                     {
        //                         this.props.breadcrumbList.map((item,index)=>{
        //                             return <li key={index} onClick={()=> this.props.onChangeBreadcrumb(item)}>
        //                                 <a href="javascript:void(0)">{item.Name}</a>/
        //                             </li>;
        //                         })
        //                     }
        //                 </ul>
        //             </div> */}
        //         </AkCol>
        //         {
        //             (this.props.stage === DocumentFolderType.Working) || (this.props.stage === DocumentFolderType.ProposalID)
        //             ?
        //             <AkCol lg={12} className="aiib-style-textAlign">
        //                 <div className="aiib-document-page-title aiib-style-lg">
        //                     <DocumentSearch
        //                         onSearch={this.props.onSearchInput}
        //                         searchKeyword={this.props.searchKeyword}
        //                     />
        //                 </div>
        //                 {/* <div className="aiib-document-page-breadcrumb aiib-style-lg">
        //                     <AkButton onClick={this.showModal.bind(this)}>New Folder</AkButton>
        //                 </div> */}
        //                 {
        //                     this.props.disable
        //                     ?
        //                     null
        //                     :
        //                     <div className="aiib-document-page-breadcrumb aiib-style-lg">
        //                         <DocumentAddFile onUpload={this.onFileUpload.bind(this)}/>
        //                     </div>
        //                 }
        //             </AkCol>
        //             :
        //             null
        //         }

        //     </AkRow>
        //     {
        //         visibileModal
        //         ?
        //         <DocumentAddFolder
        //             onClose={this.onClose.bind(this)}
        //             onSave={this.onAddFolderSave.bind(this)}
        //             loading={loading}
        //         />
        //         :
        //         null
        //     }
        // </div>;
    }
}
