interface ApplicantModel extends BaseModel {
    /** ApplicationID */
    ApplicantID : string;
    /** 申请人名字 */
    ApplicantName : string;
    /** 员工编号 */
    EmployeeNo : string;
    /** 职称 */
    JobTitle : string;
    /** Location ID */
    LocationID : string;
    /** 地点名称 */
    LocationName : string;
    /** 直接领导ID */
    LineManagerID : string;
    /** 直接领导名字 */
    LineManagerName : string;
    /** 组织ID */
    OrgID : string;
    /** 组织名称 */
    OrgName : string;
}

interface ApplicantModelResponse extends AkResponse {
    Data?: ApplicantModel;
}
