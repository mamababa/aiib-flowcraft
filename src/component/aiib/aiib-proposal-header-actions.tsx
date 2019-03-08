import * as React from "react";
import { AkRow, AkButton, RouterProps, AkModal, AkGlobal, AkMessage } from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import { PathConfig } from '../../config/pathconfig';
import { AiibPromissionControl, ProposalSaveHandle, AiibProposalDrop, AiibProposalClearOrRework,AiibProposalRevokeButton } from "./index";
import { connect } from 'react-redux';
import { PrintPageType } from './print/aiib-print-util';
import { ProjectAllFieldsModal } from "../../api/aiibworkflow/index";
import { ProposalAPI } from "../../api/aiibworkflow/proposal";
import { PrintScreenSummaryRequest } from "../../api/aiibworkflow/proposal-request";
import { AIIBLocale } from "../../locales/localeid";

interface AiibProposalActionsProps extends RouterProps {
    activeKey?: string;
    onSave?: (isCloseModal: boolean) => void;
    onSubmit?: () => void;
    listData?: ProjectAllFieldsModal;
    isAdmin?: boolean;
}

interface AiibProposalActionsState {
    loading: boolean;
    showPrintModal:boolean;
}

@withRouter
@connect(state => { return { isAdmin: state.aiib.isAIIBAdmin } })
export class AiibProposalActions extends React.Component<AiibProposalActionsProps, AiibProposalActionsState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            showPrintModal:false
        };
    }

    static contextTypes = {
        state: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        status: React.PropTypes.string,
        loadData: React.PropTypes.func,
        onOpenPrint: React.PropTypes.func,
    };


    onPrint() {
        const { listData } = this.props;
        const listid = listData.ListID, listdataid = listData.ListDataID;
        const url = window.location.hash.replace(`#${PathConfig.ProposalPage}`, `#${PathConfig.AiibPrint}`) + '&listid=' + listid + '&type=proposal';
        const config = 'height=980,width=1280,status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes';
        window.open(url, '', config);//target参数留空，每次点击按钮都会弹出一个新窗口
    }
    onOpenPrint() {
        AkModal.confirm({
            title: "Tip",
            content: "Please click 'Ok' to save the Screening Summery Sheet in working documents.",
            onOk: () => this.onPrintPdf()
        });
    }
    onPrintPdf() {
        const { listData } = this.props;
        this.setState({ loading: true });
        const Request: PrintScreenSummaryRequest = {
            listID: listData.ListID,
            listDataID: listData.ListDataID
        };
        ProposalAPI.PrintScreeningSummary(Request).then((data) => {
            if (data.Status === 0) {      
              window.open(data.Data);       
            } else {
                AkGlobal.intl.formatMessage({ id: AIIBLocale.ProposalPrintTip });
            }
            this.setState({ loading: false });
        });
    }
    render() {
        const { activeKey, listData, isAdmin } = this.props;
        return <AkRow type="flex" align="middle" justify="end" className="ak-tab-actions mb15">
            {listData && activeKey === "proposal" ? AiibPromissionControl.hasRevokeElements(listData,<AiibProposalRevokeButton listData={listData} afterClick={()=> {
                 this.props.router.replace({
                    pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
                });
            }}/>) : null}
            {listData && activeKey === "proposal" ? AiibPromissionControl.hasProposalClearOrReworkElements(listData, isAdmin, <AiibProposalClearOrRework listData={listData} actionType="Cleared" afterClick={() => {
                this.props.router.replace({
                    pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
                });
            }} />) : null}

            {listData && activeKey === "proposal" ? AiibPromissionControl.hasProposalClearOrReworkElements(listData, isAdmin, <AiibProposalClearOrRework listData={listData} actionType="Reworked" afterClick={() => {
                this.props.router.replace({
                    pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
                });
            }} />) : null}


            {listData && activeKey === "proposal" ? AiibPromissionControl.hasProposalDropElements(listData, isAdmin, <AiibProposalDrop listData={listData} afterClick={() => {
                this.props.router.replace({
                    pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
                });
            }} />) : null}

            {listData && activeKey === "proposal" ? AiibPromissionControl.hasProposalActiveElements(listData, isAdmin, <AiibProposalDrop listData={listData} actionType="Active" afterClick={() => {
                this.context.loadData();
            }} />) : null}

            {listData && activeKey === "proposal" ? AiibPromissionControl.hasProposalInactiveElements(listData, isAdmin, <AiibProposalDrop listData={listData} actionType="Inactive" afterClick={() => {
                this.props.router.replace({
                    pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
                });
            }} />) : null}

            {listData && activeKey === "proposal" ?
                AiibPromissionControl.hasProposalSubmitElements(listData, isAdmin, <AkButton icon="fly" onClick={() => this.props.onSubmit()} className='aiib-button dark'>Submit</AkButton>)
                : null}

            {AiibPromissionControl.hasProposalElements("save", listData, <ProposalSaveHandle className="ak-header-btn" onClick={() => this.props.onSave(false)}></ProposalSaveHandle>, this.context)}

            {AiibPromissionControl.hasProposalElements("close", activeKey, <AkButton icon="close-circle-o" onClick={() => {
                this.props.onSave(true);
            }} className='aiib-button grey'>Close</AkButton>)}

            {listData ? AiibPromissionControl.hasProposalElements("printProposal", activeKey,
                <AkButton className='aiib-button dark' icon="printer" onClick={() => this.context.onOpenPrint(PrintPageType.proposalpage)}>
                    Print Proposal
                </AkButton>
            ) : null}
            {AiibPromissionControl.hasProposalElements("print", activeKey,
                <AkButton className='aiib-button dark' icon="printer" loading={this.state.loading}
                    onClick={() => this.onOpenPrint()}
                >
                    Generate Screening Summary Sheet
                    </AkButton>
            )}
        </AkRow>;
       
    }

}
