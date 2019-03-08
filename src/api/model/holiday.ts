import { MetadataInfo } from "akmii-yeeoffice-common";

export enum DetailMenuEnum{
    /*查看详情*/
    LookDetail = 1,
        /*导出详情*/
    ExportDetail = 2
}
export enum EmployeeHolidayListEnum{
    /*修正*/
    Update = 1,
        /*导出*/
    Export = 2,
        /*查看*/
    View = 3
}

export enum EmployeeHolidayAdjustEnum{
    // 减
    Reduce = 1,
        // ADD
    Add = 2
}

export enum EmployeeHolidayAdjustTypeEnum{
    // 全部
    All = 0,
    // 额度
    TypeQuota = 1,
    // 已使用
    TypeUsed = 2
}

export enum EmployeeHolidayOperationTypeEnum{
    // 全部
    AllOperation = 0,
    // 请假申请
    TypeApplyFor = 1,
    // 销假申请
    TypeImpact = 2,
    // 调节
    TypeAdjust = 4,
    // 申请冲正
    TypeAdjusttion = 5
}

export enum EmployeeHolidaySearchEnum{
    Add = 1,//添加
    Export = 2,//导出
    Import = 3,//导入
    Operationlog = 4 //操作日志
}

export enum RuleDeductedPolicy{
    WorkingDay = '1',//案工作日
    CalendarDay = '2'//按日历日
}

export enum RuleConditionEnum{
    WorkingYears = '${holiday.workage}',//工龄
    OurAge = '${holiday.companyage}',//司龄
    Rank = '${holiday.rank}'//职级
}

export interface RulesBase {
    /*创建日期*/
    Created?: string;
    /*创建者*/
    CreatedBy?: string;
    /*修改日期*/
    Modified?: string;
    /*修改者*/
    ModifiedBy?: string;
}

export interface EmployeeHolidaySearchList {
    year?: string;
    accountID?: string;
    containChildOrganization?: string;
    departmentID?: string;
    pageIndex?: number | string;
    pageSize?: number | string;
}

export interface EmployeeHolidayDetailSearchModal {
    year?: string;
    accountID?: string;
    holidayType?: string;
    pageIndex?: number | string;
    pageSize?: number | string;
}

export interface  EmployeeHolidayBalanceModel {
    DeadlineDate?: string;
    HolidayType?: string;
    LockHour?: number;
    SurplusHour?: number;
    TotalHour?: number;
    UsedHour?: number;
    Year?: number;
}

export interface EmployeeHolidayDetailLogSearchModal {
    accountID?: string;
    holidayType?: string;
    year?: string;
    type?: string;
    opeartionType?: string;
    changeType?: string;
    holidayYear?: string;
    holidayStartDate?: string;
    holidayEndDate?: string;
    createdStart?: string;
    createdEnd?: string;
    departmentID?: string;
    containChildOrganization?: string;
    pageIndex?: number | string;
    pageSize?: number | string;
}

export interface RulesAddModel {
    /*假期类型*/
    HolidayType?: string;
    /*扣减方式 1：按工作日 2：按日历日*/
    Type?: number;
    /*额度控制 1：控制 2：不控制*/
    Mode?: number;
    /*过期日期*/
    ExpireDate?: string;
    /*额度设置*/
    QuotaSetting?: string;
    /*例外*/
    Exception?: string;
}

export interface RulesTableModel extends RulesAddModel, RulesBase {
    /*假期类型*/
    Ext1?: string;

}

export interface TableKey {
    key?: string;
}

export interface RulesQuotaSettingInfo extends TableKey {
    Conditions?: string;
    Hour?: number;
    Remark?: string;
}

export interface RulesExceptionInfo extends TableKey {
    AccountIDs?: Array<string>;
    Hour?: number;
}

export interface RulesHasSettingsInfo {
    HolidayType?: string;
}


export interface EmployeeHolidayModel {
    UserName?: string;
    Year?: number;
    UserID?: string;
    DepartmentName?: string;
    DepartmentID?: string;
    AccountID?: string;
    HolidayBalanceInfos?: Array<EmployeeHolidayBalanceModel>;
}

export interface EmployeeHolidayDetailModel {
    UserName?: string;
    UserID?: string;
    AccountID?: string;
    OrgName?: string;
    HolidayBalanceList?: Array<EmployeeHolidayDetailBalanceList>;
}

export interface EmployeeHolidayDetailBalanceList {
    TenantID: string;
    AccountID: string;
    HolidayType: string;
    Year: string;
    TotalHour: string;
    SurplusHour: string;
    UsedHour: string;
    FreezeHour: string;
    Created: string;
    CreatedBy: string;
    Modified: string;
    ModifiedBy: string;
    DeadlineDate: string;
    RulesType: string;
    RulesMode: string;
}

export interface postAdjustHolidayData {
    HolidayType: string;
    Year: string;
    AccountID: string;
    IsReviseTotal: boolean;
    ReviseHours: number;
    Remark: string;
}

export class EmployeeHolidaySearchModel {
    constructor(options?: EmployeeHolidaySearchModel) {
        this.year = options ? options.year : '2017';
        this.departmentID = options ? options.departmentID : '0';
        this.accountID = options ? options.accountID : '0';
        this.containChildOrganization = options ? options.containChildOrganization : false;
    }

    year?: string;
    departmentID?: string;
    accountID?: string;
    containChildOrganization?: boolean;
}

export interface postHolidayRules {
    HolidayType?: string;
    Type?: string;
    Mode?: string;
    ExpireDate?: string;
    QuotaSetting?: string;
    Exception?: string;
}

export class EmployeeHolidayModalColSpan {
    static colSpan() {
        return window.innerWidth < 540;
    }
}

/**获取metadata**/
export interface GetMetadataRequest extends AkRequest {
    categoryID: string;
    parentID?: string;
    status?: string;
}

export interface GetMetadataModelRequest extends AkRequest {
    categoryCode: string;
    parentCode: string;
    status?: string;
}

export interface GetMetadataResponse extends AkResponse {
    Data?: MetadataInfo[];
}

export interface EmployeeHolidayImportDataModal {
    data?: any;
    name?: string;
    enquirieId?: string;
    status?: number;
}

export enum EmployeeHolidayImportStatus{
    // 导入
    Imports = 1,
    // 数据处理中
    DataProcessed = 2,
    //导入成功
    ImportSuccess = 3,
    // 导入失败
    ImportFailed = 4
}

export interface OperationLogSearchModal {
    type?: string;
    createdStart?: string;
    createdEnd?: string;
    pageIndex?: string | number;
    pageSize?: string | number;
}

export enum OperationLogStatus {
    // 已完成
    Completed = 2,
    // 进行中
    Processing = 1
}

export enum OperationLogSearchType{
    // 全部
    All = 0,
    //导入使用记录
    ImportUsedRecord = 1,
    //导入额度
    ImportAmount = 2
}
