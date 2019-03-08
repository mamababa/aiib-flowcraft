import {Request, AkResponse} from "akmii-yeeoffice-common";
export class MenusAPI {
  /**获取所有菜单 */
  static async getAllAdminMenus(data?: GetAllAdminMenusRequest) {
    let url : string = "/api/admin/menus/select/all";
    return new Request < GetAllAdminMenusRequest,
    MenuModelListResponse > ().get(url, data);
  }
  /**添加菜单 */
  static async postAdminMenus(data?: MenuModelRequest) {
    let url : string = "/api/admin/menus/add";
    return new Request < MenuModelRequest,
    AkResponse > ().post(url, data);
  }
  /**更新菜单 */
  static async putAdminMenus(data?: MenuModelRequest) {
    let url : string = "/api/admin/menus/Update";
    return new Request < MenuModelRequest,
    AkResponse > ().put(url, data);
  }
  /**删除菜单 */
  static async delAdminMenus(data?: DeleteAdminMenusRequest) {
    let url : string = "/api/admin/menus";
    return new Request < DeleteAdminMenusRequest,
    AkResponse > ().del(url, data);
  }
  /**保存排序 */
  static async putSortAdminMenus(data?: MenuEditNumRequest) {
    let url : string = "/api/admin/menus/order";
    return new Request < MenuEditNumRequest,
    AkResponse > ().put(url, data);
  }
  /**权限设置 */
  static async putMenusPermission(data?: PermissionModelRequest) {
    let url : string = "/api/admin/menus/permission";
    return new Request < PermissionModelRequest,
    AkResponse > ().put(url, data);
  }

  /**普通用户 快速链接-根据parentid获取下一级子节点 */
  static async getMenusByParentid(data?: GetMenusByParentIDRequest) {
    let url : string = "/api/menus/parentid";
    return new Request < GetMenusByParentIDRequest,
    MenuModelListResponse > ().get(url, data);
  }

  /**普通用户 快速链接-根据用户 */
  static async getMenusByUser(data?: GetMenusByUserRequest) {
    let url : string = "/api/menus/select/user";
    return new Request < GetMenusByUserRequest,
    MenuModelListResponse > ().get(url, data);
  }

 /**启用 */
  static async putEnableMenus(data?: MenuPutRequest ) {
    let url : string = "/api/admin/menus/enable";
    return new Request < MenuPutRequest ,
    AkResponse > ().put(url, data);
  }
   /**禁用 */
  static async putDisableMenus(data?: MenuPutRequest ) {
    let url : string = "/api/admin/menus/disable";
    return new Request < MenuPutRequest ,
    AkResponse > ().put(url, data);
  }

}

export const QuickLinkParentID = "41";
export const ReportParentID = "42";
