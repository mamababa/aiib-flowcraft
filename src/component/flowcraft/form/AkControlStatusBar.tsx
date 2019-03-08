import * as React from 'react'
import { Component } from 'react'
import { AkRow, AkCol, TaskLocale, ApplicationStatusLocale, ApplicationStatusEnum } from "akmii-yeeoffice-common";
import { FormattedMessage } from "react-intl";


interface AkStatusBarProps {
    taskDetail?: TaskDetailV2Info;
}
interface AkStatusBarStates { }
export class AkStatusBar extends Component<AkStatusBarProps, AkStatusBarStates> {
    render() {
        const { ApplicationInfo } = this.props.taskDetail;
        if (!ApplicationInfo || ApplicationInfo.Status === ApplicationStatusEnum.Start) {
            return null;
        }
        return <AkRow key="flowheader" className="ak-border-b2 mb20" type="flex" justify="space-between" align="bottom" >
            <AkCol key="flownumber">
                <FormattedMessage id={TaskLocale.Code} values={{ code: ApplicationInfo.FlowNo }}></FormattedMessage>
            </AkCol>
            <AkCol key="flowstatus">
                <FormattedMessage id={ApplicationStatusLocale + ApplicationInfo.Status}></FormattedMessage>
            </AkCol>
        </AkRow>
    }
}
