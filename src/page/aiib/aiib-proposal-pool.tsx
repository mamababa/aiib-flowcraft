import * as React from "react";
import { IntlProps, AkLayout } from 'akmii-yeeoffice-common';
import { Component } from 'react';
import { ProposalPoolNav } from '../../component/aiib/aiib-proposal-pool-nav';
import { withRouter } from "react-router";
import { FlowcraftCommon } from '../../util/common';
import Navigator from '../../component/frame/navigator';

export interface AIIBProposalPoolProps extends ReactRouter.RouteComponentProps<any, any>, IntlProps { }

export interface AIIBProposalPoolStates {
    Data?: MenuData[];
    showContent?: boolean;
    trigger?: string;
}

@withRouter
export default class AIIBProposalPool extends Component<AIIBProposalPoolProps, AIIBProposalPoolStates>{
    isMobile: boolean;
    constructor(props, context) {
        super(props, context);
        this.isMobile = document.body.clientWidth < 768;
        this.state = {
            Data: ProposalPoolNav,
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
                <AkLayout.Content className="aiib-workflow-layout">
                    <Navigator className="aiib-workflow-nav aiib-nav" navigatorConfig={ProposalPoolNav} menuClick={() => {
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




