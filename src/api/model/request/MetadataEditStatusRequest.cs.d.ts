
	interface MetadataEditStatusRequest extends AkRequest{
		/** 类别 */
		CategoryID?: string;
		/** PK */
		ID?: string;
		/** 状态 */
		Status?: boolean;
	}
