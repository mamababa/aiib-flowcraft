import * as React from "react";
import { AkIcon, AkRow, AkGlobal } from "akmii-yeeoffice-common";
import { AkFCFormControlDefs, AkDataProvider, AkFCFormControlDef } from "akmii-yeeoffice-crafts";
import { FormcraftLocale } from "../../../locales/localeid";

interface AkFlowcraftFormControlPanelProps {
    width?: number;
    onDragStart?: (e, control: AkFCFormControlDef) => void;
    onDragEnd?: (e) => void;
}

interface AkFlowcraftFormControlPanelStates {
    controlDef?: AkFCFormControlDefs;
}

export class AkFlowcraftFormControlPanel extends React.Component<AkFlowcraftFormControlPanelProps,
    AkFlowcraftFormControlPanelStates> {

    static defaultProps: AkFlowcraftFormControlPanelProps = {
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            controlDef: { flow: [], layout: [], form: [] }
        };
    }

    componentWillMount() {
        AkDataProvider.getControlDefs().then(d => {
            this.setState({ controlDef: d });
        });
    }

    onDragStart(e, control) {
        if (navigator.userAgent.indexOf("Firefox") > 0) e.dataTransfer.setData('Text', '');
        this.props.onDragStart && this.props.onDragStart(e, control);
    }

    // onMouseDown(control, e) {
    //     this.props.onPress&&this.props.onPress(control, e.clientX, e.clientY);
    // }


    // getMenuItem(control:AkFCFormControlDef) {
    //     return <AkMenu.Item key={control.type}><div onTouchStart={e=>this.onMouseDown(control, e)} onMouseDown={e=>this.onMouseDown(control, e)}>{control.label}</div></AkMenu.Item>
    // }
    //
    // getColDisplay(c:AkFCFormControlDef){
    //     if (c) {
    //         return <AkCol><div className="control" onTouchStart={e=>this.onMouseDown(c, e)} onMouseDown={e=>this.onMouseDown(c, e)}><AkIcon type={c.icon}></AkIcon> {c.label}</div></AkCol>;
    //     } else {
    //         return <AkCol xs={24} sm={24} md={24} lg={12}><div className="control" >{'\u00A0'}</div></AkCol>;
    //     }
    // }

    getControlDefDisplay(controls: AkFCFormControlDef[]) {
        return <AkRow>
            {controls.map(c => {
                if (c.obsolete) return;
                //return <div key={c.type} className="control" onTouchStart={e=>this.onMouseDown(c, e)} onMouseDown={e=>this.onMouseDown(c, e)}><AkIcon type={c.icon}></AkIcon> {c.label}</div>;
                return <div id={c.type} draggable key={c.type} className="control text-overflow" onDragEnd={this.props.onDragEnd}
                    onDragStart={e => this.onDragStart(e, c)}><AkIcon type={c.icon}></AkIcon> {c.label}</div>;
            })}
        </AkRow>;
    }

    render() {
        const { controlDef } = this.state;
        const { formatMessage } = AkGlobal.intl;

        return <div className="akfc-form-controlpanel">
            <div className="title">{formatMessage({ id: FormcraftLocale.PropsControls })}</div>
            {this.getControlDefDisplay(controlDef.form)}
            <div className="title">{formatMessage({ id: FormcraftLocale.PropsLayouts })}</div>
            {this.getControlDefDisplay(controlDef.layout)}
            <div className="title">{formatMessage({ id: FormcraftLocale.PropsFormControls })}</div>
            {this.getControlDefDisplay(controlDef.flow)}
        </div>;
    }
}

