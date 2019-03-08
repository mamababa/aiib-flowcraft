
interface MetadataRequest extends AkRequest {
    /** 类比 */
    CategoryID?: string;
    /** 编号 */
    Code?: string;
    /** 描述 */
    Description?: string;
    /** 扩展 */
    Ext?: string;
    /** PK */
    ID?: string;
    /** level */
    Level?: number | string;
    /** 多语言 */
    Localization?: string;
    /** mapping */
    Mapping?: string;
    /** 名称 */
    Name?: string;
    /** 顺序 */
    Order?: string;
    /** 上级 */
    ParentID?: string;
    /** 状态 */
    Status?: boolean | number;
}
