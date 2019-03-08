
	/** Process Draft Request */
	interface ProcDraftRequest extends AkRequest{
		/** 流程草稿ID */
		ProcDraftID: string;
		/** 流程定义ID */
		ProcDefID: string;
		/** 填写的数据 用json格式 */
		FormData: string;
	}
