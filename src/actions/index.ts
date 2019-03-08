import { createAction } from "redux-actions";
import { ISAIIB_ADMINISTRATOR, REQUESRAIIB_ROLE } from './ActionTypes';
import {
    REQUEST_CATEGORY, CATEGORY_LOADED, REQUEST_ADMIN_CATEGORY, ADMIN_CATEGORY_LOADED,
    REQUEST_TASKCOUNT, TASK_COUNTLOADED, REQUEST_MOUDLEDATE, MOUDLEDATE_LOADED, GETPROJECT_LISTDATA, REQUESTROJECT_LISTDATA
} from "./ActionTypes";

export class TaskAction {
    static requestTaskCount = createAction(REQUEST_TASKCOUNT);
    static taskCountLoaded = createAction(TASK_COUNTLOADED, (todoCount: number, claimCount: number) => {
        return { todoCount: todoCount, claimCount: claimCount };
    });
}

export class AIIBAction {
    static requestListData = createAction(REQUESTROJECT_LISTDATA, (listDataID: string) => listDataID);
    static getListDataLoad = createAction(GETPROJECT_LISTDATA, (data) => data);
    static requestSettingRole = createAction(REQUESRAIIB_ROLE);
    static getIsAdmin = createAction(ISAIIB_ADMINISTRATOR, (isAIIBAdmin) => isAIIBAdmin);
}

export class CategoryAction {
    static requestCategory = createAction(REQUEST_CATEGORY);
    static categoryLoad = createAction(CATEGORY_LOADED, (categories: ProcDefCategoryModel[]) => {
        return categories;
    });

    /** Admin Category*/
    static requestAdminCategory = createAction(REQUEST_ADMIN_CATEGORY);

    static AdminCategoryLoad = createAction(ADMIN_CATEGORY_LOADED, (categories: ProcDefCategoryModel[], totalCount: number) => {
        return { categories: categories, totalCount: totalCount };
    });
}

//推送项目信息、管理员等信息
export class ReportChartAction {
    static requestMoudleDate = createAction(REQUEST_MOUDLEDATE);
    static MoudleDateLoad = createAction(MOUDLEDATE_LOADED, (moudleYear: number, moudleMonth: number, moudleDay: number) => {
        return {
            moudleYear: moudleYear,
            moudleMonth: moudleMonth,
            moudleDay: moudleDay
        };
    });
}
