import { AkContext } from 'akmii-yeeoffice-common';
import { validateProposalFields, validateMemberFields, validateNSBFProposalFields, validateSBFProposalFields } from '../../../api/aiibworkflow/common';
import { DocumentFolderType } from '../../../api/document/document-sp-api';
import {
    SATGE_CONCEPT,
    SATGE_APPRAISAL,
    SATGE_INTERM_FINALREVIEW,
    SATGE_NEGOTIATION,
    SATGE_BOARDAPPROVAL,
    SATGE_BOARDAPPROVED,
    NONSOVEREIGN_BACKEDFINACING,
} from '../../../util/aiib-common';
import { AkNotification, AkGlobal } from 'akmii-yeeoffice-common';
import { UserGroupsModel, AiibContentListDefs } from '../../../api/aiibworkflow/aiib-content-list';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { AIIBLocale } from '../../../locales/localeid';
export class AiibCommonFun {
    static ProjectDocumentFolderType(variable): DocumentFolderType {
        let documentFolderType: number;
        switch (variable.Stage) {
            /**Concept*/
            case SATGE_CONCEPT:
                documentFolderType = DocumentFolderType.Proposal;
                break;
            /**Appraisal/Interim/Final Review*/
            case SATGE_APPRAISAL:
            case SATGE_INTERM_FINALREVIEW:
                documentFolderType = DocumentFolderType.Concept;
                break;
            /**Negotiation*/
            case SATGE_NEGOTIATION:
                documentFolderType = DocumentFolderType.Appraisal;
                break;
            /**Board Approval*/
            case SATGE_BOARDAPPROVAL:
                if (variable.FinancingMethod === 'Sovereign-backed Financing') {
                    documentFolderType = DocumentFolderType.Negotiation;
                } else {
                    documentFolderType = DocumentFolderType.InterimOrFinal;
                }
                break;
            /**Board Approved*/
            case SATGE_BOARDAPPROVED:
                documentFolderType = DocumentFolderType.BoardApproval;
                break;
            default:
                documentFolderType = DocumentFolderType.Proposal;
        }

        return documentFolderType;
    }

    static ValidateProposalForm(variable) {
        let RequiredProposalFields = validateProposalFields;
        if (variable.FinancingMethod === NONSOVEREIGN_BACKEDFINACING) {
            RequiredProposalFields = [...validateProposalFields, ...validateNSBFProposalFields];
        } else {
            RequiredProposalFields = [...validateProposalFields, ...validateSBFProposalFields];
        }
        for (let i = 0; i < RequiredProposalFields.length; i++) {
            const d = RequiredProposalFields[i];
            if (variable.hasOwnProperty(d.key)) {
                if (!variable[d.key] || (Array.isArray(variable[d.key]) && variable[d.key].length === 0)) {
                    AkNotification.error({
                        message: "Tip",
                        description: AkGlobal.intl.formatMessage({ id: AIIBLocale.AIIBRequireformtips })
                    });
                    return true;
                }
            }
            // if (variable.OtherFund === "Yes") {
            //     let OtherFoundsDetails = variable["OtherFoundsDetails"];
            //     if ((typeof variable["OtherFoundsDetails"] === "string") && variable["OtherFoundsDetails"].startsWith("[")) {
            //         OtherFoundsDetails = JSON.parse(variable["OtherFoundsDetails"]);
            //     }
            //     if (!OtherFoundsDetails || OtherFoundsDetails.length === 0 || OtherFoundsDetails.filter(item => !item.Amount).length > 0) {
            //         AkNotification.error({
            //             message: "Tip",
            //             description: AkGlobal.intl.formatMessage({ id: AIIBLocale.AIIBRequireformtips })
            //         });
            //         return true;
            //     }
            // }
        }
        return false;
    }

    static validateMemberForm(listData) {
        for (let i = 0; i < validateMemberFields.length; i++) {
            const d = validateMemberFields[i];
            if (listData.hasOwnProperty(d.key)) {
                if (Array.isArray(listData[d.key]) && listData[d.key].length === 0) {
                    AkNotification.error({
                        message: "Tip",
                        description: AkGlobal.intl.formatMessage({ id: AIIBLocale.AIIBRequireformtips })
                    });
                    return true;
                } else {
                    if (!listData[d.key]) {
                        AkNotification.error({
                            message: "Tip",
                            description: AkGlobal.intl.formatMessage({ id: AIIBLocale.AIIBRequireformtips })
                        });
                        return true;
                    }
                }


            }
        }
        return false;
    }

