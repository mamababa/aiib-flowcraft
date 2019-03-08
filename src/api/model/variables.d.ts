/**流程变量 */

/**根据ApplicationID获取流程变量 */
interface GetVariablesByApplicationIDRequest extends AkRequest {
    applicationID : string;
}

/**修改流程变量 */
interface GetVariableEditRequest extends AkRequest {
    ApplicationID : string;
    Variables :string;
    FlowNo:string
}
