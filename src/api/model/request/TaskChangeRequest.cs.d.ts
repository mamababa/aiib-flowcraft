
	interface TaskChangeRequest extends AkRequest{
		/** 任务 */
		TaskID: string;
		/** 受托人 */
		AssigneeID: string;
	}
