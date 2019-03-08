import * as React from "react";
import Document from '../../component/document/document';
import { DocumentFolderType } from '../../api/document/document-sp-api';
import MetaDataLayout from '../../component/metadata/meta-data-layout';
import { DocumentPermissionType } from '../../util/document-common';
import { RouterProps } from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import { ProjectAPI } from "../../api/aiibworkflow/project";
import { currentUser } from "../../util/aiib-common";
import { isNullOrUndefined } from "util";

interface AiibMeetingMaterialsProps extends RouterProps {
    isAdmin?: boolean;
}
interface AiibMeetingMaterialsStatus {
    isReadOnly?:boolean;
}

@withRouter
export default class AiibMeetingMaterials extends React.Component<AiibMeetingMaterialsProps, AiibMeetingMaterialsStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            isReadOnly:true
        };
    }
    componentDidMount() {
        ProjectAPI.getUserGroups({ userID: currentUser }).then(d=> {
            if(d.Status === 0) {
                const userGrops = d.Data.filter(item => item && item.Ext1 === "UserGroup");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
               this.setState({isReadOnly:!isNullOrUndefined(isReadOnly)}) ;
            }
        });
        
    }
    render() {
        const {isReadOnly} = this.state;
        return <MetaDataLayout
            title='Meeting Materials Documents'
        >
            <Document
                documentPermissionType={isReadOnly ? DocumentPermissionType.Readonly :DocumentPermissionType.MeetingMaterials}
                isReadOnly={isReadOnly}
                stage={DocumentFolderType.MeetingMaterials}
                path={this.props.location.query.path}
                isPagination={true} />
        </MetaDataLayout>;
    }
}
