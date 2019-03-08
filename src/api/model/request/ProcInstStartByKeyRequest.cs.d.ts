
	interface ProcInstStartByKeyRequest extends AkRequest{
		/** 流程key */
		Key: string;
		/** 流程变量 */
		Variables: { [index: string]: any };
		/** 流程ID */
		ApplicationID: string;
		/** 发起人ID */
		applicantID: string;
	}
