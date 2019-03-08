/** Identity related response model */
interface IdentityModel extends BaseModel {
    /** 其余相关的属性 */
    Attr : {
        [index : string]: any
    };
    /** ID */
    ID : string;
    /** Name */
    Name : string;
    /** Type */
    Type : any;
}

/** Identity related response model */
interface IdentityModelResponse extends AkResponse {
    Data?: IdentityModel;
}


interface IdentityModelListResponse extends AkResponse {
    Data?: IdentityModel[];
}
