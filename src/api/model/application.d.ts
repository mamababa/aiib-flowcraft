interface GetApplicationByIDRequest extends AkRequest {
    applicationID?: string;
}

interface GetApplicationByIDResponse extends AkResponse {
    Data?: any;
}

interface GetProcessByAppRequest extends AkRequest {
    applicationID?: string;
}

interface GetProcessByAppResponse extends AkResponse {
    Data?: any;
}

interface GetNodeTasksByAppRequest extends AkRequest {
    applicationID?: string;
    activityDefID?: string;
}

interface GetNodeTasksByAppResponse extends AkResponse {
    Data?: any;
}

/**根据申请单编号可以打开对应申请单 */

interface GetApplicationByFlowNoRequest extends AkRequest {
    flowNo?: string;
}
interface GetApplicationByFlowNoResponse extends AkResponse {
    Data?: ApplicationModel;
}
