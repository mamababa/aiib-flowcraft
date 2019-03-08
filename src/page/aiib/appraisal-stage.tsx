import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps } from 'akmii-yeeoffice-common';
import { AiibFormatDate, AiibPromissionControl } from '../../component/aiib/index';
export interface AppraisalStageProps {

}

export interface AppraisalStageState {

}

export default class AppraisalStage extends React.Component<AppraisalStageProps, AppraisalStageState>{
    columns: AkColumnProps<any>[];
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: "ExCom Approval Date ",
            key: "ExComApprovalDate",
            dataIndex: "ExComApprovalDate",
            sorter: true,
            render: (txt) => {
                return AiibFormatDate(txt);
            }
        }, {
            title: "Concept Decision Date",
            key: "ConceptDate",
            dataIndex: "ConceptDate",
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
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.AppraisalStage })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.AppraisalStage} privateColumns={this.columns} />
        </MainContent>;
    }

}
