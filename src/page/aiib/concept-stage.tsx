import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps } from 'akmii-yeeoffice-common';
import { AiibFormatDate } from '../../component/aiib/index';
export interface ConceptStageProps {

}

export interface ConceptStageState {

}

export default class ConceptStage extends React.Component<ConceptStageProps, ConceptStageState>{
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
        }]
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Project Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.ConceptStage })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.ConceptStage} privateColumns={this.columns} />
        </MainContent>;
    }

}
