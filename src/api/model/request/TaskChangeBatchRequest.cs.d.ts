
	interface TaskChangeBatchRequest extends AkRequest{
		/** 任务列表 */
		TaskIDs: string[];
		/** 受托人 */
		AssigneeID: string;
	}
