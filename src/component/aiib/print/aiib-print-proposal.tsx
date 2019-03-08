import * as React from 'react';
import { AiibContentListDefs } from '../../../api/aiibworkflow/aiib-content-list';
import { AkAvatar, AkMetadataLabel } from 'akmii-yeeoffice-common';
import { AiibCommonFun } from '../index';

interface AiibPrintProposalProps {
    listData?: any;
    onLoadingClose: () => void;
}
interface AiibPrintProposalStatus {
    listDefs: AiibContentListDefs[];
}
interface ProposalPrintPage {
    Field: string[];
    Name: string;
}
interface ProposalPrintModel {
    ProjectInformation: ProposalPrintPage;
    FinancialInformation: ProposalPrintPage;
    OtherInformation: ProposalPrintPage;
    ToBeClearedBy: ProposalPrintPage;
    ProjectCompany?: ProposalPrintPage;
}
export default class AiibPrintProposal extends React.Component<AiibPrintProposalProps, AiibPrintProposalStatus> {
    sovereignField: ProposalPrintModel = {
        ProjectInformation: {
            Name: 'Project Information',
            Field: [
                'Project Name',
                'Project Short Name',
                'Country ID',
                'Region',
                'Location',
                "Project Objective",
                'Project Description',
                'Current Status',
                'Sector',
                'Subsector',
                'Fiscal Year',
                'Quarter',
                'Alignment with AIIB Thematic Priorities',
                'Thematic Priorities: Others',
                'Client Type',
                'Client/Borrower(s)',
                'Implementation Agency',
            ]
        },
        FinancialInformation: {
            Name: 'Financial Information',
            Field: [
                'Total Estimated Project Investment (US$ MM)',
                'Product Type',
                'Request for Loan from AIIB (US$ MM)',
                'Request for Guarantee from AIIB (US$ MM)',
                'Amount of AIIB Financing/Investment (Required) (US$ MM)',
                'Estimated Financing Amount from AIIB (US$ MM)',
                'Other Sources of Fund',
                'Other Sources of Funds (US$ MM)',
                'Financing Gap (US$ MM)'
            ]
        },
        OtherInformation: {
            Name: 'Other Information',
            Field: [
                'Preliminary Assessment of Environmental and Social Impacts',
                'Government Support and Regulations',
                'Outline of government regulations on exchange controls and conditions of capital entry and repatriation',
                'Created By'
            ]
        },
        ToBeClearedBy: {
            Name: 'To Be Cleared By',
            Field: ['Manager IO', 'DG IO']
        }
    };
    nonsovereignField: ProposalPrintModel = {
        ProjectInformation: {
            Name: 'Project Information',
            Field: [
                'Project Name',
                'Project Short Name',
                'Country ID',
                'Region',
                'Location',
                'Project Description',
                "Project Objective",
                'Current Status',
                'Sector',
                'Subsector',
                'Fiscal Year',
                'Quarter',
                'Alignment with AIIB Thematic Priorities',
                'Thematic Priorities: Others',
                'Private Capital Mobilization',
                'South-South Cooperation',
                'PPP',
                'NDA',
                'Information Security Level',
                'Sources and Uses of Funds',
                'Client Type',
                'Sponsor(s)/Shareholders',
                'Project Company',
            ]
        },
        FinancialInformation: {
            Name: 'Financial Information',
            Field: [
                'Total Estimated Project Investment (US$ MM)',
                'Equity from Sponsors (US$ MM)',
                'Product Type',
                'Request for Loan from AIIB (US$ MM)',
                'Request for Guarantee from AIIB (US$ MM)',
                'Request for Equity from AIIB (US$ MM)',
                'Request for Mezzanine from AIIB (US$ MM)',
                'Other Type of Financing from AIIB (US$ MM)',
                'Amount of AIIB Financing/Investment (Required) (US$ MM)',
                'Estimated Financing Amount from AIIB (US$ MM)',
                'Other Sources of Fund',
                'Other Sources of Funds (US$ MM)',
                'Financing Gap (US$ MM)',
                'Guarantor',
                'Security Type',
                'Security Location',
                'Sen. Loan Amount (US$ MM)',
                'Sen. Loan Rate',
                'Sen. Loan Repayment Start Date',
                'Sen. Loan Repayment End Date',
                'Sen. Loan Amortization Method',
                'Mobilization Amount (US$ MM)',
                'Mobilization Rate',
                'Mobilization Repayment Start Date',
                'Mobilization Repayment End Date',
                'Mobilization Amortization Method',
                'Likely Mobilization Source',
                'Sub-ordinated Loan Amount (US$ MM)',
                'Sub-ordinated Loan Rate or Comp Description',
                'Sub-ordinated Loan Maturity Start Date',
                'Sub-ordinated Loan Maturity End Date',
                'Sub-ordinated Loan Amortization Method',
                'Equity Straight/Preferred',
                'Equity Amount (US$ MM)',
                'Equity Percentage',
                'Number of Shares'
            ]
        },
        OtherInformation: {
            Name: 'Other Information',
            Field: [
                'Address for Sponsor',
                'Percentage Ownership for Sponsor',
                'Main ShareHolder (s)',
                'Listed',
                'Brief Introduction of Sponsor',
                'External Consultants',
                'Preliminary Assessment of Environmental and Social Impacts',
                'Government Support and Regulations',
                'Outline of government regulations on exchange controls and conditions of capital entry and repatriation',
                'Created By'
            ]
        },
        ToBeClearedBy: {
            Name: 'To Be Cleared By',
            Field: ['Manager IO', 'DG IO']
        },
        ProjectCompany: {
            Name: 'Project Company',
            Field: [
                'Company Name',
                'Address for Project Company',
                'Rating for Project Company',
                'Main ShareHolder(s) for Project Company',
                'Listed for Project Company'
            ]
        }
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            listDefs: []
        };
    }
    componentWillMount() {
        const listDefs = AiibCommonFun.getlocalStorageListDefsData();
        this.props.onLoadingClose();
        this.setState({ listDefs: listDefs });

    }
    getField() {
        const { listData } = this.props;
        let newField: ProposalPrintModel;
        if (listData.FinancingMethod === 'Sovereign-backed Financing') {
            newField = this.sovereignField;
        } else if (listData.FinancingMethod === 'Nonsovereign-backed Financing') {
            newField = this.nonsovereignField;
        }
        return newField;
    }
    getTdData(item: string) {
        const { listDefs } = this.state;
        const { listData } = this.props;
        const newItem = listDefs.find((i) => i.DisplayName === item);
        return {
            Name: item,
            Value: listData[newItem.InternalName],
            Type: newItem.Type
        };
    }
    getTdValue(obj) {
        const { listData } = this.props;
        const Sector = AiibCommonFun.getlocalStorageSectorCategory();
        let newValue: any = <pre className="aiib-print-text">{obj.Value}</pre>;
        let SubsectorArr;

        if (obj.Type === 'metadata') {
            if (obj.Name === 'Sector') {
                newValue = <pre className="aiib-print-text"><AkMetadataLabel optionID={obj.Value} parentCode="Sector" categoryCode="Sector" /></pre>;
            }
        } else if (obj.Type === 'identity-picker') {
            if (Array.isArray(obj.Value)) {
                newValue = obj.Value.map((item, index) => {
                    return <pre className="aiib-print-text"><AkAvatar key={index} attr="Name" type="text" value={item} /></pre>;
                });
            }
            else {

                newValue = <pre className="aiib-print-text"><AkAvatar attr="Name" type="text" value={obj.Value} /></pre>;
            }
        } else if (obj.Name === 'Country ID') {
            newValue = <pre className="aiib-print-text">{listData.CountryName}</pre>;
        } else if (obj.Type === 'checkbox') {
            // newValue = obj.Value ? JSON.parse(obj.Value).join(' , ') : '';
            if (obj.Name !== "Subsector") {
                newValue = <pre className="aiib-print-text">{obj.Value.join(' , ')}</pre>;
            } else {
                if (listData.Sector) {
                    let subSectorID: any;
                    if (obj.Value && typeof (obj.Value) === "string") {
                        SubsectorArr = JSON.parse(obj.Value);
                    } else {
                        SubsectorArr = obj.Value;
                    }
                    subSectorID = SubsectorArr && SubsectorArr.map((item1, index) => {
                        return <div style={{ display: "inline-block", marginRight: "5px" }} key={index}><AkMetadataLabel parentID={listData.Sector} categoryID={Sector && Sector.CategoryID} optionID={item1} />
                            {index >= SubsectorArr.length - 1 ? "" : <span>,</span>}
                        </div>;
                    });

                    newValue = <pre className="aiib-print-text">{subSectorID}</pre>;
                } else {
                    newValue = '';
                }
            }


        } else if (obj.Name === "Product Type") {
            newValue = <pre className="aiib-print-text">{obj.Value.join(' , ')}</pre>;
        }
        return newValue;
    }
    renderDiv() {
        const fields = this.getField();
        let content: React.ReactNode[] = [];
        let divIndex = 1;
        for (const printModel in fields) {
            if (fields.hasOwnProperty(printModel)) {
                let obj: ProposalPrintPage = fields[printModel];
                let objDiv: React.ReactNode = (
                    <div key={divIndex}>
                        <p className='aiib-print-subtitle'>{divIndex + ' ' + obj.Name}</p>
                        <table>
                            <thead>
                                <tr>
                                    <td>

                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {obj.Field.map((i, index) => {
                                    const data = this.getTdData(i);
                                    return (
                                        <tr key={index}>
                                            <td><div className="aiib-print-key">{data.Name}</div></td>
                                            <td>{this.getTdValue(data)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
                content.push(objDiv);
                divIndex++;
            }
        }
        return content;
    }
    render() {
        const { listDefs } = this.state;
        if (listDefs.length === 0) return null;
        return (
            <div className="aiib-print-body">
                <p>Proposal Form Page</p>
                {this.renderDiv()}
            </div>
        );
    }
}
