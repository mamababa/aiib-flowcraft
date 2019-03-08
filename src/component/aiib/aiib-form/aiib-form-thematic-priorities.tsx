import * as React from "react";
import { AkCheckbox, } from 'akmii-yeeoffice-common';



export interface AiibFormThematicCheckProps {
    value?: string[];
    onChange?: (value: string[]) => void;
    disabled?: boolean;
}

export interface AiibFormThematicCheckStates {
    groupValue?: string[];
    nonePrioritiesCheck?: boolean;
    otherPrioritiesDisabled?: boolean;
}

export class AiibFormThematicCheck extends React.Component<AiibFormThematicCheckProps, AiibFormThematicCheckStates>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            groupValue: props.value,
            nonePrioritiesCheck: props.value ? props.value.indexOf("None of above priorities") > -1 : true,
            otherPrioritiesDisabled: props.disabled ? props.disabled : props.value && props.value.indexOf("None of above priorities") > -1,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.onSetValues(nextProps.value, nextProps.disabled);
        }
        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.onSetValues(nextProps.value, nextProps.disabled);
        }
    }


    componentDidMount() {
        this.onSetValues(this.props.value, this.props.disabled);
    }

    onSetValues(valueArr: string[], disabled: boolean) {
        if (valueArr && valueArr.indexOf("None of above priorities") > -1) {
            this.setState({ nonePrioritiesCheck: true, groupValue: [], otherPrioritiesDisabled: disabled || true });
        } else {
            this.setState({ nonePrioritiesCheck: false, groupValue: valueArr, otherPrioritiesDisabled: disabled || false });
        }
    }

    onChange(value: string[]) {
        this.props.onChange(value);
    }

    render() {
        const { otherPrioritiesDisabled, nonePrioritiesCheck, groupValue } = this.state;
        const ThematicPriorities = [
            { label: "Sustainable Infrastructure", value: "Sustainable Infrastructure" },
            { label: "Cross Border Connectivity", value: "Cross Border Connectivity" },
            { label: "Private Capital Mobilization", value: "Private Capital Mobilization" },
        ]
        const { disabled } = this.props;
        return <div>
            <AkCheckbox.Group disabled={otherPrioritiesDisabled} options={ThematicPriorities}
                value={groupValue} onChange={(value) => {
                    this.onChange(value);
                }
                } />
            <AkCheckbox disabled={disabled}
                checked={nonePrioritiesCheck}
                value="None of above priorities"
                onChange={(value) => {
                    if (value.target.checked) {
                        this.setState({ nonePrioritiesCheck: true, groupValue: [], otherPrioritiesDisabled: true });
                        this.onChange(["None of above priorities"]);
                    } else {
                        this.onChange([]);
                        this.setState({ nonePrioritiesCheck: false, groupValue: [], otherPrioritiesDisabled: false });
                    }

                }}
            >None of above priorities</AkCheckbox>
        </div>;
    }

}
