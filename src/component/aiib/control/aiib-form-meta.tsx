import * as React from 'react'
import { Component } from 'react'
import {
    AkSelectProps,
    AkSelect
} from "akmii-yeeoffice-common";

export interface AIIBFormMetaProps extends AkSelectProps {
}

export interface AIIBFormMetaStates {
}

export class AIIBFormMeta extends Component<AIIBFormMetaProps, AIIBFormMetaStates> {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        const { value, ...others } = this.props;
        const newValue = value ? value : [];
        return <AkSelect allowClear={true}
            mode="tags" value={newValue} {...others}></AkSelect>;
    }
}


// export const AIIBFormMeta = (props: AkSelectProps) => {
//     const { value, ...others } = props;
//     const Subsectorval = [];
//     const newValue = value ? value : []; //"" cannot be passed to multi tag value
//     return <AkSelect allowClear={true}
//         mode={"tags"} value={newValue} {...others}
//         onSelect={this.props.onSelect()}
//     ></AkSelect>;
// }
