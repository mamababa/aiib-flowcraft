import * as React from 'react';
import { AkButton } from 'akmii-yeeoffice-common';
export interface ProposalSaveHandleProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export interface ProposalSaveHandleState {

}

export default class ProposalSaveHandle extends React.Component<ProposalSaveHandleProps, ProposalSaveHandleState>{
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        return <AkButton icon="save" {...this.props} className='aiib-button green'>Save</AkButton>;
    }

}
