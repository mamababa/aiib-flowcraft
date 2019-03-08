import { NavLocale } from '../locales/localeid';
import { PathConfig } from './pathconfig';
import { NavigatorKey } from './navigatorkey';
import { AkContext, AppKeys, AkPermissionControl, MerchantLevelEnum } from 'akmii-yeeoffice-common';

export let NavigatorConfig: MenuData[] = [
    // {
    //     Key: NavigatorKey.ActivityTask,
    //     Title: NavLocale.NewProcess,
    //     Path: PathConfig.NewProcess,
    //     Icon: "plus"
    // },
    {
        Key: NavigatorKey.WaittingTask,
        Title: NavLocale.WaitingTask,
        Path: PathConfig.WaitingTask,
        Icon: "wait-task"
    },
    // {
    //     Key: NavigatorKey.ReceiveTask,
    //     Title: NavLocale.ReceiveTask,
    //     Path: PathConfig.ReceiveTask,
    //     Icon: "receive-task"
    // },
    {
        Key: NavigatorKey.FinishTask,
        Title: NavLocale.FinishTask,
        Path: PathConfig.FinishTask,
        Icon: "done-task"
    },
    // , {
    //     Key: NavigatorKey.Application,
    //     Title: NavLocale.Application,
    //     Path: PathConfig.Application,
    //     Icon: "apply-task"
    // },
    {
        Key: NavigatorKey.Delegates,
        Title: NavLocale.Delegates,
        Path: PathConfig.Delegate,
        Icon: "right-square-o"
    }
    // {
    //     Key: NavigatorKey.ProcessDrafts,
    //     Title: NavLocale.ProcessDrafts,
    //     Path: PathConfig.Darfts,
    //     Icon: "inbox"
    // }, {
    //     Key: NavigatorKey.AdminReport,
    //     Title: NavLocale.AdminReport,
    //     Path: PathConfig.HomeReportPage,
    //     Icon: "pie-chart"
    // }
];

/* 标准版 */
if (AkPermissionControl.hasPermission(MerchantLevelEnum.Standard, AppKeys.Flowcraft)) {
    // NavigatorConfig.splice(7, 0, {
    //     Key: NavigatorKey.UserQuickLinks,
    //     Title: NavLocale.UserQuickLinks,
    //     Path: PathConfig.UserQuickLinks,
    //     Icon: "link"
    // }
    // );
}

/* 企业版 */
if (AkPermissionControl.hasPermission(MerchantLevelEnum.Enterprise, AppKeys.Flowcraft)) {
    // NavigatorConfig.push({
    //     Key: NavigatorKey.AdminLists,
    //     Title: NavLocale.AdminLists,
    //     Path: PathConfig.ContentLists,
    //     Icon: "bars"
    // });
}






