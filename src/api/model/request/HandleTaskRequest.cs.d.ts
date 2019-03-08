
	interface HandleTaskRequest extends AkRequest{
		/** Task ID */
		TaskID: string;
		/** 任务结果 */
		Outcome: string;
		/** 任务评论 */
		Comment: string;
		/** 任务描述 */
		Description: string;
		/** 任务变量 */
		Variables: { [index: string]: any };
	}
