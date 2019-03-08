import { Request, AkResponse, AkContext, AppKeys } from 'akmii-yeeoffice-common';
import { AddProposalRequest, EditProposalRequest, EditBatchProposalRequest, CheckUserRequest, EditProposalStatusRequest, GoToTBDRequest, PrintScreenSummaryRequest } from './proposal-request';

export class ProposalAPI {
    static async addProposal(data?: AddProposalRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/addproposal";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<AddProposalRequest, AkResponse>().post(url, data);
    }

    static async editProposal(data?: EditProposalRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/editproposal";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<EditProposalRequest, AkResponse>().put(url, data);
    }

    static async editBatchProposal(data?: EditBatchProposalRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/editbatchproposal";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<EditBatchProposalRequest, AkResponse>().put(url, data);
    }

    static async saveMembers(data?: EditProposalRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/aiib/saveuser";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<EditProposalRequest, AkResponse>().put(url, data);
    }

    static async checkUserGroup(data?: CheckUserRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/usergroups/checkuser";
        data.userID = data.userID || AkContext.getUser().AccountID;
        return new Request<CheckUserRequest, AkResponse>().get(url, data);
    }

    static async editProposalStatus(data?: EditProposalStatusRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/aiib/editproposalstatus";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<EditProposalStatusRequest, AkResponse>().put(url, data);
    }


    static async GoToTBD(data?: GoToTBDRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/aiib/tbd";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<GoToTBDRequest, AkResponse>().put(url, data);
    }
    /**Proposal中的screening summary sheet 输出PDF*/
    static async PrintScreeningSummary(data?: PrintScreenSummaryRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "/api/aiib/print/ScreeningSummary";
        data.appID = data.appID || AkContext.getAppInfoID();
        return new Request<PrintScreenSummaryRequest, AkResponse>().get(url, data);
    }

}
