export class ProposalArr {
    static commonArr = ['ProjectName', 'ProjectShortName', 'Country', 'CountrySymbol', 'CountryName', 'Region', 'ProjectDescription', 'Stage', 'Sector', 'Subsector', 'ThematicPriorities',
        'FinancingMethod', 'TotalEstimatedCost', 'Loan', 'Financing', "EstimatedLoanAmount", 'PreliminaryAssessment', 'EmployeeNumber', 'GovernmentSupport',
        'Location', 'PreparationStatus', 'FiscalYear', 'Quarter', 'ThematicPrioritiesComment', 'GuaranteeRequest', 'Mezzanine', 'OtherFund',
        'OtherFundAmount', 'OtherFoundsDetails', 'FinancingGap', 'OutlineAndConditions', 'DGIO', "CreatedBy", "ManagerIO", "Product", 'OtherFinancing',"ProjectObjective"];
    static sovereignArr = ["Borrower", "ImplementationAgency"];
    static nonsovereignArr = ['Mobilization', 'South_South', 'PPP', 'NDA', 'InformationSecurityLevel', 'FundSourcesAndUses', 'EquityFromSponsors', 'Guarantor', 'SecurityType', 'SecurityLocation',
        'Sen_LoanAmount', 'Sen_LoanRate', 'Sen_LoanTenorStartDate', 'Sen_LoanTenorEndDate', 'Sen_LoanAmortizationMethod', 'MobilizationAmount', 'MobilizationRate', 'MobilizationMaturityStartDate', 'MobilizationMaturityEndDate',
        'MobilizationAmortizationMethod', 'LikelyMobilizationSource', 'SO_LoanAmount', 'SO_LoanRate', 'SO_LoanMaturityStartDate', 'SO_LoanMaturityEndDate', 'SO_LoanAmortizationMethod', 'E_StraightPreferred', 'E_Amount', 'E_Percentage',
        'SharesNumber', 'S_Address', 'S_PercentageOwnership', 'S_MainShareHolder', 'S_Listed', 'SponsorIntroduction', "ExternalConsultants",
        'CompanyName', 'PI_Address', 'PI_Rating', 'PI_MainShareHolder', 'PI_Listed', 'Equity', 'Sponsor', 'ImplementationEntity'];

    static proposalScreeningArr = ["SubmissionDate", "ProjectName", "ProjectShortName", "Country", "CountrySymbol", "CountryName", "Region", "Sector", "Subsector", "ProjectDescription", "FinancingMethod", "Product", "Financing", "EstimatedLoanAmount", "FinancingType", "LeadFinancier", "OtherFinanciers", "SocialCategory", "CategoryNotDecidedComment", "StartDate", "EndDate", "ProjectCostAndFinancingPlan", "CoFinancingAmount", "AIIBLoan", "ThematicPriorities", "ThematicPrioritiesComment", "AIIBPrioritiesRelation", "CountryPrioritiesRelation", "AIIBPrioritiesRelationRating", "CountryPrioritiesRelationRating", "ProjectValueAddition", "AIIBValueAddition", "ProjectValueAdditionRating", "AIIBValueAdditionRating", "AdditionalRelevantInformation",
        "Borrower", "ImplementationAgency", "ExecutiveCommitteeApprovedDate","ProjectObjective"];
    static nonsovereignproposalScreeningArr = ["SubmissionDate", "ProjectName", "ProjectShortName", "Country", "CountrySymbol", "CountryName", "Region", "ImplementationEntity", "Sponsor", "Sector", "Subsector", "ProjectDescription", "FinancingMethod", "Product", "Financing", "EstimatedLoanAmount", "FinancingType", "LeadFinancier", "OtherFinanciers", "SocialCategory", "StartDate", "EndDate", "CategoryNotDecidedComment", "ProjectCostAndFinancingPlan", "CoFinancingAmount", "AIIBLoan", "ThematicPriorities", "ThematicPrioritiesComment", "AIIBPrioritiesRelation", "CountryPrioritiesRelation", "AIIBPrioritiesRelationRating", "CountryPrioritiesRelationRating", "ProjectValueAddition", "AIIBValueAddition", "ProjectValueAdditionRating", "AIIBValueAdditionRating", "AdditionalRelevantInformation", "ExecutiveCommitteeApprovedDate",
    "ProjectObjective"];
}

export class ColumnsArr {
    static projectListColumns = ["ProjectID", "ProjectName", 'ProjectShortName', "CountryName", "Sector", "Financing", "FinancingMethod", "ExternalConsultants", "ExecutiveCommitteeApprovedDate", "ConceptDate", "Stage", "AppraisalDate", "NegotiationDate", "BoardApprovalDate", "ProjectLeader", "ProcessStatus", "Members", "Approvers", "ProcessStage", "Status", "CancelStatus", "ExComApprovalDate"];

    static proposalListColumns = ["CountryName", "ProposalID", "ProjectID", "ProjectName", "SCRecommend", "Sector", "FinancingMethod", "DGIO", "FinancingType", "TotalEstimatedCost", "Financing", "Status", "Stage", "State", "SubmissionDate", "ScreeningCommitteeApprovedDate", "ExecutiveCommitteeApprovedDate", "DropStatus", "CancelStage", "ProjectLeader", "ProcessStage", "StartNum", "Country", "Sponsor", "ImplementationEntity", "ProjectDescription", "PreparationStatus", "Product", "OtherFund", "OtherFoundsDetails", "InformationSecurityLevel", "FundSourcesAndUses", "PreliminaryAssessment", "GovernmentSupport", "ManagerIO", "SocialCategory", "ProjectCostAndFinancingPlan", "OtherFundAmount", "CancelStatus", "ExComApprove", "ExComApprovalDate"];

    static contactsColumns = ["ProjectListDataID", "Name", "PercentageOwnership", "Address", "MainShareholder", "Listed", "Rating", "Region", "Country", "TelephoneNumber", "OrganizationWebsite", "OrganizationType", "Organization", "EmailAddress", "Code", "Title", "ListDataID", "CreatedBy", "ModifiedBy", "Created", "Modified"];
}
