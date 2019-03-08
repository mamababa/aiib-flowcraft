
	/** 因所有的httpput请求都是放在request body里面，需用建一个model去接收信息 */
	interface ProcModelIconRequest extends AkRequest{
		/** 流程model ID */
		ProcModelID: string;
		/** Icon */
		IconUrl: string;
	}
