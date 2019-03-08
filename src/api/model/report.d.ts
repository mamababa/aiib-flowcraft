/**
 * 报表列表查询
 *
 * @interface GetReportRequest
 * @extends {AkRequest}
 */
interface GetReportRequest extends AkRequest {
    defKey: string;
    applicantID?: number;
    orgID?: number;
    startTimeStr?: string;
    endTimeStr?: string;
    year?: number;
    pageIndex?: number;
    pageSize?: number;
}

/**
 * 报表详情查询
 *
 * @interface GetReportDetailRequest
 * @extends {AkRequest}
 */
interface GetReportDetailRequest extends AkRequest {
    defKey: string;
    applicationID: number;
    listName?: string;
    pageIndex?: number;
    pageSize?: number;
}

/**
 * 导出报表数据
 *
 * @interface exportReportRequest
 * @extends {AkRequest}
 */
interface ExportReportRequest extends AkRequest {
    defKey: string;
    fileName: string;
    applicantID?: number;
    orgID?: number;
    startTimeStr?: string;
    endTimeStr?: string;
    year?: number;
}

/**
 * 获取报表列头信息
 *
 * @interface getTitleRequest
 * @extends {AkRequest}
 */
interface GetTitleRequest extends AkRequest {
    reportID?: string;
    defKey?: string;
}

interface GetReportsRequest extends AkRequest { }

interface GetReportsByKeyRequest extends AkRequest {
    procDefKey: string;
}

interface GetReportsVariableByKeyRequest extends AkRequest {
    reportID?: string;
    defKey?: string;
    type?: number;
}

/***普通用户 */
interface GetAllReportsRequest extends AkRequest { }

/** Get Reports*/
interface GetUserReportRequest extends AkRequest {
    reportID: string;
    /**明细名称*/
    listName?: string;
    /**流程标识*/
    defKey: string;
    /**申请人*/
    applicantID?: string;
    /**部门ID*/
    orgID?: string;
    /**创建时间*/
    startTimeStr?: string;
    /**结束时间*/
    endTimeStr?: string;
    /**年份*/
    year?: string;
    pageIndex?: number;
    pageSize?: number;
    filter?: string;
}

/** Get Report detail*/
interface GetUserReportsDetailRequest extends AkRequest {
    defKey: string;
    applicationID: string;
    listName: string;
    pageIndex?: number;
    pageSize?: number;
}

/** Get Report title*/
interface GetUserReportsTitleRequest extends AkRequest {
    defKey: string;
}

interface GetUserExportfileRequest extends AkRequest {

}

interface AdminReportModel {
    ID?: string;
    Checked?: boolean;
    Type?: string;
    Value?: string;
    Name?: string;
    Name_EN?: string;
    DisplayName?: string;
}
