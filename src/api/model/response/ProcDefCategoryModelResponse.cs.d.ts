/** process definition category related response model */
interface ProcDefCategoryModel extends BaseModel {
    /** CategoryID  Pk */
    CategoryID ?: string;
    /** Name */
    Name ?: string;
    /** Localization */
    Localization ?: string;
}

/** process definition category related response model */
interface ProcDefCategoryModelResponse extends AkResponse {
    Data?: ProcDefCategoryModel;
}

/** process definition category related response model */
interface ProcDefCategoryModelListResponse extends AkResponse {
    Data?: ProcDefCategoryModel[];
}
