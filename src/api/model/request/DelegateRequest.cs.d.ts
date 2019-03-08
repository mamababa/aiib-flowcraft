
	interface DelegateRequest extends AkRequest{
		/** 流程Key */
		Key?: string;
		/** 状态 */
		Status?: boolean;
		/** 开始日期 */
		StartDate?: string;
		/** 结束日期 */
		EndDate?: string;
		/** 代理人 */
		DelegateID?: string;
		/** 说明 */
		Comment?: string;
	}

    interface BatchRequest extends AkRequest{
		/** 流程Key */
		Keys?: string[];
		/** 状态 */
		Status?: boolean;
		/** 开始日期 */
		StartDate?: string;
		/** 结束日期 */
		EndDate?: string;
		/** 代理人 */
		DelegateID?: string;
		/** 说明 */
		Comment?: string;
	}
