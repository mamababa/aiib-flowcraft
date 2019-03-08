/**根据数据主键获取权限 */
interface GetAdminPermissionsRequest extends AkRequest {
    reportID?: string;
    dataID?: string;
    tableName?:TableNameType;
}


const enum TableNameType {
    /**流程定义*/
    Flowcraft_ProcModel = 1,
    /**菜单*/
    Flowcraft_Menu = 2,
    /**报表*/
    Flowcraft_Report=3
}
