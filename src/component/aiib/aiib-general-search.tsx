import * as React from "react";
import {Component} from "react";
import {AkInput, AkIcon, AkButton, AkInputProp} from "akmii-yeeoffice-common";
const AkInputGroup = AkInput.Group;

export interface AIIBGeneralSearchProps extends AkInputProp {
    onSearch?: (value) => void;
    onChange?:(value)=>void;
    className?: string;
    value?:string;
}
export interface AIIBGeneralSearchStates {
    value: string;
}

export class AIIBGeneralSearch extends Component<AIIBGeneralSearchProps, AIIBGeneralSearchStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value
        }
    }
    componentWillReceiveProps(nextProps){
        if('value' in nextProps && this.state.value !== nextProps.value){
            this.setState({
                value:nextProps.value
            });
        }
    }
    /** 搜索点击事件---要注意回车点击的时间冒泡*/
    onSearch() {
        const topThis = this;
        const {props: {onSearch}, state: {value}} = topThis;
        onSearch && onSearch(value);
    }


    render() {
        const topThis = this;
        const {props: {placeholder, size, className}, state: {value}} = topThis;
        return <AkInputGroup size={size ? size : "large"} compact={true} className={className + " aiib-general-search"}>
            <AkInput value={value} placeholder={placeholder ? placeholder : "Search"}
                     onChange={(v)=>this.props.onChange(v)}
                     onPressEnter={topThis.onSearch.bind(this)}
                     prefix={<AkIcon type="search"/>}></AkInput>
            <AkButton onClick={topThis.onSearch.bind(this)}>Search</AkButton>
        </AkInputGroup>;
    }
}
