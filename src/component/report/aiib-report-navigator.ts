import { PathConfig } from "../../config/pathconfig";
import { AIIBLocale } from "../../locales/localeid";

export let AiibReportNavigatorConfig: MenuData[] = [
    {
        Key: AIIBLocale.ProposalReport,
        Title: AIIBLocale.ProposalReport,
        Path: PathConfig.ProposalReport,
        Icon: "exception"
    }, {
        Key: AIIBLocale.ProjectReport,
        Title: AIIBLocale.ProjectReport,
        Path: PathConfig.ProjectReport,
        Icon: "file-text"
    }
];
