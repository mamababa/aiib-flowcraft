import {Request, AkResponse} from "akmii-yeeoffice-common";
export class ReportChartAPI {
    /**dashboard*/
    static async getdashboard() {
        let url: string = "/api/admin/reportschart/dashboard";
        return new Request<AkRequest,
            AkResponse>().get(url);
    }

    static async getduration() {
        let url: string = "/api/admin/reportschart/dashboard/duration";
        return new Request<AkRequest,
            AkResponse>().get(url);
    }

    static async getovertimelist() {
        let url: string = "/api/admin/reportschart/dashboard/overtimelist";
        return new Request<AkRequest,
            AkResponse>().get(url);
    }

    static async geterrorlist(data) {
        let url: string = "/api/admin/reportschart/dashboard/errorlist";
        return new Request<GetReportChartRequest,
            AkResponse>().get(url, data);
    }
    /**department */
    static async getsubmittedprocess(data) {
        let url: string = "/api/admin/reportschart/performance/submittedprocess";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url, data);
    }

    static async getovertimeprocess(data) {
        let url: string = "/api/admin/reportschart/performance/overtimeprocess";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url, data);
    }
    /**发起部门 */
    static async getavgdurationprocess(data) {
        //model=>{year,month,day,count}
        let url: string = "/api/admin/reportschart/performance/avgdurationprocess";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url, data);
    }
    /**经办部门 */
    static async getavgdurprocess(data) {
        //model=>{year,month,day,count}
        let url: string = "/api/admin/reportschart/performance/avgdurprocess";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url, data);
    }

    static async getdurationprocess(data) {
        let url: string = "/api/admin/reportschart/performance/durationprocess";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url, data);
    }

    static async getcountprocess(data) {
        let url: string = "/api/admin/reportschart/performance/countprocess";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url, data);
    }

    static async getprocess(data) {
        let url: string = "/api/admin/reportschart/performance/process";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url,data);
    }

    static async getdepartmentcount(data) {
        let url: string = "/api/admin/reportschart/performance/departmentcount";
        return new Request<GetReportDepartmentChartRequest,
            AkResponse>().get(url,data);
    }

    /**achievements */
    static async getAchievementsPerformanceSubmit(data: any) {
        let url: string = "/api/admin/reportschart/performance/submit";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceTask(data: any) {
        let url: string = "/api/admin/reportschart/performance/task";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceDepartment(data: any) {
        let url: string = "/api/admin/reportschart/performance/department";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceSubmitted(data: any) {
        let url: string = "/api/admin/reportschart/performance/submittedtime";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceDuration(data: any) {
        let url: string = "/api/admin/reportschart/performance/duration";
        return new Request<any,
            AkResponse>().get(url, data);
    }
    static async getAchievementsPerformanceOwnerDuration(data: any) {
        let url: string = "/api/admin/reportschart/performance/ownerduration";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceOvertime(data: any) {
        let url: string = "/api/admin/reportschart/performance/overtime";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceOwnerOvertime(data: any) {
        let url: string = "/api/admin/reportschart/performance/ownerovertime";
        return new Request<any,
            AkResponse>().get(url, data);
    }

    static async getAchievementsPerformanceTaskoverTime(data: any) {
        let url: string = "/api/admin/reportschart/performance/taskovertime";
        return new Request<any,
            ChartTaskResponse>().get(url, data);
    }

    static async getAchievementsPerformanceTaskcount(data: any) {
        let url: string = "/api/admin/reportschart/performance/taskcount";
        return new Request<any,
            ChartTaskResponse>().get(url, data);
    }
}
