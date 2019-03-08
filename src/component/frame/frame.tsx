import * as React from "react";
import { Component } from "react";
import Navigator from "./navigator";
import { NavigatorConfig } from "../../config/navigatorconfig";
/**导航菜单 */
import { AkmiiHeader } from "./header";
import { injectIntl, FormattedMessage } from "react-intl";
import { withRouter, Link, Redirect } from "react-router";
import { NavLocale } from "../../locales/localeid";
import { PathConfig } from "../../config/pathconfig";
import { AkLayout, AkIcon, AkCol, AkRow } from "akmii-yeeoffice-common/lib/components/controls";
import { IntlProps } from "akmii-yeeoffice-common/lib/util";
import { FlowcraftCommon } from "../../util/common";
import { connect } from "react-redux";
import { AkGlobal, AppAdmin } from "akmii-yeeoffice-common";

interface AkmiiFrameProps extends ReactRouter.RouteComponentProps<any,
    any>,
    IntlProps { }
interface AkmiiFrameStates {
    Data?: MenuData[];
    showContent?: boolean;
    trigger?: string;
}
class AkmiiFrame extends Component<AkmiiFrameProps,
    AkmiiFrameStates> {

    isMobile: boolean;
    constructor(props, context) {
        super(props, context);
        this.isMobile = document.body.clientWidth < 768;
        this.state = {
            Data: NavigatorConfig,
            showContent: true,
            trigger: this.isMobile ? "1" : null
        };
    }

    componentWillMount() {
        AkGlobal.store.dispatch(AppAdmin.requestIsAppAdmin());
    }
    componentWillReceiveProps(nextProps) {
        let topThis = this;
        //增加权限判断，防管理员发送链接给普通用户
        if ("isAppAdmin" in nextProps && (nextProps.isAppAdmin !== topThis.props["isAppAdmin"])) {
            if (nextProps.isAppAdmin === false) {
                FlowcraftCommon.goWorkFlowIndex();
            }
        }
    }

    render() {
        return <AkLayout className="ak-layout-frame">
            <AkLayout.Sider trigger={this.state.trigger}
                width={FlowcraftCommon.getSiderWidth()}
                collapsed={this.state.showContent && this.isMobile}
                collapsedWidth={0}
                isdefaultFixed
                breakpoint="sm" onCollapse={(collapsed, type) => {
                    if (this.isMobile) {
                        this.setState({ showContent: collapsed, trigger: collapsed ? "1" : null });
                    }
                }}>
                <AkLayout>
                    <AkLayout.Header className="ak-header-title">
                        <Link to={PathConfig.ProcessSetting} style={{ color: "#666" }}>
                            <AkIcon type="leftarrow" className="ak-header-back"></AkIcon>
                        </Link>
                        <FormattedMessage id={NavLocale.HeaderTitle}></FormattedMessage>
                    </AkLayout.Header>
                </AkLayout>
                <AkLayout.Content>
                    <Navigator menuClick={() => {
                        if (this.isMobile) {
                            this.setState({ showContent: true, trigger: "1" });
                        }
                    }} navigatorConfig={NavigatorConfig}></Navigator>
                </AkLayout.Content>
            </AkLayout.Sider>
            {this.state.showContent ? this.props.children : null}
        </AkLayout>;
    }

    renderMenu() {
        return <AkCol xs={0} md={6} lg={5} style={AkmiiFrameStyle.LeftMenuRightLine}>
            <AkRow>
                <AkmiiHeader>
                    <AkCol>

                        <span className="ak-header-title">
                            <FormattedMessage id={NavLocale.HeaderTitle}></FormattedMessage>
                        </span>
                    </AkCol>
                </AkmiiHeader>
            </AkRow>
            <AkRow>
                <Navigator navigatorConfig={NavigatorConfig}></Navigator>
            </AkRow>
        </AkCol>;
    }

    render1() {
        return <AkRow style={{
            height: "100%"
        }}>
            <AkRow type="flex" style={{
                minHeight: '1000px'
            }}>
                {this.renderMenu()}
                <AkCol xs={24} md={18} lg={19}>
                    {this.props.children}
                </AkCol>
            </AkRow>
        </AkRow>;
    }
}
class AkmiiFrameStyle {
    static LeftMenuRightLine: React.CSSProperties = {
        borderRight: "#e9e9e9 1px solid"
    };
    static AkFooter: React.CSSProperties = {
        width: "100%",
        height: "60px",
        fontSize: "12px",
        color: "#000",
        textAlign: "center",
        backgroundColor: " #f5f5f5",
        marginBottom: "-3px"
    };
}

//export default withRouter(injectIntl(AkmiiFrame));
const mapStateToProps = (state) => {
    return { isAppAdmin: state.admin.isAppAdmin };
};

export default connect(mapStateToProps)(withRouter(injectIntl(AkmiiFrame)));
