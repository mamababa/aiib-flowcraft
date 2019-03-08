/** location related response model */
interface LocationModel extends BaseModel {
    /** 地址 */
    Addresses : string;
    /** 位置 */
    Location : string;
    /** 位置ID */
    LocationID : string;
    /** 该位置的经理 */
    LocationManager : string;
    /** 该位置经理数量 */
    LocationManagerNum : string;
    LocationNum : string;
    /** 电话号码 */
    PhoneNumber : string;
}

/** location related response model */
interface LocationModelResponse extends AkResponse {
    Data?: LocationModel;
}
