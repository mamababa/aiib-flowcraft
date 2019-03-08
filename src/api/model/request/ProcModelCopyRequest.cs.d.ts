
	/** 流程模型的拷贝 */
	interface ProcModelCopyRequest extends AkRequest{
		/** 流程模型ID */
		ProcModelID?: string;
		/** 流程名称 */
		Name?: string;
		/** 流程Key */
		Key?: string;
        /** 权限列表 {1:[12,3,4],2:[3,4,5],3:[4,56,8]} */
        PermTypeIDs?: {
            [index: string]: any
        };
    }
