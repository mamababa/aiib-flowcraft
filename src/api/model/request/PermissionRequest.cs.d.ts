/** 权限设置请求 */
interface PermissionModelRequest extends AkRequest {
    /** 数据主键或者唯一键 */
    DataID: string;
    /** 权限列表 {1:[12,3,4],2:[3,4,5],3:[4,56,8]} */
    PermTypeIDs?: PermissionIdentityModal[]
}

interface PermissionIdentityModal {
    Attr?: object;
    ID?: string;
    Name?: string;
    Type?: number;
}
