
interface GetCategoryRequest extends AkRequest {
    name?: string;
    pageIndex?: string;
    pageSize?: string;
}

interface PostCategoryRequest extends AkRequest {
    Name?: string;
    Localization?: string;
}


interface PutCategoryRequest extends AkRequest {
    CategoryID?: string;
    Name?: string;
    Localization?: string;
}

interface DeleteCategoryRequest extends AkRequest {
    categoryID?: number;
}
