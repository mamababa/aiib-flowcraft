import * as React from 'react';
import { AkMetadataLabel } from 'akmii-yeeoffice-common';
import { convertDate } from './aiib-print-util';
import { AiibCommonFun } from '../common/aiib-common';

interface AiibPrintProposalSummarySheetProps {
    listData?: any;
    onLoadingClose: () => void;
}
interface AiibPrintProposalSummarySheetStatus { }
export default class AiibPrintProposalSummarySheet extends React.Component<
    AiibPrintProposalSummarySheetProps,
    AiibPrintProposalSummarySheetStatus
    > {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        this.props.onLoadingClose();
    }
    render() {

        const {
            SubmissionDate,
            ProjectName,
            CountryName,
            Sector,
            Subsector,
            ProjectDescription,
            Sponsor,
            ImplementationEntity,
            Borrower,
            ImplementationAgency,
            EndDate,
            StartDate,
            FinancingMethod,
            ExecutiveCommitteeApprovedDate,
            ProjectCostAndFinancingPlan,
            LeadFinancier,
            CoFinancingAmount,
            AIIBLoan,
            SocialCategory,
            ProjectValueAddition,
            CountryPrioritiesRelation,
            AIIBPrioritiesRelation,
            AdditionalRelevantInformation,
            AIIBValueAddition,
            AIIBValueAdditionRating, //Initial Snapshot Rating (Value addition to AIIB)
            ProjectValueAdditionRating, //Initial Snapshot Rating (Value addition to the Project)
            CountryPrioritiesRelationRating, //Initial Snapshot Rating (Relation to Country)
            AIIBPrioritiesRelationRating //Initial Snapshot Rating (Relation to AIIB)
        } = this.props.listData;
        let subSectorID: any;
        let SubsectorArr;
        if (Subsector && typeof (Subsector) === "string") {
            SubsectorArr = JSON.parse(Subsector);
        } else {
            SubsectorArr = Subsector;
        }
        const metaDataSector = AiibCommonFun.getlocalStorageSectorCategory();
        subSectorID = SubsectorArr && SubsectorArr.map((item1, index) => {
            return <div style={{ display: "inline-block", marginRight: "5px" }} key={index}><AkMetadataLabel parentID={Sector} categoryID={metaDataSector && metaDataSector.CategoryID} optionID={item1} />
                {index >= SubsectorArr.length - 1 ? "" : <span>,</span>}
            </div>;
        });
        let merge = '';
        if (LeadFinancier && CoFinancingAmount) {
            merge = `${LeadFinancier} & ${CoFinancingAmount}`;
        } else {
            merge = `${LeadFinancier || ''}  ${CoFinancingAmount || ''}`;
        }
        return (
            <div className="aiib-print-body">
                <p>AIIB PROJECT SCREENING SUMMARY SHEET</p>
                <p>FOR THE</p>
                <p>{ProjectName}</p>
                <p>IN {CountryName}</p>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <span></span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Submission Date:</div>
                            </td>
                            <td>{convertDate(SubmissionDate, true)}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Project Name</div>
                            </td>
                            <td>{ProjectName}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    <p>{FinancingMethod === "Sovereign-backed Financing" ? "Client/Borrower(s)" : "Sponsor(s)/Shareholders"}</p>
                                </div>
                            </td>
                            <td>
                                <p>{FinancingMethod === "Sovereign-backed Financing" ? Borrower : Sponsor}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    <p>
                                        <p>{FinancingMethod === "Sovereign-backed Financing" ? "Implementation Agency" : "Project Company"}</p>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <p>{FinancingMethod === "Sovereign-backed Financing" ? ImplementationAgency : ImplementationEntity}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Sector/Subsector</div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                                <AkMetadataLabel optionID={Sector} parentCode="Sector" categoryCode="Sector" /> /
								{
                                    Sector ?
                                        // <AkMetadataLabel
                                        //     optionID={Subsector}
                                        //     categoryID={metaDataSector && metaDataSector.CategoryID}
                                        //     parentID={Sector}
                                        // />
                                        subSectorID
                                        :
                                        null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Brief Project description
									<div className="aiib-print-description">
                                        (include what AIIB would finance, if known)
									</div>
                                </div>
                            </td>
                            <td>
                                {ProjectDescription}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Projected Implementation Period
									<div className="aiib-print-description">
                                        (ie. years from Board Approval to Project Close)
									</div>
                                </div>
                            </td>
                            <td>
                                {convertDate(StartDate, true)} to {convertDate(EndDate, true)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Expected Board Approval Date</div>
                            </td>
                            <td>{convertDate(ExecutiveCommitteeApprovedDate)}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Project cost & Financing Plan</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{ProjectCostAndFinancingPlan}</pre></td> */}
                            <td>{ProjectCostAndFinancingPlan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Lead Co-financier & Amount</div>
                            </td>
                            <td>
                                {merge}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">AIIB Loan/Equity/Guarantee</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{AIIBLoan}</pre></td> */}
                            <td>{AIIBLoan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Environmental & Social Category</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{SocialCategory}</pre></td> */}
                            <td>{SocialCategory}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    PPQ Criteria I: Strategic Alignment
									<div className="aiib-print-description">
                                        <div className="aiib-print-description-title">Briefly Describe:</div>
                                        <ul className="aiib-print-description-list">
                                            <li>(1) Alignment with AIIB thematic or sector priorities as relevant</li>
                                            <li>
                                                (2) Alignment with country’s own infrastructure, sector or reform
												strategies as relevant
											</li>
                                        </ul>
                                        <div className="aiib-print-description-footer">Provide Snapshot ratings</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="aiib-print-value">
                                    <div className="aiib-print-value-item">
                                        <p className="aiib-print-value-title">(1) Relation to AIIB Priorities:</p>
                                        {/* <p ><pre className="aiib-print-text">{AIIBPrioritiesRelation}</pre></p> */}
                                        <p>{AIIBPrioritiesRelation}</p>
                                        <p className="aiib-print-value-icon">
                                            Initial Snapshot Rating: ({AIIBPrioritiesRelationRating})
										</p>
                                    </div>
                                    <div className="aiib-print-value-item">
                                        <p className="aiib-print-value-title">(2) Relation to Country Priorities:</p>
                                        {/* <p ><pre className="aiib-print-text">{CountryPrioritiesRelation}</pre></p> */}
                                        <p>{CountryPrioritiesRelation}</p>
                                        <p className="aiib-print-value-icon">
                                            Initial Snapshot Rating: ({CountryPrioritiesRelationRating})
										</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    PPQ Criteria II: Value Addition
									<div className="aiib-print-description">
                                        <div className="aiib-print-description-title">Briefly Describe:</div>
                                        <ul className="aiib-print-description-list">
                                            <li>
                                                (1) What is AIIB value-add through project improvement, resource
												mobilization, partnership as relevant ?
											</li>
                                            <li>
                                                (2) What is value-add to AIIB in diversification, institutional brand,
												staff learning ?
											</li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="aiib-print-value">
                                    <div className="aiib-print-value-item">
                                        <p className="aiib-print-value-title">(1) Value addition to the Project:</p>
                                        {/* <p ><pre className="aiib-print-text">{ProjectValueAddition}</pre></p> */}
                                        <p>{ProjectValueAddition}</p>
                                        <p className="aiib-print-value-icon">
                                            Initial Snapshot Rating: ({ProjectValueAdditionRating})
										</p>
                                    </div>
                                    <div className="aiib-print-value-item">
                                        <p className="aiib-print-value-title">(2) Value addition to AIIB:</p>
                                        {/* <p ><pre className="aiib-print-text">{AIIBValueAddition}</pre></p> */}
                                        <p>{AIIBValueAddition}</p>
                                        <p className="aiib-print-value-icon">
                                            Initial Snapshot Rating: ({AIIBValueAdditionRating})
										</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Additional Relevant Information
									<div className="aiib-print-description">(if any)</div>
                                </div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{AdditionalRelevantInformation}</pre></td> */}
                            <td>{AdditionalRelevantInformation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
