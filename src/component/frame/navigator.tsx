import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { AkMenu, AkIcon, AkBadge, AkRow, AkCol, AkGlobal, AkContext } from 'akmii-yeeoffice-common';
import { connect } from "react-redux";
import { NavigatorKey } from "../../config/navigatorkey";
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AiibCommonFun } from '../aiib/common/aiib-common';
import { AIIBProjectPoolNaivgatorKey, AIIBProposalPoolNaivgatorKey } from '../aiib/aiib-navigator-key';

const mapStateToProps = (state) => {
    return {
        task: state.task
    };
};

interface AkmiiNavigatorProps extends ReactRouter.RouteComponentProps<any,
    any> {
    router?: ReactRouter.InjectedRouter;
    navigatorConfig?: MenuData[];
    menuClick?: () => void;
    task?: any;
    className?: string;
}
interface AkmiiNavigatorStates {
    isManager?: boolean;
    isReadOnly?:boolean;
}


class AkmiiNavigator extends Component<AkmiiNavigatorProps,
    AkmiiNavigatorStates> {

    openKeys: string[];
    constructor(props, context) {
        super(props, context);
        this.openKeys = [];
        this.state = {
            isManager: false,
            isReadOnly:false
        };
    }

    componentDidMount() {
        ProjectAPI.getUserGroups({ userID: "" }).then(data => {
            if (data.Status === 0) {
                const userGroups = data.Data;
                const arr = userGroups.filter((item) => item && item.Ext2 && item.Ext2.indexOf("Readonly") > -1);
                const isReadOnly = arr.length > 0 ? true : false;
                this.setState({ isManager: AiibCommonFun.UserIsManager(userGroups) ,isReadOnly});
            }
        });
    }

    renderSubMenu(menu: MenuData) {
        const { task } = this.props;
        const user = AkContext.getUser();
        if (menu.NotShow) {
            return;
        }
        if (menu.IsDivider) {
            return <AkMenu.Divider key={menu.Key}></AkMenu.Divider>;
        }
        if (menu.Children) {
            return <AkMenu.SubMenu
                key={menu.Key}
                title={AkGlobal.intl.formatMessage({ id: menu.Title })}>
                {menu.Children.map((item) => {
                    return this.renderSubMenu(item);
                })}
            </AkMenu.SubMenu>;
        }

        let badgeCount = menu.Badge;
        switch (menu.Key) {
            case NavigatorKey.WaittingTask:
                badgeCount = task.todoCount;
                break;
            case NavigatorKey.ReceiveTask:
                badgeCount = task.claimCount;
                break;
        }
        if((menu.Key === AIIBProposalPoolNaivgatorKey.NewProposal 
            || menu.Key === AIIBProposalPoolNaivgatorKey.MyProposal
            || menu.Key === AIIBProjectPoolNaivgatorKey.MyProject
            || menu.Key === AIIBProjectPoolNaivgatorKey.NewProject
        ) && this.state.isReadOnly) {
            return null;
        }
        
        let badge = badgeCount > 0 && <AkBadge style={{ background: "#63A8EB" }} count={badgeCount} />;
        if ((menu.Key === AIIBProjectPoolNaivgatorKey.MeetingMaterials || menu.Key === AIIBProjectPoolNaivgatorKey.MeetingMinutes) && !this.state.isManager) {
            return null;
        }

        if (menu.Key === AIIBProposalPoolNaivgatorKey.MyProposal && (user.DepartmentID !== "979258275671445504" && !user.IsAdmin)) {
            return null;
        }

        return <AkMenu.Item key={menu.Key} className="menu_li">
            <Link to={menu.Path}>
                <AkRow justify="space-between" type="flex" align="middle">
                    <AkCol>
                        <AkIcon type={menu.Icon} className="menu_icon"></AkIcon>
                        <span className="menu_title">
                            {AkGlobal.intl.formatMessage({ id: menu.Title })}
                        </span>
                        <i className="menu_right"></i>
                    </AkCol>
                    <AkCol>{badge}</AkCol>
                </AkRow>
            </Link>
        </AkMenu.Item>;
    }
    /** 寻找当前选中节点 */
    findSelected(path: string, menuData: MenuData[]): MenuData {
        for (let i = 0; i < menuData.length; i++) {
            if (menuData[i].Path === path) {
                return menuData[i];
            }
            if (menuData[i].Children) {
                let menu = this.findSelected(path, menuData[i].Children);
                if (menu) {
                    this.openKeys.push(menuData[i].Key);
                }
                return menu;
            }
        }
        return {};
    }
    render() {
        let menuConfig = this.props.navigatorConfig;
        let selectMenu = this.findSelected(this.props.location.pathname, menuConfig);
        return <AkMenu
            mode="inline"
            className={"ak-flowcraft-menu " + this.props.className}
            defaultOpenKeys={this.openKeys}
            onClick={() => {
                if (this.props.menuClick) {
                    this.props.menuClick();
                }
                return true;
            }}
            selectedKeys={[selectMenu.Key]}
            defaultSelectedKeys={[selectMenu.Key]}>
            {menuConfig.map((item) => {
                return this.renderSubMenu(item);
            })}
        </AkMenu>;
    }
}


export default connect(mapStateToProps)(withRouter(AkmiiNavigator));
