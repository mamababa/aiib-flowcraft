import { AIIBProposalPoolNaivgatorKey, AIIBProjectPoolNaivgatorKey } from './index';
import { PathConfig } from '../../config/pathconfig';
import { AIIBLocale } from '../../locales/localeid';

export let ProposalPoolNav: MenuData[] = [{
    Key: AIIBProposalPoolNaivgatorKey.AllProposal,
    Title: AIIBLocale.AllProposal,
    Path: PathConfig.AllProposal,
    Icon: "file-text"
},{
    Key: AIIBProposalPoolNaivgatorKey.NewProposal,
    Title: AIIBLocale.NewProposal,
    Path: PathConfig.NewProposal,
    Icon: "plus"
}, {
    Key: AIIBProposalPoolNaivgatorKey.MyProposal,
    Title: AIIBLocale.MyProposal,
    Path: PathConfig.MyProposal,
    Icon: "contacts"
}, {
    Key: AIIBProposalPoolNaivgatorKey.PendingManagerReview,
    Title: AIIBLocale.PendingManagerReview,
    Path: PathConfig.PendingManagerReview,
    Icon: "minus-circle-o",
}, {
    Key: AIIBProposalPoolNaivgatorKey.PendingDgReview,
    Title: AIIBLocale.PendingDgReview,
    Path: PathConfig.PendingDgReview,
    Icon: "file-text"
}, {
    Key: AIIBProposalPoolNaivgatorKey.PendingSecret,
    Title: AIIBLocale.PendingScSecretariat,
    Path: PathConfig.PendingSecret,
    Icon: "apply-task"
}, {
    Key: AIIBProposalPoolNaivgatorKey.PendingProposal,
    Title: AIIBLocale.PendingScrCom,
    Path: PathConfig.PendingScrCom,
    Icon: "wait-task"
}, {
    Key: AIIBProposalPoolNaivgatorKey.ScrComProposal,
    Title: AIIBLocale.ScrComApproved,
    Path: PathConfig.ScrComApproved,
    Icon: "filter"
},
//  {
//     Key: AIIBProposalPoolNaivgatorKey.ExComProposal,
//     Title: AIIBLocale.ExComApproved,
//     Path: PathConfig.ExComApproved,
//     Icon: "apply-task"
// }, 
 {
    Key: AIIBProjectPoolNaivgatorKey.MeetingMaterials,
    Title: AIIBProjectPoolNaivgatorKey.MeetingMaterials,
    Path: PathConfig.AiibMeetingMaterials,
    Icon: "exception",
}, {
    Key: AIIBProjectPoolNaivgatorKey.MeetingMinutes,
    Title: AIIBProjectPoolNaivgatorKey.MeetingMinutes,
    Path: PathConfig.AiibMeetingMinutes,
    Icon: "database"
}];
