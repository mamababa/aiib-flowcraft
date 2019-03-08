import * as React from 'react';
import { withRouter } from 'react-router';
import { AkLayout, AkContext } from 'akmii-yeeoffice-common';
import { AiibReportNavigatorConfig } from './aiib-report-navigator';
import { FlowcraftCommon } from '../../util/common';
import Navigator from "../frame/navigator";
import { AIIBLocale } from '../../locales/localeid';
import { PathConfig } from '../../config/pathconfig';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AiibCommonFun } from '../aiib/index';

interface AiibAllReportProps extends ReactRouter.RouteComponentProps<any, any> {
    intl?: ReactIntl.InjectedIntl;
}
interface AiibAllReportStates {
    showContent?: boolean;
    trigger?: string;
    Data?: MenuData[];
}
@withRouter
export class AiibAllReportPage extends React.Component<AiibAllReportProps,
AiibAllReportStates> {
    isMobile: boolean;

    constructor(props, context) {
        super(props, context);
        this.isMobile = window.innerWidth < 768;
        this.state = {
            showContent: true,
            trigger: this.isMobile ? "1" : null,
            Data: AiibReportNavigatorConfig
        };
    }
    componentWillMount() {
        const user = AkContext.getUser();
        if (user.IsAdmin) {
            this.state.Data.push({
                Key: AIIBLocale.ProposalDataBase,
                Title: AIIBLocale.ProposalDataBase,
                Path: PathConfig.ProposalDataBase,
                Icon: "database"
            });
            this.setState({Data:this.state.Data})
        }else{
            ProjectAPI.getUserGroups({ userID: '' }).then((data) => {
                if (data.Status === 0) {
                    if (AiibCommonFun.UserGropPromission(data.Data, 'ProjectDataBase')) {
                        this.state.Data.push({
                            Key: AIIBLocale.ProposalDataBase,
                            Title: AIIBLocale.ProposalDataBase,
                            Path: PathConfig.ProposalDataBase,
                            Icon: "database"
                        });
                        this.setState({Data:this.state.Data})
                    }
                }
            });
        }
        
    }
    render() {
       const {Data} = this.state;
       //交换后两项位置
       if(Data && Data.length ===3) {
          [Data[1],Data[2]] = [Data[2],Data[1]];
       }
        return <AkLayout className="ak-layout-frame">
            <AkLayout.Sider trigger={this.state.trigger}
                width={FlowcraftCommon.getSiderWidth()}
                collapsed={this.state.showContent && this.isMobile}
                collapsedWidth={0}
                isdefaultFixed
                className="aiib-workflow-sider"
                breakpoint="sm" onCollapse={(collapsed, type) => {
                    if (this.isMobile) {
                        this.setState({ showContent: collapsed, trigger: collapsed ? "1" : null });
                    }
                }}>
                <AkLayout.Content className="aiib-workflow-layout">
                    <Navigator className="aiib-workflow-nav" menuClick={() => {
                        if (this.isMobile) {
                            this.setState({ showContent: true, trigger: "1" });
                        }
                    }} navigatorConfig={this.state.Data}>
                    </Navigator>
                </AkLayout.Content>
            </AkLayout.Sider>
            {this.state.showContent ? this.props.children : null}
        </AkLayout>;
    }
}
