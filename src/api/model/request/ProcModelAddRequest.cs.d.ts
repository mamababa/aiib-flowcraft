interface ProcModelAddRequest extends BaseModel {
    /** ProcModel id */
    ProcModelID?: string;
    /** ProcModel 名字 */
    Name ?: string;
    /** ProcModel 类别 */
    CategoryID ?: string;
    /** 描述 */
    Description ?: string;
    /** Key */
    Key ?: string;
    /** 本地化 */
    Localization ?: string;
    /** 流程入口url */
    FormUrl ?: string;
    /** 流程定义iconurl */
    IconUrl ?: string;
    /** 是否设置权限 */
    IsItemPerm ?: boolean;
    /** 权限列表 {1:[12,3,4],2:[3,4,5],3:[4,56,8]} */
    PermTypeIDs ?: {
        [index: string]: any
    };
    /**导入模板新建流程时需要的流程资源*/
    Resource?: string;
    /**选择模板新建流程是需要的模板ID*/
    TemplateID?: string;
    /** 流程图Icon*/
    Img?: string;
    /** ImgResource*/
    ImgResource?: string;
}




