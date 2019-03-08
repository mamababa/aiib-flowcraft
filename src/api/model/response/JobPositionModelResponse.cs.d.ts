interface JobPositionModel extends BaseModel {
    /** 岗位ID */
    JobPositionID : string;
    /** 岗位名称 */
    JobPositionName : string;
    /** 岗位对应的人员列表 */
    Users : IdentityModel[];
    IsSystem :boolean;
}

interface JobPositionModelResponse extends AkResponse {
    Data?: JobPositionModel;
}


interface JobPositionModelListResponse extends AkResponse {
    Data?: JobPositionModel[];
}
