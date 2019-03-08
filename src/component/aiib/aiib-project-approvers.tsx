import * as React from 'react';
import { AkRow, FormHelper } from 'akmii-yeeoffice-common';
import { AiibIdentityPicker } from './index';
import { AIIBWorkflowHelper } from '../../page/aiib/index';
export interface AiibProjectApproversProps {
    disabled?: boolean;
}

export interface AiibProjectApproversState {

}

export class AiibProjectApprovers extends React.Component<AiibProjectApproversProps, AiibProjectApproversState>{
    constructor(props, context) {
        super(props, context);

    }

    render() {
        const { props, props: { disabled } } = this;
        return <div>
            <AkRow {...FormHelper.rowLayout}>
                {AIIBWorkflowHelper.renderFormItem(props, "Manager IO", 'ManagerIO', <AiibIdentityPicker readonly={disabled} userGropCode="Manager IO" />, true, null)}
                {AIIBWorkflowHelper.renderFormItem(props, "DG IO", 'DGIO', <AiibIdentityPicker readonly={disabled} userGropCode="DG IO" />, true, null)}
            </AkRow>
        </div>;
    }

}
