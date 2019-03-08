import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import { withRouter } from 'react-router';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import { ProposalListTable } from '../../component/aiib/index';
import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
export interface MyProposalProps {

}

export interface MyProposalState {
}
@withRouter
export default class MyProposal extends React.Component<MyProposalProps, MyProposalState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
    }


    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Proposal Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.MyProposal })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProposalListTable
                state={ProposalState.MyProposal} />
        </MainContent>;
    }
}
