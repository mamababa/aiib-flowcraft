import { AkContext, AppKeys, Request, AkResponse } from 'akmii-yeeoffice-common';
import { AddProposalRequest } from './proposal-request';
export class ProjectAPI {
    static addSubProject(data: AddProposalRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/addsubproject";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<AddProposalRequest, AkResponse>().post(url, data);
    }

    static nextStage(data: NextStageRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/nextstage";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<NextStageRequest, AkResponse>().put(url, data);
    }

    static getUserGroups(data: GetUserGroupRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "usergroups/user";
        data.userID = data.userID || AkContext.getUser().AccountID;
        return new Request<GetUserGroupRequest, AkResponse>().get(url, data);
    }
    static getUserGroupsByCode(data: GetUserByCode) {
        data.groupCode = encodeURIComponent(data.groupCode);
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "usergroups/code/relationusers?groupCode=" + data.groupCode + "&pageIndex=" + data.pageIndex + "&pageSize=" + data.pageSize;

        return new Request<GetUserByCode, AkResponse>().get(url, null);
    }

    static sendEmail(data: SendEmailRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/sendemail";
        return new Request<SendEmailRequest, AkResponse>().put(url, data);
    }

    static projectByMember(data: ProjectByMemberRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/projectsbymember";
        return new Request<ProjectByMemberRequest, AkResponse>().put(url, data);
    }

    static ProposalImport(data: ProjectImportRequest, file: FormData) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/history/proposalimport?ClientHour=" + data.ClientHour + "&ClientType=" + data.ClientType;
        return new Request<any, AkResponse>().send(url, file);
    }

    static ProjectImport(data: ProjectImportRequest, file: FormData) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/history/projectimport?ClientHour=" + data.ClientHour + "&ClientType=" + data.ClientType;
        return new Request<ProjectImportRequest, AkResponse>().send(url, file);
    }

    static ProjectDocumentImport(data: ProjectDocumentImportRequest, file: FormData) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/history/upload/documents?Type=" + data.Type;
        return new Request<ProjectDocumentImportRequest, AkResponse>().send(url, file);
    }

    static ProjectDataBaseImport(file: FormData) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/report/databaseimport";
        return new Request<ProjectDocumentImportRequest, AkResponse>().send(url, file);
    }
}
