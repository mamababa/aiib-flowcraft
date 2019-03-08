import * as React from 'react';
import { AkImg, AkMetadataLabel, AkAvatar, AkSpin } from 'akmii-yeeoffice-common';
import { convertDate } from './aiib-print-util';
import { AiibCommonFun } from '../common/aiib-common';

interface AiibPrintProjectSummarySheetProps {
    listData?: any;
    onLoadingClose: () => void;
}
interface AiibPrintProjectSummarySheetStatus {
    // groupUser?: any;
}
export default class AiibPrintProjectSummarySheet extends React.Component<
    AiibPrintProjectSummarySheetProps,
    AiibPrintProjectSummarySheetStatus
    > {
    constructor(props, context) {
        super(props, context);
        this.props.onLoadingClose();
    }
    render() {
        const {
            ProjectName,
            ProjectID,
            Sponsor,
            ImplementationEntity,
            Borrower,
            ImplementationAgency,
            Sector,
            Subsector,
            ProjectObjective,
            ProjectDescription,
            EndDate,
            StartDate,
            ExecutiveCommitteeApprovedDate,
            ProjectCostAndFinancingPlan,
            AIIBLoan,
            SubmissionDate,
            FinancingType,
            SocialCategory,
            ProjectRisk,
            DisbursementConditions,
            KeyCovenants,
            PolicyAssuranceComment,
            Approvers,
            Members,
            ProjectLeader,
            DGIO,
            ManagerIO,
            FinancingMethod,
            ExpectedLoanClosingDate
        } = this.props.listData;
        console.log(this.props.listData);
        // const approvers: string[] = Approvers ? JSON.parse(Approvers) : [];
        // const members: string[] = Members ? JSON.parse(Members) : [];
        // const ptm: string[] = [ ...new Set(approvers.concat(members)) ]; //需要tsconfig lib配置es6属性
        const ptm: string[] = Approvers.concat(Members).filter((item, index, array) => array.indexOf(item) === index);
        // const projectLeader: string[] = ProjectLeader ? JSON.parse(ProjectLeader) : [];
        let subSectorID: any;
        let SubsectorArr;
        const metaDataSector = AiibCommonFun.getlocalStorageSectorCategory();
        if (Subsector && typeof (Subsector) === "string") {
            SubsectorArr = JSON.parse(Subsector);
        } else {
            SubsectorArr = Subsector;
        }
        subSectorID = SubsectorArr && SubsectorArr.map((item1, index) => {
            return <div style={{ display: "inline-block", marginRight: "5px" }} key={index}><AkMetadataLabel parentID={Sector} categoryID={metaDataSector && metaDataSector.CategoryID} optionID={item1} />
                {index >= SubsectorArr.length - 1 ? "" : <span>,</span>}
            </div>;
        });
        // const { groupUser } = this.state;
        return (
            <div className="aiib-print-body">
                <div className="aiib-print-logo">
                    <AkImg
                        width={360}
                        height={70}
                        src={_spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/Img/aii-logo.jpg'}
                    />
                </div>
                <div className="aiib-print-date">
                    <p>{ProjectID}</p>
                    <p>{convertDate(SubmissionDate, true)}</p>
                </div>
                <p>PROJECT SUMMARY SHEET</p>
                <div>
                    {/* <p className='aiib-print-subtitle'>Republic of the Philippines<br /> Metro Manila Flood Management Project</p> */}
                    <p className="aiib-print-subtitle" style={{ marginTop: "10px", marginBottom: "10px" }}>{ProjectName}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Project No:</div>
                            </td>
                            <td>{ProjectID}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    <ul>
                                        <li>{FinancingMethod === "Sovereign-backed Financing" ? "Client/Borrower(s)" : "Sponsor(s)/Shareholders"}</li>
                                        <li>{FinancingMethod === "Sovereign-backed Financing" ? "Implementation Agency" : "Project Company"}</li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <ul>
                                    <li>{FinancingMethod === "Sovereign-backed Financing" ? Borrower : Sponsor}</li>
                                    <li>{FinancingMethod === "Sovereign-backed Financing" ? ImplementationAgency : ImplementationEntity}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    <p>Sector(s)</p>
                                    <p>Subsector(s)</p>
                                </div>
                            </td>
                            <td>
                                <p>
                                    <AkMetadataLabel optionID={Sector} parentCode="Sector" categoryCode="Sector" />
                                </p>
                                <p>
                                    {Sector ? (
                                        // <AkMetadataLabel
                                        //     optionID={Subsector}
                                        //     categoryID={metaDataSector && metaDataSector.CategoryID}
                                        //     parentID={Sector}
                                        // />
                                        subSectorID
                                    ) : null}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Brief Project Description</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{ProjectDescription}</pre></td> */}
                            <td>{ProjectDescription}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Project Objective</div></td>
                            <td>{ProjectObjective}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Project Implementation Period
									<div className="aiib-print-description">(Start Date and End Date)</div>
                                </div>
                            </td>
                            <td>
                                Start Date:{convertDate(StartDate, true)}
                                <br />
                                End Date:{convertDate(EndDate, true)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Expected Loan Closing Date</div>
                            </td>
                            <td>{convertDate(ExpectedLoanClosingDate, true)}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Project cost and Financing Plan</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{ProjectCostAndFinancingPlan}</pre></td> */}
                            <td>{ProjectCostAndFinancingPlan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    AIIB Loan/Equity/Guarantee
									<div className="aiib-print-description">(Size and Terms)</div>
                                </div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{AIIBLoan}</pre></td> */}
                            <td>{AIIBLoan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Co-financing
									<div className="aiib-print-description">
                                        (If any) (Co-financier(s), Size and Terms)
									</div>
                                </div>
                            </td>
                            <td>{FinancingType}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Environmental and Social Category</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{SocialCategory}</pre></td> */}
                            <td>{SocialCategory}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Project Risk
									<div className="aiib-print-description">(Low/Medium/High)</div>
                                </div>
                            </td>
                            <td>{ProjectRisk}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">
                                    Conditions for Effectiveness and Disbursement
									<div className="aiib-print-description">(If any)</div>
                                </div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{DisbursementConditions}</pre></td> */}
                            <td>{DisbursementConditions}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Key Covenants</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{KeyCovenants}</pre></td> */}
                            <td>{KeyCovenants}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Policy Assurance</div>
                            </td>
                            {/* <td><pre className="aiib-print-text">{PolicyAssuranceComment}</pre></td> */}
                            <td>{PolicyAssuranceComment}</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="aiib-print-key">President</div>
                            </td>
                            {/* <td>{groupUser && groupUser.President.join(',')}</td> */}
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Vice-President, CIO</div>
                            </td>
                            {/* <td>{groupUser && groupUser.CIO.join(',')}</td> */}
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Director General, Investment Operations</div>
                            </td>
                            <td>{<AkAvatar attr="Name" type="text" value={DGIO} />}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Manager, Investment Operations</div>
                            </td>
                            <td>{<AkAvatar attr="Name" type="text" value={ManagerIO} />}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Project Team Leader</div>
                            </td>
                            <td>
                                {ProjectLeader.map((item, index) => {
                                    if (index + 1 === ProjectLeader.length) {
                                        return (
                                            <span key={item}>
                                                <AkAvatar attr="Name" type="text" value={item} />
                                            </span>
                                        );
                                    }
                                    return (
                                        <span key={item}>
                                            <AkAvatar attr="Name" type="text" value={item} />,
										</span>
                                    );
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aiib-print-key">Project Team Members</div>
                            </td>
                            <td>
                                {ptm.map((item, index) => {
                                    if (index + 1 === ProjectLeader.length) {
                                        return (
                                            <span key={item}>
                                                <AkAvatar attr="Name" type="text" value={item} />
                                            </span>
                                        );
                                    }
                                    return (
                                        <span key={item}>
                                            <AkAvatar attr="Name" type="text" value={item} />,
										</span>
                                    );
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
