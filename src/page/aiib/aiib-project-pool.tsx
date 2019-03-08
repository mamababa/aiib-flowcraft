import * as React from 'react';
import { AkLayout, FlowcraftCommon, IntlProps } from 'akmii-yeeoffice-common';
import Navigator from '../../component/frame/navigator';
import { ProjectPoolNav } from '../../component/aiib/index';
export interface AIIBProjectPoolProps extends ReactRouter.RouteComponentProps<any, any>, IntlProps {

}

export interface AIIBProjectPoolState {
    Data?: MenuData[];
    showContent?: boolean;
    trigger?: string;
}

export default class AIIBProjectPool extends React.Component<AIIBProjectPoolProps, AIIBProjectPoolState>{
    isMobile: boolean;
    constructor(props, context) {
        super(props, context);
        this.isMobile = document.body.clientWidth < 768;
        this.state = {
            Data: ProjectPoolNav,
            showContent: true,
            trigger: this.isMobile ? "1" : null
        };
    }

    render() {
        return <AkLayout className="ak-layout-frame">
            <AkLayout.Sider trigger={this.state.trigger}
                width={FlowcraftCommon.getSiderWidth()}
                collapsed={this.state.showContent && this.isMobile}
                collapsedWidth={0}
                isdefaultFixed
                breakpoint="sm"
                className="aiib-workflow-sider"
                onCollapse={(collapsed, type) => {
                    if (this.isMobile) {
                        this.setState({ showContent: collapsed, trigger: collapsed ? "1" : null });
                    }
                }}>
                <AkLayout>
                </AkLayout>
                <AkLayout.Content className="aiib-workflow-layout">
                    <Navigator className="aiib-workflow-nav aiib-nav" navigatorConfig={ProjectPoolNav} menuClick={() => {
                        if (this.isMobile) {
                            this.setState({ showContent: true, trigger: "1" });
                        }
                    }}>
                    </Navigator>
                </AkLayout.Content>
            </AkLayout.Sider>
            {this.state.showContent ? this.props.children : null}
        </AkLayout >;
    }

}