    static UserIsManager(userGroups: UserGroupsModel[]) {
        let isManager = false;
        const manager = userGroups.filter((item) => item && item.Ext2 && item.Ext2.indexOf('Manager') > -1);
        const readonlygroup = userGroups.filter(item => item && item.Code === "Readonly");
        if(readonlygroup.length > 0) {
            return true;
        }else {
            isManager = manager.length > 0 || AkContext.getUser().IsAdmin; 
            return isManager;
        }
    }
    static UserIsReadOnly(userGroups:UserGroupsModel[]) {
        const userGrops = userGroups.filter(item => item && item.Ext1 === "UserGroup");
        const isReadOnly = userGrops.find(item => item.Code === "Readonly");
        return !isNullOrUndefined(isReadOnly);
    }

    static UserGropPromission(userGroups: UserGroupsModel[], role: string) {
        let hasPrimission = false;
        const arr = userGroups.filter((item) => item && item.Ext2 && item.Ext2.indexOf(role) > -1);
        hasPrimission = arr.length > 0 || AkContext.getUser().IsAdmin;
        return hasPrimission;
    }

    static getlocalStorageListDefsData() {
        const AIIBListDate = localStorage.getItem('AIIBListDate');
        if (AIIBListDate) {
            return JSON.parse(AIIBListDate).ListDefs;
        }
    }

    static getlocalStorageSectorCategory() {
        const SectorCategory = localStorage.getItem('SectorCategory');
        if (SectorCategory) {
            return JSON.parse(SectorCategory).Sector;
        }
    }

    static onContrastValues(values, allData) {
        if (values["OtherFoundsDetails"] && JSON.stringify(allData["OtherFoundsDetails"]) === "[]") {
            allData["OtherFoundsDetails"] = [{}];
        }
        if (values["Subsector"] && allData && allData.Subsector !== "" && typeof (allData.Subsector) === "string") {
            allData.Subsector = JSON.parse(allData.Subsector);
        }
        // Subsector默认把null改成[]
        // if (!values["Subsector"]) {
        //     values["Subsector"] = [];
        // }
        if (values["Subsector"] === null) {
            values["Subsector"] = [];
        }
        const listDefs = AiibCommonFun.getlocalStorageListDefsData();
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                if (!listDefs) return;
                const field = listDefs.find(item => item.InternalName === key);
                if (!field && !allData) return true;
                if (field.Type === "input_number") {
                    if ((values[key] || allData[key]) && parseFloat(values[key]) !== parseFloat(allData[key])) {

                        return parseFloat(values[key]) !== parseFloat(allData[key]);
                    }
                } else if (field.Type === "datepicker") {
                    if (moment(values[key]).format("MM-DD-YYYY") !== moment(allData[key]).format("MM-DD-YYYY")) {

                        return moment(values[key]).format("MM-DD-YYYY") !== moment(allData[key]).format("MM-DD-YYYY");
                    }
                } else if (field.Type === "identity-picker") {
                    if (Array.isArray(values[key])) {
                        if (JSON.stringify(values[key]) !== JSON.stringify(allData[key]))

                            return JSON.stringify(values[key]) !== JSON.stringify(allData[key]);
                    } else if (values[key] !== allData[key]) {
                        return values[key] !== allData[key];
                    }
                } else if (field.Type !== "datepicker" && field.Type !== "input_number" && field.Type !== "identity-picker" && JSON.stringify(values[key]) !== JSON.stringify(allData[key])) {
                    if (key === "OtherFoundsDetails" && (values[key] || allData[key]) && JSON.stringify(values[key]) !== allData[key]) {
                        return JSON.stringify(values[key]) !== allData[key];
                    } else if ((values[key] || allData[key]) && key !== "OtherFoundsDetails") {
                        if (key === "FinancingType" && (values[key] !== "Standalone" && !allData[key]) && JSON.stringify(values[key]) !== JSON.stringify(allData[key])) {
                            return JSON.stringify(values[key]) !== JSON.stringify(allData[key]);
                        } else if (key !== "FinancingType") {
                            return JSON.stringify(values[key]) !== JSON.stringify(allData[key]);
                        }

                    }
                }

            }
        }
        return false;
    }

    static setValuesStringfy(values) {
        for (const key in values) {

            // if(key === "OtherFoundsDetails"){
            //     values.OtherFoundsDetails = values.OtherFoundsDetails ?
            //     values.OtherFoundsDetails.filter(item => item.Amount !== null) : [];
            //     // values.OtherFoundsDetails =JSON.stringify(values.OtherFoundsDetails );
            // }
            if (values[key] && (Array.isArray(values[key]))) {
                values[key] = JSON.stringify(values[key]);
            }

            if (isNullOrUndefined(values[key])) {
                values[key] = "";
            }
        }
        return values;
    }
}

