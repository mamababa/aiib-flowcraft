import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {injectIntl} from "react-intl";
import {
    IntlProps,
    AkNotification,
    AkRow,
    AkCol,
    AkGlobal,
    AkTooltip,
    AkSpin,
    AkNoContent
} from "akmii-yeeoffice-common";
import {QuickLinksPageLocale, CommonLocationLocale} from "../locales/localeid";
import {MenusAPI, QuickLinkParentID} from "../api/menus";
import {MainContent} from "./components/maincontent";

/** 普通用户快速链接*/
interface QuickLinkProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> { }
interface QuickLinkStates {
    loading?: boolean;
    menuData?: MenuModel[];
    getRequest?: GetMenusByParentIDRequest;
}

class QuickLinkPage extends Component<QuickLinkProps,
    QuickLinkStates> {

    constructor(props, context) {
        super(props, context);

        this.state = {
            menuData: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    /**加载全部数据*/
    loadData() {
        this.setState({ loading: true });
        const{formatMessage}=AkGlobal.intl;
        MenusAPI
            .getMenusByParentid({ parentID: QuickLinkParentID })
            .then(data => {
                if (data.Status === 0) {
                    this.setState({ loading: false, menuData: data.Data });
                } else {
                    AkNotification.warning({
                        message: formatMessage({ id: CommonLocationLocale.Tip }),
                        description:formatMessage({ id: CommonLocationLocale.GetInfoError })
                    });
                    this.setState({ loading: false });
                }
            });
    }

    render() {
        let topThis = this;
        const { menuData } = this.state;
        let content = <AkRow
            align="middle"
            type="flex"
            justify="start"
            style={{
                marginTop: '30px'
            }}>
            {menuData
                .map(function (entry: MenuModel, index) {
                    let name = entry.Name;
                    name = name.length > 10 ? name.substring(0, 9) + "..." : name;
                    return <AkCol xs={8} sm={8} md={6} key={index}
                        style={{ padding: "0 15px" }}>
                        <a target={entry.Ext1} href={`${entry.LinkUrl}`} className="ak-zapp-smbox">
                            <img
                                src={entry.IconImg.startsWith("data") ? entry.IconImg : `${process.env.IconOSS}${entry.IconImg}`} />
                            <AkTooltip title={entry.Name}>
                                <p>{name}</p>
                            </AkTooltip>
                        </a>
                    </AkCol>
                })}
        </AkRow>
        return <MainContent Header={QuickLinksPageLocale.PropsHeaderTitle}>
            <AkSpin spinning={this.state.loading}>
                {menuData.length > 0 ? content :  <AkNoContent loading={this.state.loading}></AkNoContent>}
            </AkSpin>
        </MainContent>
    }
}
class QuickLinkPageStyle { }

export default injectIntl(withRouter(QuickLinkPage))
