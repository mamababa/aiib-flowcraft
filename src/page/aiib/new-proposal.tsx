import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import { withRouter } from 'react-router';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import { ProposalListTable } from '../../component/aiib/index';
import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
export interface NewProposalProps {

}

export interface NewProposalState {
}
@withRouter
export default class NewProposal extends React.Component<NewProposalProps, NewProposalState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
        this.columns = [];
    }


    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Proposal Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.NewProposal })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProposalListTable
                privateColumns={this.columns}
                state={ProposalState.NewProposal} />
        </MainContent>;
    }
}
