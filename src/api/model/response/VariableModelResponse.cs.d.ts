interface VariableModel extends BaseModel {
    /** ApplicationID Pk */
    ApplicationID : string;
    /** ExecutionID */
    ExecutionID : string;
    /** 变量名称 Pk */
    Name : string;
    /** 变量类型 */
    Type : string;
    /** 变量值 */
    Value : string;
    /** ResourceID */
    ResourceID : string;
}

interface VariableModelResponse extends AkResponse {
    Data?: VariableModel;
}
