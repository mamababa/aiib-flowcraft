import * as React from 'react'
import { Component } from 'react'
import {
    AkRow,
    AkButton,
    AkTable,
    AkColumnProps,
    AkAvatar,
    ContentListApi,
    AkModal,
    CommonLocale
} from "akmii-yeeoffice-common";
import {
    AIIBTeamMemberModel
} from "../../api/aiibworkflow";
import { AIIBTeamMemberModal } from './index';
import { AiibProjectResponse } from './common/aiib-response-tip';
import { AIIBLocale } from '../../locales/localeid';

/** Team Member */
export class TeamMemberTable extends AkTable<AIIBTeamMemberModel> {
}
export interface TeamMemberColumn extends AkColumnProps<AIIBTeamMemberModel> {
}

export interface AIIBTeamMemberListProps {
    dataSource?: AIIBTeamMemberModel[];
    onChange?: (dataSource: AIIBTeamMemberModel[], value?: AIIBTeamMemberModel | boolean) => void;
    disabled?: boolean;
    type?: string;
}

export interface AIIBTeamMemberListStates {
    data?: AIIBTeamMemberModel[];
    modalVisible: boolean;
    selectData?: AIIBTeamMemberModel;
}

export class AIIBTeamMemberList extends Component<AIIBTeamMemberListProps, AIIBTeamMemberListStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.dataSource ? props.dataSource : [],
            modalVisible: false,
            selectData: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const { props: { dataSource } } = topThis;
        if ("dataSource" in nextProps && JSON.stringify(nextProps.dataSource) !== JSON.stringify(dataSource)) {
            topThis.setState({ data: nextProps.dataSource });
        }
    }

    onClickEdit(item: AIIBTeamMemberModel) {
        this.setState({ modalVisible: true, selectData: item });
    }

    onClickRemove(item) {
        const topThis = this;
        const { state: { data }, props: { onChange } } = topThis;
        const d = data;
        ContentListApi.DelListDataByTitle({
            ListDataID: item.ListDataID,
            Title: "Project-Member"
        }).then(data => {
            if (data.Status === 0) {
                AiibProjectResponse.successTip(CommonLocale.DeleteSuccess);
                if (onChange) {
                    Array.remove(d, item);
                    onChange(d);
                }
            } else {
                AiibProjectResponse.errorTip(CommonLocale.DeleteFail);
            }
        })
    }

    renderComfirmModal(item) {
        AkModal.confirm({
            title: "Are you sure delete this member?",
            okText: "Yes",
            cancelText: 'No',
            onOk: () => {
                this.onClickRemove(item);
            }
        })
    }

    renderTable() {
        const topThis = this;
        const { state: { data } } = topThis;
        const columns: TeamMemberColumn[] = [{
            title: "Member",
            dataIndex: "UserID",
            render: (text, record) => {
                return <AkAvatar value={text} type="text" />;
            }
        }, {
            title: "Role Name",
            dataIndex: "Role"
        }, {
            title: "Permission",
            dataIndex: "Permission"
        }, this.props.disabled ? {} : {
            title: "Operate",
            render: (text, record) => {
                return <AkRow type="flex" justify="start" align="middle">
                    <AkButton className='aiib-button green' type="primary" onClick={topThis.onClickEdit.bind(this, record)}>Edit</AkButton>
                    <AkButton className='aiib-button red' onClick={topThis.renderComfirmModal.bind(this, record)}>Remove</AkButton>
                </AkRow>;
            }
        }];

        return <TeamMemberTable pagination={false} rowKey="ID"
            dataSource={data}
            columns={columns}></TeamMemberTable>;
    }

    render() {
        const topThis = this;
        const { props: { onChange, type }, state: { modalVisible, data, selectData } } = topThis;
        return <div className="aiib-team-member-list">
            {topThis.renderTable()}
            <AIIBTeamMemberModal
                type={type}
                visible={modalVisible}
                title="Edit Member"
                dataSource={selectData}
                onCancel={() => {
                    topThis.setState({ modalVisible: false });
                }}
                onOk={(v) => {
                    const resultData = data.map((i) => {
                        return i === selectData ? v : i;
                    });
                    if (!(v.UserID !== selectData.UserID && data.findIndex(i => i.UserID === v.UserID) !== -1)) {
                        topThis.setState({ modalVisible: false }, () => {
                            if (onChange)
                                onChange(resultData, { ...v, ListDataID: selectData.ListDataID });
                        });
                    } else {
                        AiibProjectResponse.errorTip(AIIBLocale.MembersUnique);
                    }
                }}
            ></AIIBTeamMemberModal>
        </div>;
    }
}
