import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import { ProposalState } from '../../api/aiibworkflow/proposalModal';
import { ProposalListTable } from '../../component/aiib/index';
import { AkColumnProps, AkGlobal } from 'akmii-yeeoffice-common';
export interface PendingScrComProps {

}

export interface PendingScrComState {

}

export default class PendingScrCom extends React.Component<PendingScrComProps, PendingScrComState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);

    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Proposal Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.PendingScrCom })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProposalListTable
                state={ProposalState.PendingScrCom} />
        </MainContent>;
    }

}
