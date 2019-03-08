import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import UserPickerSample from '../sample/userPickerSample'
import { AkmiiChildFrame } from "../component/frame/index";
import { PathConfig } from './pathconfig';
// import {
//     AcvitityTaskPage,
//     ProcCategoryPage,
//     ProcDefPage,
//     ProcInstPage,
//     ProcInstItemPage,
//     ProcModelPage,
//     ProcDefItemPage,
//     ProcModelItemPage,
//     ProcModelDesignerPage,
//     MetaPage,
//     JobPositionsPage,
//     OrganizationRolePage,
//     LocationRolePage,
//     QuickLinksPage,
//     Report,
//     BudgetTemplate,
//     BudgetPage,
//     DashBoardPage,
//     AchievementsPage,
//     AchievementsHome,
//     DepartmentsPage,
//     HoliDayPage
// } from "../page/admin/";
import {
    // NewProcess,
    WaitingTask,
    // TaskTransfer,
    // FinishTask,
    // Application,
    // ReceiveTask,
    // ProcDraftsPage,
    DelegatesPage,
    // FlowChartPage,
    // UserQuickLink,
    // ReportPage,
    FormPage,
    ActivityTaskPage,
    // FormPage1,
    // PrintPage,
    // PrintPreviewPage,
    // ProcessSetting,
} from "../page/";
// import { BudgetLists, BudgetListsDetails } from '../page/budget/';
// import {
//     RuleSettings,
//     EmployeeHoliDay,
//     EmployeeHoliDayDetail,
//     EmployeeHoliDayQuery,
//     RuleSettingsTestProps,
//     EmployeeHoliDayOperationLog
// } from '../page/holiday';
// import { GeneralReportPage } from "../page/reports/";
// import { UserPickerSample } from "../sample/userPickerSample";
// import {
//     ContentListsPage,
//     ContentListDetailPage,
//     ContentListCalendarDetailPage,
//     ContentListManagePage,
//     ContentListDesignerPage
// } from "akmii-yeeoffice-crafts";
// import ContentListPage from "../page/fadada/contentlist";
// import { ContentListCalendarFilter } from "akmii-yeeoffice-crafts";
// import { AkDesignerCondition } from "../component/flowcraft/index";
import {
    AIIBProposalPage,
    AIIBProposalPool,
    NewProposal,
    PendingScrCom,
    ScrComApproved,
    // ExComApproved,
    PendingDgReview,
    PendingManagerReview,
    PendingSecret,
    AllComApproved,
    AIIBProjectPage,
    AIIBProjectPool,
    MyProject,
    NewProject,
    AllProject,
    AppraisalStage,
    ApprovedProject,
    BoardApprovalStage,
    ConceptStage,
    NegotiationStage,
    ProjectReport,
    ProposalReport,
    AiibMetaDataPage,
    AiibPrint,
    AiibMeetingMaterials,
    AiibMeetingMinutes,
    AppPage,
    MyProposal
} from '../page/aiib';
import { AiibAllReportPage } from '../component/report/reportpage';
import TodoTaskPage from '../page/todo-task-page';
import { AkGlobal } from 'akmii-yeeoffice-common';
import { AIIBAction } from '../actions/index';
import { AkContext, AkNotification, CommonLocale } from 'akmii-yeeoffice-common';
import { ProjectAPI } from '../api/aiibworkflow/project';
import { AiibCommonFun } from '../component/aiib/index';
import { MetaDataReport } from '../component/metadata/mata-data-report';

const history = hashHistory;

declare global {
    interface Window {
        openWithHash?: (url?: string, target?: string, features?: string, replace?: boolean) => Window;
        openInTabWithHash?: (url: string) => void;
    }
}

Window.prototype.openInTabWithHash = (url: string) => {
    var el = document.createElement('a');
    document.body.appendChild(el);
    el.href = `${window.location.protocol + '//' + window.location.host + window.location.pathname}#${url}`;
    el.target = '_blank'; //指定在新窗口打开
    el.click();
    document.body.removeChild(el);
};

