import * as React from "react";
import { Component } from "react";
import { IntlProps, AkCol, AkRow, AkIcon, AkLayout, AkGlobal } from 'akmii-yeeoffice-common';
import { hashHistory } from "react-router";

export interface MainContentProps extends IntlProps {
    Header?: string | React.ReactNode;
    Search?: React.ReactNode;
    WithBack?: boolean;
    WithGo?: boolean;
    className?: string;
    isStyle?: boolean;
    onReload?: () => void;
}
interface MainContentStates {
    showSearch?: boolean;
}
export class MainContent extends Component<MainContentProps,
    MainContentStates> {
    isMobile?: boolean;

    constructor(props, context) {
        super(props, context);
        this.isMobile = document.body.clientWidth < 768;
        this.state = {
            showSearch: false
        };
    }

    renderHeader() {
        let header = this.props.Header;
        if (this.state.showSearch) {
            return null;
        } else {
            return <AkRow type="flex" align="middle" justify="start">
                {this.renderBack()}
                <AkCol className="ak-header-title">
                    {(typeof this.props.Header === "string") ? AkGlobal.intl.formatMessage({ id: this.props.Header }) : this.props.Header}
                </AkCol>
                {this.isMobile ? this.renderGo() : null}
            </AkRow>;
        }
    }

    renderBack() {
        return this.props.WithBack
            ? <AkCol>
                <div
                    className="ak-header-back"
                    onClick={() => {
                        hashHistory.goBack();
                    }}>
                    <AkIcon type="leftarrow"></AkIcon>
                </div>
            </AkCol>
            : null;
    }

    renderGo() {
        return this.props.WithGo
            ? <AkCol>
                <div
                    className="ak-header-go"
                    onClick={() => {
                    }}>
                    <AkIcon type="rightarrow"></AkIcon>
                </div>
            </AkCol>
            : null;
    }

    renderLayoutHeader() {
        const { Search, isStyle, onReload } = this.props;
        let showSearchIcon = Search ?
            <AkIcon type="ellipsis-v" onClick={() => {
                this.setState({ showSearch: true })
            }}></AkIcon> : null;
        return this.isMobile ? <div style={{ width: '100%' }}>
            {
                this.state.showSearch && Search ? <AkRow type="flex" align="middle" justify="space-between">
                    <AkCol xs={22} lg={16} sm={14} className="ak-header-search"
                        style={isStyle ? { width: "20%" } : { width: '95%' }}>
                        {Search}
                    </AkCol>
                    <AkCol xs={1}>
                        <AkIcon type="close" onClick={() => {
                            onReload ? onReload() : null;
                            this.setState({ showSearch: false });
                        }}>
                        </AkIcon>
                    </AkCol>
                </AkRow> :
                    <AkRow type="flex" align="middle" justify="space-between">
                        <AkCol xs={20} lg={8} sm={20} style={isStyle ? { width: "80%" } : null}>
                            {this.renderHeader()}
                        </AkCol>
                        <AkCol>
                            {showSearchIcon}
                        </AkCol>
                    </AkRow>
            }
        </div>
            : <AkRow type="flex" align="middle" justify="start" style={{ display: 'flex' }}>
                <AkCol xs={Search ? 5 : 24} lg={8} sm={Search ? 5 : 24} style={isStyle ? { width: "80%" } : null}>
                    {this.renderHeader()}
                </AkCol>
                <AkCol xs={Search ? 19 : 0} lg={16} sm={Search ? 19 : 0} style={isStyle ? { width: "20%" } : null}>
                    {/* <AkCol xs={19} lg={16} sm={19} className="ak-header-search" style={isStyle ? { width: "20%" } : null}> */}
                    {Search}
                </AkCol>
            </AkRow>;
    }

    render() {
        const width = { width: "calc(100% - 400px)" };
        return <AkLayout className={this.props.className} style={width}>
            <AkLayout.Header className="ak-header">
                {this.renderLayoutHeader()}
            </AkLayout.Header>
            <AkLayout.Content className="ak-main-content-body">
                {this.props.children}
            </AkLayout.Content>
        </AkLayout>;
    }
}
class MainContentStyle {
}
