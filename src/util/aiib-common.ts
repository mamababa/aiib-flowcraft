import { AkContext } from 'akmii-yeeoffice-common';
/**ABBI state*/
export const STATE_NEWPROPOSAL = "New Proposal";
export const STATE_MANAGERIOREVIEW = "Pending Manager IO Review";
export const STATE_DGIOREVIRE = "Pending DG IO Review";
export const STATE_SCSECREVIEW = "SC Sec Review";
export const STATE_PENDINGSCREENINGCOMMITTEE = "ScrCom Review";
export const STATE_SCREENINGCOMMITTEE = "ExCom Review";
export const STATE_EXCUTIVECOMMITTEE = "Executive Committee";

/**AIIB Stage*/

export const SATGE_PROPOSAL = "Proposal";
export const SATGE_CONCEPT = "Concept";
export const SATGE_APPRAISAL = "Appraisal";
export const SATGE_INTERM_FINALREVIEW = "Interim/Final Review";
export const SATGE_NEGOTIATION = "Negotiation";
export const SATGE_BOARDAPPROVAL = "Board Approval";
export const SATGE_BOARDAPPROVED = "Board Approved";

/**client type*/

export const SOVEREIGN_BACKEDFINACING = "Sovereign-backed Financing";
export const NONSOVEREIGN_BACKEDFINACING = "Nonsovereign-backed Financing";

export const isMobile = document.body.clientWidth < 768;
export const currentUser = AkContext.getUser().AccountID;



