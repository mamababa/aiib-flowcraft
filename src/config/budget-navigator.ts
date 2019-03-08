import { BudgetLocale, BudgetTemplateLocale } from '../locales/localeid';
import {PathConfig} from './pathconfig';
import {NavigatorKey} from './navigatorkey';

export let BudgetNavigatorConfig: MenuData[] = [
    {
        Key: NavigatorKey.BudgetLists,
        Title: BudgetLocale.BudgetLists,
        Path: PathConfig.BudgetLists,
        Icon: "yusuan"
    }, {
        Key: NavigatorKey.BudgetTemplate,
        Title: BudgetTemplateLocale.BudgetTemplate,
        Path: PathConfig.BudgetTemplate,
        Icon: "category"
    }
];
