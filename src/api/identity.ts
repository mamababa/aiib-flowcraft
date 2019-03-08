import { Request } from "akmii-yeeoffice-common";
export class IdentityAPI {
    /**根据数据主键获取权限 */
    static async getAdminPermissions(data?: GetAdminPermissionsRequest) {
        let url: string = "/api/admin/permissions";
        return new Request<GetAdminPermissionsRequest,
            IdentityModelListResponse>().get(url, data);
    }

    /**根据数据主键获取报表权限 */
    static async getAdminReportPermissions(data?: GetAdminPermissionsRequest) {
        let url: string = "/api/admin/reports/permission";
        return new Request<GetAdminPermissionsRequest,
            IdentityModelListResponse>().get(url, data);
    }
}
