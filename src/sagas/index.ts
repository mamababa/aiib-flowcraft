import { take, put, call, fork, cancel } from "redux-saga/effects";
import { REQUEST_CATEGORY, REQUEST_ADMIN_CATEGORY, REQUEST_TASKCOUNT, REQUESTROJECT_LISTDATA, REQUESRAIIB_ROLE } from '../actions/ActionTypes';
import { CategoryAction, TaskAction, AIIBAction } from '../actions/index';
import { CategoryAPI } from "../api/category";
import { TaskAPI } from "../api/task";
import { delay } from "redux-saga";
import { ContentListApi, AkItemResponse, AkNotification, AkContext } from 'akmii-yeeoffice-common';
import { ProposalAPI } from '../api/aiibworkflow/proposal';

let taskRequestCount = 0;

/**
 * 当接收到syncTaskCount的请求，中止当前的sync任务并重启
 */
function* watchRequestTaskCount() {
    while (true) {
        taskRequestCount = 0; //重置任务请求次数
        const syncTask = yield fork(syncTaskCount); //执行异步方法，不block当前代码
        yield call(delay, 1000); //1s之内不重复刷新
        yield take(REQUEST_TASKCOUNT); //接受request更新请求
        yield cancel(syncTask); //取消当前的sync job
    }
}

function* syncTaskCount() {
    while (true) {
        if (taskRequestCount > 12) {
            //超过13次就不再自动请求
            break;
        }
        taskRequestCount++;
        const response = yield call(TaskAPI.getTaskCount, {});
        if (response.Status === 0) {
            yield put(TaskAction.taskCountLoaded(response.Data.PendingCount,
                response.Data.CandidateCount));
        }
        yield call(delay, 1000 * 60 * 5);
    }
}


function* watchRequestCategory() {
    while (true) {
        yield take(REQUEST_CATEGORY);
        const rs = yield call(CategoryAPI.getCategory);
        if (rs.Status === 0) {
            yield put(CategoryAction.categoryLoad(rs.Data));
            break; //请求成功后终止循环，只请求一次
        }
    }
}

/** Admin Category */
function* watchAdminRequestCategory() {
    while (true) {
        yield take(REQUEST_ADMIN_CATEGORY);
        const rs = yield call(CategoryAPI.getAdminCategory);
        if (rs.Status === 0) {
            yield put(CategoryAction.AdminCategoryLoad(rs.Data, rs.TotalCount));
            break; //请求成功后终止循环，只请求一次66t
        }
    }
}

function* getProjectListData() {
    while (true) {
        const obj = yield take(REQUESTROJECT_LISTDATA);
        const rs = {
            Title: "Project",
            Columns: [],
            ListDataID: obj.payload
        };
        const listData: AkItemResponse<any> = yield call(() => ContentListApi.GetListByListDataIdAndTitle(rs));
        if (listData.Status === 0) {
            yield put(AIIBAction.getListDataLoad(listData.Data));
        } else {
            AkNotification.error({
                message: "Tip",
                description: "Getting data error!"
            });
        }
    }
}

function* getAIIBSettingRole() {
    while (true) {
        yield take(REQUESRAIIB_ROLE);
        const data: AkResponse = yield call(() => ProposalAPI.checkUserGroup({ groupCode: "System Administrator" }));
        if (data.Status === 0) {
            yield put(AIIBAction.getIsAdmin(data.Data));
        }
    }
}


export default function* rootSaga(): any {
    yield [
        fork(watchRequestCategory),
        fork(watchAdminRequestCategory),
        fork(watchRequestTaskCount),
        fork(getProjectListData),
        fork(getAIIBSettingRole)
    ];
}
