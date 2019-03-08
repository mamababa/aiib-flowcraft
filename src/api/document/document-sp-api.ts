import { SPClientContext } from './spClientContext';
import DocumentCommon from '../../util/document-common';
import * as moment from 'moment';
import { SpRequest, AkGlobal, AkNotification } from 'akmii-yeeoffice-common';
import { DocumentPageLocale } from 'akmii-yeeoffice-crafts/lib';

export enum DocumentFolderType {
    ProposalID,
    Working,
    Proposal,
    Concept,
    InterimOrFinal,
    Appraisal,
    Negotiation,
    BoardApproval,
    BoardApproved,
    MeetingMaterials,
    MeetingMinutes,
}
export default class DocumentSharePointAPI {
    public static CurrentLibraryPath = "/sites/flow/AIIBWorkflow";
    private static _instances: Array<{ uniqueId: string, instance: DocumentSharePointAPI }> = new Array<{ uniqueId: string, instance: DocumentSharePointAPI }>();

    public static get Instance(): DocumentSharePointAPI {
        let items: Array<{ uniqueId: string, instance: DocumentSharePointAPI }> = DocumentSharePointAPI._instances.filter(item => {
            return item.uniqueId == DocumentSharePointAPI.CurrentLibraryPath;
        });
        if (items != null && items.length == 1) return items[0].instance;

        let instance = new DocumentSharePointAPI();
        DocumentSharePointAPI._instances.push({
            uniqueId: DocumentSharePointAPI.CurrentLibraryPath,
            instance: instance
        })
        return instance;
    }

    private ClientContext: SP.ClientContext;
    private Site: SP.Site;
    private Web: SP.Web;
    private _library: SP.List;

    private get Library(): SP.List {
        if (this._library == null) {
            this._library = this.Web.getList(DocumentSharePointAPI.CurrentLibraryPath);
            this.ClientContext.load(this._library);
            return this._library;
        }

        return this._library;
    }

    constructor() {
        this.initialize();
    }

