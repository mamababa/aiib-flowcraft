import * as React from 'react'
import { Component } from 'react'
import {
    AkButton,
} from "akmii-yeeoffice-common";
import {
    AIIBTeamMemberModel
} from "../../api/aiibworkflow";
import { AIIBTeamMemberModal } from "./index";

export interface AIIBTeamMemberAddButtonProps {
    onSubmit?: (dataSource: AIIBTeamMemberModel) => void;
    disabled?: boolean;
}

export interface AIIBTeamMemberAddButtonStates {
    modalVisible: boolean;
}

export class AIIBTeamMemberAddButton extends Component<AIIBTeamMemberAddButtonProps, AIIBTeamMemberAddButtonStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalVisible: false
        }
    }

    onClick(e) {
        const topThis = this;
        topThis.setState({ modalVisible: true });
    }

    render() {
        const topThis = this;
        const { state: { modalVisible }, props: { onSubmit, disabled } } = topThis;
        return <div>
            <AkButton disabled={disabled} className='aiib-button dark' icon="plus" onClick={topThis.onClick.bind(this)}>Add New Member</AkButton>
            {modalVisible == true ?
                <AIIBTeamMemberModal visible={modalVisible} onCancel={() => {
                    topThis.setState({ modalVisible: false });
                }} onOk={(data: AIIBTeamMemberModel) => {
                    topThis.setState({ modalVisible: false }, () => {
                        if (onSubmit)
                            onSubmit(data);
                    });
                }}></AIIBTeamMemberModal> : null}
        </div>;
    }
}
