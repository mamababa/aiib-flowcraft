import * as React from 'react';
import { ContentListApi, CustonDataGetTitleRequest,AkLookupLabel } from 'akmii-yeeoffice-common';
import { AiibContentListDefs } from '../../../api/aiibworkflow/aiib-content-list';

interface AiibPrintContactsProps {
	listData?: any;
    metaData?: any;
    onLoadingClose:()=>void;
}
interface AiibPrintContactsStatus {
    Contact?:any;
    Sponsor?:any;
    Borrower?:any;
}
export default class AiibPrintContacts extends React.Component<AiibPrintContactsProps, AiibPrintContactsStatus> {
	Title = 'Contact';
	constructor(props, context) {
        super(props, context);
        this.state={
            Contact:null,
            Sponsor:null,
            Borrower:null,
        };
	}
	componentWillMount() {
		if (this.props.listData) {
			this.getDefs();
		}
	}
	async getDefs() {
		const data = await ContentListApi.GetDefsByTitle({ Title: this.Title });
		this.getContentList(data.Data);
	}
	getContentList(data: AiibContentListDefs[]) {
		const { ListDataID } = this.props.listData;

		const getReqeust: CustonDataGetTitleRequest = {
			Title: this.Title,
			Columns: data.map((i) => i.InternalName),
			Wheres: [
				{
					WhereName: 'ProjectListDataID',
					Value: ListDataID,
					Type: 0,
					Pre: 'and'
				}
			]
		};
		ContentListApi.GetDataByTitle(getReqeust).then((d) => {
			if (d.Status === 0 && d.Data.length > 0) {
                let Contact:any={};
                let Sponsor:any={};
                let Borrower:any={};
                d.Data.forEach(i => {
                    if(i.Code === 'Contact'){
                        Contact = i;
                    }else if(i.Code === 'Sponsor'){
                        Sponsor = i;
                    }else if(i.Code === 'Borrower'){
                        Borrower = i;
                    }
                });
                this.setState({Contact,Sponsor,Borrower});
            }
            this.props.onLoadingClose();
		});
	}
	render() {
        const {Contact,Sponsor,Borrower} =this.state;
		return (
			<div className="aiib-print-body">
				<p>1.Contact Information</p>
                <table>
                    <thead>
						<tr>
							<td>
							</td>
						</tr>
					</thead>
                    <tbody>
                        <tr>
                            <td><div className="aiib-print-key">Name of Contact</div></td>
                            <td>{Contact && Contact.Name}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Title</div></td>
                            <td>{Contact && Contact.Title}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Email Address</div></td>
                            <td>{Contact && Contact.EmailAddress}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Organization</div></td>
                            <td>{Contact && Contact.Organization}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Organization Type</div></td>
                            <td>{Contact && Contact.OrganizationType}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Organization Website</div></td>
                            <td>{Contact && Contact.OrganizationWebsite}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Telephone Number</div></td>
                            <td>{Contact && Contact.TelephoneNumber}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Country</div></td>
                            <td>
                                <AkLookupLabel
                                    listID="983646342767316992"
                                    value={Contact && Contact.Country}
                                    listFieldName="Text1" />
                            </td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Region</div></td>
                            <td>{Contact && Contact.Region}</td>
                        </tr>
                    </tbody>
                </table>
				<p style={{marginTop:20}}>2.Sponsor Information</p>
                <table>
                    <thead>
						<tr>
							<td>
							</td>
						</tr>
					</thead>
                    <tbody>
                        <tr>
                            <td><div className="aiib-print-key">Name of Contact</div></td>
                            <td>{Sponsor && Sponsor.Name}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Title</div></td>
                            <td>{Sponsor && Sponsor.Title}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Email Address</div></td>
                            <td>{Sponsor && Sponsor.EmailAddress}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Telephone Number</div></td>
                            <td>{Sponsor && Sponsor.TelephoneNumber}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Country</div></td>
                            <td>
                                <AkLookupLabel
                                    listID="983646342767316992"
                                    value={Sponsor && Sponsor.Country}
                                    listFieldName="Text1" />
                            </td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Region</div></td>
                            <td>{Sponsor && Sponsor.Region}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Address</div></td>
                            <td>{Sponsor && Sponsor.Address}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Rating</div></td>
                            <td>{Sponsor && Sponsor.Rating}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Main Shareholder(s)</div></td>
                            <td>{Sponsor && Sponsor.MainShareholder}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Listed</div></td>
                            <td>{Sponsor && Sponsor.Listed}</td>
                        </tr>
                    </tbody>
                </table>
				<p style={{marginTop:20}}>3.Borrower Information</p>
                <table>
                    <thead>
						<tr>
							<td>
							</td>
						</tr>
					</thead>
                    <tbody>
                        <tr>
                            <td><div className="aiib-print-key">Name of Contact</div></td>
                            <td>{Borrower && Borrower.Name}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Title</div></td>
                            <td>{Borrower && Borrower.Title}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Email Address</div></td>
                            <td>{Borrower && Borrower.EmailAddress}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Telephone Number</div></td>
                            <td>{Borrower && Borrower.TelephoneNumber}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Country</div></td>
                            <td>
                                <AkLookupLabel
                                    listID="983646342767316992"
                                    value={Borrower && Borrower.Country}
                                    listFieldName="Text1" />
                            </td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Address</div></td>
                            <td>{Borrower && Borrower.Address}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Percentage Ownership</div></td>
                            <td>{Borrower && Borrower.PercentageOwnership}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Main Shareholder(s)</div></td>
                            <td>{Borrower && Borrower.MainShareholder}</td>
                        </tr>
                        <tr>
                            <td><div className="aiib-print-key">Listed</div></td>
                            <td>{Borrower && Borrower.Listed}</td>
                        </tr>
                    </tbody>
                </table>
			</div>
		);
	}
}
