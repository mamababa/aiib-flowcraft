import * as React from "react";
import {
    AkColProps,
    AkRow,
    AkInput,
    AkLookup,
    AkRadio,
    AkIcon,
    AkSelect
} from 'akmii-yeeoffice-common';
import { AIIBWorkflowHelper } from "../../page/aiib/index";
import { FormHelper, AkForm, AkFormComponentProps } from 'akmii-yeeoffice-common';
import { AiibFormCountry, AiibFormContent } from "./index";
const RadioGroup = AkRadio.Group;
const Option = AkSelect.Option;
interface AiibProposalContactsRowProps extends AkFormComponentProps {
    value?: any;
    title?: string;
    disable?: boolean;
    type?: 'Contact' | 'Sponsor' | 'Borrower';
    onRegion?: (type, value) => void;

}
interface AiibProposalContactsRowState {
}
@AkForm.create()
export default class AiibProposalContactsRow extends React.Component<AiibProposalContactsRowProps, AiibProposalContactsRowState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    renderItem(key, left, right?) {
        return <AkRow key={key} {...FormHelper.rowLayout}>
            {left}
            {right}
        </AkRow>;
    }
    renderFormItem() {
        const { type, disable } = this.props;
        const { colLabelLayout, largeControlLayout } = FormHelper;

        let Name: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Name of Contact', `${type}_Name`,
            <AkInput disabled={disable} placeholder='' />, false, []);
        let Title: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Title', `${type}_Title`,
            <AkInput disabled={disable} placeholder='' />, false, [], );
        let EmailAddress: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Email Address', `${type}_EmailAddress`,
            <AkInput disabled={disable} placeholder='' />, false, [FormHelper.ruleForEmail(this.props, "Email Address")]);
        let Organization: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Organization', `${type}_Organization`,
            <AkInput disabled={disable} placeholder='' />, false, []);
        let OrganizationType: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Organization Type', `${type}_OrganizationType`,
            <AkSelect disabled={disable}>
                <Option value='Government'>Government</Option>
                <Option value='Sponsor'>Sponsor</Option>
                <Option value='Consulting Firm'>Consulting Firm</Option>
                <Option value='Intermediary'>Intermediary</Option>
                <Option value='Financial Institution'>Financial Institution</Option>
            </AkSelect>, false, []);
        let OrganizationWebsite: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Organization Website', `${type}_OrganizationWebsite`,
            <AkInput disabled={disable} placeholder='' />, false, [], colLabelLayout, largeControlLayout);
        let TelephoneNumber: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Telephone Number', `${type}_TelephoneNumber`,
            <AkInput disabled={disable} placeholder='' />, false, []);
        let Country: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Country', `${type}_Country`,
            <AiibFormCountry
                disabled={disable}
                onChange={(v, obj) => {
                    if (type === "Contact") {
                        this.props.form.setFieldsValue({
                            Contact_Region: obj ? obj.Region : "",
                        });
                    } else if (type === "Sponsor") {
                        this.props.form.setFieldsValue({
                            Sponsor_Region: obj ? obj.Region : "",
                        });
                    }


                }}
            />, false, []);
        let Region: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Region', `${type}_Region`, <AkInput disabled={true} />
            , false, []);
        let Address: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Address', `${type}_Address`,
            <AkInput disabled={disable} placeholder='' />, false, []);
        let Rating: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Rating', `${type}_Rating`,
            <AkInput disabled={disable} placeholder='' />, false, []);
        let MainShareholder: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Main Shareholder(s)', `${type}_MainShareholder`,
            <AkInput disabled={disable} placeholder='' />, false, []);
        let Listed: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Listed', `${type}_Listed`,
            <RadioGroup disabled={disable}>
                <AkRadio value='Yes'>Yes</AkRadio>
                <AkRadio value='No'>No</AkRadio>
            </RadioGroup>, false, []);
        let PercentageOwnership: React.ReactNode = AIIBWorkflowHelper.renderFormItem(this.props, 'Percentage Ownership', `${type}_PercentageOwnership`,
            <AkInput disabled={disable} placeholder='' />, false, []);

        let items: React.ReactNode[] = [];
        switch (type) {
            case 'Contact':
                items = [
                    this.renderItem(1, Name, Title),
                    this.renderItem(2, EmailAddress, Organization),
                    this.renderItem(3, OrganizationType),
                    this.renderItem(4, OrganizationWebsite),
                    this.renderItem(5, TelephoneNumber),
                    this.renderItem(6, Country, Region)];
                break;
            case 'Sponsor':
                items = [
                    this.renderItem(1, Name, Title),
                    this.renderItem(2, EmailAddress, TelephoneNumber),
                    this.renderItem(3, Country, Region),
                    this.renderItem(4, Address, Rating),
                    this.renderItem(5, MainShareholder, Listed)];
                break;
            case 'Borrower':
                items = [
                    this.renderItem(1, Name, Title),
                    this.renderItem(2, EmailAddress, TelephoneNumber),
                    this.renderItem(3, Country),
                    this.renderItem(4, Address, PercentageOwnership),
                    this.renderItem(5, MainShareholder, Listed)];
                break;
        }
        return items;
    }

    render() {
        return <div className='aiib-contact'>
            <AiibFormContent title={this.props.type + " Information"}>
                {this.renderFormItem()}
            </AiibFormContent>
        </div>;
    }

}
