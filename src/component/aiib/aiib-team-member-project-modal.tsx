import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment';
import { AkMetadataLabel } from 'akmii-yeeoffice-common';
import {
    AkForm,
    AkFormComponentProps,
    AkModal,
    AkResponsiveTable,
    AkFormIdentityPicker
} from "akmii-yeeoffice-common";
import { AiibFormatDate } from './index';


export interface AIIBTeamMemberProjectModalProps extends AkFormComponentProps {
    visible?: boolean;
    onCancel?: () => void;
    dataSource: any;
    loadData?: (current, sort?) => void;
    loading?: boolean;
    totalCount?: number;
}

export interface AIIBTeamMemberProjectModalStates {

}

@AkForm.create()
export class AIIBTeamMemberProjectModal extends Component<AIIBTeamMemberProjectModalProps, AIIBTeamMemberProjectModalStates> {
    pageSize?: number;
    pageIndex?: number;

    constructor(props, context) {
        super(props, context);
        this.state = {

        }
        this.pageSize = 10;
        this.pageIndex = 1;
    }

    onCancel() {
        const topThis = this;
        const { props: { onCancel } } = topThis;
        if (onCancel)
            onCancel();
    }

    onTableChange(sorter) {
        this.props.loadData(this.pageIndex, sorter);
    }

    renderTable() {
        const topThis = this;
        const { pageSize, pageIndex, props: { loading, totalCount } } = topThis;
        const columns = [
            {
                title: "Proposal ID",
                key: "ProposalID",
                dataIndex: "ProposalID",
                sorter: true
            }, {
                title: "Project Name",
                key: "ProjectName",
                dataIndex: "ProjectName",
            }, {
                title: "Country",
                key: "Country",
                dataIndex: "CountryName",
            }, {
                title: "Sector",
                key: "Sector",
                dataIndex: "Sector",
                render: (txt) => {
                    return <AkMetadataLabel parentCode="Sector" categoryCode="Sector" optionID={txt} />;
                }
            }, {
                title: "Client Type",
                key: "FinancingMethod",
                dataIndex: "FinancingMethod"
            }, {
                title: "Total Cost",
                key: "TotalEstimatedCost",
                dataIndex: "TotalEstimatedCost"
            }, {
                title: "ExCom Date",
                key: "ExComApprovalDate",
                dataIndex: "ExComApprovalDate",
                sorter: true,
                render: (txt) => {
                    return AiibFormatDate(txt);
                }
            }, {
                title: "Project Stage",
                key: "Stage",
                dataIndex: "Stage"
            }, {
                title: "PTL",
                key: "ProjectLeader",
                dataIndex: "ProjectLeader",
                render: (txt) => {
                    return txt ? <AkFormIdentityPicker readonly multiple value={JSON.parse(txt)} /> : null;
                }
            }, {
                title: "Team Members",
                key: "Members",
                dataIndex: "Members",
                render: (txt) => {
                    return txt ? <AkFormIdentityPicker readonly multiple value={JSON.parse(txt)} /> : null;
                }
            }];

        return <AkResponsiveTable
            onChange={(pagination, filters, sorter) => this.onTableChange(sorter)}
            hideViewSwitch={true}
            rowKey="ListDataID"
            columns={columns}
            loading={loading}
            dataSource={this.props.dataSource}
            pagination={{
                total: totalCount,
                pageSize: pageSize,
                current: pageIndex,
                onChange: (current) => {
                    topThis.pageIndex = current;
                    topThis.props.loadData(current);
                }
            }}
        ></AkResponsiveTable>;
    }

    render() {
        const topThis = this;
        const { props: { visible } } = topThis;
        return <AkModal
            className="aiib-team-member-project-modal"
            title="Assigned to"
            visible={visible}
            wrapClassName="aiib-adv-search-modal"
            width={1200}
            footer={null}
            onCancel={topThis.onCancel.bind(this)}>
            {topThis.renderTable()}
        </AkModal>;
    }
}
