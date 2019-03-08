import * as React from "react";
import Document from '../../component/document/document';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import MetaDataLayout from '../../component/metadata/meta-data-layout';
import { DocumentPermissionType } from '../../util/document-common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AiibCommonFun } from "../../component/aiib/index";
import { AkContext } from 'akmii-yeeoffice-common';
import { currentUser } from "../../util/aiib-common";
import { isNullOrUndefined } from "util";

interface AiibMeetingMinutesProps {

}
interface AiibMeetingMinutesStatus {
    hasUploadPermisssion?: boolean;
    isReadOnly?:boolean;
}

export default class AiibMeetingMinutes extends React.Component<AiibMeetingMinutesProps, AiibMeetingMinutesStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasUploadPermisssion: false,
            isReadOnly:false
        }
    }

    componentDidMount() {
        ProjectAPI.getUserGroups({ userID: "" }).then(data => {
            if (data.Status === 0) {
                this.setState({ hasUploadPermisssion: AkContext.getUser().IsAdmin || AiibCommonFun.UserGropPromission(data.Data, "MeetingMinutes") });
            }
        });
        ProjectAPI.getUserGroups({ userID: currentUser }).then(d=> {
            if(d.Status === 0) {
                const userGrops = d.Data.filter(item => item && item.Ext1 === "UserGroup");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
               this.setState({isReadOnly:!isNullOrUndefined(isReadOnly)}) ;
            }
        });
    }


    render() {
        return <MetaDataLayout title='Meeting Minutes Documents'>
            <Document
                documentPermissionType={(this.state.hasUploadPermisssion && !this.state.isReadOnly) ? DocumentPermissionType.MeetingMinutes : DocumentPermissionType.MeetingMinutesReadonly}
                stage={DocumentFolderType.MeetingMinutes}
                isReadOnly={this.state.isReadOnly}
                isPagination={true} />
        </MetaDataLayout>;
    }
}
