interface ReportConfigModel extends BaseModel {
    /** ReportID */
    ReportID: string;
    /** ProcDefKey */
    ProcDefKey: string;
    /** IconUrl */
    IconUrl: string;
    /** LinkUrl */
    LinkUrl: string;
    /** Name */
    Name: string;
    /** Description */
    Description: string;
    /** Localization */
    Localization: string;
    /** DefName */
    DefName: string;
    /** Status */
    Status: number;
    /** IsItemPerm */
    IsItemPerm: boolean;
    /** EXT1 */
    Ext1: string;
    /** EXT2 */
    Ext2: string;
    /** EXT3 */
    Ext3: string;
    /**选中*/
    Checked?: boolean;
}

interface ReportConfigModelResponse extends AkResponse {
    Data?: ReportConfigModel;
}

interface ReportConfigModelListResponse extends AkResponse {
    Data?: ReportConfigModel[];
}