Window.prototype.openWithHash = (url?: string, target?: string, features?: string, replace?: boolean): Window => {
    if (history === hashHistory) {
        return window.open(
            `${window.location.protocol + '//' + window.location.host + window.location.pathname}#${url}`,
            target,
            features,
            replace
        );
    }
    return window.open(url, target, features, replace);
};

// ContentListCalendarFilter.loadControls = (Options) => {
//     return <AkDesignerCondition {...Options}></AkDesignerCondition>
// }

function checkAuth(nextState, replace) {
    AkGlobal.store.dispatch(AIIBAction.requestSettingRole());
    if (nextState.location.pathname === PathConfig.AiibMeetingMaterials
        || nextState.location.pathname === PathConfig.AiibMeetingMinutes
        || nextState.location.pathname === PathConfig.AiibProjectMeetingMaterials
        || nextState.location.pathname === PathConfig.AiibProjectMeetingMinutes
    ) {
        checkManager();
    }
    if(nextState.location.pathname === PathConfig.NewProposal 
        || nextState.location.pathname === PathConfig.MyProposal
        || nextState.location.pathname === PathConfig.MyProject
        || nextState.location.pathname === PathConfig.NewProject
    ) {
        checkIsReadOnly();
    }
}

function onContentListEnter() {
    // require.ensure([], () => {
    require('akmii-yeeoffice-crafts/lib/themes/listcraft.less');
    require('akmii-yeeoffice-crafts/lib/themes/formcraft.less');
    // }, "default.css");
}

function checkAdmin(nextState, replace) {
    const user = AkContext.getUser();
    const isAdmin = user && user['IsAdmin'];
    ProjectAPI.getUserGroups({ userID: '' }).then(data => {
        if(data.Status === 0) {
            if (AiibCommonFun.UserIsReadOnly(data.Data) || !isAdmin) {
                AkNotification.error({
                    message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                    description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseUnauthorized })
                });
                setTimeout(() => {
                    window.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/index.aspx#/aiib-app';
                }, 200);
            }
        }
    })
    // if (!isAdmin) {
    //     setTimeout(() => {
    //         window.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/index.aspx#/aiib-app';
    //     }, 200);
    // }
}

function checkReportCenter(nextState, replace) {
    const user = AkContext.getUser();
    const isAdmin = user && user['IsAdmin'];
    ProjectAPI.getUserGroups({ userID: '' }).then((data) => {
        if (data.Status === 0) {
            if (!AiibCommonFun.UserGropPromission(data.Data, 'ReportCenter') && !isAdmin) {
                AkNotification.error({
                    message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                    description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseUnauthorized })
                });
                setTimeout(() => {
                    window.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/index.aspx#/aiib-app';
                }, 200);
            } else {
                checkAuth(nextState, replace);
            }
        }
    });
}

function checkProjectDataBase(nextState, replace) {
    const user = AkContext.getUser();
    const isAdmin = user && user['IsAdmin'];
    ProjectAPI.getUserGroups({ userID: '' }).then((data) => {
        if (data.Status === 0) {
            if (!AiibCommonFun.UserGropPromission(data.Data, 'ProjectDataBase') && !isAdmin && !AiibCommonFun.UserGropPromission(data.Data,"Readonly")) {
                AkNotification.error({
                    message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                    description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseUnauthorized })
                });
                setTimeout(() => {
                    window.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/index.aspx#/aiib-app';
                }, 200);
            } else {
                checkAuth(nextState, replace);
            }
        }
    });
}

function checkManager() {
    const user = AkContext.getUser();
    const isAdmin = user && user['IsAdmin'];
    ProjectAPI.getUserGroups({ userID: '' }).then((data) => {
        if (data.Status === 0) {
            if (!AiibCommonFun.UserIsManager(data.Data) && !isAdmin) {
                AkNotification.error({
                    message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                    description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseUnauthorized })
                });
                setTimeout(() => {
                    window.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/index.aspx#/aiib-app';
                }, 200);
            }
        }
    });
}
function checkIsReadOnly() {
    ProjectAPI.getUserGroups({ userID: '' }).then((data) => {
        if (data.Status === 0) {
            if (AiibCommonFun.UserIsReadOnly(data.Data)) {
                AkNotification.error({
                    message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                    description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseUnauthorized })
                });
                setTimeout(() => {
                    window.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/index.aspx#/aiib-app';
                }, 200);
            }
        }
    });
}

