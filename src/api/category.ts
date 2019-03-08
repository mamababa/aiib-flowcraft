import {Request, AkResponse} from "akmii-yeeoffice-common";
export class CategoryAPI {

    static async getAdminCategory(data?: GetCategoryRequest) {
        let url : string = "/api/admin/categories";
        return new Request < GetCategoryRequest,
        ProcDefCategoryModelListResponse  > ().get(url, data);
    }
    static async getCategory(data?: GetCategoryRequest) {
        let url : string = "/api/categories";
        return new Request < GetCategoryRequest,
        ProcDefCategoryModelListResponse > ().get(url, data);
    }
    static async putCategory(data : CategoryRequest) {
        let url : string = "/api/admin/categories";
        return new Request < CategoryRequest,
        AkResponse > ().put(url, data);
    }
    static async postCategory(data : CategoryRequest   ) {
        let url : string = "/api/admin/categories";
        return new Request < CategoryRequest   ,
        AkResponse > ().post(url, data);
    }
    static async delCategory(data : DeleteCategoryRequest) {
        let url : string = "/api/admin/categories";
        return new Request < DeleteCategoryRequest,
        AkResponse > ().del(url, data);
    }
}
