import { NavLocale } from "../locales/localeid";
import { PathConfig } from "./pathconfig";
import { NavigatorKey } from "./navigatorkey";
import { AkContext, AppKeys, AkPermissionControl, MerchantLevelEnum } from 'akmii-yeeoffice-common';

let NavigatorConfigHeader: MenuData[] = [
    {
        Key: NavigatorKey.ActivityTask,
        Title: NavLocale.FlowActivityTask,
        Path: PathConfig.ActivityTask,
        Icon: "process"
    }, {
        Key: NavigatorKey.ProcActivityInst,
        Title: NavLocale.FlowProcInstActivity,
        Path: PathConfig.ProcInst,
        Icon: "activity"
    }, {
        Key: NavigatorKey.ProcDef,
        Title: NavLocale.FlowProcDefAcvitity,
        Path: PathConfig.ProcDef,
        Icon: "deploy"
    }, {
        Key: NavigatorKey.ProcModel,
        Title: NavLocale.FLowProcModel,
        Path: PathConfig.ProcModel,
        Icon: "define"
    }, {
        Key: NavigatorKey.ProcModel,
        Title: NavLocale.FLowProcModel,
        Path: PathConfig.ProcModelItem,
        NotShow: true,
        Icon: "define"
    },
    //  {
    //     Key: NavigatorKey.ParamRoot,
    //     Title: NavLocale.ParamSetting,
    //     Path: PathConfig.Meta,
    //     Icon: "argument"
    // },
];

let NavigatorConfigBodyTop = [
    {
        Key: NavigatorKey.ProcCategory,
        Title: NavLocale.FlowProcDefCategory,
        Path: PathConfig.ProcCategory,
        Icon: "category"
    },
];

let NavigatorConfigBodyBottom = [
    {
        Key: "divider-1",
        IsDivider: true
    }, {
        Key: NavigatorKey.PositionRoot,
        Title: NavLocale.PositionSetting,
        Path: PathConfig.Role,
        Icon: "positions"
    }, {
        Key: NavigatorKey.AdminReport,
        Title: NavLocale.AdminReport,
        Path: PathConfig.AdminReport,
        Icon: "pie-chart"
    },
];


let NavigatorConfigFooter = [
    {
        Key: NavigatorKey.QuickLinks,
        Title: NavLocale.QuickLinks,
        Path: PathConfig.QuickLinks,
        NotShow: false,
        Icon: "link"
    }, {
        Key: NavigatorKey.DashBoard,
        Title: NavLocale.DashBoard,
        Path: PathConfig.DashBoard,
        Icon: "area-chart"
    }, {
        Key: NavigatorKey.ProcessAchievements,
        Title: NavLocale.Achievements,
        Path: PathConfig.AchievementsHome,
        Icon: "bars"
    }
];

let NavigatorConfigLast = [
    {
        Key: NavigatorKey.Budget,
        Title: NavLocale.Budget,
        Path: PathConfig.BudgetManage,
        Icon: "yusuan"
    },
    {
        Key: NavigatorKey.HoliDayManage,
        Title: NavLocale.HoliDay,
        Path: PathConfig.HoliDayManage,
        Icon: "coffee"
    }
    // , {
    //     Key: "fadada",//法大大
    //     Title: NavLocale.FadadaContentList,
    //     Path: PathConfig.FaDaDaIndex,
    //     Icon: "bars"
    // }
]

export let NavigatorConfig: MenuData[] = [];

if (AkPermissionControl.hasPermission(MerchantLevelEnum.Free,AppKeys.Flowcraft)) {
    NavigatorConfig=[...NavigatorConfigHeader,...NavigatorConfigBodyBottom];
}

if (AkPermissionControl.hasPermission(MerchantLevelEnum.Standard,AppKeys.Flowcraft)) {
    NavigatorConfig=[...NavigatorConfigHeader,...NavigatorConfigBodyTop,...NavigatorConfigBodyBottom,...NavigatorConfigFooter];
}

if (AkPermissionControl.hasPermission(MerchantLevelEnum.Enterprise,AppKeys.Flowcraft)) {
    NavigatorConfig=[...NavigatorConfigHeader,...NavigatorConfigBodyTop,...NavigatorConfigBodyBottom,...NavigatorConfigFooter,...NavigatorConfigLast];
}

