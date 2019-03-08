interface ResourceModel extends BaseModel {
    /** 资源ID  key */
    ResourceID ?: string;
    /** Name */
    Name ?: string;
    /** 资源的流数据 */
    Resource ?: string;
}

interface ResourceModelResponse extends AkResponse {
    Data?: ResourceModel;
}
