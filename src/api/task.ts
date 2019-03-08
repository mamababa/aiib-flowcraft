import { Request, AkResponse,GetProcessLogResponse } from "akmii-yeeoffice-common";
/** 任务 */
export class TaskAPI {
    /** 获取任务列表(我的) */
    static async getTask(data: GetTaskRequest) {
        let url: string = "/api/tasks";
        return new Request<GetTaskRequest,
            TaskModelListResponse>().get(url, data);
    }

    /** 管理任务 */
    static async getAdminTask(data: GetAdminTaskRequest) {
        let url: string = "/api/admin/tasks";
        return new Request<GetAdminTaskRequest,
            TaskModelListResponse>().get(url, data);
    }

    /** 任务详情 */
    static async getTaskItem(data: GetAdminTaskItemRequest) {
        let url: string = "/api/admin/tasks/detail";
        return new Request<GetAdminTaskItemRequest,
            ProcInstDetailResponse>().get(url, data);
    }

    /** 处理任务 */
    static async putTask(data: HandleTaskRequest) {
        let url: string = "/api/admin/tasks/handle";
        return new Request<HandleTaskRequest,
            AkResponse>().put(url, data)
    }

    /**获取待办任务数量 */
    static async getWaittingTaskCount(data: GetWaittingTaskCountRequest) {
        let url: string = "/api/tasks/pending/count";
        return new Request<GetWaittingTaskCountRequest,
            AkResponse>().get(url, data);
    }

    /**获取待认领任务的数量 */
    static async getReceiveTaskCount(data: GetReceiveTaskCountRequest) {
        let url: string = "/api/tasks/candidate/count";
        return await new Request<GetReceiveTaskCountRequest,
            AkResponse>().get(url, data);
    }

    /**
     * 获取对应的任务数量
     * @param data
     */
    static async getTaskCount(data: GetTaskCountRequest) {
        let url = "/api/tasks/counts";
        return await new Request<GetTaskCountRequest,
            GetTaskCountResponse>().get(url, data);
    }

    /**获取任务审批详情 */
    static async getTaskDetail(data: GetApproveInfoRequest) {
        let url: string = "/api/tasks/detail";
        return new Request<GetApproveInfoRequest,
            TaskDetailResponse>().get(url, data);
    }
    /**获取任务审批详情 */
    static async getTaskDetailV2(data: GetApproveInfoRequest) {
        let url: string = "/api/tasks/detail/v2";
        return new Request<GetApproveInfoRequest,
            TaskDetailV2Response>().get(url, data);
    }
    /**获取任务日志 */
    static async getProcessLog(data: GetApproveInfoRequest) {
        let url: string = "/api/tasks/processlog";
        return new Request<GetApproveInfoRequest,
            GetProcessLogResponse>().get(url, data);
    }


    /**审批结果 */
    static async putTaskHandle(data: HandleTaskRequest) {
        let url: string = "/api/tasks/handle";
        return new Request<HandleTaskRequest,
            AkResponse>().put(url, data);
    }

    /****管理员操作 督办及转办********** */

    /**任务督办 */
    static async adminPutWarnTask(data: TaskWarnRequest) {
        let url: string = "/api/admin/tasks/warn";
        return new Request<TaskWarnRequest,
            AkResponse>().put(url, data);
    }

    /**单个任务转签 */
    static async adminPutChangeTaskAssignee(data: TaskChangeRequest) {
        let url: string = "/api/admin/tasks/change";
        return new Request<TaskChangeRequest,
            AkResponse>().put(url, data);
    }

    /**批量任务转签 */
    static async adminPutChangeTaskAssigneeList(data: TaskChangeBatchRequest) {
        let url: string = "/api/admin/tasks/change/batch";
        return new Request<TaskChangeBatchRequest,
            AkResponse>().put(url, data);
    }

    /**批量任务督办 */
    static async adminPutWarnTaskList(data: TaskWarnBatchRequest) {
        let url: string = "/api/admin/tasks/warn/batch";
        return new Request<TaskWarnBatchRequest,
            AkResponse>().put(url, data);
    }

    /******管理员操作 督办及转办 Over */

    /**获取领用任务列表 */
    static async getReceiveTaskList(data: GetReceiveTaskRequest) {
        let url: string = "/api/tasks/candidate";
        return new Request<GetReceiveTaskRequest,
            TaskModelListResponse>().get(url, data);
    }

    /**验证流程标识唯一性 */
    static async validateKey(data: ValidateKeyRequest) {
        let url: string = "/api/admin/procmodels/key/validate";
        return new Request<ValidateKeyRequest,
            AkResponse>().get(url, data);
    }

    /**签收任务 */
    static async claimTask(data: TaskClaimRequest) {
        let url: string = "/api/tasks/claim";
        return new Request<TaskClaimRequest,
            AkResponse>().put(url, data);
    }

    /**任务跳转 */
    static async transferTask(request: TransferTaskRequest) {
        let url: string = "/api/tasks/defid";
        return new Request<TransferTaskRequest, AkResponse>().get(url, request);
    }

    /**普通用户转办任务 */
    static async changeTask(data: TaskChangeRequest) {
        let url: string = "api/tasks/change";
        return new Request<TaskChangeRequest, AkResponse>().put(url, data);
    }
}
export const TaskOutcomeLocale = "model.task.outcome.";

export enum TaskOutcomeEnum {
    /**完成 */
    Completed = 0,
    /**同意 */
    Approved = 1,
    /**拒绝 */
    Rejected = 2,
    /**撤销 */
    Revoked = 3,
    /**取消 */
    Cancelled = 4,
    /**中止 */
    Terminated = 5
}

export const disableAssigned = "-1";
