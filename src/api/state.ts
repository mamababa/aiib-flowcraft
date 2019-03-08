import {Request} from "akmii-yeeoffice-common";
export class StateAPI {

    static async getState(data?: GetStateRequest) {
        let url : string = "/api/state";
        return new Request < GetStateRequest,
        GetStateResponse > ().get(url, data);
    }
}
