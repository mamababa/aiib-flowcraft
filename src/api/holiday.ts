import {Request, AkContext, AppKeys} from "akmii-yeeoffice-common";
import {
    RulesAddModel,
    postAdjustHolidayData,
    EmployeeHolidayDetailLogSearchModal,
    GetMetadataModelRequest,
    GetMetadataResponse
} from './model/holiday';
export class HolidayAPI {
    static BaseApiUrl = AkContext.getAppInfoAPI_URL(AppKeys.Flowcraft).toLowerCase().replace('flowcraft', 'flowcraft/hr');

    /**添加员工假期 */
    static async getEmployeeHoliday(data?: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaybalance/SelectByGroupUser";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async postHolidayRules(data?: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules";
        return new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    static async getHolidayRulesList() {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules/getall";
        return new Request<AkRequest,
            AkResponse>().get(url);
    }

    static async getHolidayDetailList(data) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaybalance/SelectByAccountID";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async getOperationLog(data) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/admin/holidayimport/SelectByQueryKeyWord";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async addHolidayRules(data?: RulesAddModel) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules";
        return new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    static async getByHolidayType(data?: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules/GetByHolidayType";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async getCalcHoliday(data?: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules/CalcHolidayQuoteShow";
        return new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    // 调节假期
    static async postByHolidayType(data?: postAdjustHolidayData) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidayorder/HolidayOrderBalanceReviseSubmit";
        return new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    // 假期查询记录
    static async getQuery(data?: EmployeeHolidayDetailLogSearchModal) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidayorder/SelectByQueryKeyWord";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    // 获取流水记录
    static async getDetailLog(data?: EmployeeHolidayDetailLogSearchModal) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaydetaillog/SelectByQueryKeyWord";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    //获取所有设置过的假期类型
    static async getHasSettingsHolidayType() {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules/rules";
        return new Request<AkRequest,
            AkResponse>().get(url);
    }

    static async postAmountImport(data: FormData, emptyData?: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/admin/holidayimport/amountimport";
        return new Request<AkRequest,
            AkResponse>().send(url, data, emptyData);
    }

    static async postUsedImport(data: FormData, emptyData?: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/admin/holidayimport/usedimport";
        return new Request<AkRequest,
            AkResponse>().send(url, data, emptyData);
    }

    static getErrorDownLoad() {
        return HolidayAPI.BaseApiUrl + "/api/admin/holidayimport/download";
    }

    static async getImportinfo(data) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/admin/holidayimport/importinfo";
        return new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    //测试专用接口
    static async calcholiday(data: any) {
        let url: string = HolidayAPI.BaseApiUrl + "/api/holidaytyperules/calcholiday";
        return new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    /**导出balance*/
    static exportBalanceUrl() {
        return HolidayAPI.BaseApiUrl + "/api/holidaybalance/ExportExcelSelectByGroupUser";
    };

    /**导出Log*/
    static exportLogUrl() {
        return HolidayAPI.BaseApiUrl + "/api/holidayorder/ExportExcelSelectByQueryKeyWord";
    };

    /**导出quota*/
    static exportQuotaLogUrl() {
        return HolidayAPI.BaseApiUrl + "/api/holidaybalance/DownloadExcelTemplateByTotal";
    };

    /**导出used*/
    static exportUsedLogUrl() {
        return HolidayAPI.BaseApiUrl + "/api/holidaybalance/DownloadExcelTemplateByUsed";
    };

    /**
     * 查询metadata，返回一级的数据
     */
    static getById(request: GetMetadataRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/metadata";
        return new Request<GetMetadataRequest,
            GetMetadataResponse>().get(url, request, []);
    }

    /**
     * 根据parentcode查询子级
     */
    static getByCode(request: GetMetadataModelRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/metadata/parentcode";
        return new Request<GetMetadataModelRequest,
            GetMetadataResponse>().get(url, request, []);
    }
}