export enum AiibFormType {
    proposalSovereign,
    proposalNonsovereign,
    projectSovereign,
    projectNonsovereign
}
export enum AiibPageType {
    ProjectInformation,
    FinancialInformation,
    OtherInformation,
    ToBeClearedBy,
    ProjectCompany
}
export interface AiibFormModel {
    InternalName: string;
    PageType: AiibPageType;
    DisplayName?: string;
    Type?: string;
    FieldID?: string;
    FieldName?: string;
}
export class AiibCommon {
    static proposalSovereignFormField: AiibFormModel[] = [
        {
            InternalName: 'ProjectName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectShortName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Country',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Region',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Location',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Sponsor',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ImplementationEntity',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectDescription',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'PreparationStatus',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Sector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Subsector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FiscalYear',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Quarter',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPriorities',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPrioritiesComment',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FinancingMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Product',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'TotalEstimatedCost',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Financing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'EstimatedLoanAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Loan',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'GuaranteeRequest',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Mezzanine',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'FinancingGap',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFund',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFundAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'PreliminaryAssessment',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'GovernmentSupport',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'OutlineAndConditions',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'CreatedBy',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'ManagerIO',
            PageType: AiibPageType.ToBeClearedBy
        },
        {
            InternalName: 'DGIO',
            PageType: AiibPageType.ToBeClearedBy
        }
    ];
    static proposalNonsovereignFormField: AiibFormModel[] = [
        {
            InternalName: 'ProjectName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectShortName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Country',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Region',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Location',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Sponsor',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ImplementationEntity',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectDescription',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'PreparationStatus',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Sector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Subsector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FiscalYear',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Quarter',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPriorities',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPrioritiesComment',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Mobilization',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'South_South',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'PPP',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'NDA',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'InformationSecurityLevel',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FundSourcesAndUses',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FinancingMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Product',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'TotalEstimatedCost',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Financing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'EstimatedLoanAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Loan',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'GuaranteeRequest',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Mezzanine',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Equity',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFinancing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'FinancingGap',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFund',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFundAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'EquityFromSponsors',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Guarantor',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SecurityType',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SecurityLocation',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanRate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanTenorStartDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanTenorEndDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanAmortizationMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationRate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationMaturityStartDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationMaturityEndDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationAmortizationMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'LikelyMobilizationSource',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanRate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanMaturityStartDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanMaturityEndDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanAmortizationMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'E_StraightPreferred',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'E_Amount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'E_Percentage',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SharesNumber',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'S_Address',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'S_PercentageOwnership',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'S_MainShareHolder',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'S_Listed',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'SponsorIntroduction',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'ExternalConsultants',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'PreliminaryAssessment',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'GovernmentSupport',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'OutlineAndConditions',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'CreatedBy',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'ManagerIO',
            PageType: AiibPageType.ToBeClearedBy
        },
        {
            InternalName: 'DGIO',
            PageType: AiibPageType.ToBeClearedBy
        },
        {
            InternalName: 'CompanyName',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_Address',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_Rating',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_MainShareHolder',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_Listed',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'ScreeningCommitteeApprovedDate',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'ExecutiveCommitteeApprovedDate',
            PageType: AiibPageType.OtherInformation
        }
    ];
    static ProposalClientandAgencyField: AiibFormModel[] = [
        {
            InternalName: "Borrower",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "ImplementationAgency",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "LeadFinancier",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "OtherFinanciers",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "SocialCategory",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "ProjectCostAndFinancingPlan",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "AIIBLoan",
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: "AdditionalRelevantInformation",
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: "StartDate",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "EndDate",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName:"ProjectObjective",
            PageType:AiibPageType.ProjectInformation
        }
    ];
    static projectSovereignFormField: AiibFormModel[] = [
        {
            InternalName: 'ProjectName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectShortName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName:"ProjectObjective",
            PageType:AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Borrower',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ImplementationAgency',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "ExpectedLoanClosingDate",
            PageType: AiibPageType.ProjectInformation
        },
        // {
        //     InternalName: 'Sponsor',
        //     PageType: AiibPageType.ProjectInformation
        // },
        // {
        //     InternalName: 'ImplementationEntity',
        //     PageType: AiibPageType.ProjectInformation
        // },
        {
            InternalName: 'Sector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Subsector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectDescription',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'StartDate',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'EndDate',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPriorities',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPrioritiesComment',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ExecutiveCommitteeApprovedDate',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FinancingMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Product',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'TotalEstimatedCost',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'FinancingType',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Loan',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'GuaranteeRequest',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Mezzanine',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFinancing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: "OtherFund",
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: "OtherFoundsDetails",
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFundAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Financing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: "EstimatedLoanAmount",
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'LeadFinancier',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFinanciers',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SocialCategory',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'ProjectRisk',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Probability',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'BODPipelinePresentation',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'DisbursementConditions',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'KeyCovenants',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'PolicyAssuranceComment',
            PageType: AiibPageType.FinancialInformation
        }
    ];
    static projectNonsovereignFormField: AiibFormModel[] = [
        {
            InternalName: 'ProjectName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectShortName',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName:"ProjectObjective",
            PageType:AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Sponsor',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ImplementationEntity',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "StartDate",
            PageType: AiibPageType.ProjectInformation
        }, {
            InternalName: "EndDate",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "ExpectedLoanClosingDate",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Sector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Subsector',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPriorities',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ThematicPrioritiesComment',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ProjectDescription',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'ExecutiveCommitteeApprovedDate',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'Mobilization',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'South_South',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'PPP',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'NDA',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'InformationSecurityLevel',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FundSourcesAndUses',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'FinancingMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Product',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'TotalEstimatedCost',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'FinancingType',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Loan',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'GuaranteeRequest',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Mezzanine',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Equity',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFinancing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: "OtherFund",
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: "OtherFoundsDetails",
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFundAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Financing',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: "EstimatedLoanAmount",
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'LeadFinancier',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'OtherFinanciers',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SocialCategory',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'ProjectRisk',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Probability',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'BODPipelinePresentation',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'DisbursementConditions',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'KeyCovenants',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'PolicyAssuranceComment',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'EquityFromSponsors',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Guarantor',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SecurityType',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SecurityLocation',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanRate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanTenorStartDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanTenorEndDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'Sen_LoanAmortizationMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationRate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationMaturityStartDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationMaturityEndDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'MobilizationAmortizationMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'LikelyMobilizationSource',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanAmount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanRate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanMaturityStartDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanMaturityEndDate',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SO_LoanAmortizationMethod',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'E_StraightPreferred',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'E_Amount',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'E_Percentage',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'SharesNumber',
            PageType: AiibPageType.FinancialInformation
        },
        {
            InternalName: 'S_Address',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'S_PercentageOwnership',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'S_MainShareHolder',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'S_Listed',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'CommitmentDate',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'CompanyName',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_Address',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_Rating',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_MainShareHolder',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'PI_Listed',
            PageType: AiibPageType.ProjectCompany
        },
        {
            InternalName: 'ConceptDate',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'AppraisalDate',
            PageType: AiibPageType.OtherInformation
        },
        {
            InternalName: 'NegotiationDate',
            PageType: AiibPageType.OtherInformation
        },
        // {
        //     InternalName: 'BoardApprovalDate',
        //     PageType: AiibPageType.OtherInformation
        // }
    ];
    static ProjectIDAndDateField: AiibFormModel[] = [
        {
            InternalName: "ProjectID",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'StartDate',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: 'EndDate',
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "Borrower",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "ImplementationAgency",
            PageType: AiibPageType.ProjectInformation
        },
        {
            InternalName: "ScreeningCommitteeApprovedDate",
            PageType: AiibPageType.OtherInformation
        }, {
            InternalName: "DGIO",
            PageType: AiibPageType.OtherInformation,
        }, {
            InternalName: "ManagerIO",
            PageType: AiibPageType.OtherInformation
        }
    ];
    static listDefs: AiibContentListDefs[] = AiibCommonFun.getlocalStorageListDefsData();

    static getAiibFormList(type: AiibFormType) {
        let fields: AiibFormModel[] = [];
        let list: AiibFormModel[] = [];
        switch (type) {
            case AiibFormType.proposalSovereign:
                fields = AiibCommon.proposalSovereignFormField;
                break;
            case AiibFormType.proposalNonsovereign:
                fields = AiibCommon.proposalNonsovereignFormField;
                break;
            case AiibFormType.projectSovereign:
                fields = AiibCommon.projectSovereignFormField;
                break;
            case AiibFormType.projectNonsovereign:
                fields = AiibCommon.projectNonsovereignFormField;
                break;
        }
        list = fields.map((i) => {
            let item = AiibCommon.listDefs.find((j) => j.InternalName === i.InternalName);
            return {
                InternalName: i.InternalName,
                PageType: i.PageType,
                DisplayName: item.DisplayName,
                Type: item.Type,
                FieldID: item.FieldID,
                FieldName: item.FieldName
            };
        });
        return list;
    }
    static filterPageType(data: AiibFormModel[], type: AiibPageType) {
        return data.filter((i) => i.PageType === type);
    }
}
