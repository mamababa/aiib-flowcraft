import * as React from 'react';
import { MainContent } from '../components/maincontent';
import { AIIBLocale } from '../../locales/localeid';
import ProjectListTable from '../../component/aiib/aiib-project-list';
import { ProjectState } from '../../api/aiibworkflow/proposalModal';
import { AkGlobal, AkColumnProps, AkFormIdentityPicker } from 'akmii-yeeoffice-common';
import { AiibFormatDate } from '../../component/aiib/index';
export interface NewProjectProps {

}

export interface NewProjectState {

}

export default class NewProject extends React.Component<NewProjectProps, NewProjectState>{
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
            title: "Project Team Leader",
            key: "ProjectLeader",
            dataIndex: "ProjectLeader",
            render: (txt) => {
                return txt ? <AkFormIdentityPicker readonly value={JSON.parse(txt)} /> : null;
            }
        }]
    }

    renderHeader() {
        return <div>
            <span className="ak-header-title-sub1">Project Pool</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{AkGlobal.intl.formatMessage({ id: AIIBLocale.NewProject })}</span>
        </div>;
    }

    render() {
        return <MainContent Header={this.renderHeader()}>
            <ProjectListTable state={ProjectState.NewProject} privateColumns={this.columns} />
        </MainContent>;
    }

}
