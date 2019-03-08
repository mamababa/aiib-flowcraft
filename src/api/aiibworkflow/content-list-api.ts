import { AkContext, AppKeys, Request } from 'akmii-yeeoffice-common';
import { EditByTitleWhereRequest, EditByTitleWhereBatchRequest } from './model/content-list-model';
export class AiibContentListAPI {
    /**编辑单条数据*/
    static async editByTitleWhere(data?: EditByTitleWhereRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/crafts/datas/title/editbyidwhere";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<EditByTitleWhereRequest, AkResponse>().put(url, data);
    }

    /**编辑多条数据*/
    static async editByTitleWhereBatch(data?: EditByTitleWhereBatchRequest) {
        let url: string = AkContext.getAppInfoAPI_URL(AppKeys.YeeOfficeSettings) + "api/crafts/datas/title/editbyidwherebatch";
        data.AppID = data.AppID || AkContext.getAppInfoID();
        return new Request<EditByTitleWhereBatchRequest, AkResponse>().put(url, data);
    }
}
