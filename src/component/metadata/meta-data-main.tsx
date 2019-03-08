import * as React from "react";
import { AkLayout } from 'akmii-yeeoffice-common';
import { FlowcraftCommon } from "../../util/common";
import MetaDataMenu from './meta-data-menu';

interface MetaDataMainProps {
    metaDataMenu?: MetadataModel[];
    onChangeNode?: (MetadataItem?: MetadataModel) => void;
    onRatings?: () => void;
    onReport?: () => void;
}
interface MetaDataMainStatus {
    showContent?: boolean;
    trigger?: string;
}
export default class MetaDataMain extends React.Component<MetaDataMainProps, MetaDataMainStatus>{
    isMobile: boolean;
    constructor(props, context) {
        super(props, context);
        this.isMobile = document.body.clientWidth < 768;
        this.state = {
            showContent: true,
            trigger: this.isMobile ? "1" : null
        };
    }

    onChangeNode(MetadataItem) {
        this.props.onChangeNode(MetadataItem);
        this.setState({ showContent: true, trigger: "1" });
    }

    onReport() {
        this.props.onReport();
        this.setState({ showContent: true, trigger: "1" });
    }

    onRating() {
        this.props.onRatings();
        this.setState({ showContent: true, trigger: "1" });
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
                    <MetaDataMenu
                        metaDataMenu={this.props.metaDataMenu}
                        onChangeNode={(MetadataItem) => this.onChangeNode(MetadataItem)}
                        onRatings={() => this.onRating()}
                        onReport={() => this.onReport()} />
                </AkLayout.Content>
            </AkLayout.Sider>
            <AkLayout>
                <AkLayout.Content>
                    {this.state.showContent ? this.props.children : null}
                </AkLayout.Content>
            </AkLayout>
        </AkLayout >;
    }
}
