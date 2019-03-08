import * as React from 'react'
import {Component} from 'react'
import {
    AkModal,
    AkModalProps
} from "akmii-yeeoffice-common";

export interface AIIBModalProps extends AkModalProps {
}

export interface AIIBModalStates {
}

export class AIIBModal extends Component<AIIBModalProps, AIIBModalStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const topThis = this;
        const {props: {wrapClassName, ...otherProps}} = topThis;
        return <AkModal className={`${wrapClassName} aiib-modal`} {...otherProps}></AkModal>;
    }
}
