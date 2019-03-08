import * as React from 'react';
import {
    RouterProps,
    AkButton,
    ListDataIDRequest,
    ContentListApi,
    AkGlobal,
    MasterPageAction,
    AkSpin
} from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import {
    AiibPrintContacts,
    AiibPrintProjectSummarySheet,
    AiibPrintProposalSummarySheet,
    AiibPrintProposal
} from '../../component/aiib/print';
interface AiibPrintProps extends RouterProps { }
interface AiibPrintStatus {
    listID?: string;
    listDataID?: string;
    type?: string;
    listData?: any;
    loading?: boolean;
}
@withRouter
export default class AiibPrint extends React.Component<AiibPrintProps, AiibPrintStatus> {
    Title = 'Project';
    constructor(props, context) {
        super(props, context);
        this.state = {
            listID: this.props.location.query['listid'],
            listDataID: this.props.location.query['listdataid'],
            type: this.props.location.query['type'],
            loading: true
        };
    }
    componentWillMount() {
        var head = document.querySelector('head');
        var viewport = document.querySelectorAll('meta[name=viewport]');
        for (let index = 0; index < viewport.length; index++) {
            const element = viewport[index];
            head.removeChild(element);
        }
        AkGlobal.store.dispatch(MasterPageAction.triggerMasterpageHeader(false));
        this.loadData();
    }
    componentWillUnmount() {
        AkGlobal.store.dispatch(MasterPageAction.triggerMasterpageHeader(true));
    }
    async loadData() {
        const { listID, listDataID } = this.state;
        if (listID && listDataID) {
            const getData: ListDataIDRequest = {
                Title: this.Title,
                ListID: listID,
                ListDataID: listDataID,
                DefaultColumns: true
            };
            const data = await ContentListApi.GetListByListDataIdAndTitle(getData);
            this.setState({ listData: data.Data });
        }
    }
    onPrintClick() {
        const masterpage = document.querySelectorAll('.ak-react-masterpage');
        for (let index = 0; index < masterpage.length; index++) {
            const element = masterpage[index];
            element.className = element.className.replace(new RegExp("(\\s|^)ak-react-masterpage(\\s|$)"), " ");
        }
        window.print();
    }
    onLoadingClose() {
        this.setState({ loading: false });
    }
    render() {
        if (!this.state.listData) return null;
        let node: React.ReactNode;
        const { type } = this.state;
        switch (type) {
            case 'proposalpage':
                node = (
                    <AiibPrintProposal
                        listData={this.state.listData}
                        onLoadingClose={this.onLoadingClose.bind(this)}
                    />
                );
                break;
            case 'contactspage':
                node = (
                    <AiibPrintContacts listData={this.state.listData} onLoadingClose={this.onLoadingClose.bind(this)} />
                );
                break;
            case 'proposalsheet':
                node = (
                    <AiibPrintProposalSummarySheet
                        listData={this.state.listData}
                        onLoadingClose={this.onLoadingClose.bind(this)}
                    />
                );
                break;
            case 'projectsheet':
                node = (
                    <AiibPrintProjectSummarySheet
                        listData={this.state.listData}
                        onLoadingClose={this.onLoadingClose.bind(this)}
                    />
                );
                break;
        }
        return (
            <div className="aiib-print">
                <AkSpin spinning={this.state.loading}>
                    <div className="aiib-print-button">
                        <AkButton icon="print" onClick={() => this.onPrintClick()}>
                            print
						</AkButton>
                    </div>
                    {node}
                </AkSpin>
            </div>
        );
    }
}
