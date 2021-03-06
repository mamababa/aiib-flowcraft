export interface AiibContentListDefs {
    FieldID: string;
    ListID: string;
    FieldName: string;
    FieldType: string;
    FieldIndex: number;
    DisplayName: string;
    InternalName: string;
    Type: string;
    Category: number;
    DefaultValue: string;
    Rules: string;
    AppID: number;
    IsSort: boolean;
    IsIndex: boolean;
    IsFilter: boolean;
    IsIndexCreated: boolean;
    Ext1: string;
    Ext2: string;
    Ext3: string;
    IsSystem: boolean;
    IsUnique: boolean;
    Status: number;
    TenantID: string;
    Created: string;
    CreatedStr: string;
    CreatBy: string;
    Modified: string;
    ModifiedStr: string;
    ModifyBy: string;
    CreatedBy: string;
    ModifiedBy: string;
}

export interface UserGroupsModel {
    TenantID?: string;
    ID?: string;
    Name?: string;
    Code?: string;
    Description?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    Created?: string;
    CreatedBy?: string;
    Modified?: string;
    ModifiedBy?: string;
}

export interface ProjectAllFieldsModal extends ProjectFormFieldModal {
    ListDataID: string;
    ListID: string;
    RowVersion: string;
    Stage: string;
    Status: string;
    State: string;
    ScreeningCommitteeApprovedDate?: string;
    ScreeningCommitteeApprovedComment?: string;
    ExecutiveCommitteeApprovedDate?: string;
    ExecutiveCommitteeApprovedComment?: string;
    ConceptDate?: string;
    ConceptComment?: string;
    AppraisalDate?: string;
    AppraisalComment?: string;
    NegotiationDate?: string;
    NegotiationComment?: string;
    BoardApprovalDate?: string;
    BoardApprovalComment?: string;
    CancelledDate?: string;
    CancelledComment?: string;
    StartNum: string;
    ProcessStatus?: string;
    ProcessKey?: string;
    CancelStatus?: string;
    CancelStage?: string;
    DropStatus?: string;
    ProcessStage?: string;
    CreditRating?: string;
    PreferredBeforeRating?: string;
    PreferredAfterRating?: string;
    CancelledUser?: string;
    ExComApprove?: string;

    // "Sovereign-Concept-PD"?:string;
    // "Sovereign-Concept-PSI"?:string;
    // "Sovereign-Appraisal-PD"?:string;
    // "Sovereign-Appraisal-PSI"?:string;
    // "Sovereign-Negotiation-PD"?:string;
    // "Sovereign-Negotiation-PSI"?:string;
    // "Non-Sovereign-Concept"?:string;
    // "Sovereign-Board-Approval-PD1"?:string;
    // "Sovereign-Negotiation-PSI"?:string;
    // "Sovereign-Negotiation-PSI"?:string;
    // "Sovereign-Negotiation-PSI"?:string;
}

export interface ProjectFormFieldModal extends BaseModel {
    ProposalID: string;
    ProjectID?: string;
    ProjectName?: string;
    Location?: string;
    ProjectDescription?: string;
    Country?: string;
    Region?: string;
    CountryName?: string;
    CountrySymbol?: string;
    Sector?: string;
    Subsector?: string[];
    ThematicPriorities?: string[];
    FinancingMethod?: string;
    TotalEstimatedCost?: number;
    Loan?: number;
    Equity?: number;
    OtherFinancing?: number;
    PreparationStatus?: number;
    Sponsor?: string;
    SponsorIntroduction?: string;
    EmployeeNumber?: string;
    GovernmentSupport?: string;
    OutlineAndConditions?: string;
    SubmissionDate?: string;
    Financing?: number;
    ProjectSummary?: string;
    Comments?: string;
    StartDate?: string;
    EndDate?: string;
    ExpectedLoanClosingDate?: string;
    SocialCategory?: string;
    AIIBPrioritiesRelation?: string;
    CountryPrioritiesRelation?: string;
    AIIBPrioritiesRelationRating?: string;
    CountryPrioritiesRelationRating?: string;
    ProjectValueAddition?: string;
    AIIBValueAddition?: string;
    ProjectValueAdditionRating?: string;
    AIIBValueAdditionRating?: string;
    AdditionalRelevantInformation?: string;
    FiscalYear?: string;
    Quarter?: string;
    Rationale?: string;
    FinancingType?: string;
    LeadFinancier?: string;
    OtherFinanciers?: string;
    InvestmentGrade?: string;
    LoanAmount?: number;
    LocalLoanAmount?: number;
    LocalCurrency?: string;
    EconomicCapital?: number;
    EcapPercentage?: string;
    Membership?: string;
    IncomeLevel?: string;
    ProjectLeader?: string;
    ManagerIO?: string;
    DGIO?: string;
    Members?: string;
    ImplementationEntity?: string;
    ProjectRisk?: string;
    DisbursementConditions?: string;
    KeyCovenants?: string;
    AIIBLoan?: string;
    Population?: number;
    PopulationWorldBank?: number;
    IncomeLevelWorldBank?: number;
    Probability?: string;
    Mobilization?: string;
    PPP?: string;
    InformationSecurityLevel?: string;
    NDA?: string;
    PI_Address?: string;
    PI_Rating?: string;
    PI_MainShareHolder?: string;
    PI_Listed?: string;
    S_Address?: string;
    S_PercentageOwnership?: string;
    S_MainShareHolder?: string;
    S_Listed?: string;
    EquityFromSponsors?: number;
    Guarantor?: string;
    SecurityType?: string;
    SecurityLocation?: string;
    Sen_LoanAmount?: number;
    Sen_LoanRate?: number;
    Sen_LoanTenorStartDate?: string;
    Sen_LoanTenorEndDate?: string;
    Sen_LoanAmortizationMethod?: string;
    MobilizationAmount?: string;
    MobilizationRate?: string;
    MobilizationMaturityStartDate?: string;
    MobilizationMaturityEndDate?: string;
    MobilizationAmortizationMethod?: string;
    LikelyMobilizationSource?: string;
    SO_LoanAmount?: number;
    SO_LoanRate?: string;
    SO_LoanMaturityStartDate?: string;
    SO_LoanMaturityEndDate?: string;
    SO_LoanAmortizationMethod?: string;
    E_StraightPreferred?: string;
    E_Amount?: string;
    E_Percentage?: string;
    SharesNumber?: number;
    OtherFund?: string;
    OtherFundAmount?: number;
    FinancingGap?: number;
    GuaranteeRequest?: number;
    Mezzanine?: number;
    ThematicPrioritiesComment?: string;
    FundSourcesAndUses?: string;
    CoFinancingAgency?: string;
    CoFinancingAmount?: string;
    ProjectCostAndFinancingPlan?: number;
    South_South?: string;
    CompanyName?: string;
    BODPipelinePresentation?: string;
    Approvers?: string | string[];
    Lawyers?: string | string[];
    CategoryNotDecidedComment?: string;
    Controller?: string;
    Treasury?: string;
    SCRecommend?: string;
    PolicyAssuranceComment?: string;
    CommitmentDate?: string;
    Product?: string[];
    ProjectShortName?: string;
    ExternalConsultants?: string;
    ImplementationAgency?: string;
    Borrower?: string;
    EstimatedLoanAmount?: string;
    OtherFoundsDetails?: OtherFoundsDetailsModel[];
    ProjectObjective?:string;
}

export interface OtherFoundsDetailsModel {
    Name?: string;
    Amount?: string;
}
