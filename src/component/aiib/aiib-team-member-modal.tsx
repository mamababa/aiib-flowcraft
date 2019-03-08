import * as React from 'react';
import { Component } from 'react';
import {
    AkRow,
    AkCol,
    AkButton,
    AkForm,
    AkFormComponentProps,
    FormHelper,
    AkSelect,
    AkModal,
    AkIdentity,
    AkSpin,
    AkFormIdentityPicker, GetMetadataModelRequest, MetadataInfo,
    CommonLocale
} from "akmii-yeeoffice-common";
import { AIIBTeamMemberModel } from "../../api/aiibworkflow";
import { AIIBLocale } from "../../locales/localeid";
import { isNullOrUndefined } from "util";
import { AIIBCommon } from "./util/common";
import { AIIBPermissionEnum } from '../../api/aiibworkflow/common';
import { ProjectAPI } from '../../api/aiibworkflow/project';
import { AIIBTeamMemberProjectModal } from './index';
import { AdminMetadataAPI } from '../../api/aiib-metadata';
import { AiibProjectResponse } from './common/aiib-response-tip';
const AkSelectOption = AkSelect.Option;

export interface AIIBTeamMemberModalProps extends AkFormComponentProps {
    dataSource?: AIIBTeamMemberModel;
    onOk?: (data: AIIBTeamMemberModel) => void;
    onCancel?: () => void;
    visible?: boolean;
    onVisible?: (v: boolean) => void;
    type?: string;
    title?: string;
}

export interface AIIBTeamMemberModalStates {
    data?: AIIBTeamMemberModel;
    memberProject?: number;
    projectModal: boolean;
    selectPeopleList?: any;
    totalCount?: number;
    loading?: boolean;
    type?: string;
    membersRole?: MetadataInfo[];
}

