import * as React from 'react';
import { AkRow, FormHelper, AkInput } from "akmii-yeeoffice-common";
import { AiibListUtil } from "../control/aiib-list-util";
import { AIIBWorkflowHelper } from '../../../page/aiib/index';

export interface AiibCommonFormInfoProps {
    disabled?: boolean;
}

export interface AiibCommonFormInfoStatus {

}

export class AiibCommonFormInfo extends React.Component<AiibCommonFormInfoProps, AiibCommonFormInfoStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        const { props, props: { disabled } } = this;
        return <div>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "Mobilization", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "South_South", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "PPP", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "NDA", disabled, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout} className="aiib-project-description">
                {AiibListUtil.ConvertDefToFormItem(props, "InformationSecurityLevel", disabled, true, [AIIBWorkflowHelper.ruleForRequire(props, "Information Security Level")])}
                {AiibListUtil.ConvertDefToFormItem(props, "FundSourcesAndUses", disabled, false)}
            </AkRow>
        </div>;
    }
}
