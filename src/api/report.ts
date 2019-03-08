import { Request, AkResponse, AkContext, AppKeys } from 'akmii-yeeoffice-common';
/** 报表 */
export class ReportAPI {

    /**
     * 报表列表查询
     *
     * @static
     * @param {GetReportRequest} data
     * @returns
     *
     * @memberOf ReportAPI
     */
    static async getReport(data: GetReportRequest) {
        let url: string = "/api/reports";
        return await new Request<GetReportRequest,
            AkResponse>().get(url, data);
    }

    /**
     * 报表详情查询
     *
     * @static
     * @param {GetReportDetailRequest} data
     * @returns
     *
     * @memberOf ReportAPI
     */
    static async getReportDetail(data: GetReportDetailRequest) {
        let url: string = "/api/reports/detail";
        return await new Request<GetReportDetailRequest,
            AkResponse>().get(url, data);
    }

    /**
     * 报表导出
     *
     * @static
     * @param {exportReportRequest} data
     * @returns
     *
     * @memberOf ReportAPI
     */
    static async exportReport(data: ExportReportRequest) {
        let url: string = "/api/reports/export";
        return await new Request<ExportReportRequest,
            AkResponse>().get(url, data);
    }

    /**
     * 获取报表列头信息
     *
     * @static
     * @param {getTitleRequest} data
     * @returns
     *
     * @memberOf ReportAPI
     */
    static async getTitle(data: GetTitleRequest) {
        //let url : string = "/api/admin/reports/title";
        let url: string = "/api/reports/title";
        return await new Request<GetTitleRequest, AkResponse>().get(url, data);
    }

    /** get report search variable*/
    static async getReportSearchValue(data: GetReportsVariableByKeyRequest) {
        let url: string = "/api/reports/search";
        return await new Request<GetReportsVariableByKeyRequest, AkResponse>().get(url, data);
    }

    /*******************************Admin Reporot************************************** */

    /** getReports*/
    static async getReports(data: GetReportsRequest) {
        let url: string = "/api/admin/reports";
        return await new Request<GetReportsRequest,
            ReportConfigModelListResponse>().get(url, data);
    }

    /** post reports */
    static async postReport(data: ReportConfigRequest) {
        let url: string = "/api/admin/reports";
        return await new Request<ReportConfigRequest,
            AkResponse>().post(url, data);
    }

    /** put reports*/
    static async putReport(data: ReportConfigPutRequest) {
        let url: string = "/api/admin/reports";
        return await new Request<ReportConfigPutRequest,
            AkResponse>().put(url, data);
    }

    /** get admin reports key */
    static async getReportByKey(data: GetReportsByKeyRequest) {
        let url: string = "/api/admin/reports/key";
        return await new Request<GetReportsByKeyRequest,
            ReportConfigModelResponse>().get(url, data);
    }

    /** get admin reports Variable by key*/
    static async getReportVariableByKey(data: GetReportsVariableByKeyRequest) {
        let url: string = "/api/admin/reports/variable";
        return await new Request<GetReportsVariableByKeyRequest,
            ReportConfigVariableModelResponse>().get(url, data);
    }

    /** put reports Varibale */
    static async putReportVaribale(data: ReportConfigVariableRequest) {
        let url: string = "/api/admin/reports/variable";
        return await new Request<ReportConfigVariableRequest,
            AkResponse>().put(url, data);
    }

    /** put reports Permission*/
    static async putReportPermission(data: PermissionModelRequest) {
        let url: string = "/api/admin/reports/permission";
        return await new Request<PermissionModelRequest,
            AkResponse>().put(url, data);
    }

    /** put reports Enable */
    static async putReportEnable(data: ReportConfigEditStatusRequest) {
        let url: string = "/api/admin/reports/enable";
        return await new Request<ReportConfigEditStatusRequest,
            AkResponse>().put(url, data);
    }

    /** put reports disable*/
    static async putReportDisable(data: ReportConfigEditStatusRequest) {
        let url: string = "/api/admin/reports/disable";
        return await new Request<ReportConfigEditStatusRequest,
            AkResponse>().put(url, data);
    }

    static async putReportFilters(data: ReportFilterSettingRequest) {
        let url: string = "/api/admin/reports/filter";
        return await new Request<ReportFilterSettingRequest,
            AkResponse>().put(url, data);
    }

    /*******************************Usr Reporot************************************** */
    /** get all*/
    static async getAllReport(data: GetAllReportsRequest) {
        let url: string = "/api/reports/all";
        return await new Request<GetAllReportsRequest,
            ReportConfigModelListResponse>().get(url, data);
    }

    /** get report 报表*/
    static async getUserReport(data: GetUserReportRequest) {
        let url: string = "/api/reports";
        return await new Request<GetUserReportRequest,
            AkResponse>().get(url, data);
    }

    /** get detail */
    static async getUserReportDetail(data: GetUserReportsDetailRequest) {
        let url: string = "/api/reports/detail";
        return await new Request<GetUserReportsDetailRequest,
            AkResponse>().get(url, data);
    }

    /** get reports title */
    static async getUserReportTitley(data: GetUserReportsTitleRequest) {
        let url: string = "/api/reports/title";
        return await new Request<GetUserReportsTitleRequest,
            AkResponse>().get(url, data);
    }

    /** get exportfile */
    static async getUserExportfile(data: GetUserExportfileRequest) {
        let url: string = "/api/reports/exportfile";
        return await new Request<GetUserExportfileRequest,
            AkResponse>().get(url, data);
    }

    static async putExportfile(data:ReportRequest){
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/crafts/datas/exportcreate";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<ReportRequest ,
            AkResponse>().put(url, data);
    }
}

export enum ReportStatus {
    disable = 0,
    enable = 1
}
export interface ReportRequest {
    ListID:string;
    AppID?:number;
    FilterValue?:string;
    Wheres?:string;
    Sorts?:string;
    ClientHour?:string;
    Columns?:string;
    ColumnType?:number;
    FileName?:string;
    DetailUrl?:string;
}

/** 默认图标 */
export class ReportDefaultIcon {
    static data() {
        let defaultIcon = "data:image/png;base64,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";
        return defaultIcon;
    }
}
