import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import ProposalListTable from '../../component/aiib/aiib-proposal-list';
import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
export interface ScrComApprovedProps {

}

export interface ScrComApprovedState {

}

export default class ScrComApproved extends React.Component<ScrComApprovedProps, ScrComApprovedState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Proposal Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.ScrComApproved })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProposalListTable
                state={ProposalState.ScrComApproved} />
        </MainContent>;
    }

}
