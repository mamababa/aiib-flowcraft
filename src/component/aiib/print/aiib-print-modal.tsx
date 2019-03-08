import * as React from 'react';
import {
    AkButton,
    AkGlobal,
    MasterPageAction,
    AkSpin,
} from 'akmii-yeeoffice-common';
import {
    AiibPrintContacts,
    AiibPrintProjectSummarySheet,
    AiibPrintProposalSummarySheet,
    AiibPrintProposal
} from './index';
import { PrintPageType } from './aiib-print-util';

interface AiibPrintModalProps {
    listData?: any;
    type?: PrintPageType;
    onClose: () => void;
}
interface AiibPrintModalStatus {
    loading?: boolean;
}
export default class AiibPrintModal extends React.Component<AiibPrintModalProps, AiibPrintModalStatus> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true
        };
    }
    componentWillMount() {
        AkGlobal.store.dispatch(MasterPageAction.triggerMasterpageHeader(false));
    }
    componentWillUnmount() {
        AkGlobal.store.dispatch(MasterPageAction.triggerMasterpageHeader(true));
        //解决IE只打印2页问题
        const masterpage = document.querySelectorAll('.aiib-masterpage')[0];
        masterpage.className = 'ak-react-masterpage aiib-masterpage ant-layout';
    }

    onPrintClick() {
        //解决IE只打印2页问题
        const masterpage = document.querySelectorAll('.ak-react-masterpage');
        const appContent = document.querySelector('#app_content');
        for (let index = 0; index < masterpage.length; index++) {
            const element = masterpage[index];
            element.className = element.className.replace(new RegExp("(\\s|^)ak-react-masterpage(\\s|$)"), " ");
        }
        //解决IE内容不足2页还打印2页问题
        if (appContent) {
            appContent.removeAttribute('id');
        }
        window.print();
    }
    onLoadingClose() {
        this.setState({ loading: false });
    }
    render() {
        if (!this.props.listData) return null;
        let node: React.ReactNode;
        const { type, listData } = this.props;
        switch (type) {
            case PrintPageType.proposalpage:
                node = (
                    <AiibPrintProposal
                        listData={listData}
                        onLoadingClose={this.onLoadingClose.bind(this)}
                    />
                );
                break;
            case PrintPageType.contactspage:
                node = <AiibPrintContacts listData={listData} onLoadingClose={this.onLoadingClose.bind(this)} />;
                break;
            case PrintPageType.proposalsheet:
                node = (
                    <AiibPrintProposalSummarySheet
                        listData={listData}
                        onLoadingClose={this.onLoadingClose.bind(this)}
                    />
                );
                break;
            case PrintPageType.projectsheet:
                node = (
                    <AiibPrintProjectSummarySheet
                        listData={listData}
                        onLoadingClose={this.onLoadingClose.bind(this)}
                    />
                );
                break;
        }
        return (
            <div className="aiib-print">
                <div className="aiib-print-modal">
                    <div className='aiib-print-header'>
                        <AkButton icon='printer' onClick={() => this.onPrintClick()}>
                            Print
                        </AkButton>
                        <AkButton icon='close' onClick={() => this.props.onClose()}>
                            Close
                        </AkButton>
                    </div>
                    <AkSpin spinning={this.state.loading}>
                        {node}
                    </AkSpin>
                </div>
            </div>
        );
    }
}
