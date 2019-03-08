import * as React from 'react';
import { AkButton, RouterProps, ContentListApi } from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import { PathConfig } from '../../config/pathconfig';
import { ProjectAllFieldsModal } from '../../api/aiibworkflow';
import { STATE_NEWPROPOSAL, STATE_MANAGERIOREVIEW, STATE_DGIOREVIRE, STATE_SCSECREVIEW } from '../../util/aiib-common';
import { ProjectContentList, AiibSendEmailCommom } from '../../api/aiibworkflow/content-list';
import { AiibProjectResponse } from '.';
import { addAiibWorkflowHistory } from '../../api/aiibworkflow/common';
import { AIIBLocale } from '../../locales/localeid';
interface AiibProposalRevokeButtonProps extends RouterProps{
    listData: any;
    afterClick?: () => void;
}
interface AiibProposalRevokeButtonState {

}
@withRouter
export class AiibProposalRevokeButton extends React.Component<AiibProposalRevokeButtonProps,AiibProposalRevokeButtonState> {
   constructor(props) {
       super(props);
   }
   onBtnClick() {
    const {listData} = this.props;
    let variable: ProjectAllFieldsModal = listData;
    let addWorkflowVariable = Object.assign({}, variable);
     variable.Status = "Unsubmitted";
     variable.State =STATE_NEWPROPOSAL; 
     variable.ProcessStage = "";
     this.onEditProjectByTitle(variable, addWorkflowVariable);
      
   }
   onEditProjectByTitle(v,addV){
    for (const key in v) {
        if(v[key] && Array.isArray(v[key])) {
            v[key] = JSON.stringify(v[key]);
        }
    }
    const request = {
        listDataID:v.ListDataID,
        RowVersion:v.RowVersion,
        Dic:{
            ...v
        }
    }
    ProjectContentList.editContentList(request).then(data=> {
        if(data.Status === 0) {
            this.onAddWorkflowHistory(addV);
            this.onSendEmail(addV);
            AiibProjectResponse.successTip(AIIBLocale.RevokeSuccess);
            this.props.afterClick();
        }else {
            AiibProjectResponse.errorTip(AIIBLocale.RevokeFail);
        }
    });
   }
   onSendEmail(variable) {
       const code = "Proposal-Revoke";
       const codeToMe = "Proposal-Revoke-Me";
       let To:string[];
      if(variable.State === STATE_MANAGERIOREVIEW) {
         To = null;
         AiibSendEmailCommom.sendEmail(codeToMe,null,variable.ListDataID);
      }else if(variable.State === STATE_DGIOREVIRE) {
          To = [variable.ManagerIO];
          AiibSendEmailCommom.sendEmail(codeToMe,null,variable.ListDataID);
          AiibSendEmailCommom.sendEmail(code,To,variable.ListDataID);
      }else if(variable.State === STATE_SCSECREVIEW) {
          To = [variable.ManagerIO,variable.DGIO];
          AiibSendEmailCommom.sendEmail(codeToMe,null,variable.ListDataID);
          AiibSendEmailCommom.sendEmail(code,To,variable.ListDataID);
      }

      
   }
   onAddWorkflowHistory(addV) {
     const workflowHistory: addAiibWorkflowHistory = {
         Title:"ActionLog",
         DicList:[
             {
                Title: "Proposal Revoked",
                ProjectDataID: addV.ListDataID,
                ActionType: "Revoke",
                Comment: "",
                StartNum: addV.StartNum,
                Category: 'Proposal'
             }
         ]
     };
     ContentListApi.AddBatchDataByTitle(workflowHistory);
   }
   render() {
       return <AkButton className="aiib-button skyblue" onClick={() => this.onBtnClick()}>
           Revoke
         </AkButton>;
   }
}