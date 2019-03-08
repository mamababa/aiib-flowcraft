import { Request, AkContext, AppKeys } from 'akmii-yeeoffice-common';

interface GetAppRoleRequest {
    LoginToken: string;
}

interface GetAppRoleResponse extends AkResponse {
    ErrorMSG: string;
    TimeStamp: string;
    TipMSG: string;
    OperationState: boolean;
    State: number;
}
export class YeeOfficeAPI {
    static getAppAdmin() {
        let ygUser: YeeUserInfo = AkContext.getUser()|| {};
        let appID = AkContext.getAppInfoID(AppKeys.Flowcraft);
        // let url = window["YeeOfficeBase_APIUrl"] + `/MerchantBase/YunGalaxyAppRole/UserIsContainsRole?AppInfoID=${appID}&UserAccountID=${ygUser.AccountID}`;
        let url =AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + `/appinforole/hasmodule/appinfoid?AppInfoID=${appID}`;

        if (!appID) {
            return new Promise<GetAppRoleResponse>((a, b) => {
                a();
            });
        }
        let request = new Request<GetAppRoleRequest, GetAppRoleResponse>();
        AkContext.getBranch()!= AkContext.YeeOffice ?request.defaultParam.Headers.push({"AkmiiSecret": AkContext.getToken()}):"";
        //return request.post(url, {LoginToken: loginToken});
        return request.get(url);
    }
}
