import * as React from "react";
import { AkSelect } from 'akmii-yeeoffice-common';

export const AiibSelectStatus = (props) => {
    const Option = AkSelect.Option;
    return <AkSelect style={{ width: 150, marginLeft: 10 }} value={props.value} onChange={(value) => props.handleSelectChange(value)}>
        <Option value="All">All</Option>
        <Option value="Unsubmitted">Unsubmitted</Option>
        <Option value="Active">Active</Option>
        <Option value="Inactive">Inactive</Option>
        {/* <Option value="Cancel">Cancel</Option> */}
    </AkSelect>;
}
export const AiibSelectStage = (props) => {
    const Option = AkSelect.Option;
    return <AkSelect style={{ width: 150, marginLeft: 10 }} value={props.value} onChange={(value) => props.handleSelectChange(value)}>
        <Option value="All">All</Option>
        <Option value="Concept">Concept</Option>
        <Option value="Appraisal">Appraisal</Option>
        <Option value="Interim/Final Review">Interim/Final Review</Option>
        <Option value="Negotiation">Negotiation</Option>
        <Option value="Board Approval">Board Approval</Option>
        <Option value="Board Approved">Board Approved</Option>
    </AkSelect>;
}

export const AiibSelectState = (props) => {
    const Option = AkSelect.Option;
    return <AkSelect style={{ width: 200, marginLeft: 10 }} value={props.value} onChange={(value) => props.handleSelectChange(value)}>
        <Option value="ScrCom Review">ScrCom Review</Option>
        <Option value="ExCom Review">ExCom Review</Option>
    </AkSelect>;
}
export const AiibReportStage = (props) => {
    const Option = AkSelect.Option;
    return <AkSelect style={{ width: 200, marginLeft: 10 }} value={props.value} onChange={(value) => props.handleSelectChange(value)}>
        <Option value="All">All Projects</Option>
        <Option value="1">To be Cancelled Projects</Option>
        <Option value="2">Cancelled Projects</Option>
        <Option value="Board Approved">Approved Projects</Option>
        <Option value="Planned">Planned Projects</Option>
    </AkSelect>;
}
