import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import { ProposalListTable } from '../../component/aiib';
import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
export interface AllProposalProps {

}

export interface AllProposalState {

}

export default class AllProposal extends React.Component<AllProposalProps, AllProposalState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Proposal Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.AllProposal })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProposalListTable
                state={ProposalState.AllProposal} />
        </MainContent>;
    }

}
