import * as React from "react";
import { AkLookup } from 'akmii-yeeoffice-common';
import { CountryValueModal } from "../../../api/aiibworkflow/index";

export interface AiibFormCountryState {
    value?: any;
}

export interface AiibFormCountryProps {
    disabled?: boolean;
    onChange?: (value, obj: CountryValueModal) => void;
    value?: any;
}

export class AiibFormCountry extends React.Component<AiibFormCountryProps, AiibFormCountryState>{
    static defaultProps: AiibFormCountryProps = {
        disabled: false
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        }
    }

    render() {
        const { disabled, value } = this.props;
        return <AkLookup
            value={value}
            readonly={disabled}
            listAddition={[{
                FieldName: 'Text1',
                IsShow: true
            },
            {
                FieldName: 'Text7',
                IsShow: true
            }, {
                FieldName: 'Text4',
                IsShow: false,
                RelationName: "Text4"
            }]}
            listID="983646342767316992"
            listFieldName="Text1"
            readOnlyShowBorder={true}
            onChange={(v, obj) => {
                const values: CountryValueModal = {
                    Region: obj ? obj.Text7 : "",
                    CountrySymbol: obj ? obj.Text4 : "",
                    CountryName: obj ? obj.Text1 : "",
                };
                this.setState({ value: v });
                this.props.onChange(v, values);
            }}
        />;
    }

}
