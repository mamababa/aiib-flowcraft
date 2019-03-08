import * as React from "react";
import { AkMenu, AkIcon } from 'akmii-yeeoffice-common';
const MenuItem = AkMenu.Item;
interface MetaDataMenuProps {
    metaDataMenu?: MetadataModel[];
    onChangeNode?: (MetadataItem?: MetadataModel) => void;
    onReport?: () => void;
    onRatings?: () => void;
}
interface MetaDataMenuStatus { }
export default class MetaDataMenu extends React.Component<MetaDataMenuProps, MetaDataMenuStatus>{
    constructor(props, context) {
        super(props, context);
    }

    onMenuClick(e) {
        if (e.key === "-1") {
            this.props.onReport && this.props.onReport();
        } else if (e.key === "Rating") {
            this.props.onRatings && this.props.onRatings();
        } else {
            this.props.onChangeNode && this.props.onChangeNode(this.props.metaDataMenu.find(i => i.Code === e.key));
        }
    }
    getMenu() {
        let menuArr = this.props.metaDataMenu.map(i => {
            return <MenuItem key={i.Code}>
                <div className="aiib-menu-text">
                    {i.Code === "MemberRole" ? <i className="iconfont icon-myproject menu_icon"></i> : <i className="iconfont icon-bumen menu_icon"></i>}
                    <span className="menu_title">{i.Name}</span>
                    <i className="menu_right"></i>
                </div>
            </MenuItem>;
        });
        menuArr.push(<MenuItem key='Rating'>
            <div className="aiib-menu-text">
                <i className="iconfont icon-guojia menu_icon"></i>
                <span className="menu_title">Country Data</span>
                <i className="menu_right"></i>
            </div>
        </MenuItem>
        );
        return menuArr;
    }
    render() {
        return <AkMenu defaultSelectedKeys={["MemberRole"]} className="aiib-menu" onClick={this.onMenuClick.bind(this)}>
            {this.getMenu()}
        </AkMenu>;
    }
}
