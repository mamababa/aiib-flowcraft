import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps, AkButton, RouterProps, AkFormIdentityPicker } from 'akmii-yeeoffice-common';
import { AiibFormatDate } from '../../component/aiib/index';
import { withRouter } from 'react-router';
import { AiibPromissionControl } from '../../component/aiib/common/aiib-promission-controller';
export interface MyProjectProps extends RouterProps {

}

export interface MyProjectState {

}


@withRouter
export default class MyProject extends React.Component<MyProjectProps, MyProjectState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
        this.columns = [{
            title: "ExCom Approval Date ",
            key: "ExComApprovalDate",
            dataIndex: "ExComApprovalDate",
            width: 180,
            sorter: true,
            render: (txt) => {
                return AiibFormatDate(txt);
            }
        }, {
            title: "Concept Decision Date",
            key: "ConceptDate",
            dataIndex: "ConceptDate",
            width: 180,
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
            width: 180,
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }, {
            title: "Board Approved Date",
            key: "BoardApprovalDate",
            dataIndex: "BoardApprovalDate",
            width: 160,
            sorter: true,
            render: (txt) => {
                return txt ? AiibFormatDate(txt) : null;
            }
        }, {
            title: "Project Team Leader",
            key: "ProjectLeader",
            dataIndex: "ProjectLeader",
            className: "aiib-project-list-row",
            render: (txt) => {
                return txt ? <AkFormIdentityPicker readonly value={JSON.parse(txt)} /> : null;
            }
        }]
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Project Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.MyProject })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.MyProject} privateColumns={this.columns} />
        </MainContent>;
    }

}
