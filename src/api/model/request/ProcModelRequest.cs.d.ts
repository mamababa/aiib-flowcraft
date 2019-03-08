
	interface ProcModelRequest extends AkRequest{
		/** ProcModel id */
		ProcModelID?: string;
		/** ProcModel 名字 */
		Name?: string;
		/** ProcModel 类别 */
		CategoryID?: string;
		/** 描述 */
		Description?: string;
		/** Key */
		Key?: string;
		/** 本地化 */
		Localization?: string;
		/** 流程入口url */
		FormUrl?: string;
		/** 流程定义iconurl */
		IconUrl?: string;
        /** 流程定义图片资源 */
        ImgResourceID?: string;
	}
