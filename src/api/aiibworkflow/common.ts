
/** TeamMember*/
export interface AIIBTeamMemberModel {
    ID?: string;
    Permission?: string;
    Role?: string;
    UserID?: string;
    ListDataID?: string;
    Type?: string;
}


/** Permission Enum*/
export enum AIIBPermissionEnum {
    View = 0,
    Edit = 1
}

export interface AIIBAppModal {
    url: string;
    name: string;
    imgurl: string;
}

/**Member & Approvers必填字段*/
export const validateMemberFields = [
    { label: "Project Team Leader", key: "ProjectLeader" },
    { label: "Lawyers", key: "Lawyers" },
    { label: "Controller", key: "Controller" },
    { label: "Treasury", key: "Treasury" },
    { label: "Manager IO", key: "ManagerIO" },
    { label: "DG IO", key: "DGIO" },
];


/**Proposal必填字段*/
export const validateProposalFields = [
    { label: "Project Name", key: "ProjectName" },
    { label: "Project Short Name", key: "ProjectShortName" },
    { label: "Country ID", key: "Country" },
    { label: "Project Description", key: "ProjectDescription" },
    { label: "Current Status", key: "PreparationStatus" },
    { label: "Sector", key: "Sector" },
    { label: "Client Type", key: "FinancingMethod" },
    { label: "Product Type", key: "Product" },
    { label: "Total Estimated Project Investment (US$ MM)", key: "TotalEstimatedCost" },
    { label: "Other Sources of Fund", key: "OtherFund" },
    { label: "Manager IO", key: "ManagerIO" },
    { label: "DG IO", key: "DGIO" },
    { label: "Standalone/Co-financing", key: "FinancingType" },
    { label: "Environmental & Social Category", key: "SocialCategory" },
    { label: "Project Cost & Financing Plan", key: "ProjectCostAndFinancingPlan" },
    { label: "Alignment with AIIB Thematic Priorities", key: "ThematicPriorities" },
    { label: "Project Objective", key:"ProjectObjective"},
     //screening submmaty sheet -cr
    { label: "Relation to AIIB Priorities",key:"AIIBPrioritiesRelation"},
    {label:"Relation to Country Priorities",key:"CountryPrioritiesRelation"},
    {label:"Initial Snapshot Rating to AIIB",key:"AIIBPrioritiesRelationRating"},
    {label:"Initial Snapshot Rating to Country",key:"CountryPrioritiesRelationRating"},
    {label:"Value Addition to the Project",key:"ProjectValueAddition"},
    {label:"Value Addition to AIIB",key:"AIIBValueAddition"},
    {label:"Initial Snapshot Rating (Value Addition to the Project)",key:"ProjectValueAdditionRating"},
    {label:"Initial Snapshot Rating(Value Addition to AIIB)",key:"AIIBValueAdditionRating"},
    {label:"Additional Relevant Information (if any)",key:"AdditionalRelevantInformation"},
    {label:"AIIB Loan/Equity/Guarantee",key:"AIIBLoan"}
];
export const validateNSBFProposalFields = [
    { label: "Information Security Level", key: "InformationSecurityLevel" },
    { label: "Company Name", key: "CompanyName" }
];
export const validateSBFProposalFields = [
    { label: "Client/Borrower(s)", key: "Borrower" },
    { label: "Implementation Agency", key: "ImplementationAgency" },
    { label: "Projected Implementation Start Date", key: "StartDate" },
    { label: "Projected Implementation End Date", key: "EndDate" }
];

export interface addAiibWorkflowHistory {
    Title: string;
    AppID?: number;
    DicList?: addAiibWorkflowHistoryFields[];
}

export interface addAiibWorkflowHistoryFields {
    Title?: string;
    ProjectDataID?: string;
    ActionType?: string;
    Comment?: string;
    StartNum?: string;
    Category?: string;
}

export const MultipleFieldType = [
    "ProjectLeader",
    "Lawyers",
    "Approvers",
    "Controller",
    "Treasury",
    "Members",
    "ThematicPriorities",
    "Subsector",
    "Product",
    "OtherFoundsDetails"
];

export enum AiibProjectCancelStage {
    Default,
    ManageIO,
    DGIO,
    PendingScrCom,
    ScrComApproved
}

export enum AiibProjectCancelStatus {
    Default,
    Cancelling,
    Cancelled
}

export enum AiibProjectProcessStatus {
    Default,
    Running,
    Approved,
    Rejected,
    Completed
}

export enum AiibProjectDropStatus {
    Default,
    Dropping,
    Dropped
}
export const ProcessApprovers = {
    "Sovereign-Concept-PD": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": ["IC Secretariat"]
    },
    "Sovereign-Concept-PSI": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    },
    "Sovereign-Appraisal-PD": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": ["IC Secretariat"]
    },
    "Sovereign-Appraisal-PSI": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    },
    "Sovereign-Appraisal-ACN": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    },
    "Sovereign-Negotiation-PD": {
        "Feild": ["ManagerIO", "DGIO", "Lawyers", "Controller", "Treasury"],
        "Group": []
    },
    "Sovereign-Board-Approval-PD1": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    },
    "Sovereign-Board-Approval-PD2": {
        "Feild": [],
        // "Group": ["VP of Policy & Strategy"]
        "Group": ["VP Policy & Strategy"]
    },
    "Sovereign-Board-Approval-PD3": {
        "Feild": [],
        "Group": ["IC Secretariat"]
    },
    "Sovereign-Board-Approval-PSI": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    },
    "Non-Sovereign-Concept": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": ["IC Secretariat"]
    },
    "Non-Sovereign-Appraisal-PD": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": ["IC Secretariat"]
    },
    "Non-Sovereign-Appraisal-PSI": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    },
    "Cancel": {
        "Feild": ["ManagerIO", "DGIO"],
        "Group": []
    }
}

export interface CountryValueModal {
    Region?: string;
    CountrySymbol?: string;
    CountryName?: string;
}

