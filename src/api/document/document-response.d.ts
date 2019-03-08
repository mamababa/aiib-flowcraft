interface IDocumentModel {
    UniqueId: string;
}

interface IFollowDocumentModel extends IDocumentModel {
    IsFollow: boolean;
}

interface DocumentModel extends BaseModel, IDocumentModel, IFollowDocumentModel {
    IsFolder: boolean;
    Id: number;
    Name: string;
    NameWithoutFileExtension: string;
    Path: string;
    Thumb?: string;
    Size: string;
    FileSize: number;
    FileType: string;
    Icon?: string;
    RoleId?: string;
    CreateBy: string;
    Created: string;
    FormattedCreated: string;
    ModifyBy: string;
    Modified: string;
    FormattedModified: string;
    FollowTime?: Date;
    Checked?: boolean;
    SPAccount?: string;
}

interface DocumentModelListResponse extends AkResponse {
    Data?: DocumentModel[];
    TotalCount?: number;
    Status?: number;
    loadPrevPage?: boolean;
}
interface LibrarySharePointModel {
    Id: SP.Guid;
    Path: string;
    Title: string;
    Description: string;
    DocumentNumber: number;
    RoleId?: string;
}
interface BreadcrumbModel {
    Name: string;
    UrlPath: string;
}
interface DocumentVersionModel {
    Id?: number;
    Size: string;
    Create: string;
    Path: string;
    Createby?: string;
    Version: string;
}
interface DocumentRenameRequest extends YeeOfficeBaseRequest {
    IsFolder: boolean;
    Path: string;
    Id: number;
    Name: string;
}
