import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps, RouterProps, AkFormIdentityPicker } from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import { AiibFormatDate } from '../../component/aiib/index';
export interface AllProjectProps extends RouterProps {

}

export interface AllProjectState {

}

@withRouter
export default class AllProject extends React.Component<AllProjectProps, AllProjectState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: "ExCom Approval Date ",
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
            width: 175,
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }, {
            title: "Project Team Leader",
            key: "ProjectLeader",
            dataIndex: "ProjectLeader",
            render: (txt) => {
                return txt ? <AkFormIdentityPicker readonly value={JSON.parse(txt)} /> : null;
            }
        }, {
            title: "Project Stages",
            key: "Stage",
            dataIndex: "Stage",
        }]
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Project Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub1">{AkGlobal.intl.formatMessage({ id: AIIBLocale.AllProject })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.AllProject} privateColumns={this.columns} />
        </MainContent>;
    }

}
