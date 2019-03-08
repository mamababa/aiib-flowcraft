import * as React from 'react';
import { AkRow } from 'akmii-yeeoffice-common/lib/components/controls';
import { AIIBAppModal } from '../../api/aiibworkflow/common';
import { PathConfig } from '../../config/pathconfig';
import { AkCol } from 'akmii-yeeoffice-common/lib';
import { Link } from 'react-router';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AkContext } from 'akmii-yeeoffice-common';
import { UserGroupsModel } from '../../api/aiibworkflow/aiib-content-list';
import { AiibCommonFun } from '../../component/aiib/index';
export interface AppPageProps {

}
let isMobile = document.body.clientWidth < 768;
export interface AppPageState {
    appModules?: AIIBAppModal[];
    userGroup?: UserGroupsModel[];
    md?: number;
    isReadOnly?:boolean;
}

export default class AppPage extends React.Component<AppPageProps, AppPageState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            appModules: [],
            userGroup: [],
            md: 8,
            isReadOnly:false
        };
    }


    componentWillMount() {
        this.getUserGroup();
    }

    getNavigator() {
        const baseUrl = _spPageContextInfo.webAbsoluteUrl + '/SitePages/pages/img';
        const appModules = [{
            url: PathConfig.AllProposal,
            name: "Proposal Pool",
            imgurl: baseUrl + "/proposal.jpg"
        }, {
            url: PathConfig.AllProject,
            name: "Project Pool",
            imgurl: baseUrl + "/project.jpg"
        }, {
            url: PathConfig.WaitingTask,
            name: "Workflow Center",
            imgurl: baseUrl + "/workflow.jpg"
        }, {
            url: PathConfig.ProposalReport,
            name: "Report Center",
            imgurl: baseUrl + "/report.jpg"
        }, {
            url: PathConfig.AiibMetadata,
            name: "Data Maintenance",
            imgurl: baseUrl + "/data.jpg"
        }, {
            url: _spPageContextInfo.siteAbsoluteUrl + "/Settings/sitepages/pages/Index.aspx#/aiib-settings-organization",
            name: "System Settings",
            imgurl: baseUrl + "/settings.jpg"
        }];
        this.setState({ appModules });
    }

    getUserGroup() {
        ProjectAPI.getUserGroups({ userID: "" }).then(data => {
            if (data.Status === 0) {
                const ReadOnly = data.Data.filter((item) => item && item.Ext2 && item.Ext2.indexOf("Readonly") > -1);
                  const isReadOnly = ReadOnly.length > 0 ? true :false;
                if (!AkContext.getUser().IsAdmin && AiibCommonFun.UserGropPromission(data.Data, "ReportCenter") && !isReadOnly) {
                    this.setState({ md: 12 });
                }
                this.setState({ userGroup: data.Data ,isReadOnly},()=> {
                    this.getNavigator();
                });
            }
        });
    }

    renderContent() {
        const { appModules, userGroup, md,isReadOnly } = this.state;
        return appModules.map((item, index) => {
            // 权限
            let isAdmin = AkContext.getUser().IsAdmin;
            if (item.name === "Report Center" && (isReadOnly || !isAdmin) ) {
                isAdmin = isReadOnly ? !isReadOnly :AiibCommonFun.UserGropPromission(userGroup, "ReportCenter");

            } else if (item.name === "Data Maintenance" && (isReadOnly || !isAdmin)) {
                 isAdmin = false;
            } else if (item.name === "System Settings" && (isReadOnly || !isAdmin)) {
                 isAdmin = false;
            } 
            else {
                isAdmin = true;
            }

            return isAdmin ? <AkCol key={index} md={md} sm={12} style={{ marginBottom: "20px", }}>
                {item.name === "System Settings" ? <a href={item.url}>
                    <div className={isMobile ? "ak-app-container-img container-page" : "ak-app-container-img"}>
                        <img src={item.imgurl} className={isMobile ? "container-img" : null} />
                    </div>
                    <div className="ak-app-container-title">
                        <h4>{item.name}</h4>
                    </div>
                </a> : <Link to={item.url}>
                        <div className={isMobile ? "ak-app-container-img container-page" : "ak-app-container-img"}>
                            <img src={item.imgurl} className={isMobile ? "container-img" : null} />
                        </div>
                        <div className="ak-app-container-title">
                            <h4>{item.name}</h4>
                        </div>
                    </Link>}
            </AkCol> : null;
        });
    }

    render() {
        return <div className="ak-container aiib-app">
            <div className="aiib-app-content" >
                <div className="ak-app-container">
                    <AkRow gutter={30}>
                        {this.renderContent()}
                    </AkRow>
                </div>
            </div>
        </div>;
    }

}
