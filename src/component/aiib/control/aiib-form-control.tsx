
import * as React from 'react';
import { AiibContentListDefs } from '../../../api/aiibworkflow';
import { CONTROL_INPUT, CONTROL_TEXTAREA, CONTROL_INPUT_NUMBER, CONTROL_SELECT, CONTROL_METADATA, CONTROL_CHECKBOX, CONTROL_IDENTITY_PICKER, CONTROL_RADIO, CONTROL_TIME, CONTROL_DATEPICKER } from 'akmii-yeeoffice-crafts/lib';
import { AkInput, AkInputNumber, AkSelect, AkMetadataSelect, AkCheckbox, AkFormIdentityPicker, AkRadio, AkDatePicker, AkTimePicker} from 'akmii-yeeoffice-common';
import { AiibIdentityPicker, AiibFormThematicCheck, } from '../index';

interface AiibFormControlProps {
    def: AiibContentListDefs;
    disabled: boolean;
    value?: any;
    onChange?: (value) => void;
}
interface AiibFormControlState { }

export class AiibFormControl extends React.Component<AiibFormControlProps, AiibFormControlState>{
    constructor(props, context) {
        super(props, context);

    }

    renderItem(def: AiibContentListDefs) {
        const { disabled, value, onChange } = this.props;
        let control = null;
        switch (def.Type) {
            case CONTROL_INPUT:
                control = <AkInput value={value} onChange={(value) => onChange(value)}  disabled={disabled} />;
                break;
            case CONTROL_TEXTAREA:
                control = <AkInput.TextArea style={{
                    minHeight: def.InternalName === "OutlineAndConditions" ? 78 : 0
                }} disabled={disabled} value={value} onChange={onChange} />;
                break;
            case CONTROL_INPUT_NUMBER:
                control = <AkInputNumber disabled={disabled} value={value} onChange={(value) => onChange(value)} />;
                break;
            case CONTROL_SELECT:
                const options = JSON.parse(def.Rules).choices.map((item, index) => {
                    return <AkSelect.Option key={index} value={item} >{item}</AkSelect.Option>;
                });
                control = <AkSelect allowClear={true} disabled={disabled} value={value} onChange={(value) => onChange(value)}>{options}</AkSelect>;
                break;
            case CONTROL_METADATA:
                const categoryId = JSON.parse(def.Rules).categoryId;
                control = <AkMetadataSelect categoryID={categoryId} disabled={disabled} value={value} onChange={(value) => onChange(value)} />;
                break;
            case CONTROL_CHECKBOX:
                if (def.InternalName === "ThematicPriorities") {
                    control = <AiibFormThematicCheck disabled={disabled} value={value} onChange={(value) => this.props.onChange(value)} />
                } else {
                    const choices = JSON.parse(def.Rules).choices;
                    const optionsGroup = choices.map(item => {
                        return { label: item, value: item };
                    });
                    control = <AkCheckbox.Group disabled={disabled} options={optionsGroup}
                        value={value} onChange={(value) => {
                            onChange(value);
                        }
                        } />;
                }

                break;
            case CONTROL_IDENTITY_PICKER:
                if (def.InternalName === "ManagerIO") {
                    control = <AiibIdentityPicker userGropCode="Manager IO" readonly={disabled} value={value} onChange={(value) => this.props.onChange(value)} />;
                } else if (def.InternalName === "DGIO") {
                    control = <AiibIdentityPicker userGropCode="DG IO" readonly={disabled} value={value} onChange={(value) => this.props.onChange(value)} />;
                } else {
                    control = <AkFormIdentityPicker multiple={JSON.parse(def.Rules).multiple} readonly={disabled} value={value} onChange={(value) => this.props.onChange(value)} />;
                }

                break;
            case CONTROL_RADIO:
                control = <AkRadio.Group disabled={disabled} value={value} onChange={(e) => this.props.onChange(e.target.value, )}>
                    {JSON.parse(def.Rules).choices.map((item, index) => {
                        return <AkRadio key={index} value={item}>{item}</AkRadio>;
                    })}
                </AkRadio.Group>;
                break;
            case CONTROL_DATEPICKER:
                control = <AkDatePicker format="MM-DD-YYYY" showTime={JSON.parse(def.Rules).showtime} disabled={disabled} value={value} onChange={(value) => this.props.onChange(value)} />;
                break;
            case CONTROL_TIME:
                control = <AkTimePicker disabled={disabled} value={value} onChange={(value) => this.props.onChange(value)} />;
                break;
            default:
                control = <AkInput value={value} onChange={(value) => onChange(value)} disabled={disabled} />;
        }
        return control;
    }

    render() {
        return this.props.def ? this.renderItem(this.props.def) : null;
    }

}
