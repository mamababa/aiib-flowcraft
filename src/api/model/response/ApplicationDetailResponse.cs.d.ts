interface ApplicationDetail extends BaseModel {
    /** 流程Model */
    AppModel : AppModel;
    /** 流程日志 */
    ProcessLogList : ProcessLog[];
}

interface AppModel extends BaseModel {
    /** ApplicationID */
    ApplicationID : string;
    /** 当前运行实例 */
    CurrentProcInstID : string;
    /** 历史实例12121212,3434343 */
    HistoryProcInstIDs : string;
    /** 实际申请人 */
    ApplicantID : string;
    /** 状态。0:发起，1:运行中，2已结束,3:Reject注意：只有reject的才可以重新发起 */
    Status : number;
    /** 流程编号 */
    FlowNo : string;
    /** 流程定义key */
    DefKey : string;
    /** 流程名称 */
    FlowName : string;
    /** 类别ID */
    CategoryID : string;
    /** 类别名称 */
    CategoryName : string;
    /** 创建人名字 */
    CreatedByName : string;
    /** 流程版本 */
    Version : number;
    /** 备注 */
    Comment : string;
    /**列表ID*/
    ListID : string;
    /**列表数据ID*/
    ListDataID : string;
    /**列表流程启动ID*/
    ListItemID: string;
}

interface ApplicationDetailResponse extends AkResponse {
    Data?: ApplicationDetail;
}
