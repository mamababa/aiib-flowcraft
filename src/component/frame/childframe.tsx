import * as React from "react";
import { Component } from "react";
import Navigator from "./navigator";
import { NavigatorConfig } from "../../config/child-navigatorconfig";
/**导航菜单 */
import { injectIntl } from "react-intl";
import { withRouter } from "react-router";
import { NavLocale } from "../../locales/localeid";
import {
    AkLayout,
    AkGlobal,
} from 'akmii-yeeoffice-common';
import { NavigatorKey } from "../../config/navigatorkey";
import { PathConfig } from "../../config/pathconfig";
import { FlowcraftCommon } from "../../util/common";
import { connect } from "react-redux";
import { AkContext } from 'akmii-yeeoffice-common';
import { AIIBAction } from '../../actions/index';
import { isNullOrUndefined } from "util";
import { ProjectAPI } from "../../api/aiibworkflow/project";

interface AkmiiFrameProps extends ReactRouter.RouteComponentProps<any,
    any> {
    intl?: ReactIntl.InjectedIntl;
    isAdmin?: boolean;
}
interface AkmiiFrameStates {
    Data?: MenuData[];
    showContent?: boolean;
    trigger?: string;
    isAdmin?: boolean;
    isReadOnly?:boolean;
}
class AkmiiFrame extends Component<AkmiiFrameProps,
    AkmiiFrameStates> {
    isMobile: boolean;
    constructor(props, context) {
        super(props, context);

        this.isMobile = window.innerWidth < 768;
        this.state = {
            Data: NavigatorConfig,
            showContent: true,
            trigger: this.isMobile ? "1" : null,
            isAdmin: props.isAdmin,
            isReadOnly:true
        };
    }

    componentWillReceiveProps(nextProps) {
        if ("isAdmin" in nextProps && nextProps.isAdmin !== this.props.isAdmin) {
            this.setState({ isAdmin: nextProps.isAdmin }, () => {
                this.addAdminMenu();
            });
        }
    }


    componentWillMount() {
        AkGlobal.store.dispatch(AIIBAction.requestSettingRole());
         ProjectAPI.getUserGroups({ userID: "" }).then(d=> {
            if (d.Status === 0) {
                const userGrops = d.Data.filter(item => item && item.Ext1 === "UserGroup");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
                this.setState({  isReadOnly: !isNullOrUndefined(isReadOnly) },()=> this.addAdminMenu());
            }
         });
       
   }
    componentDidMount() {
        if (this.state.isAdmin) {
            this.addAdminMenu();
        }
    }
    addAdminMenu() {
        let user = AkContext.getUser();// (Cookies.getJSON("YGUserLogin") as YeeUserInfo);
        if (user && user.IsAdmin && !this.state.isReadOnly) {
            this.addMenu();
        } else {
            
            if (this.state.isAdmin && !this.state.isReadOnly) {
                this.addMenu();
            }
        }
    }
    addMenu() {
        this.state.Data.push({
            Key: NavigatorKey.ActivityTask,
            Title: NavLocale.FlowActivityTask,
            Path: PathConfig.ActivityTask,
            Icon: "inbox"
        },
        );
        this.setState({ Data: this.state.Data });
    }

    render() {
        return <AkLayout className="ak-layout-frame" >
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
                {/* <AkLayout>
                    <AkLayout.Header className="ak-header-title"> aiib不需要
                        <FormattedMessage id={NavLocale.HeaderTitle}></FormattedMessage>
                    </AkLayout.Header>
                </AkLayout> */}
                <AkLayout.Content className="aiib-workflow-layout">
                    <Navigator className="aiib-workflow-nav" menuClick={() => {
                        if (this.isMobile) {
                            this.setState({ showContent: true, trigger: "1" });
                        }
                    }} navigatorConfig={this.state.Data}></Navigator>
                </AkLayout.Content>
            </AkLayout.Sider>
            {this.state.showContent ? this.props.children : null}
        </AkLayout>;
    }
}
class AkmiiFrameStyle {
}

const mapStateToProps = (state) => {
    return { isAdmin: state.aiib.isAIIBAdmin };
};

export default connect(mapStateToProps)(withRouter(injectIntl(AkmiiFrame)));

// export default withRouter(injectIntl(AkmiiFrame));
