//注意：只有reject的才可以重新发起
const enum ApplyType {
    Any=-1,
    Start=0,
    /**运行中 */
    Running = 1,
    /**已结束 */
    Complete = 2,
    /**拒绝 */
    Reject = 3,
    /**出错*/
    Error=4,
     /**撤回流程*/
    Revoke=5,
     /**取消流程*/
    Cancel=6
}

interface GetApplyRequest extends AkRequest {
    /**流程定义Key */
    defKey?: string;
    categoryID?: string;
    flowNo?: string;
    flowName?: string;
    status?: string;
    applicantID?: string;
    pageIndex?: number;
    pageSize?: number;
}

interface GetAdminApplyRequest extends AkRequest {
    status?: ApplyType;
    assginee?: string;
    createdBy?: string;
    ApplyID?: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number;
    pageSize?: number;
}

 /** 任务详情 */
interface GetAdminApplyItemRequest extends AkRequest {
    /** 任务ID */
    ApplyID : string;
}


/** 日常报销申请*/
interface DailyReimburseApply {
    /**申请人ID */
    applyID?: string;
    /**项目名称 */
    projectName?: string;
    /**总金额 */
    totalAmount?: string;
    /**附件 */
    enclosure?: string;
    /**报销明细 */
    reimburse?: DailyReimburseItem;
}

interface DailyReimburseItem {
    /**日期 */
    day?: string;
    /**报销类型 */
    reimburseType?: string;
    /**金额（RMB） */
    amount?: string;
    /**单据张数 */
    billCount?: string;
    /**摘要 */
    abstract?: string;
}


/**申请取消 */
interface CancleApplicationRequest extends AkRequest {
    ApplicationID?: string;
}

/**申请撤回 */
interface RevokeApplicationRequest extends AkRequest {
    ApplicationID?: string;
}

/**获取申请人信息 */
interface ApplicantApplicationRequest extends AkRequest {
    userID?: string;
}


