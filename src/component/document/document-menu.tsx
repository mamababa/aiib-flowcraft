import * as React from 'react';
import { AkMenu, AkDropDown, AkIcon, AkContext, AkNotification, AkModal, AkInput, AkRow, AkButton } from 'akmii-yeeoffice-common';
import DocumentCommon from '../../util/document-common';
import { DocumentPermissionType } from '../../util/document-common';
import { connect } from 'react-redux';
import { AkGlobal } from 'akmii-yeeoffice-common/lib/util';
import { AIIBAction } from '../../actions/index';

interface DocumentMenuProps {
    item?: DocumentModel;
    changeItem?: (item: DocumentModel, visible: boolean) => void;
    renameItem?: (item: DocumentModel, visibleRename: boolean) => void;
    type?: 'document' | 'version';
    versionItem?: DocumentVersionModel;
    changeVersion?: (item?: DocumentVersionModel) => void;
    deleteFile?: (item: DocumentModel) => void;
    // disable?:boolean;
    documentPermissionType: DocumentPermissionType;
    stage?: number;
    ProcessStatus?: string;//当流程在runing 和 Completed 的时候删除是禁用状态
    onOpenPDF?: (item: DocumentModel) => void;
    selectFolder?: boolean;//只选择文件夹
    isAdmin?: boolean;
    isReadOnly?:boolean;
}
interface DocumentMenuStates {
    visible: boolean;
}
@connect(state => { return { isAdmin: state.aiib.isAIIBAdmin } })
export default class DocumentMenu extends React.Component<DocumentMenuProps, DocumentMenuStates>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        AkGlobal.store.dispatch(AIIBAction.requestSettingRole());
    }

    onMenuClick(e) {
        const { item, type, versionItem } = this.props;
        switch (e.key) {
            case 'download':
                if (type === 'document') {
                    document.location.href = DocumentCommon.getDownloadUrl(this.props.item);
                } else {
                    document.location.href = _spPageContextInfo.siteAbsoluteUrl + "/" + versionItem.Path;
                }
                break;
            case 'view':
                if (DocumentCommon.isPdfFile(item.Name)) {
                    // this.props.onOpenPDF(item);
                    window.open(DocumentCommon.getOnlineViewPdf(item));
                } else {
                    window.open(DocumentCommon.getOnlineViewUrl(item, false));
                }
                break;
            case 'rename':
                this.props.renameItem(item, true);
                break;
            case 'edit':
                if (!item) return;
                // window.open(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/Pages/DocumentEdit.aspx?sourcedoc=" + item.UniqueId + "&fileDocName=" + encodeURIComponent(item.Name) + "&fileDocLink=" + encodeURIComponent(item.Path));
                window.open(DocumentCommon.getOnlineViewUrl(item, true));
                break;
            case 'history':
                this.props.changeItem(item, true);
                break;
            case 'restore':
                AkModal.confirm({
                    title: "Tip",
                    content: 'You will use the selected version to replace the current version?',
                    onOk: () => {
                        this.props.changeVersion(versionItem);
                    }
                });
                break;
            case 'deleteFile':
                // if (this.props.ProcessStatus === '1') {
                //     AkNotification.error({
                //         message: 'Tip',
                //         description: 'Cannot delete files while the process is running'
                //     });
                // } else if (this.props.ProcessStatus === '4') {
                //     AkNotification.error({
                //         message: 'Tip',
                //         description: 'Cannot delete file when process is complete'
                //     });
                // } else {
                //     AkModal.confirm({
                //         content: 'Are you sure delete this file?',
                //         onOk: () => {
                //             this.props.deleteFile(item);
                //         }
                //     });
                // }
                AkModal.confirm({
                    title: "Tip",
                    content: 'Are you sure delete this file or folder?',
                    onOk: () => {
                        this.props.deleteFile(item);
                    }
                });
                break;
        }
    }
    getMenu() {
        const { documentPermissionType, type, item, selectFolder,isReadOnly } = this.props;
        let menu = [];
        const download = <AkMenu.Item key='download'><a href="javascript:;"><AkIcon type='download' />Download</a></AkMenu.Item>;
        const view = <AkMenu.Item key='view'><a href="javascript:;"><AkIcon type='info-circle-o' />View</a></AkMenu.Item>;
        const edit = <AkMenu.Item key='edit'><a href="javascript:;"><AkIcon type='edit' />Edit</a></AkMenu.Item>;
        const history = <AkMenu.Item key='history'><a href="javascript:;"><AkIcon type='clock-circle-o' />Version history</a></AkMenu.Item>;
        const restore = <AkMenu.Item key='restore'><a href="javascript:;"><AkIcon type='clock-circle-o' />Restore</a></AkMenu.Item>;
        const deleteFile = <AkMenu.Item key='deleteFile'><a href="javascript:;"><AkIcon type='delete' />Delete</a></AkMenu.Item>;
        const rename = <AkMenu.Item key="rename"><a href="javascript:;"><AkIcon type="trademark" />Rename</a></AkMenu.Item>;
        let user: YeeUserInfo = AkContext.getUser() || {};
        
        const isUser = user.SPAccount === this.props.item.SPAccount;
        if (item.IsFolder && selectFolder) return [deleteFile];
        //文件夹的编辑功能
        if (item.IsFolder && !selectFolder) {
            if (documentPermissionType === DocumentPermissionType.MeetingMaterials && !isReadOnly) {
                return [rename, deleteFile];
            } else if (documentPermissionType === DocumentPermissionType.MeetingMinutes && !isReadOnly) {
                return [rename, deleteFile];
            } else {
                return [];
            }
        }

        if (type === 'document') {
            if (documentPermissionType === DocumentPermissionType.All) {
                if (isUser || this.props.isAdmin) {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, deleteFile, history];
                } else {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, history];
                }
            } else if (documentPermissionType === DocumentPermissionType.Readonly) {
                menu = [view, download, history];
            } else if (documentPermissionType === DocumentPermissionType.Upload) {
                menu = [view, download, history];
            } else if (documentPermissionType === DocumentPermissionType.Edit) {
                if (isUser || this.props.isAdmin) {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, deleteFile, history];
                } else {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, history];
                }
            } else if (documentPermissionType === DocumentPermissionType.MeetingMaterials) {
                if (isUser || this.props.isAdmin) {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, deleteFile, history];
                } else {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, history];
                }
            }
            else if (documentPermissionType === DocumentPermissionType.MeetingMinutes) {
                if (this.props.isAdmin) {
                    menu = [view, download, DocumentCommon.isPdfFile(this.props.item.Name) ? null : [edit], rename, deleteFile, history];
                } else {
                    if (isUser) {
                        menu = [view, download, deleteFile, rename, history];
                    } else {
                        menu = [view, download, rename, history];
                    }
                }
            }
            else if (documentPermissionType === DocumentPermissionType.MeetingMinutesReadonly) {
                menu = [view, download, history];
            }
        } else {
            if (documentPermissionType === DocumentPermissionType.All
                || documentPermissionType === DocumentPermissionType.Edit
                || documentPermissionType === DocumentPermissionType.MeetingMaterials
            ) {
                menu = [download, restore];
            } else if (documentPermissionType === DocumentPermissionType.MeetingMinutes && this.props.isAdmin) {
                menu = [download, restore];
            } else if (documentPermissionType === DocumentPermissionType.MeetingMinutesReadonly
                || documentPermissionType === DocumentPermissionType.MeetingMinutes) {
                menu = [download];
            } else if (documentPermissionType === DocumentPermissionType.Readonly) {
                menu = [download];
            } else {
                menu = [];
            }
        }
        return menu;
    }
    render() {
        const { item, selectFolder } = this.props;
        const MenuList = this.getMenu();
        if (MenuList.length === 0) {
            return null;
        }
        let menu = <AkMenu className="aiib-document-list-menu" onClick={this.onMenuClick.bind(this)}>
            {MenuList}
        </AkMenu>;
        // const { type } = this.props;
        let akdd = <div>
            <AkDropDown trigger={['click']} overlay={menu}>
                <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
            </AkDropDown>
        </div>;
        if (item.IsFolder && selectFolder) {
            akdd = null;
        }
        return akdd;

    }
}
