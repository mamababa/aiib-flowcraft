
interface MetadataCategoryRequest extends AkRequest {
    /** 类别 */
    CategoryID?: string;
    /** 编号 */
    Code?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 多语言 */
    Localization?: string;
    /** 扩展 */
    Ext?: string;
    /** 状态 */
    Status?: boolean | number;
}
