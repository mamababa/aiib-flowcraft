import {Request, AkResponse} from "akmii-yeeoffice-common";
import {
    BudgetRequest,
    getBudgetTemplateListRequest,
    BudgetTemplateRequest,
    BudgetTemplateSaveRequest,
    BudgetDetailBalance,
    BudgetDetailAddBalance,
    BudgetSubjectDetails
} from './model/budget';
export class BudgetApi {
    static async getBudgetTemplateList(data: getBudgetTemplateListRequest) {
        const url: string = "/api/budgettemplate/list";
        return await new Request<getBudgetTemplateListRequest,
            AkResponse>().get(url, data);
    }

    static async getBudgetTemplateItem(data: any) {
        const url: string = "/api/budgettemplate/";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async getBudgetTemplateModalData(data: BudgetTemplateRequest) {
        const url: string = "/api/budgettemplate/detail/tid";
        return await new Request<BudgetTemplateRequest,
            AkResponse>().get(url, data);
    }

    //保存
    static async postBudgetTemplateModalData(data: BudgetTemplateSaveRequest) {
        const url: string = "/api/budgettemplate";
        return await new Request<BudgetTemplateSaveRequest,
            AkResponse>().post(url, data);
    }

    //保存并发布
    static async putBudgetTemplateModalData(data: BudgetTemplateSaveRequest) {
        const url: string = "/api/budgettemplate";
        return await new Request<BudgetTemplateSaveRequest,
            AkResponse>().put(url, data);
    }

    static async getBudgetTemplateCode(data: any) {
        const url: string = "/api/budgettemplate/code";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    // 删除
    static async deleteRemoveBudgetTemplate(data: BudgetTemplateRequest) {
        const url: string = "/api/budgettemplate";
        return await new Request<BudgetTemplateRequest,
            AkResponse>().del(url, data);
    }

    // 仅发布
    static async putPublishBudgetTemplate(data: BudgetTemplateRequest) {
        const url: string = "/api/budgettemplate/publish";
        return await new Request<BudgetTemplateRequest,
            AkResponse>().put(url, data);
    }

    // 启用
    static async putPublishedBudgetTemplate(data: BudgetTemplateRequest) {
        const url: string = "/api/budgettemplate/published";
        return await new Request<AkRequest,
            AkResponse>().put(url, data);
    }

    // 停用
    static async putDisabledBudgetTemplate(data: BudgetTemplateRequest) {
        const url: string = "/api/budgettemplate/disabled";
        return await new Request<AkRequest,
            AkResponse>().put(url, data);
    }

    static async addBudget(data: BudgetRequest) {
        const url: string = "/api/budget";
        return await new Request<BudgetRequest,
            AkResponse>().post(url, data);
    }

    static async getBudgetList(data: any) {
        const url: string = "/api/budget";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async publishBudget(data: any) {
        const url: string = "/api/budget/publish";
        return await new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    static async getViewData(data: any) {
        const url: string = "/api/budget/idv3";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async getPlanSubitem(data: any) {
        const url: string = "/api/budget/idv2";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async getBudgetDetail(data: any) {
        const url: string = "/api/budget/id";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async getBudgetBalance(data: BudgetDetailBalance) {
        const url: string = "/api/budgetbalance";
        return await new Request<BudgetDetailBalance,
            AkResponse>().get(url, data);
    }

    // 增加明细
    static async postBudgetAddDetails(data?: BudgetDetailAddBalance) {
        const url: string = "/api/budgetfreeze/manunalreverse";
        return await new Request<BudgetDetailAddBalance,
            AkResponse>().post(url, data);
    }

    static async getBudgetSubjectDetails(data?: BudgetSubjectDetails) {
        const url: string = "/api/budgetbalance/Item";
        return await new Request<BudgetSubjectDetails,
            AkResponse>().get(url, data);
    }

    static async deleteBudget(data: any) {
        const url: string = "/api/budget";
        return await new Request<AkRequest,
            AkResponse>().del(url, data);
    }

    static async submitBudgetByList(data: any) {
        const url: string = "/api/budget/publish";
        return await new Request<AkRequest,
            AkResponse>().put(url, data);
    }

    static async adjustBudget(data: any) {
        const url: string = "/api/budgetadjust";
        return await new Request<AkRequest,
            AkResponse>().post(url, data);
    }

    static async getMetadata(data: any) {
        const url: string = "/api/metadata";
        return await new Request<AkRequest,
            AkResponse>().get(url, data);
    }

    static async endBudget(data: any) {
        const url: string = "/api/budget/end";
        return await new Request<AkRequest,
            AkResponse>().put(url, data);
    }
}