@AkForm.create()
export class AIIBTeamMemberModal extends Component<AIIBTeamMemberModalProps, AIIBTeamMemberModalStates> {
    selectUser?: AkIdentity;
    pageSize?: number;
    pageIndex?: number;

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.dataSource ? props.dataSource : null,
            memberProject: 0,
            projectModal: false,
            selectPeopleList: [],
            loading: false,
            type: props.type ? props.type : "",
            membersRole: []
        };
        this.pageSize = 10;
        this.pageIndex = 1;
    }

    componentDidMount() {
        this.loadMemberRole();
    }

    loadMemberRole() {
        this.setState({ loading: true });
        const request: GetMetadataModelRequest = {
            status: 1,
            parentCode: "MemberRole",
            categoryCode: "MemberRole"
        }
        AdminMetadataAPI.getByCode(request).then(data => {
            if (data.Status === 0) {
                this.setState({ membersRole: data.Data, loading: false }, () => {
                    const { state: { data } } = this;
                    if (!isNullOrUndefined(data))
                        this.setFromValue(data);
                    else {
                        this.props.form.setFieldsValue({
                            "Permission": "View"
                        });
                    }
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const { props: { visible, type } } = topThis;
        if ("dataSource" in nextProps && nextProps.visible !== visible) {
            if (!isNullOrUndefined(nextProps.dataSource)) {
                topThis.setState({ data: nextProps.dataSource });
                topThis.setFromValue(nextProps.dataSource);
                topThis.selectUser = nextProps.dataSource.UserID;
            } else {
                this.props.form.setFieldsValue({
                    "permission": AIIBPermissionEnum["View"]
                });
            }
        }
        if ("type" in nextProps && nextProps.type !== type) {
            this.setState({ type: nextProps.type });
        }
    }

    setFromValue(data: AIIBTeamMemberModel) {
        const topThis = this;
        const { props: { form } } = topThis;
        form.setFieldsValue({
            "UserID": data.UserID,
            "Role": data.Role,
            "Permission": data.Permission
        });
        /** 查询成员的项目数量*/
        this.onIdentitySelect(data.UserID);
    }

    onSubmit() {
        const topThis = this;
        const { props: { form, onOk } } = topThis;
        form.validateFieldsAndScroll((err, values) => {
            if (!err && onOk) {
                const result: AIIBTeamMemberModel = {
                    UserID: values.UserID,
                    Role: values.Role,
                    Permission: values.Permission,
                };
                onOk(result);
            }
        });
    }

    onCancel() {
        const topThis = this;
        const { props: { onCancel } } = topThis;
        if (onCancel)
            onCancel();
    }

    onClickProject() {
        const topThis = this;
        const { props: { form } } = topThis;
        const member = form.getFieldValue("UserID");
        if (!isNullOrUndefined(member)) {
            topThis.setState({ projectModal: true });
        }
    }

    onIdentitySelect(value, pageIndex?: number, sorter?: any) {
        this.selectUser = value || this.props.form.getFieldValue("UserID");
        if (value || this.props.form.getFieldValue("UserID")) {
            this.setState({ loading: true });
            let request: ProjectByMemberRequest = {
                Type: this.state.type,
                MemberID: value || this.props.form.getFieldValue("UserID"),
                ProjectColumns: [
                    "ProposalID",
                    "ProjectName",
                    "CountryName",
                    "Sector",
                    "FinancingMethod",
                    "TotalEstimatedCost",
                    "Status",
                    "State",
                    "Stage",
                    "ExComApprovalDate",
                    "ProjectLeader",
                    "Members"
                ],
                PageIndex: pageIndex ? pageIndex : this.pageIndex,
                PageSize: this.pageSize,
                Sorts: []
            };

            if (sorter && sorter.field && sorter.order) {
                request.Sorts = [{
                    SortName: sorter.field,
                    SortByDesc: sorter.order === "descend"
                }];
            }
            const params = Object.assign({}, request);
            ProjectAPI.projectByMember(params).then(data => {
                if (data.Status === 0) {
                    this.setState({
                        selectPeopleList: data.Data,
                        totalCount: data.TotalCount,
                        loading: false
                    });
                } else {
                    AiibProjectResponse.errorTip(CommonLocale.GetInfoError);
                }
            });
        } else {
            this.setState({ selectPeopleList: [] });
        }
    }

    renderRoleOption() {
        const { membersRole } = this.state;
        let result = [];
        membersRole.forEach((i, index) => {
            result.push(<AkSelectOption key={index} value={i.Name}>{i.Name}</AkSelectOption>);
        });
        return result;
    }

    renderPermissionOption() {
        let result = [];
        const data = AIIBCommon.getPermissionData();
        data.forEach((i, index) => {
            result.push(<AkSelectOption key={index} value={i.permissionName}>{i.permissionName}</AkSelectOption>);
        });
        return result;
    }

    renderForm() {
        const topThis = this;
        const { props, state: { totalCount, loading }, selectUser } = topThis;
        const { TMember, TMRoleName, TMPermission } = AIIBLocale;
        return <AkSpin spinning={loading}>
            <AkForm className="aiib-add-newmember">
                <AkRow {...FormHelper.rowLayout}>
                    {FormHelper.renderFormItem(props, TMember, "UserID", <AkFormIdentityPicker onChange={(value) => {
                        this.onIdentitySelect(value);
                    }} />, true, null, { xs: 24, sm: 4, md: 4, lg: 4 }, { xs: 24, sm: 8, md: 8, lg: 11 })}
                    <AkCol>
                        {selectUser ?
                            <a onClick={topThis.onClickProject.bind(this)} style={{ cursor: "pointer" }}>Curently Assigned
                            to {totalCount} Project(s)</a> : null}
                    </AkCol>
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {FormHelper.renderFormItem(props, TMRoleName, 'Role', <AkSelect>
                        {topThis.renderRoleOption()}
                    </AkSelect>, true, null, { xs: 24, sm: 4, md: 4, lg: 4 }, { xs: 24, sm: 8, md: 8, lg: 11 })}
                </AkRow>
                <AkRow {...FormHelper.rowLayout}>
                    {FormHelper.renderFormItem(props, TMPermission, 'Permission', <AkSelect>
                        {topThis.renderPermissionOption()}
                    </AkSelect>, true, null, { xs: 24, sm: 4, md: 4, lg: 4 }, { xs: 24, sm: 8, md: 8, lg: 11 })}
                </AkRow>
            </AkForm>
        </AkSpin>
    }

    renderFooter() {
        return <AkRow>
            <AkButton type="primary" icon="save" size="large" className="btn-footer btn-search"
                onClick={this.onSubmit.bind(this)}>Save Members</AkButton>
        </AkRow>;
    }

    render() {
        const topThis = this;
        const { props: { visible, title }, state: { projectModal, selectPeopleList, totalCount, data, loading } } = topThis;
        return <AkModal key="aiib-team-member-modal"
            className="aiib-team-member-modal"
            title={title ? title : "Add New Member"}
            wrapClassName="aiib-adv-search-modal"
            visible={visible}
            width={600}
            onCancel={topThis.onCancel.bind(this)}
            footer={this.renderFooter()}>
            {topThis.renderForm()}
            <AIIBTeamMemberProjectModal
                totalCount={totalCount}
                dataSource={selectPeopleList}
                loading={loading}
                key="aiib-team-member-project-modal"
                visible={projectModal}
                loadData={(pageIndex, sort) => {
                    const member = this.props.form.getFieldValue("member");
                    this.onIdentitySelect(member, pageIndex, sort);
                }}
                onCancel={() => {
                    topThis.setState({ projectModal: false });
                }}></AIIBTeamMemberProjectModal>
        </AkModal>;
    }
}
