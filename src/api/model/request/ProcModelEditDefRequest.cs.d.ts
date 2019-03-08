/** 流程模型的编辑 */
interface ProcModelEditDefRequest extends AkRequest {
    /** 流程模型ID */
    ProcModelID: string;
    /** 流程名称 */
    Name: string;
    /** 图片资源ID */
    ImgResourceID: string;
    /** 图片相关内容 */
    ImgBlob: string;
    /** 流程定义资源ID */
    DefResourceID: string;
    /** 定义相关内容 */
    DefBlob: string;
}

/**验证流程标识唯一性*/
interface ValidateKeyRequest extends AkRequest {
    /**流程标识 */
    key?: string;
}

/**验证文件内容*/
interface ValidateFileRequest extends AkRequest {
    /**流程标识 */
    Resource: string;
}
