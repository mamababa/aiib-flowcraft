import { ListWorkflowStart, GetProcessLogRequest, ProjectCancelRequest } from './proposal-request';
import { AkContext, AppKeys, Request, AkResponse, } from 'akmii-yeeoffice-common';
export class AIIBWorkflowAPI {
    static async startWorkFlow(data?: ListWorkflowStart) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.Flowcraft) + "api/listflow/Start/key";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<ListWorkflowStart, AkResponse>().post(url, data);
    }

    static async processLog(data?: GetProcessLogRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.Flowcraft) + "api/listflow/aiibprocesslog";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<GetProcessLogRequest, AkResponse>().get(url, data);
    }

    static projectCancel(data: ProjectCancelRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.Flowcraft) + "api/listflow/cancel";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<ProjectCancelRequest, AkResponse>().put(url, data);
    }
}
export interface TitleSortRequest {
    AppID?: number;
    type?: number;
    title?: string;
}
export interface GetDataByTitleSort extends TitleSortRequest {
    Title?: string;
    Columns?: string[];
    Wheres?: any[];
    Sorts?: TitleSort[];
    FilterValue?: string;
    PageIndex?: number;
    PageSize?: number;
    Verification?: boolean;
}
export interface TitleSort {
    SortName?: string;
    SortByDesc?: boolean;
}
export class ReportCenterTitleSortAPI {
    static async ReportCenterTitle(data?: GetDataByTitleSort) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/crafts/datas/titlesorts";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<GetDataByTitleSort, AkResponse>().post(url, data);
    }
}


