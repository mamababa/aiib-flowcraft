
	interface JobPositionRequest extends AkRequest{
		/** PK */
		ID?: string;
		/** 名称 */
		Name?: string;
		/** 扩展1 */
		Ext1?: string;
		/** 扩展2 */
		Ext2?: string;
		/** 扩展3 */
		Ext3?: string;
		/** 用户ID list */
		UserIDs?: string[];
		/** 绑定类型 */
		BindingType?: any;
		/** 绑定类型对应的ID */
		BindingTargetID?: string;
	}
