const enum MuensStatusType {
    All = -1,
    Disabled = 0,
    Enabled = 1
}

/**获取所有菜单*/
interface GetAllAdminMenusRequest extends AkRequest {
    parentID : string;
    status?: MuensStatusType;
    pageIndex?: number;
    pageSize?: number;
}

/**删除*/
interface DeleteAdminMenusRequest extends AkRequest {
    id?: string;
}

/**普通用户  快速链接-根据parentid获取下一级子节点 */
interface GetMenusByParentIDRequest extends AkRequest {
    parentID?: string;
}

/**普通用户  快速链接-根据用户 */
interface GetMenusByUserRequest extends AkRequest {}

/**启用/禁用 */
interface MenuPutRequest extends AkRequest {
    ID : string;
}
