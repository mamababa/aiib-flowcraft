import { PathConfig } from '../../config/pathconfig';
import { AIIBLocale } from '../../locales/localeid';
import { AIIBProjectPoolNaivgatorKey } from './index';

export let ProjectPoolNav: MenuData[] = [
    {
        Key: AIIBProjectPoolNaivgatorKey.AllProject,
        Title: AIIBLocale.AllProject,
        Path: PathConfig.AllProject,
        Icon: "copy"
    },
    {
        Key: AIIBProjectPoolNaivgatorKey.NewProject,
        Title: AIIBLocale.NewProject,
        Path: PathConfig.NewProject,
        Icon: "idcard"
    },
    {
        Key: AIIBProjectPoolNaivgatorKey.MyProject,
        Title: AIIBLocale.MyProject,
        Path: PathConfig.MyProject,
        Icon: "contacts"
    },
    {
        Key: AIIBProjectPoolNaivgatorKey.ConceptStage,
        Title: AIIBLocale.ConceptStage,
        Path: PathConfig.ConceptStage,
        Icon: "bulb"
    }, {
        Key: AIIBProjectPoolNaivgatorKey.AppraisalStage,
        Title: AIIBLocale.AppraisalStage,
        Path: PathConfig.AppraisalStage,
        Icon: "api"
    }, {
        Key: AIIBProjectPoolNaivgatorKey.NegotiationStage,
        Title: AIIBLocale.NegotiationStage,
        Path: PathConfig.NegotiationStage,
        Icon: "file-text"
    }, {
        Key: AIIBProjectPoolNaivgatorKey.BoardApprovalStage,
        Title: AIIBLocale.BoardApprovalStage,
        Path: PathConfig.BoardApprovalStage,
        Icon: "schedule"
    }, {
        Key: AIIBProjectPoolNaivgatorKey.ApprovedProject,
        Title: AIIBLocale.ApprovedProject,
        Path: PathConfig.ApprovedProject,
        Icon: "calculator"
    },  {
        Key: AIIBProjectPoolNaivgatorKey.MeetingMaterials,
        Title: AIIBProjectPoolNaivgatorKey.MeetingMaterials,
        Path: PathConfig.AiibProjectMeetingMaterials,
        Icon: "exception"
    }, {
        Key: AIIBProjectPoolNaivgatorKey.MeetingMinutes,
        Title: AIIBProjectPoolNaivgatorKey.MeetingMinutes,
        Path: PathConfig.AiibProjectMeetingMinutes,
        Icon: "database"
    }];