export let router = (
    <Router history={history}>
        <Route path={PathConfig.FormDisplay} component={FormPage} onEnter={onContentListEnter} ></Route>
        <Route path={PathConfig.WaitingTask} component={AkmiiChildFrame}>
            <IndexRoute component={TodoTaskPage}></IndexRoute>
            <Route path={PathConfig.WaitingTask} component={TodoTaskPage}></Route>
            <Route path={PathConfig.FinishTask} component={TodoTaskPage}></Route>
            <Route path={PathConfig.Delegate} component={DelegatesPage}></Route>
            <Route path={PathConfig.ActivityTask} onEnter={checkAdmin} component={ActivityTaskPage}></Route>
        </Route>
        <Route path={PathConfig.ProposalPage} component={AIIBProposalPage} />
        <Route path={PathConfig.ProjectPage} component={AIIBProjectPage} />
        <Route path={PathConfig.ProposalPage} onEnter={checkAuth} component={AIIBProposalPage} />
        <Route path={PathConfig.ProjectPage} onEnter={checkAuth} component={AIIBProjectPage} />
        <Route path={PathConfig.ProposalPool} onEnter={checkAuth} component={AIIBProposalPool}>
            <IndexRoute component={NewProposal} />
            <Route path={PathConfig.NewProposal} component={NewProposal} />
            <Route path={PathConfig.MyProposal} component={MyProposal} />
            <Route path={PathConfig.PendingScrCom} component={PendingScrCom} />
            <Route path={PathConfig.ScrComApproved} component={ScrComApproved} />
            {/* <Route path={PathConfig.ExComApproved} component={ExComApproved} /> */}
            <Route path={PathConfig.PendingSecret} component={PendingSecret} />
            <Route path={PathConfig.PendingDgReview} component={PendingDgReview} />
            <Route path={PathConfig.PendingManagerReview} component={PendingManagerReview} />
            <Route path={PathConfig.AllProposal} component={AllComApproved} />
            <Route path={PathConfig.AiibMeetingMaterials} component={AiibMeetingMaterials} />
            <Route path={PathConfig.AiibMeetingMinutes} component={AiibMeetingMinutes} />
        </Route>
        <Route path={PathConfig.ProjectPool} onEnter={checkAuth} component={AIIBProjectPool}>
            <IndexRoute component={MyProject} />
            <Route path={PathConfig.MyProject} component={MyProject} />
            <Route path={PathConfig.NewProject} component={NewProject} />
            <Route path={PathConfig.AllProject} component={AllProject} />
            <Route path={PathConfig.AppraisalStage} component={AppraisalStage} />
            <Route path={PathConfig.ApprovedProject} component={ApprovedProject} />
            <Route path={PathConfig.BoardApprovalStage} component={BoardApprovalStage} />
            <Route path={PathConfig.ConceptStage} component={ConceptStage} />
            <Route path={PathConfig.NegotiationStage} component={NegotiationStage} />
            <Route path={PathConfig.AiibProjectMeetingMaterials} component={AiibMeetingMaterials} />
            <Route path={PathConfig.AiibProjectMeetingMinutes} component={AiibMeetingMinutes} />
        </Route>
        <Route path={PathConfig.AiibReport} component={AiibAllReportPage} onEnter={checkIsReadOnly}>
            <IndexRoute component={ProposalReport} />
            <Route path={PathConfig.ProposalReport} onEnter={checkReportCenter} component={ProposalReport} />
            <Route path={PathConfig.ProjectReport} onEnter={checkReportCenter} component={ProjectReport} />
            <Route path={PathConfig.ProposalDataBase} onEnter={checkProjectDataBase} component={MetaDataReport} />
        </Route>
        <Route path={PathConfig.AiibMetadata} onEnter={checkAdmin} component={AiibMetaDataPage} />
        <Route path={PathConfig.AiibPrint} component={AiibPrint} />
        <Route path={PathConfig.Home} component={AppPage}>
            <IndexRoute component={AppPage} />
        </Route>
        <Route path={PathConfig.AppPage} component={AppPage} />
    </Router>
);
