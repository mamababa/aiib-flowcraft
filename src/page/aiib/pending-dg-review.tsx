import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProposalListTable from '../../component/aiib/aiib-proposal-list';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
export interface PendingDgReviewProps {

}

export interface PendingDgReviewState {

}

export default class PendingDgReview extends React.Component<PendingDgReviewProps, PendingDgReviewState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Proposal Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.PendingDgReview })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProposalListTable
                state={ProposalState.DGReview} />
        </MainContent>;
    }

}
