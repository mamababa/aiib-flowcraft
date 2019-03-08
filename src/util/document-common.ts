import DocumentIcon from "./document-icon";
import { AkContext } from "akmii-yeeoffice-common";
import { DocumentFolderType } from '../api/document/document-sp-api';
export enum DocumentPermissionType {
    /** 标题，搜索，上传，操作菜单，下载，查看，编辑，删除，查看版本，版本菜单，下载版本，还原 */
    All,
    /**标题，搜索，操作菜单，查看，下载，查看版本 */
    Readonly,
    /**checkbox，操作菜单，查看，下载，查看版本 */
    Select,
    /**搜索，上传，操作菜单，查看，下载，删除 ,版本菜单，下载版本，还原*/
    MeetingMinutes,
    /**搜索，下载，操作菜单，查看 */
    MeetingMinutesReadonly,
    /**搜索，上传，操作菜单，查看，编辑，删除，查看版本，版本菜单，下载版本，还原 */
    MeetingMaterials,
    /**标题，搜索，操作菜单，查看，下载，编辑，删除 ,查看版本,版本菜单，下载版本，还原 */
    Edit,
    /**标题，搜索，操作菜单，查看，下载，查看版本,上传*/
    Upload,
}
export default class DocumentCommon {
    static DefaultLibraryPath = _spPageContextInfo.siteServerRelativeUrl + '/AIIBWorkflow';
    // static AiibDocumentFolder = {
    //     Working: '/Working',
    //     Concept: '/Archive',
    //     InterimOrFinal: '/Archive',
    //     Appraisal: '/Archive',
    //     Negotiation: '/Archive',
    //     BoardApproval: '/Archive',
    //     BoardApproved: '/Archive',
    //     Proposal: "/Archive",
    //     MeetingMaterials: '/Meeting Materials',
    //     MeetingMinutes: '/Meeting Minutes',
    // };
    static DefaultPageSize = 15;
    static DefaultFirstPageIndex = 1;
    static LibraryRootFolderId = 0;
    static MediaFileExtensions = ["png", "jpg", "gif", "jpeg", "icon", "bmp", "mp3", "mp4", "WebM", "Ogg"];

    static isOffice365Site() {
        return true;
    }

    static isChineseSite() {
        return _spPageContextInfo.currentLanguage === 2052;
    }

    static isMobile(): boolean {
        return window.document.body.clientWidth < 768;
    }

    static isSameLibrary(prevPath: string, nextPath: string): boolean {
        if (prevPath == null || prevPath.length === 0) return false;
        if (nextPath == null || nextPath.length === 0) return false;

        if (prevPath.toLowerCase().indexOf(nextPath.toLowerCase()) >= 0) return true;
        else if (nextPath.toLowerCase().indexOf(prevPath.toLowerCase()) >= 0) return true;

        return false;
    }

    static isLibraryPath(folderPath: string): boolean {
        if (folderPath == null || folderPath.length === 0) return false;
        folderPath = folderPath.toLowerCase().replace(window["_spPageContextInfo"].webServerRelativeUrl.toLowerCase(), "");
        let folders = folderPath.toLowerCase().split("/").filter(item => item != null && item.length > 0);

        return folders.length === 1;
    }

    static getFileNameWithOutExtension(fileName: string): string {
        let extension = DocumentCommon.getFileExtension(fileName);
        return fileName.replace(extension, "");
    }

    static getFileExtension(fileName: string): string {
        return '.' + fileName.split('.').pop();
    }

    static getFileExtensionWithoutPoint(fileName: string): string {
        return ((/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName)[0] : "").toLowerCase();
    }

