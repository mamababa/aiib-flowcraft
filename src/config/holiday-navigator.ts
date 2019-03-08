import {RuleSettingsLocale, EmployeeHoliDayLocale, EmployeeHoliDayQueryLocale} from '../locales/localeid';
import {PathConfig} from './pathconfig';
import {NavigatorKey} from './navigatorkey';

export let HoliDayNavigatorConfig: MenuData[] = [
    {
        Key: NavigatorKey.RuleSettings,
        Title: RuleSettingsLocale.RuleSettings,
        Path: PathConfig.RuleSettings,
        Icon: "bars"
    }, {
        Key: NavigatorKey.EmployeeHoliDay,
        Title: EmployeeHoliDayLocale.EmployeeHoliDay,
        Path: PathConfig.EmployeeHoliDay,
        Icon: "coffee"
    }, {
        Key: NavigatorKey.EmployeeHoliDayQuery,
        Title: EmployeeHoliDayQueryLocale.EmployeeHoliDayQuery,
        Path: PathConfig.EmployeeHoliDayQuery,
        Icon: "search"
    }
];
