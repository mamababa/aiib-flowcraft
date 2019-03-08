// import * as React from 'react';
// import { MainContent } from '../components/maincontent';
// import { AIIBLocale } from '../../locales/localeid';
// import ProposalListTable from '../../component/aiib/aiib-proposal-list';
// import { ProposalState } from '../../api/aiibworkflow/proposalModal';
// import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
// import * as moment from 'moment';
// import { AiibFormatDate } from '../../component/aiib/index';
// export interface ExComApprovedProps {

// }

// export interface ExComApprovedState {

// }

// export default class ExComApproved extends React.Component<ExComApprovedProps, ExComApprovedState>{
//     columns: AkColumnProps<any>[];
//     constructor(props, context) {
//         super(props, context);
//         this.columns = [{
//             title: "ScrCom Decision Date",
//             key: "ScreeningCommitteeApprovedDate",
//             dataIndex: "ScreeningCommitteeApprovedDate",
//             sorter: true,
//             render: (txt) => {
//                 return txt ? AiibFormatDate(txt) : null;
//             }
//         }, {
//             title: "ExCom Approval Date",
//             key: "ExecutiveCommitteeApprovedDate",
//             dataIndex: "ExecutiveCommitteeApprovedDate",
//             sorter: true,
//             render: (txt) => {
//                 return txt ? AiibFormatDate(txt) : null;
//             }
//         }];
//     }

//     renderHeader() {
//         return <div>
//             <span className="ak-header-title-sub1">Proposal Pool</span>
//             <span className="ak-header-title-line">/</span>
//             <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.ExComApproved })}</span>
//         </div>;
//     }

//     render() {
//         return <MainContent Header={this.renderHeader()}>
//             <ProposalListTable
//                 privateColumns={this.columns}
//                 state={ProposalState.ExComApproved} />
//         </MainContent>;
//     }

// }