    static getIconUrl(fileName: string, isFolder: boolean) {
        if (isFolder) return DocumentIcon.FOLDER;
        switch (DocumentCommon.getFileExtensionWithoutPoint(fileName)) {
            case "":
                return DocumentIcon.FOLDER;
            case "ppt":
            case "pptx":
                return DocumentIcon.PPT;
            case "doc":
            case "docx":
                return DocumentIcon.Word;
            case "xls":
            case "xlsx":
                return DocumentIcon.Excel;
            case "vsdx":
            case "vsd":
                return DocumentIcon.VISO;
            case "pdf":
                return DocumentIcon.PDF;
            case "txt":
                return DocumentIcon.TXT;
            case "zip":
            case "rar":
            case "7z":
            case "cab":
            case "iso":
                return DocumentIcon.ZIP;
            case "mp4":
            case "webm":
            case "ogg":
                return DocumentIcon.Meida;
            case "bmp":
            case "png":
            case "jpg":
            case "gif":
            case "jpeg":
            case "icon":
                return DocumentIcon.IMG;
            default:
                return DocumentIcon.FILE;
        }
    }

    static canOnlineView(fileName: string) {
        let canOnlineViewFiles = ["ppt", "pptx", "doc", "docx", "xls", "xlsx", "vsdx", "vsd"];
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canOnlineViewFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static getOnlineViewUrl(item: DocumentModel, isEdit?: boolean) {
        if (!item) return;
        // const origin = window.location.origin;
        const origin = _spPageContextInfo.siteAbsoluteUrl.replace(_spPageContextInfo.siteServerRelativeUrl, '');
        const url = `${origin}/:w:/r${_spPageContextInfo.siteServerRelativeUrl}/_layouts/15/Doc.aspx?sourcedoc={${item.UniqueId}}&action=${isEdit ? 'edit' : 'embedview'}`;
        if (isEdit) {
            return _spPageContextInfo.siteAbsoluteUrl + "/SitePages/Pages/DocumentEdit.aspx?sourcedoc=" + item.UniqueId + "&fileDocName=" + encodeURIComponent(item.Name) + "&fileDocLink=" + encodeURIComponent(item.Path);
        }

        return _spPageContextInfo.siteAbsoluteUrl + "/SitePages/Pages/DocumentViewer.aspx?viewerUrl=" + encodeURIComponent(url);
    }

    static getOnlineViewPdf(item: DocumentModel) {
        if (!item) return;
        const origin = _spPageContextInfo.siteAbsoluteUrl.replace(_spPageContextInfo.siteServerRelativeUrl, '');
        return origin + item.Path;
    }

    static isMediaFile(fileName: string) {
        let canViewInBrowserFiles = DocumentCommon.MediaFileExtensions;
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canViewInBrowserFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static isImageFile(fileName: string) {
        let canViewInBrowserFiles = ["png", "jpg", "gif", "jpeg", "icon", "bmp"];
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canViewInBrowserFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static canViewInBrowser(fileName: string) {
        let canViewInBrowserFiles = ["pdf", "txt"];
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canViewInBrowserFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static isPdfFile(fileName: string) {
        let canViewInBrowserFiles = ["pdf"];
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canViewInBrowserFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static isTextFile(fileName: string) {
        let canViewInBrowserFiles = ["txt"];
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canViewInBrowserFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static getViewUrlInBrowser(item: DocumentModel) {
        if (item === null) return;
        if (DocumentCommon.isMediaFile(item.Name)) {
            return _spPageContextInfo.siteAbsoluteUrl + item.Path;
        }
        return _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/getpreview.ashx?path=" + item.Path;
    }

    static getDownloadUrl(item: DocumentModel) {
        if (item == null) return;
        if (DocumentCommon.isOffice365Site() || AkContext.isNetSPDocument()) {
            return _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/download.aspx?SourceUrl=" + encodeURIComponent(item.Path);
        }
        else {
            return item.Path;
        }
    }

    static canOnlineEdit(fileName: string) {
        let canOnlineViewFiles = ["ppt", "pptx", "doc", "docx", "xls", "xlsx"];
        let extension = DocumentCommon.getFileExtensionWithoutPoint(fileName);
        return canOnlineViewFiles.indexOf(extension.toLowerCase()) >= 0;
    }

    static getFileSize(size: any): string {
        if (size == null || size == "") return "";

        let sizeNumber = parseInt(size);
        if (sizeNumber >= DocumentCommon.GbSize) {
            return (Number(sizeNumber / DocumentCommon.GbSize)).toFixed(2) + 'GB';
        } else if (sizeNumber >= DocumentCommon.MbSize) {
            return (Number(sizeNumber / DocumentCommon.MbSize)).toFixed(2) + 'MB';
        } else if (sizeNumber >= DocumentCommon.KbSize) {
            return (Number(sizeNumber / DocumentCommon.KbSize)).toFixed(2) + 'KB';
        } else {
            return (Number(sizeNumber)).toFixed(2) + 'B';
        }
    }
    static getDocumentPath(id: string, stage: number, hideFolder?: boolean) {
        let libraryPath = this.DefaultLibraryPath;
        let idPath = id ? `/${id}` : '';
        let stagePath = libraryPath + idPath;
        let url = "";
        if (stage === DocumentFolderType.ProposalID) {
            url = stagePath;
        } else if (stage === DocumentFolderType.Working) {
            url = stagePath + '/Working';
        } else if (stage === DocumentFolderType.MeetingMaterials) {
            url = stagePath + '/Meeting Materials';
        } else if (stage === DocumentFolderType.MeetingMinutes) {
            url = stagePath + '/Meeting Minutes';
        } else {
            url = stagePath + '/Archive';
            if (hideFolder) {
                switch (stage) {
                    case DocumentFolderType.Proposal:
                        url = url + '/Proposal';
                        break;
                    case DocumentFolderType.Concept:
                        url = url + '/Concept';
                        break;
                    case DocumentFolderType.InterimOrFinal:
                        url = url + '/Interim Or Final Review';
                        break;
                    case DocumentFolderType.Appraisal:
                        url = url + '/Appraisal';
                        break;
                    case DocumentFolderType.Negotiation:
                        url = url + '/Negotiation';
                        break;
                    case DocumentFolderType.BoardApproval:
                        url = url + '/Board Approval';
                        break;
                    case DocumentFolderType.BoardApproved:
                        url = url + '/Board Approved';
                        break;
                }
            }

        }

        return url;
    }
    // static getDocumentPath(id: string, stage: number) {
    //     let libraryPath = this.DefaultLibraryPath;
    //     let idPath =id? `/${id}`:'';
    //     let stagePath = '';
    //     switch (stage) {
    //         case DocumentFolderType.ProposalID: //ProposalID 阶段 /ProposalID 文件夹
    //             stagePath = libraryPath + idPath;
    //             return libraryPath + idPath;
    //         case DocumentFolderType.Working:
    //             stagePath = this.AiibDocumentFolder.Working;
    //             break;
    //         case DocumentFolderType.Proposal: //ProjectID阶段 /ProjectID/Proposal 文件夹
    //             stagePath = this.AiibDocumentFolder.Proposal;
    //             break;
    //         case DocumentFolderType.Concept:
    //             stagePath = this.AiibDocumentFolder.Concept;
    //             break;
    //         case DocumentFolderType.InterimOrFinal:
    //             stagePath = this.AiibDocumentFolder.InterimOrFinal;
    //             break;
    //         case DocumentFolderType.Negotiation:
    //             stagePath = this.AiibDocumentFolder.Negotiation;
    //             break;
    //         case DocumentFolderType.Appraisal:
    //             stagePath = this.AiibDocumentFolder.Appraisal;
    //             break;
    //         case DocumentFolderType.BoardApproval:
    //             stagePath = this.AiibDocumentFolder.BoardApproval;
    //             break;
    //         case DocumentFolderType.BoardApproved:
    //             stagePath = this.AiibDocumentFolder.BoardApproved;
    //             break;
    //         case DocumentFolderType.MeetingMaterials:
    //             stagePath = this.AiibDocumentFolder.MeetingMaterials;
    //             break;
    //         case DocumentFolderType.MeetingMinutes:
    //             stagePath = this.AiibDocumentFolder.MeetingMinutes;
    //             break;
    //     }
    //     return libraryPath + idPath + stagePath;
    // }


    public static KbSize: number = 1024;
    public static MbSize: number = DocumentCommon.KbSize * 1024;
    public static GbSize: number = DocumentCommon.MbSize * 1024;


    public static generateGuid() {
        let S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    static limited_access = DocumentCommon.isChineseSite() ? "受限访问" : "Limited Access";// 1073741825  受限访问

    static view_only = DocumentCommon.isChineseSite() ? "仅查看" : "View Only";// 1073741925  仅查看,本地版SharePoint仅查看权限的Id为1073741924

    static reader = DocumentCommon.isChineseSite() ? "读取" : "Read";// 1073741826  读取

    static editor = DocumentCommon.isChineseSite() ? "编辑" : "Edit";// 1073741830  编辑

    static contributor = DocumentCommon.isChineseSite() ? "参与讨论" : "Contribute";// 1073741827  参与讨论

    static administrator = DocumentCommon.isChineseSite() ? "管理层次结构" : "Manage Hierarchy";// 1073741828  设计

    static owner = DocumentCommon.isChineseSite() ? "完全控制" : "Full Control";// 1073741829  完全控制


    static isOwner(roleId: string) {
        return roleId === DocumentCommon.owner;
    }

    static canAssignPermission(roleId: string) {
        return DocumentCommon.isOwner(roleId)
            || roleId === DocumentCommon.administrator;
    }

    static canEdit(roleId: string) {
        return DocumentCommon.canAssignPermission(roleId)
            || roleId === DocumentCommon.contributor
            || roleId === DocumentCommon.editor;
    }

    static canRead(roleId: string) {
        return DocumentCommon.canEdit(roleId)
            || roleId === DocumentCommon.reader
            || roleId === DocumentCommon.view_only;
    }

    static isViewOnly(roleId: string) {
        return roleId === DocumentCommon.view_only;
    }

    static getRoleType(item: { get_effectiveBasePermissions(): SP.BasePermissions }): string {
        let basePermissions = item.get_effectiveBasePermissions();

        if (basePermissions.has(SP.PermissionKind.enumeratePermissions)) {
            return DocumentCommon.administrator;
        }
        else if (basePermissions.has(SP.PermissionKind.editListItems)) {
            return DocumentCommon.editor;
        }
        else if (basePermissions.has(SP.PermissionKind.viewListItems)) {
            let permissionObject: any = basePermissions;
            let key = permissionObject.$B_1 || permissionObject.$4_1;
            let key2 = permissionObject.$C_1 || permissionObject.$5_1;
            let view_only = key === 176 && key2 === 138612801;
            if (view_only === true) {
                return DocumentCommon.view_only;
            }

            return DocumentCommon.reader;
        }
        else {
            return DocumentCommon.view_only;
        }
    }
    static canShowTitle(permissionType?: DocumentPermissionType) {
        return permissionType !== DocumentPermissionType.MeetingMaterials
            &&
            permissionType !== DocumentPermissionType.MeetingMinutes;
    }
    static canShowSearch(folderPath: string, permissionType: DocumentPermissionType, stage?: number) {
        return folderPath.indexOf('/Archive') === -1 && ((permissionType === DocumentPermissionType.Select && stage === DocumentFolderType.MeetingMaterials) || permissionType !== DocumentPermissionType.Select);
    }
    static canShowUpload(permissionType: DocumentPermissionType, folderPath: string) {
        return DocumentCommon.canShowSearch(folderPath, permissionType)
            && permissionType !== DocumentPermissionType.Readonly
            && permissionType !== DocumentPermissionType.Select
            && permissionType !== DocumentPermissionType.MeetingMinutesReadonly;
    }
    static canShowBreadcrumb(permissionType: DocumentPermissionType) {
        return DocumentPermissionType[permissionType].indexOf('Meeting') > -1;
    }
    static cnaShowAddFolder(permissionType?: DocumentPermissionType) {
        return DocumentPermissionType[permissionType].indexOf('Meeting') > -1 && permissionType !== DocumentPermissionType.MeetingMinutesReadonly;
    }
}
