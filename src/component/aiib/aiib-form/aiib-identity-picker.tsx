import { AkFormIdentityPicker, AkFormIdentityPickerProp } from 'akmii-yeeoffice-common';
import * as React from 'react';
import { ProjectAPI } from '../../../api/aiibworkflow/project';

interface AiibIdentityPickerProps extends AkFormIdentityPickerProp {
    userGropCode?: string;
    value?: string;
}

interface AiibIdentityPickerState {
    selectUsers?: string[];
}

export class AiibIdentityPicker extends React.Component<AiibIdentityPickerProps, AiibIdentityPickerState>{
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectUsers: []
        }
    }

    componentDidMount() {
        const requestData: GetUserByCode = {
            pageIndex: 1,
            pageSize: 999,
            groupCode: this.props.userGropCode
        };
        ProjectAPI.getUserGroupsByCode(requestData).then(data => {
            if (data.Status === 0) {
                const selectUsers = data.Data.map(item => item.AccountID);
                this.setState({ selectUsers });
            }
        });
    }


    render() {
        return <AkFormIdentityPicker selectionRange={this.state.selectUsers} {...this.props} />;
    }

}
