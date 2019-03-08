import * as React from 'react';
import { FormHelper } from "akmii-yeeoffice-common";
import { AIIBWorkflowHelper } from "../../../page/aiib/aiib-workflow-helper";
import { AiibFormControl } from "./aiib-form-control";
import { AiibCommonFun } from '../index';

export class AiibListUtil {
    public static ConvertDefToFormItem(
        props,
        fieldName: string,
        disabled: boolean,
        isRequire: boolean,
        rules: any = null,
        labelLayout = FormHelper.colLabelLayout,
        controlLayout = FormHelper.colControlLayout,
        extra: string | React.ReactNode = null) {
        const listDefs = AiibCommonFun.getlocalStorageListDefsData();
        const def = listDefs.find(i => i.InternalName === fieldName);

        if (!def) return;
        return listDefs ? AIIBWorkflowHelper.renderFormItem(props, def.DisplayName, fieldName, <AiibFormControl def={def} disabled={disabled} />, isRequire, rules, labelLayout, controlLayout, extra)
            : null;
    }

    public static ConvertDefToFormItemInDisplayName(
        props,
        displayName: string,
        InternalName: string,
        fieldName: string,
        disabled: boolean,
        isRequire: boolean,
        rules: any = null,
        labelLayout = FormHelper.colLabelLayout,
        controlLayout = FormHelper.colControlLayout,
        extra: string | React.ReactNode = null) {
        const listDefs = AiibCommonFun.getlocalStorageListDefsData();

        const def = listDefs.find(i => i.InternalName === InternalName);

        if (!def) return;
        return listDefs ? AIIBWorkflowHelper.renderFormItem(props, displayName, fieldName, <AiibFormControl def={def} disabled={disabled} />, isRequire, rules, labelLayout, controlLayout, extra)
            : null;
    }
}
