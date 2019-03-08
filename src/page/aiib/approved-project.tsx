import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps } from 'akmii-yeeoffice-common';
import { AiibFormatDate } from '../../component/aiib/index';
export interface ApprovedProjectProps {

}

export interface ApprovedProjectState {

}

export default class ApprovedProject extends React.Component<ApprovedProjectProps, ApprovedProjectState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: "ExCom Approval Date",
            key: "ExComApprovalDate",
            dataIndex: "ExComApprovalDate",
            sorter: true,
            width: 170,
            render: (txt) => {
                return AiibFormatDate(txt);
            }
        }, {
            title: "Concept Decision Date",
            key: "ConceptDate",
            dataIndex: "ConceptDate",
            sorter: true,
            width: 170,
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
            width: 175,
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }, {
            title: "Board Approved Date",
            key: "BoardApprovalDate",
            dataIndex: "BoardApprovalDate",
            width: 170,
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }]
    }


    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Project Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.ApprovedProject })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.ApprovedProject} privateColumns={this.columns} />
        </MainContent>;
    }
}
