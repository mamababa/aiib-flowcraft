import { AkContext, AppKeys, Request, AkResponse } from 'akmii-yeeoffice-common';
import { ProjectExportRequest } from './model/report';
export class AiibReportAPI {
    static ProjectExport(): string {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/report/projectexport";
        return url;
    }

    static ProjectExportCreate(data: ProjectExportRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/report/projectexportcreate";
        return new Request<ProjectExportRequest, AkResponse>().put(url, data);
    }

    static DataBaseExportCreate(data: ProjectExportRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/report/databaseexportcreate";
        return new Request<ProjectExportRequest, AkResponse>().put(url, data);
    }
}
