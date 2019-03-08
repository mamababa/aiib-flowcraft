import * as React from "react";
import AiibReportPage from './report';
export default class ProposalReport extends React.Component<any,any>{
    render(){
        return <AiibReportPage isProposal={true} />;

    }
}
