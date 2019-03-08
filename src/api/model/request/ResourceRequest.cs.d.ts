
	/** 资源request */
	interface ResourceRequest extends AkRequest{
		/** 资源ID */
		ResourceID: string;
		/** 资源名称 */
		Name?: string;
		/** 资源内容 */
		Resource?: string;
	}
