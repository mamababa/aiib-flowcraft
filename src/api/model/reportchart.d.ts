interface GetReportChartRequest extends AkRequest {
    pageIndex?: any;
    pageSize?: any;
}
interface GetReportDepartmentChartRequest extends AkRequest {
    Departmentid?: string;
    Year?: number | string;
    Month?: number | string;
    Defkey?: string;
    Type?: string;
}

interface AchievementsSearch extends AkRequest {
    Departmentid?: string;
    Year?: string;
    Month?: string;
    Defkey?: string;
}

interface ChartOptions {
    X?: string;
    Y?: string;
    position?: string;
    filter?: string;
    color?: string;
    showLegend?: boolean;
    status?: string;
    brand?: string;
    alldata?: string;
    dkey?: string;
    children?: string;
    Max?: number;
    Min?: number;
    Other?: any;
}

interface ChartTaskResponse extends AkResponse {
    activityname?: string;
    defname?: string;
    departmentname?: string;
    expectedtaskduration?: string;
    flowno?: string;
    taskduration?: string;
    taskname?: string;
    taskownername?: string;
    avgtaskduration?: string;
    taskcount?: string;
    taskownerdepartmentname?: string;
    applicationid?: string;
}

interface RequestData {
    Defkey?: string;
    Departmentid?: string;
    Year?: number;
    Month?: number;
}