    private initialize() {
        ExecuteOrDelayUntilScriptLoaded(() => {
            this.ClientContext = SPClientContext.getSPClientContext();
            this.Site = this.ClientContext.get_site();
            this.ClientContext.load(this.Site);
            this.Web = this.ClientContext.get_web();
            this.ClientContext.load(this.Web);
        }, "sp.js");
    }
    private _getLibrarySharePointModelRequest: Promise<LibrarySharePointModel>;
    rename(request: DocumentRenameRequest): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var item = this.Library.getItemById(request.Id);
            item.set_item("FileLeafRef", request.Name);
            item.update();
            this.ClientContext.load(item);
            this.ClientContext.executeQueryAsync(() => {
                resolve(true);
            }, (sender, message) => {
                if (message.get_errorCode() === -2130575257) {
                    reject('The folder or folder has been in existence');
                } else if (message.get_errorCode() === -2147018894) {
                    reject('The file or folder has been in existence');
                }
                else {
                    reject(message.get_message());
                }
            })
        });
    }
    getLibrarySharePointModel(): Promise<LibrarySharePointModel> {
        if (this._getLibrarySharePointModelRequest == null) {
            this._getLibrarySharePointModelRequest = new Promise((resolve, reject) => {
                this.ClientContext.load(this.Library, 'Id', 'Title', 'RootFolder', "Description", 'ItemCount', 'EffectiveBasePermissions');
                this.ClientContext.executeQueryAsync(
                    () => {
                        resolve({
                            Id: this.Library.get_id(),
                            Path: this.Library.get_rootFolder().get_serverRelativeUrl(),
                            Title: this.Library.get_title(),
                            Description: this.Library.get_description(),
                            RoleId: DocumentCommon.getRoleType(this.Library),
                            DocumentNumber: this.Library.get_itemCount()
                        });
                    },
                    (sender: any, args: any) => {
                        reject(args);
                    });
            });
        }

        return this._getLibrarySharePointModelRequest;
    }

    getFolderFullPath(libraryPath: string, selectedFolderPath: string): Promise<Array<SP.Folder>> {
        return new Promise((resolve, reject) => {
            let folderPaths = selectedFolderPath.toLowerCase().replace(libraryPath.toLowerCase(), "").split('/').filter(folder => folder != null && folder.length > 0);
            if (folderPaths.length === 0) {
                resolve([]);
                return;
            }

            let folders = new Array<SP.Folder>();
            for (let index = 0; index < folderPaths.length; index++) {
                let path = libraryPath + "/" + folderPaths.slice(0, index + 1).join("/");
                let folder = this.Web.getFolderByServerRelativeUrl(path);
                this.ClientContext.load(folder, 'Name', 'ServerRelativeUrl');
                folders.push(folder);
            }

            this.ClientContext.executeQueryAsync(
                () => {
                    resolve(folders);
                },
                (sender: any, args: any) => {
                    reject(args);
                });
        });
    }
    delete(item: DocumentModel): Promise<any> {
        return new Promise((resolve, reject) => {
            let deletedItemId: SP.GuidResult;
            let file = this.Web.getFileByServerRelativeUrl(item.Path);
            deletedItemId = file.recycle();
            this.ClientContext.executeQueryAsync(() => {
                if (deletedItemId.get_value().equals(SP.Guid.get_empty())) {
                    reject({ code: 'error', message: 'File does not exist' });//文件不存在
                    return;
                }
                resolve({ code: 'success', message: 'Deleted successfully' });
            }, (sender, message) => {
                reject({ code: 'error', message: message });
            });
        });
    }
    /* paginate */
    paginate(request: DocumentPaginationRequest): Promise<DocumentModelListResponse> {
        return new Promise((resolve, reject) => {
            let query = this.getPaginationQuery(request);
            let items = this.Library.getItems(query);
            this.ClientContext.load(items, 'ListItemCollectionPosition', "Include(File_x0020_Type,UniqueId,EffectiveBasePermissions,Editor,FSObjType,Id,FileLeafRef,FileRef,File_x0020_Size,Author,Created_x0020_By,Created_x0020_Date,Modified_x0020_By,Last_x0020_Modified)");
            this.ClientContext.executeQueryAsync(async () => {
                let currentPageIsEmpty = items.get_count() == 0;
                if (currentPageIsEmpty === true && request.pageIndex > 1) {
                    resolve({
                        loadPrevPage: true
                    });
                    return;
                }

                let models = new Array<DocumentModel>();
                let enumerator = items.getEnumerator();
                while (enumerator.moveNext()) {
                    let item = enumerator.get_current();
                    let id = item.get_id();
                    let uniqueId = item.get_item("UniqueId").toString();
                    let isFolder = item.get_item("FSObjType") === "1";
                    let name = item.get_item("FileLeafRef");
                    let path = item.get_item("FileRef");
                    let created = item.get_item("Created_x0020_Date");
                    let modified = item.get_item("Last_x0020_Modified");
                    let fileType = item.get_item("File_x0020_Type");
                    let fileSize = item.get_item("File_x0020_Size");
                    let createBy = item.get_item("Author").get_lookupValue();
                    let modifyBy = item.get_item("Editor").get_lookupValue();
                    let spAccount = item.get_item("Created_x0020_By");
                    let data = {
                        IsFolder: isFolder,
                        Id: id,
                        UniqueId: uniqueId,
                        Name: name,
                        NameWithoutFileExtension: isFolder ? name : DocumentCommon.getFileNameWithOutExtension(name),
                        Path: path,
                        FileType: fileType,
                        FileSize: fileSize,
                        Size: DocumentCommon.getFileSize(fileSize),
                        Thumb: DocumentCommon.getIconUrl(name, isFolder),
                        Icon: DocumentCommon.getIconUrl(name, isFolder),
                        IsFollow: false,
                        CreateBy: createBy,
                        Created: created,
                        FormattedCreated: moment(created).format("MM-DD-YYYY HH:mm"),
                        ModifyBy: modifyBy,
                        Modified: modified,
                        FormattedModified: moment(modified).format("MM-DD-YYYY HH:mm"),
                        RoleId: DocumentCommon.getRoleType(item),
                        SPAccount: spAccount,
                    };
                    models.push(data);
                }
                let hasNextPage = items.get_listItemCollectionPosition() != null;
                if (hasNextPage) {
                    this._nextPagingInfo = items.get_listItemCollectionPosition().get_pagingInfo();
                }
                this._currentPagingInfo = query.get_listItemCollectionPosition().get_pagingInfo();
                this._firstItemInCurrentPage = models.length > 0 ? models[0] : null;
                let totalCount = ((request.pageIndex - 1) * request.pageSize) + models.length + (hasNextPage ? 1 : 0);
                // const countObj = await this.getFileCount(request.folderPath);
                resolve({
                    Data: models,
                    TotalCount: totalCount,
                    Status: 2
                });
            }, (sender, message) => {
                reject(message);
            });
        });
    }


    // {'query' : {'__metadata': { 'type': 'SP.CamlQuery' },"ViewXml": "<View><Query><Where><Contains><FieldRef Name='FileLeafRef'/><Value Type='Text'>AIIB</Value></Contains></Where></Query></View>" }}
    getFileCount(folderPath: string) {
        //     var metadata = "{ 'query' : { '__metadata': { 'type': 'SP.ChangeQuery' },
        // 'Add': 'True', 'Item': 'True' }}";
        // const query = `{'query' : {'__metadata': { 'type': 'SP.CamlQuery' },"ViewXml": "<View><Query><Where><Contains><FieldRef Name='FileLeafRef'/><Value Type='Text'>AIIB</Value></Contains></Where></Query></View>" }}`;

        return new Promise((resolve, reject) => {
            let siteAbsoluteUrl = _spPageContextInfo.siteAbsoluteUrl;
            let path = encodeURIComponent(folderPath);
            let url = `${siteAbsoluteUrl}/_api/web/getfolderbyserverrelativeurl(@folder)/ItemCount?@folder='${path}'`;
            let spRequest = new SpRequest();
            spRequest.defaultParam.Headers = [{ 'accept': 'application/json; odata=verbose' }];
            // spRequest.defaultParam.Data = query;
            spRequest.get(url).then(d => {
                resolve(d);
            }, (msg) => {
                reject(msg);
            });
        });
    }
    private _lastPageIndex: number;
    private _lastFolderPath: string;
    private _nextPagingInfo: string;
    private _currentPagingInfo: string;
    private _firstItemInCurrentPage: DocumentModel;

    private getPaginationPosition(pageIndex: number, folderPath: string) {
        let position = new SP.ListItemCollectionPosition();
        if (pageIndex === 1 || this._lastPageIndex == null || this._lastFolderPath != folderPath) {
            this._lastPageIndex = pageIndex;
            this._lastFolderPath = folderPath;
            position.set_pagingInfo("Paged=TRUE&p_ID=0");
        } else if (this._lastPageIndex == pageIndex) {

            let position = new SP.ListItemCollectionPosition();
            position.set_pagingInfo(this._currentPagingInfo);
            return position;
        } else {
            let nextPage = pageIndex >= this._lastPageIndex;
            this._lastPageIndex = pageIndex;

            if (nextPage) {
                position.set_pagingInfo(this._nextPagingInfo);
            } else {
                let backwardsPageInfo = "PagedPrev=TRUE&Paged=TRUE";
                backwardsPageInfo += "&p_SortBehavior=" + (this._firstItemInCurrentPage.IsFolder ? 1 : 0);
                backwardsPageInfo += "&p_FSObjType=" + (this._firstItemInCurrentPage.IsFolder ? 1 : 0);
                backwardsPageInfo += "&p_FileLeafRef=" + this._firstItemInCurrentPage.Name;
                backwardsPageInfo += "&p_File_x0020_Type=" + this._firstItemInCurrentPage.FileType;
                backwardsPageInfo += "&p_Last_x0020_Modified=" + this._firstItemInCurrentPage.Modified;
                backwardsPageInfo += "&p_File_x0020_Size=" + this._firstItemInCurrentPage.FileSize;
                backwardsPageInfo += "&p_Author=" + this._firstItemInCurrentPage.CreateBy;
                backwardsPageInfo += "&p_ID=" + this._firstItemInCurrentPage.Id;
                position.set_pagingInfo(backwardsPageInfo);
            }
        }

        return position;
    }

    private getPaginationQuery(request: DocumentPaginationRequest): SP.CamlQuery {
        let searching = (request.keyword != null && request.keyword.length > 0 ? true : false) || request.selectFolder;
        let includeSubFolders = request.selectFolder ? false : searching;

        let keywordFilter = "";
        if (searching) {
            if (request.selectFolder) {
                keywordFilter = "<Contains>"
                    + "<FieldRef Name='FSObjType'/>"
                    + "<Value Type='Text'>1</Value>"
                    + "</Contains>";
            } else {
                keywordFilter = "<Contains>"
                    + "<FieldRef Name='FileLeafRef'/>"
                    + "<Value Type='Text'>" + request.keyword + "</Value>"
                    + "</Contains>";
            }

        }
        let where = "<Where>"
            + keywordFilter
            + "</Where>";
        let rowLimit = "<RowLimit Paged='TRUE'>" + request.pageSize + "</RowLimit>";
        let orderBy = "<OrderBy><FieldRef Name='FSObjType' Ascending='TRUE' /><FieldRef Name='" + request.orderByField + "' Ascending='FALSE' /></OrderBy>";

        let query = new SP.CamlQuery();
        query.set_viewXml("<View" + (includeSubFolders === true ? " Scope='RecursiveAll' " : "") + ">"
            + "<Query>"
            + where
            + orderBy
            + "</Query>"
            + rowLimit
            + "</View>");
        query.set_folderServerRelativeUrl(request.folderPath);
        query.set_listItemCollectionPosition(this.getPaginationPosition(request.pageIndex, request.folderPath));

        return query;
    }
    private buildFileExtensionFilter(fileExtensions: Array<string>) {
        let filters = fileExtensions.map(fileExtension => {
            return "<Contains>"
                + "<FieldRef Name='File_x0020_Type'/>"
                + "<Value Type='Text'>" + fileExtension + "</Value>"
                + "</Contains>";
        });

        if (filters.length == 1) {
            return filters[0];
        }
        else if (filters.length == 2) {
            return "<Or>" + filters.join("") + "</Or>";
        }
        else {
            let where = "<Or>" + filters.slice(0, 2).join("") + "</Or>";

            for (let index = 2; index < filters.length; index++) {
                where = "<Or>" + where + filters[index] + "</Or>"
            }
            return where;
        }
    }

    private getFileBuffer(file: Blob): Promise<any> {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            }
            reader.onerror = (e: any) => {
                reject(e.target.error);
            }
            reader.readAsArrayBuffer(file);
        });
    }

    /* upload */
    // private _defaultChunkFileSize: number = 10 * 1024 * 1024;
    // private _smallFileSize: number = this._defaultChunkFileSize;
    async upload(file: File, folder: string, overwrite?: boolean, resolve?, reject?) {
        return new Promise((currentResolve, currentReject) => {
            if (!resolve) resolve = currentResolve;
            if (!reject) reject = currentReject;
            this.getFileBuffer(file).then((fileBuffer: any) => {
                let url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/getfolderbyserverrelativeurl(@folder)/Files/Add(url=@filename,overwrite=@overwrite)";
                let queryString = `?@folder='${encodeURIComponent(folder)}'&@filename='${encodeURIComponent(file.name)}'&@overwrite=${overwrite.toString()}`;
                new SpRequest().post(url + queryString, fileBuffer).then((result) => {
                    let documentUniqueId = DocumentCommon.isOffice365Site() ? result.d.UniqueId : result.d.ContentTag.substring(1, 37).toLowerCase();
                    resolve({
                        uniqueId: documentUniqueId
                    });
                }, async sender => {
                    var isRefresh = await SPClientContext.refreshToken(sender);
                    if (isRefresh) {
                        this.upload(file, folder, overwrite, resolve, reject);
                    } else {
                        reject(sender.response.body.error.message.value);
                    }
                });
            });
        });
    }


    validateFileNameSize(fileName: string): boolean {
        let moreThan200Chars = false;
        if (DocumentCommon.getFileNameWithOutExtension(fileName).length > 200) {
            moreThan200Chars = true;
        }

        let validatePassed = moreThan200Chars == false;
        return validatePassed;
    }

    validateFileName(fileName: string): boolean {
        let hasInvalidChars = false;
        if (fileName.indexOf("~") >= 0 ||
            fileName.indexOf("#") >= 0 ||
            fileName.indexOf("%") >= 0 ||
            fileName.indexOf("&") >= 0 ||
            fileName.indexOf("*") >= 0 ||
            fileName.indexOf("{") >= 0 ||
            fileName.indexOf("}") >= 0 ||
            fileName.indexOf("'") >= 0 ||
            fileName.indexOf("\\") >= 0 ||
            fileName.indexOf(":") >= 0 ||
            fileName.indexOf("<") >= 0 ||
            fileName.indexOf(">") >= 0 ||
            fileName.indexOf("?") >= 0 ||
            fileName.indexOf("/") >= 0 ||
            fileName.indexOf("|") >= 0 ||
            fileName.indexOf("\"") >= 0) {
            hasInvalidChars = true;
        }

        let validatePassed = hasInvalidChars === false;
        return validatePassed;
    }
    addFolder(folderPath: string, newFolderName: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let folderCreation = new SP.ListItemCreationInformation();
            folderCreation.set_folderUrl(folderPath);
            folderCreation.set_leafName(newFolderName);
            folderCreation.set_underlyingObjectType(SP.FileSystemObjectType.folder);
            let folder = this.Library.addItem(folderCreation);
            folder.update();
            this.ClientContext.executeQueryAsync(() => {
                resolve(true);
            }, (sender, message) => {
                if (message.get_errorCode() === -2130245363) {
                    reject('The file or folder has been in existence');
                } else {
                    reject(message.get_message());
                }
            })
        });
    }

    getPreviewUrl(path: string): string {
        // return _spPageContextInfo.webServerRelativeUrl + "/_layouts/15/getpreview.ashx?clientType=docLibGrid&resolution=Width1024"
        //     + "&guidFile={" + itemId + "}"
        //     + "&guidSite={" + this.Site.get_id().toString() + "}"
        //     + "&guidWeb={" + this.Web.get_id().toString() + "}";

        if (!_spPageContextInfo) {
            return "";
        }
        return _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/getpreview.ashx?path="
            + _spPageContextInfo.webAbsoluteUrl.replace(_spPageContextInfo.webServerRelativeUrl, "")
            + path;
    }
    confirmNotExitsTheSameFile(folderPath: string, filename: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var query = new SP.CamlQuery();
            query.set_folderServerRelativeUrl(folderPath);
            query.set_viewXml(`<View>
                                    <Query>
                                        <Where>
                                            <Eq>
                                                <FieldRef Name='FileLeafRef'/>
                                                <Value Type='Text'>${filename} </Value>
                                            </Eq>
                                        </Where>
                                    </Query>
                                </View>`);
            var files = this.Library.getItems(query);
            this.ClientContext.load(files);
            this.ClientContext.executeQueryAsync(() => {
                let notExitsTheSameFile = files.get_count() == 0;
                let validatePassed = notExitsTheSameFile == true;
                resolve(validatePassed);
            }, (sender, message) => {
                reject(message);
            });
        });
    }
    getDocumentVersion(item: DocumentModel): Promise<DocumentVersionModel[]> {
        return new Promise((resolve, reject) => {
            let file = this.Web.getFileByServerRelativeUrl(item.Path);
            let fileVersions = file.get_versions();
            this.ClientContext.load(fileVersions);
            this.ClientContext.executeQueryAsync(async () => {
                let objlistVersionEnumerator = fileVersions.getEnumerator();
                let result: DocumentVersionModel[] = [];
                while (objlistVersionEnumerator.moveNext()) {

                    let objCurrentListItemVersion = objlistVersionEnumerator.get_current();
                    let Id: number, Size: string, Create: string, Path: string, Createby: string, Version: string;
                    Id = objCurrentListItemVersion.get_id();//这个地方就是get_id  get_iD是取到不任何值的
                    Size = DocumentCommon.getFileSize(objCurrentListItemVersion.get_size());
                    Create = moment(objCurrentListItemVersion.get_created()).format("YYYY-MM-DD HH:mm:ss");
                    Path = objCurrentListItemVersion.get_url();
                    Version = objCurrentListItemVersion.get_versionLabel();
                    let user = objCurrentListItemVersion.get_createdBy();
                    Createby = await this.getUserName(user);
                    result.push({ Id, Size, Create, Path, Createby, Version });

                }
                result = result.sort((a, b) => b.Id - a.Id);
                resolve(result);
            }, (render, message) => {
                reject(message);

            });
        });
    }
    changeDocumentVersion(item: DocumentModel, version?: string) {
        // new SpRequest()
        return new Promise((resolve, reject) => {
            let url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl(@folder)/versions/restorebylabel(versionlabel=@versionlabel)";
            let queryString = `?@folder='${encodeURIComponent(item.Path)}'&@versionlabel='${encodeURIComponent(version)}'`;
            new SpRequest().post(url + queryString).then(d => {
                resolve(d);
            }, (msg) => {
                reject(msg);
            });
        })
    }
    getUserName(user: SP.User): Promise<string> {
        return new Promise((resolve, reject) => {
            this.ClientContext.load(user);
            this.ClientContext.executeQueryAsync(() => {
                resolve(user.get_title());
            });
        })
    }
    private getPermissionItem(id: number) {
        return id === DocumentCommon.LibraryRootFolderId ? this.Library : this.Library.getItemById(id);
    }

    private getPermissionRoleId(roleDefinitions: SP.RoleDefinitionCollection, roleId: string) {
        return roleDefinitions.getByName(roleId);
    }


}
interface PermissionItem extends SP.ClientObject {
    get_id();
    get_hasUniqueRoleAssignments: () => boolean;
    get_roleAssignments: () => SP.RoleAssignmentCollection;
    resetRoleInheritance();
    breakRoleInheritance(copyRoleAssignments: boolean, clearSubscopes: boolean);
    update();
}
