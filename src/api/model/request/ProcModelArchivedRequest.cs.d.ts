interface ProcModelArchivedRequest {
    /** 流程定义资源ID */
    DefResourceID?: string,
    /** 图片资源ID */
    ImgResourceID?: string,
    /** 流程名称 */
    Name?: string,
    /** 类别ID */
    CategoryID?: string,
    /** 任务描述 */
    Description?: string,
    /** 流程标识 */
    Key?: string,
    /** 多语言 */
    Localization?: string,
    /** 流程入口url */
    FormUrl?: string,
    /** 流程定义iconurl */
    IconUrl?: string,
    /** 是否设置权限 */
    IsItemPerm?: boolean,
    /** 权限列表 */
    PermTypeIDs?: any[]
}
