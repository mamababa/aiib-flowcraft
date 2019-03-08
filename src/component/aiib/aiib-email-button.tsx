import * as React from 'react';
import { AkButton, AkModal,AkForm,AkRow, FormHelper,AkInput,AkIcon, AkFormComponentProps } from 'akmii-yeeoffice-common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBLocale } from '../../locales/localeid';
import { AiibProjectResponse } from './index';
import { AIIBWorkflowHelper } from '../../page/aiib/aiib-workflow-helper';
import { isMobile } from '../../util/aiib-common';
export interface AiibEmailButtonProps extends AkFormComponentProps{
    code?: string;
    to?: string[];
    toGroups?: string[];
    btnText?: string;
    iconClassName?: string;
    btnClassName?: string;
    listData?: any;
    fieldKey?: string;
    onSave?: () => void;
}

export interface AiibEmailButtonStates {
    listData?: any;
    to?: string[];
    showModal?:boolean;
    confirmLoading?:boolean;
}
@AkForm.create()
export class AiibEmailButton extends React.Component<AiibEmailButtonProps, AiibEmailButtonStates>{

    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: props.listData,
            to: props.to,
            showModal:false,
            confirmLoading:false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("listData" in nextProps && nextProps.listData.RowVersion !== this.props.listData.RowVersion) {
            this.setState({ listData: nextProps.listData });
        }
        if ("to" in nextProps && JSON.stringify(nextProps.to) !== JSON.stringify(this.props.to)) {
            this.setState({ to: nextProps.to });
        }
    }

    onSendEmail() {
        this.setState({confirmLoading:true});
        const { code, toGroups,form } = this.props;
        const SPBRequest = {
            Attr:{
                __EmailComment:form.getFieldValue("Comment")
            }
        }
        let request: SendEmailRequest = {
            Title: "Project",
            EmailCode: code,
            ListDataID: this.state.listData.ListDataID,
            To: this.state.to,
            ToGroups: toGroups
        };
        if(code === "Project-Member-Request") {
            request = Object.assign({},request,SPBRequest);
        }
        ProjectAPI.sendEmail(request).then(data => {
            if (data.Status === 0) {
                this.setState({showModal:false,confirmLoading:false});
                AiibProjectResponse.successTip(AIIBLocale.SendEmailSuccess);
            } else {
                AiibProjectResponse.errorTip(AIIBLocale.SendEmailFailure);
            }
        });

    }
    renderFooter() {
            return <AkRow>
                {isMobile ? <AkIcon type="fly" className="btn-search-text btn-footer-text" onClick={this.onSendEmail.bind(this)} /> : <AkButton loading={this.state.confirmLoading} type="primary" icon="fly" size="large" className="btn-footer btn-search"
                    onClick={this.onSendEmail.bind(this)}>Submit</AkButton>}
                <AkButton icon="close-circle-o" size="large" className="btn-footer btn-cancel"
                    onClick={() => {
                        this.onCancelHandle();
                    }}>Cancel</AkButton>
            </AkRow>;
    }
    onCancelHandle() {
        this.props.form.resetFields();
        this.setState({showModal:false});
        this.setState({confirmLoading:false});
    }
    beforeSave() {
        const { code, fieldKey } = this.props;
        const { to } = this.state;
        if (code === "Project-SendTo-PTL" && JSON.stringify(to) !== JSON.stringify(this.state.listData.ProjectLeader)) {
            this.props.onSave();
        }
        else if (code === "Project-Member-SendTo" && fieldKey !== "Specialist" && JSON.stringify(to) !== JSON.stringify(this.state.listData[fieldKey])) {
            this.props.onSave();
        } else {
            this.onSendEmail();
        }
    }
    // renderFooter() {

    // }
    renderModal() {
        let Comments;
        const {btnText} = this.props;
        if(btnText === "Request Treasurer To Assign Members") {
            Comments = "members to Treasurer.";
        }else if(btnText === "Request Controller to Assign Members") {
            Comments = "members to Controller.";
        }else if(btnText === "Request General Counsel to Assign Lawyers") {
            Comments = "members to General Counsel.";
        }else {
            Comments = "specialist to SPB.";
        }
        const { colLabelLayout, largeControlLayout } = FormHelper;
        return <AkModal wrapClassName="aiib-adv-search-modal"
         visible
         title={"Please provide the category and its amount of " + Comments}
         width={800}
         footer={this.renderFooter()}
         onCancel={()=> this.setState({showModal:false})}
          >
        <AkForm>
            <AkRow {...FormHelper.rowLayout}>
               {AIIBWorkflowHelper.renderFormItem(this.props,"Comments","Comment",<AkInput.TextArea></AkInput.TextArea>,false,null,colLabelLayout,largeControlLayout)}
            </AkRow>
        </AkForm>

         
        </AkModal>
    }
    onModalShow(e) {
        e.target.blur();
        e.preventDefault();
        const { props: { code }, state: { to } } = this;
        if (code === "Project-SendTo-PTL" || code === "Project-Member-SendTo") {
            if (to && to.length > 0) {
                AkModal.confirm({
                    title: "Tip",
                    content: "Are you sure to send the email?",
                    onOk: () => this.beforeSave()
                });
            } else {
                AiibProjectResponse.errorTip(AIIBLocale.RecipientRequire);
            }
        }
        else if(this.props.code === "Project-Member-Request"){
            this.setState({showModal:true});
            // AkModal.confirm({
            //     title: "Tip",
            //     content: "Are you sure to send the email?",
            //     onOk: () => this.onSendEmail()
            // });
        }else {
            AkModal.confirm({
                title: "Tip",
                content: "Are you sure to send the email?",
                onOk: () => this.onSendEmail()
            });
        }
    }

    render() {
        const { iconClassName, btnClassName } = this.props;
        return <div style={{display:"inline-block"}}>
            <AkButton className={"aiib-button dark " + (btnClassName ? btnClassName : "")} onClick={(e) => this.onModalShow(e)}>
            <i className={iconClassName ? iconClassName : "iconfont icon-redo"}></i>
            <span style={{ marginLeft: 7 }}>{this.props.btnText}</span>
        </AkButton>
        {this.state.showModal ? this.renderModal() : null}
        </div>;
    }

}
