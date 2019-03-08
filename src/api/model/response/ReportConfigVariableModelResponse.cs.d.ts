	interface ReportConfigVariableModel {
		/** ProcDefKey */
		ProcDefKey: string;
		/** 变量字段 以及展示名字 */
		VarDisplay: string;
		Type: any;
		/** EXT1 */
		Ext1: string;
		/** EXT2 */
		Ext2: string;
		/** EXT3 */
		Ext3: string;
	}
	
	interface ReportConfigVariableModelResponse extends AkResponse {
		Data?:ReportConfigVariableModel
	}