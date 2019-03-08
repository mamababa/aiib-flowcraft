import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps } from 'akmii-yeeoffice-common';
import { AiibFormatDate, AiibPromissionControl } from '../../component/aiib/index';
export interface BoardApprovalStageProps {

}

export interface BoardApprovalStageState {

}

export default class BoardApprovalStage extends React.Component<BoardApprovalStageProps, BoardApprovalStageState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: "ExCom Approval Date",
            key: "ExComApprovalDate",
            dataIndex: "ExComApprovalDate",
            width: 170,
            sorter: true,
            render: (txt) => {
                return AiibFormatDate(txt);
            }
        }, {
            title: "Concept Decision Date",
            key: "ConceptDate",
            dataIndex: "ConceptDate",
            width: 170,
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }, {
            title: "Appraisal/Interim/Final Decision Date",
            key: "AppraisalDate",
            dataIndex: "AppraisalDate",
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }, {
            title: "Negotiation Review Date",
            key: "NegotiationDate",
            dataIndex: "NegotiationDate",
            sorter: true,
            width: 175,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }]
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Project Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.BoardApprovalStage })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.BoardApprovalStage} privateColumns={this.columns} />
        </MainContent>;
    }

}
