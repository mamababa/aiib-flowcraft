import * as React from 'react';
import { AkRow, FormHelper, AkMetadataSelect, AkSelect } from "akmii-yeeoffice-common";
import { AiibListUtil } from "../control/aiib-list-util";
import { AIIBWorkflowHelper } from '../../../page/aiib/aiib-workflow-helper';

export interface AiibCommonFormInfoProps {
    disabled?: boolean;
}

export interface AiibCommonFormInfoStatus {

}

export class AiibCommonFormProjectInfo extends React.Component<AiibCommonFormInfoProps, AiibCommonFormInfoStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        const { props, props: { disabled } } = this;
        const { colLabelLayout, largeControlLayout } = FormHelper;
        return <div>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "ProjectName", disabled, true, null, colLabelLayout, largeControlLayout)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {/* {this.renderFormItems("ProjectName", disabled, true, null, colLabelLayout, largeControlLayout)} */}
                {AIIBWorkflowHelper.renderFormItem(props, 'Sector', 'Sector', <AkMetadataSelect disabled={disabled} parentCode="Sector" categoryCode="Sector" />, true)}
                {AIIBWorkflowHelper.renderFormItem(props, 'Subsector', 'Subsector', <AkSelect disabled={disabled} allowClear={true}>
                </AkSelect>, false)}
            </AkRow>
            <AkRow {...FormHelper.rowLayout}>

                {AiibListUtil.ConvertDefToFormItem(props, "StartDate", disabled, false)}
                {AiibListUtil.ConvertDefToFormItem(props, "EndDate", disabled, false)}

            </AkRow>
            <AkRow {...FormHelper.rowLayout}>
                {AiibListUtil.ConvertDefToFormItem(props, "EndDate", disabled, false)}


            </AkRow>
        </div>;
    }
}