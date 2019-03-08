import * as React from 'react';
import { AkContext, AkGlobal } from 'akmii-yeeoffice-common';
import { STATE_NEWPROPOSAL, SATGE_BOARDAPPROVED, SATGE_PROPOSAL, STATE_MANAGERIOREVIEW, STATE_DGIOREVIRE, STATE_SCREENINGCOMMITTEE, STATE_SCSECREVIEW, STATE_PENDINGSCREENINGCOMMITTEE } from '../../../util/aiib-common';
import { currentUser } from '../../../page/aiib/aiib-project-page';
import { AiibProjectCancelStatus, AiibProjectProcessStatus, AiibProjectCancelStage, AiibProjectDropStatus } from '../../../api/aiibworkflow/common';

const user = AkContext.getUser().AccountID;
export class AiibPromissionControl {

    /**是否显示next stage*/
    static hasNextStageElements(listData: any, isAdmin: boolean, elements?: any) {
        return listData.ProcessStatus === AiibProjectProcessStatus.Completed + ""
            && (listData.ProjectLeader && listData.ProjectLeader.indexOf(user) > -1 || isAdmin)
            && listData.Stage !== SATGE_BOARDAPPROVED
            && listData.Status === "Active"
            ? elements : null;
    }

    /**是否显示submit提交流程按钮*/
    static hasSubmitElements(listData: any, isAdmin: boolean, elements?: any) {
        return (
            listData.ProcessStatus === AiibProjectProcessStatus.Default + ""
            || listData.ProcessStatus === AiibProjectProcessStatus.Approved + ""
            || listData.ProcessStatus === AiibProjectProcessStatus.Rejected + "")
            && (listData.ProjectLeader && listData.ProjectLeader.indexOf(user) > -1 || isAdmin)
            && listData.Stage !== SATGE_BOARDAPPROVED
            && listData.CancelStatus !== AiibProjectCancelStatus.Cancelled + ""
            && listData.CancelStatus !== AiibProjectCancelStatus.Cancelling + ""
            && listData.Status === "Active"
            ? elements : null;
    }

    /**是否显示Cancel*/
    static hasCancelElements(listData: any, isAdmin: boolean, elements?: any) {
        return (listData.CancelStatus === AiibProjectCancelStage.Default + "" || listData.CancelStatus === "")
            && listData.ProcessStatus !== AiibProjectProcessStatus.Completed + ""
            && (listData.ProjectLeader && listData.ProjectLeader.indexOf(user) > -1 || isAdmin)
            && listData.Stage !== SATGE_BOARDAPPROVED
            && listData.Status !== "Inactive" ? elements : null;
    }

    /**是否显示save*/
    static hasSaveElements(value: boolean, elements?: any) {
        return value ? null : elements;
    }
    /**是否显示revoke按钮*/
    static hasRevokeElements(listData,elements?:any) {
        if(listData.Stage === "Proposal") {
            if(listData.Stage === "Proposal" && (listData.State === "ScrCom Review" || listData.State === "ExCom Review")) {
                return null;
            }
            if(listData.Status === "Inactive") {
                return null;
            }
            const user = AkContext.getUser().AccountID;
            if(listData.Status !== "Unsubmitted") {
                return user === listData.CreatedBy ? elements : null;
            }
        }else {
            return null;
        }
        
    }
    /**Project list Status显示*/
    static hasProjectlistStatusElements(ProcessStatus: string, recode?: any) {
        if (recode.CancelStatus === AiibProjectCancelStatus.Default + "" || recode.CancelStatus === "") {
            if (recode.Stage === "Concept" && ProcessStatus === AiibProjectProcessStatus.Default + "") {
                return null;
            } else {
                if (ProcessStatus === AiibProjectProcessStatus.Rejected + "") {
                    return <span className={"color-status-" + ProcessStatus}>{AkGlobal.intl.formatMessage({ id: "project.process.status." + ProcessStatus })}</span>;
                } else if (recode.Stage === "Board Approved") {
                    return <span className={"color-status-4"}>{AkGlobal.intl.formatMessage({ id: "project.process.status.4" })}</span>;
                } else {
                    return <span className={"color-status-1"}>{AkGlobal.intl.formatMessage({ id: "project.process.status.1" })}</span>;
                }
            }
        } else {
            return <span className={"color-cancel-status-" + recode.CancelStatus}>{AkGlobal.intl.formatMessage({ id: "project.process.cancel.status." + recode.CancelStatus })}</span>;
        }
    }

    /**是否显示proposal按钮显示
     *
     */

    static hasProposalElements(key: string, value: any, element: React.ReactNode, context?: any) {
        if (key === "submit") {
            return context.state === STATE_NEWPROPOSAL ? element : null;
        }
        if (key === "save") {
            if (context && !context.disabled) {
                return element;
            }
            if (value && value.Status === "Inactive") {
                return null;
            }
        }
        if (key === "close") {
            return element;
        }
        if (key === "print") {
            return value === "screening" ? element : null;
        }
        if (key === "printProposal") {
            return value === "proposal" ? element : null;
        }
    }

    static hasProposalSubmitElements(listDate, isAdmin: boolean, element: React.ReactNode) {
        if (listDate.CancelStatus === AiibProjectCancelStatus.Default + ""
            && listDate.State === STATE_NEWPROPOSAL
            && listDate.DropStatus !== "2"
            && listDate.Status !== "Inactive"
            && (listDate.CreatedBy === currentUser || isAdmin)) {
            return element;
        } else {
            return null;
        }
    }

    static hasProposalDropElements(recode, isAdmin: boolean, element: React.ReactNode) {
        if (recode.Stage === SATGE_PROPOSAL
            && recode.State === STATE_SCREENINGCOMMITTEE
            && recode.DropStatus === AiibProjectDropStatus.Default + ""
            && (recode.ManagerIO === user || recode.DGIO === user || recode.CreatedBy === currentUser || isAdmin)) {
            return element;
        } else {
            return null;
        }
    }

    static hasProposalActiveElements(recode, isAdmin: boolean, element: React.ReactNode) {
        if ((recode.DropStatus === AiibProjectDropStatus.Dropped + "" || (recode.Status === "Inactive" && recode.State === STATE_NEWPROPOSAL))
            && (recode.CreatedBy === currentUser || isAdmin)) {
            return element;
        } else {
            return null;
        }
    }

    static hasProposalInactiveElements(recode, isAdmin: boolean, element: React.ReactNode) {
        if ((recode.State === STATE_MANAGERIOREVIEW
            || recode.State === STATE_DGIOREVIRE
            || recode.State === STATE_SCSECREVIEW
            || recode.State === STATE_PENDINGSCREENINGCOMMITTEE)
            && (recode.CreatedBy === currentUser || isAdmin)
            && recode.Status === "Active") {
            return element;
        } else {
            return null;
        }
    }

    static hasProposalClearOrReworkElements(recode, isAdmin: boolean, element: React.ReactNode) {
        if (recode.State === STATE_MANAGERIOREVIEW && (recode.ManagerIO === user || isAdmin)) {
            return element;
        } else if (recode.State === STATE_DGIOREVIRE && (recode.DGIO === user || isAdmin)) {
            return element;
        } else {
            return null;
        }
    }

    static hasProposalCreatElements(isAdmin: boolean, isReadOnly:boolean,ele: React.ReactNode) {
        const user = AkContext.getUser();
        if(isReadOnly) return null;
        if (isAdmin || user.DepartmentID === "979258275671445504") return ele;
    }


}
