import * as React from "react";
import {RouteComponentProps} from "react-router";
import {AkSpin, AkGlobal, AkNotification, CommonLocale} from "akmii-yeeoffice-common";
import {TaskAPI} from "../api/task";
import {FlowcraftDesignerLocale} from "../locales/localeid";

interface QueryModel {
    a: string;//application id
    c: string;//type
    t: string;//task node id
}
interface TaskTransferProps extends RouteComponentProps<QueryModel, void> {
}
interface TaskTransferStates {
}
export class TaskTransfer extends React.Component<TaskTransferProps, TaskTransferStates> {
    componentDidMount() {
        TaskAPI.transferTask({
            applicationID: this.props.params.a,
            type: this.props.params.c,
            activityDefID: this.props.params.t,
        }).then(response => {
            let url = `${window.location.pathname}#/todo`;
            if (response && response.Status === 0 && response.Data) {
                if (response.Data.Type === 1) {
                    let appInfo = response.Data.Data.ApplicationInfo as ApplicationInfo;
                    if (appInfo.ApplicationID && appInfo.DefKey && appInfo.CurrentProcInstID && appInfo.FormUrl) {
                        url = `${window.location.pathname}#/form?appid=${appInfo.ApplicationID}&defkey=${appInfo.DefKey}instid=${appInfo.CurrentProcInstID}&pageid=${encodeURIComponent(appInfo.FormUrl)}`;
                        window.location.href = url;
                        return;
                    }
                }
                else if (response.Data.Type === 2) {
                    let taskInfo = response.Data.Data as TaskInfo;
                    if (taskInfo.TaskID && taskInfo.TaskURL && taskInfo.ProcInstID) {
                        url = `${window.location.pathname}#/form?instid=${taskInfo.ProcInstID}&pageid=${encodeURIComponent(taskInfo.TaskURL)}&taskid=${taskInfo.TaskID}`;
                        window.location.href = url;
                        return;
                    }
                }
            }

            const {formatMessage} = AkGlobal.intl;
            AkNotification.warning({
                message: formatMessage({id: CommonLocale.Tip}),
                description: formatMessage({id: FlowcraftDesignerLocale.PageTaskTransferWarning}),
            });
            setTimeout(() => {
                window.location.href = url;
            }, 3000);
        });
    }

    render() {
        let style: React.CSSProperties = {
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
        return <div style={style}><AkSpin size="large"/></div>;
    }
}
