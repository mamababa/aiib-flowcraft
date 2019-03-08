interface ProcDefModel extends BaseModel {
    /** ProcDefID Pk */
    ID?: string;
    /** CategoryID */
    CategoryID?: string;
    /** 类别名称 */
    CategoryName?: string;
    /** Name */
    Name?: string;
    /** Localization */
    Localization?: string;
    /** 流程key，对应于程序访问 */
    Key?: string;
    /** Version */
    Version?: number;
    /** Description */
    Description?: string;
    /** 流程定义内容JSON/XML的ResourceID */
    DefResourceID?: string;
    /** 流程定义内容 */
    DefBlob?: string;
    /** ImgResourceID */
    ImgResourceID?: string;
    /** 图片内容 */
    ImgBlob?: string;
    /** IconURL */
    IconURL?: string;
    /** 状态, 0:未激活 1:正常 */
    Status?: number;
    /** 是否设置权限，0:未设置 */
    IsItemPerm?: boolean;
    /** DeployTime */
    DeployTime?: Date;
    /** DeployTime */
    DeployTimeStr?: string;
    /** DeployedDefID */
    DeployedDefID?: string;
    /** 流程发起对应表单URL地址 */
    FormURL?: string;
}

interface ProcDefModelResponse extends AkResponse {
    Data?: ProcDefModel;
}
interface FormDefModelResponse extends AkResponse {
    Data?: string;
}

interface ProcDefModelListResponse extends AkResponse {
    Data?: ProcDefModel[];
}
