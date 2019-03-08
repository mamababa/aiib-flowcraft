
	interface BaseModel extends AkBase{
		/** 租户ID Index */
		TenantID?: string;
		/** 创建时间 */
		Created?: Date;
		/** 创建时间对应的字符串形式 */
		CreatedStr?: string;
        /** 创建人名称 */
        CreatedByName?:string;
		/** 创建人 */
		CreatedBy?: string;
		/** 修改时间 */
		Modified?: Date;
		/** 修改时间对应的字符串形式 */
		ModifiedStr?: string;
        /** 修改人名称 */
        ModifiedByName?:string;
		/** 修改人 */
		ModifiedBy?: string;
	}
