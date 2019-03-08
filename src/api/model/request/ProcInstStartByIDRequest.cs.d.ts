
	interface ProcInstStartByIDRequest extends AkRequest{
		/** 流程定义ID */
		ProcDefID: string;
		/** 流程草稿ID */
		ProcDraftID: string;
		/** 流程变量 */
		Variables: { [index: string]: any };
		/** 流程ID */
		ApplicationID: string;
		/** 发起人ID */
		applicantID: string;
	}
