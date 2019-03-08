/** 因所有的httpput请求都是放在request body里面，需用建一个model去接收信息 */
interface ProcModelCategoryIDRequest {
    /** 流程Model ID */
    ProcModelID : string;
    /** 类别 */
    CategoryID : string;
}
