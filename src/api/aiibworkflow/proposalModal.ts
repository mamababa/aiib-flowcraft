

export enum ProposalState {
    NewProposal,
    ManagerReview,
    DGReview,
    ScSecretariat,
    PendingScrCom,
    ScrComApproved,
    ExComApproved,
    AllProposal,
    MyProposal
}

export enum ProjectState {
    MyProject,
    AllProject,
    NewProject,
    ConceptStage = 7,
    AppraisalStage = 8,
    NegotiationStage = 9,
    BoardApprovalStage = 10,
    ApprovedProject = 11
}

export interface SubProjectInfoModal {
    ProjectID?: string;
    ParentProjectID?: string;
    ProjectName?: string;
    Country?: string;
    Sector?: string;
    Sponsors?: string;
    Borrower?: string;
    SocialCategory?: string;
    PSIDate?: string;
    ConceptApprovalDate?: string;
    InvestmentDecisionDate?: string;
    BoardDecisionDat?: string;
}

export const ProcessSubmitKey = {
    "Sovereign-backed Financing-Concept": "Sovereign-Concept-PD",
    "Nonsovereign-backed Financing-Concept": "Non-Sovereign-Concept",
    "Cancel": "Cancel"
}

export interface ListWorkflowValues {
    Comment?: string;
    ExpiredAt?: string;
    AssignTo?: string;
    Documents?: string;
    ProjectUrl?: string;
    ProposalUrl?: string;
    ____customListFields?: any;
}
