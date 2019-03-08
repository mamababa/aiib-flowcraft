import * as React from "react";
import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import {
    AkGlobal,
    MasterPageAction,
    TaskDetailInfo,
    ProcInstAPI,
    ApplicationStatusEnum,
    WorkflowFormHelper,
    CommonLocale, AkNotification
} from "akmii-yeeoffice-common";
import { AkFCFormDefData } from "akmii-yeeoffice-crafts";
import { AkFlowcraftForm } from "../component/flowcraft/form";
import { ProcDefsAPI } from "../api/procdefs";
import { TaskAPI } from "../api/task";
import { ApplicationAPI } from "../api/application";
import { ProcDraftsAPI } from "../api/procdrafts";
import { AkContext } from 'akmii-yeeoffice-common';
import { DelegatesPageLocale } from '../locales/localeid';

interface FormPageProps extends RouteComponentProps<any,
    any> {
    instanceInitVariables: any;
}
interface FormPageStates {
    taskDetail?: TaskDetailInfo | TaskDetailV2Info;
    formDef?: AkFCFormDefData;
}

@withRouter
export class FormPage extends Component<FormPageProps,
FormPageStates> {

    draftID?: string;
    appID?: string;
    defID?: string;
    defKey?: string;
    taskID?: string;
    pageid?: string;
    flowno?: string;
    resID?: string;
    owner?: boolean;
    constructor(props, context) {
        super(props, context);
        this.state = {
            taskDetail: {
                AppStatus: ApplicationStatusEnum.Draft
            }
        };
        this.draftID = this.props.location.query["draftid"];
        this.appID = this.props.location.query["appid"];
        this.defID = this.props.location.query["defid"];
        this.defKey = this.props.location.query["defkey"];
        this.taskID = this.props.location.query["taskid"];
        this.pageid = this.props.location.query["pageid"];
        this.flowno = this.props.location.query["flowno"];
        this.owner = this.props.location.query["owner"];
    }

    componentDidMount() {
        if (this.flowno) {
            this.loadByFlowNo();
        } else {
            this.loadFormDesign();
        }
    }
    /** 通过申请单编号可以打开对应申请单*/
    loadByFlowNo() {
        ApplicationAPI.getApplicationByFlowNo({ flowNo: this.flowno }).then(data => {
            if (data.Status === 0) {
                this.pageid = data.Data.FormUrl;
                this.appID = data.Data.ApplicationID;
                this.loadFormDesign();
            } else {
                this.loadPageError();
            }
        });
    }

    loadPageError() {
        const { formatMessage } = AkGlobal.intl;
        AkNotification.error({ message: formatMessage({ id: CommonLocale.Error }), description: formatMessage({ id: "common.server.status.4" }) });
    }

    getResIDFromPageId(pageId: string) {
        let resId = "";
        if (pageId) {
            const arr = pageId.split(",");
            if (arr.length > 1) {
                resId = arr[1];
            }
        }
        return resId;
    }

    /**
     * 加载detail数据
     */
    async loadFormDesign() {
        const { formatMessage } = AkGlobal.intl;
        let apis = [];
        if (!this.pageid && this.defKey) {
            //只有定义key，没有pageid
            const def = await ProcDefsAPI.getProcDefsByKey({ key: this.defKey });
            if (def.Status === 0) {
                this.defID = def.Data.ID;
                this.resID = def.Data.DefResourceID;
                apis.push(ProcDefsAPI.getFormDefByPageID({ pageID: def.Data.FormURL }));
            }
        } else if (this.pageid) {
            this.resID = this.getResIDFromPageId(this.pageid);
            apis.push(ProcDefsAPI.getFormDefByPageID({ pageID: this.pageid }));
        } else {
            this.loadPageError();
            return;
        }
        if (this.draftID) {
            apis.push(ProcDraftsAPI.getProcDraftsV2ByID({ procDraftID: this.draftID }));
        } else if (this.appID) {
            apis.push(ApplicationAPI.getApplicationByIDV2({ applicationID: this.appID }));
        } else if (this.taskID) {
            apis.push(TaskAPI.getTaskDetailV2({ taskID: this.taskID }));
        } else {
            apis.push(ProcInstAPI.getApplicantByUserID({}));
        }
        Promise.all(apis).then(async (rs) => {
            let detail: TaskDetailV2Info = {};
            if (this.draftID) {
                detail.Variables = rs[1].Data.FormDATA;
                detail.ApplicantInfo = { ...{}, ...rs[1].Data.ApplicantInfo };
            } else if (this.appID) {
                detail = { ...{}, ...rs[1].Data };
            } else if (this.taskID) {
                detail = { ...{}, ...rs[1].Data };
                // const user = AkContext.getUser().AccountID;
                // let AssigneeName = await AkContext.getUsersInfo([detail.TaskInfo.AssigneeID]);
                // if (user === detail.TaskInfo.DelegateID && user !== detail.TaskInfo.AssigneeID && AssigneeName) {
                //     AkNotification.warning({
                //         message: formatMessage({ id: CommonLocale.Tip }),
                //         description: formatMessage({ id: DelegatesPageLocale.TipAssignedName }, { name: AssigneeName[0].Name })
                //     });
                // }
            } else {
                detail.ApplicantInfo = { ...{}, ...rs[1].Data };
            }

            this.parseVariables(detail);

            let temp = rs[0].Data;
            let json = temp ? JSON.parse(temp) : temp;
            if (this.owner) {//从我的委托打开详情页时，增加属性
                (json as AkFCFormDefData).attrs = { owner: this.owner }
            }

            this.setState({
                formDef: json,
                taskDetail: detail
            });

            let findErrors = rs.find(f => f.Status > 0);
            if (findErrors) {
                AkNotification.warning({
                    message: formatMessage({ id: CommonLocale.Tip }),
                    description: findErrors.ServerMessage
                })
            }
        });
    }

    /**
     * 将taskDetail中的variable转成对象
     * @param taskDetail
     */
    parseVariables(taskDetail) {
        let variables = null;

        if (taskDetail && taskDetail["FormDATA"]) {
            variables = WorkflowFormHelper.deserializeVariables(taskDetail["FormDATA"], "formcraft");
        }
        if (taskDetail && taskDetail["Variables"]) {
            variables = WorkflowFormHelper.deserializeVariables(taskDetail["Variables"], "formcraft");
        }
        if (!variables && window["formCraftInitInstanceData"]) {
            variables = window["formCraftInitInstanceData"];
            window["formCraftInitInstanceData"] = undefined;
        }
        // for (var a in variables) {
        //     try {
        //         //variables[a]="872276727140065280"; JSON.parse(variables[a])=872276727140065300
        //         if(Number(variables[a]))
        //         {
        //             variables[a] = variables[a];
        //         }else{
        //             variables[a] = JSON.parse(variables[a]);
        //         }
        //     } catch (e) {
        //         variables[a] = (variables[a]);
        //     }
        // }
        taskDetail["Variables"] = variables;
    }
    componentWillMount() {
        AkGlobal.store.dispatch(MasterPageAction.triggerMasterpageHeader(false));
    }

    componentWillUnmount() {
        AkGlobal.store.dispatch(MasterPageAction.triggerMasterpageHeader(true));
    }

    render() {
        const { formDef, taskDetail } = this.state;
        return formDef
            ? <AkFlowcraftForm
                taskDetail={taskDetail}
                formDef={formDef}
                draftID={this.draftID}
                appID={this.appID}
                defID={this.defID}
                isTask={this.taskID && this.taskID.length > 0}
                defKey={this.defKey}
                resID={this.resID}
            ></AkFlowcraftForm>
            : null;
    }
}
class FormPageStyle { }

export class FormPage1 extends FormPage { }
