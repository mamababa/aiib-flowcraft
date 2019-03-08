interface MenuModelRequest extends AkRequest {
				/** PK */
				ID?: string;
				/** 说明 */
				Comment?: string;
				/** Icon */
				IconImg?: string;
				/** url */
				LinkUrl?: string;
				/** 多语言 */
				Localization?: string;
				/** 名称 */
				Name?: string;
				/** 上级 */
				ParentID?: string;
				/** 是否设置权限 */
				IsItemPerm?: boolean;
				/** 权限列表 */
				PermTypeIDs?: any[];
    /** 打开方式的选择：当前窗口、新窗口 */
    Ext1?: string;
    /** 上级 */
    Ext2?: string;
    /** 上级 */
    Ext3?: string;
}
