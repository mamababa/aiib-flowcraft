import * as React from 'react';
import { AIIBWorkflowAPI } from '../../api/aiibworkflow/aiib-workflow';
import { GetProcessLogRequest } from '../../api/aiibworkflow/proposal-request';
import { AkNoContent, AkSpin } from 'akmii-yeeoffice-common/lib';
import { AIIBWorkFlowHistory } from './index';
import { AiibProjectResponse } from './common/aiib-response-tip';
import { CommonLocale } from 'akmii-yeeoffice-common';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow/index';

export interface AIIBWorkflowHistoryTabInfoProps {
    listDataID: string;
    listData: ProjectAllFieldsModal;
}

export interface AIIBWorkflowHistoryTabInfoState {
    dataSource?: Array<any>;
    loading?: boolean;
}

export class AIIBWorkflowHistoryTabInfo extends React.Component<AIIBWorkflowHistoryTabInfoProps, AIIBWorkflowHistoryTabInfoState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            loading: false
        }
    }

    componentDidMount() {
        this.loadHistoryList();
    }

    private loadHistoryList() {
        this.setState({ loading: true });
        const request: GetProcessLogRequest = {
            Title: "Project",
            ListDataID: this.props.listDataID
        };
        AIIBWorkflowAPI.processLog(request).then(data => {
            if (data.Status === 0) {
                this.setState({ dataSource: data.Data, loading: false });
            } else {
                this.setState({ loading: false });
                AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
            }

        });
    }

    render() {
        const { state: { dataSource, loading }, props: { listData } } = this;
        return <AkSpin spinning={loading}>
            {dataSource.length > 0 ? <div className="aiib-workflow-history-tab-info">
                <AIIBWorkFlowHistory dataSource={dataSource} listData={listData}></AIIBWorkFlowHistory>
            </div> : <AkNoContent loading={loading}></AkNoContent>}
        </AkSpin>;
    }

}
