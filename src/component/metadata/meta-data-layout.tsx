import * as React from "react";
import { RouteComponentProps, withRouter, hashHistory } from 'react-router';
import { AkLayout, AkButton, AkGlobal } from 'akmii-yeeoffice-common';

interface MetaDataLayoutProps extends RouteComponentProps<any, any> {
    titleBack?: () => void;
    header?: string | React.ReactNode;
    title?: string;
    actions?: React.ReactNode | React.ReactNode[];
    withBack?: boolean;
    backUrl?: string;
    pullAction?: boolean;
}
interface MetaDataLayoutStatus {
    closeAction?: boolean;
}

class ContentStyle {
    static Header: React.CSSProperties = {
        paddingRight: 0,
        overflow: 'hidden'
    }
}

let isMobile = document.body.clientWidth < 768;

@withRouter
export default class MetaDataLayout extends React.Component<MetaDataLayoutProps, MetaDataLayoutStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            closeAction: false
        };
    }
    renderBack(): React.ReactNode {
        if (!this.props.withBack) return null;
        return <div className="pull-left">
            <AkButton className="ak-header-button" icon="leftarrow"
                onClick={() => this.props.backUrl ?
                    this.props.router.replace({
                        pathname: this.props.backUrl
                    })
                    : hashHistory.goBack()}>
            </AkButton>
        </div>
    }

    renderTitleBack(): React.ReactNode {
        if (!this.props.titleBack || !isMobile) return null;
        return <div className="pull-left">
            <AkButton icon="leftarrow" className="ak-header-button" onClick={this.props.titleBack} />
        </div>
    }
    renderHeader(): React.ReactNode {
        const { formatMessage } = AkGlobal.intl;
        const { header, pullAction, title } = this.props;

        if (pullAction && isMobile && this.state.closeAction) return null;


        if (title) {
            return <div style={{ marginLeft: 10 }} className="ak-header-title ak-header-title-text" title={title}>
                {title}
            </div>;
        }
        if (typeof header !== 'string') {
            return header;
        }
        return <div className="ak-header-title ak-header-title-text" title={formatMessage({ id: header })}>
            {formatMessage({ id: header })}
        </div>;
    }

    renderActions(): React.ReactNode {
        return <div className="ak-header-actions pull-right">
            {isMobile && this.props.pullAction && !this.state.closeAction ? null : this.props.actions}
            {isMobile && this.props.pullAction ? this.renderEllipsis() : null}
        </div>
    }
    renderEllipsis(): React.ReactNode {
        return <AkButton style={{ display: "inline-block" }} className="ak-header-button" icon={this.state.closeAction ? "close" : "ellipsis-v"}
            onClick={() => this.setState({ closeAction: !this.state.closeAction })} />
    }
    render() {
        return <AkLayout className="aiib-content">
            <AkLayout.Header className="ak-header ak-datamain-header" style={ContentStyle.Header}>
                {this.renderBack()}
                {this.renderTitleBack()}
                {this.renderHeader()}
                {this.renderActions()}
            </AkLayout.Header>
            <AkLayout.Content className="ak-main-content-body">
                {this.props.children}
            </AkLayout.Content>
        </AkLayout>;
    }
}
