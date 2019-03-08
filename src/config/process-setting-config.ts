import { NavLocale } from '../locales/localeid';
import { PathConfig } from './pathconfig';
import { NavigatorKey } from './navigatorkey';
import { AkContext, AppKeys, AkPermissionControl, MerchantLevelEnum } from 'akmii-yeeoffice-common';

export interface SettingData {
    Key?: string;
    Title?: string;
    Detail?: string;
    Path?: string;
    IconURL?: string;
}

export let SettingConfig: SettingData[] = [
    // {
    //     Key: NavigatorKey.ActivityTask,
    //     Title: NavLocale.FlowActivityTask,
    //     Detail: NavLocale.FlowActivityTaskDetail,
    //     Path: PathConfig.ActivityTask,
    //     IconURL: "/common/ws-renwu.png"
    // }, {
    //     Key: NavigatorKey.ProcActivityInst,
    //     Title: NavLocale.FlowProcInstActivity,
    //     Detail: NavLocale.FlowProcInstActivityDetail,
    //     Path: PathConfig.ProcInst,
    //     IconURL: "/common/ws-shili.png"
    // }, {
    //     Key: NavigatorKey.ProcDef,
    //     Title: NavLocale.FlowProcDefAcvitity,
    //     Detail: NavLocale.FlowProcDefAcvitityDetail,
    //     Path: PathConfig.ProcDef,
    //     IconURL: "/common/ws-fabu.png"
    // }, {
    //     Key: NavigatorKey.ProcModel,
    //     Title: NavLocale.FLowProcModel,
    //     Detail: NavLocale.FLowProcModelDetail,
    //     Path: PathConfig.ProcModel,
    //     IconURL: "/common/ws-dingyi.png"
    // }, {
    //     Key: NavigatorKey.PositionRoot,
    //     Title: NavLocale.PositionSetting,
    //     Detail: NavLocale.PositionSettingDetail,
    //     Path: PathConfig.Role,
    //     IconURL: "/common/ws-gangwei.png"
    // },
    // {
    //     Key: NavigatorKey.AdminReport,
    //     Title: NavLocale.FlowReport,
    //     Detail: NavLocale.FlowReportDetail,
    //     Path: PathConfig.AdminReport,
    //     IconURL: "/common/ws-baobiao.png"
    // }
];

/* 标准版 */
if (AkPermissionControl.hasPermission(MerchantLevelEnum.Standard,AppKeys.Flowcraft)) {
    // SettingConfig.push(
    //     {
    //         Key: NavigatorKey.ProcCategory,
    //         Title: NavLocale.FlowProcDefCategory,
    //         Detail: NavLocale.FlowProcDefCategoryDetail,
    //         Path: PathConfig.ProcCategory,
    //         IconURL: "/common/ws-fenlei.png"
    //     }, {
    //         Key: NavigatorKey.QuickLinks,
    //         Title: NavLocale.QuickLinks,
    //         Detail: NavLocale.QuickLinksDetail,
    //         Path: PathConfig.QuickLinks,
    //         IconURL: "/common/ws-lianjie.png"
    //     }, {
    //         Key: NavigatorKey.DashBoard,
    //         Title: NavLocale.DashBoard,
    //         Detail: NavLocale.DashBoardDetail,
    //         Path: PathConfig.DashBoard,
    //         IconURL: "/common/ws-dashboard.png"
    //     }, {
    //         Key: NavigatorKey.ProcessAchievements,
    //         Title: NavLocale.Achievements,
    //         Detail: NavLocale.AchievementsDetail,
    //         Path: PathConfig.AchievementsHome,
    //         IconURL: "/common/ws-achievements.png"
    //     });
}

/* 企业版 */
if (AkPermissionControl.hasPermission(MerchantLevelEnum.Enterprise,AppKeys.Flowcraft)) {
    // SettingConfig.push(
    //     {
    //         Key: NavigatorKey.Budget,
    //         Title: NavLocale.Budget,
    //         Detail: NavLocale.BudgetDetail,
    //         Path: PathConfig.BudgetManage,
    //         IconURL: "/common/ws-budget.png"
    //     }, {
    //         Key: NavigatorKey.HoliDayManage,
    //         Title: NavLocale.HoliDay,
    //         Detail: NavLocale.HoliDayDetail,
    //         Path: PathConfig.HoliDayManage,
    //         IconURL: "/common/holiday.png"
    //     });
}


