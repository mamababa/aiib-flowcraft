﻿interface ProcessLog extends BaseModel {
    /** 定义资源ID */
    DefResourceID?: string;
    /** 图片资源ID */
    ImgResourceID?: string;
    /** 实例 */
    ProcInstModel?: ProcInstModal;
    /** 任务列表 */
    TaskList : TaskModel[];
}

interface ProcInstModal extends BaseModel {
    /** ProcInstID */
    ProcInstID?: string;
    /** Name */
    Name?: string;
    /** 父级流程实例ID */
    ParentInstID?: string;
    /** ProcDefID */
    ProcDefID?: string;
    /** 流程定义版本信息 */
    Version?: number;
    /** 流程定义类别 */
    CategoryID?: string;
    /** 流程定义类别名称 */
    CategoryName?: string;
    /** StartTime */
    StartTime?: Date;
    /** StartTime */
    StartTimeStr?: string;
    /** EndTime */
    EndTime?: Date;
    /** EndTime */
    EndTimeStr?: string;
    /** 流程运行毫秒数 */
    DURATION?: string;
    /** StartUserID */
    StartUserID?: string;
    /** StartActID */
    StartActID?: string;
    /** EndActID */
    EndActID?: string;
    /** 0:未启动，1:运行中，2:结束，3:已删除 */
    Status?: number;
    /** Comment */
    Comment?: string;
}

interface ProcessLogResponse extends AkResponse {
    Data?: ProcessLog;
}
