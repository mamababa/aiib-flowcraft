import * as React from "react";
import { AkModal, AkSelect, AkTable, AkRow, AkButton } from 'akmii-yeeoffice-common';
import { AiibCommon, AiibFormModel } from '../aiib/common/aiib-common';
import { AiibContentListDefs } from '../../api/aiibworkflow/aiib-content-list';
import { AIIBCommon } from "../aiib/util/common";

interface ReportQueryProps {
    listDefs?: AiibContentListDefs[];
    onClose?: () => void;
    onQuery?: (queryData?: string[]) => void;
    value?: string[];
    isProposal?: boolean;
}
interface ReportQueryStatus {
    queryData?: ReportQueryModal[];
}
export interface ReportQueryModal {
    FieldID: string;
    DisplayName: string;
    InternalName: string;
    SortNum: number;
    Show: boolean;
}
export class ReportQuery extends React.Component<ReportQueryProps, ReportQueryStatus>{
    SpecialList = [
        "Procurement expert",
        "Financial management expert",
        "Social expert",
        "Environmental expert",
        "Economist",
    ];
    constructor(props, context) {
        super(props, context);
        this.state = {
            queryData: [],
        };

    }
    onLoadData() {
        const { listDefs, value, isProposal } = this.props;
        const ProposalAllFields = [...AiibCommon.proposalNonsovereignFormField, ...AiibCommon.ProposalClientandAgencyField];
        const objFields = isProposal ? ProposalAllFields : [...AiibCommon.projectNonsovereignFormField, ...AiibCommon.ProjectIDAndDateField];
        const formFields = objFields.map(i => i.InternalName);
        const currentFields = value;
        const allFields = currentFields.concat(formFields).filter((item, index, array) => array.indexOf(item) === index);
        const queryData = allFields.map((item, index) => {
            if (this.SpecialList.indexOf(item) !== -1) {
                let obj: ReportQueryModal = {
                    FieldID: item,
                    DisplayName: item,
                    InternalName: item,
                    SortNum: index + 1,
                    Show: !!value.find(i => item === i),
                };
                return obj;
            }
            let field = listDefs.find(i => i.InternalName === item);
            let obj: ReportQueryModal = {
                FieldID: field.FieldID,
                DisplayName: field.DisplayName,
                InternalName: field.InternalName,
                SortNum: index + 1,
                Show: !!value.find(i => item === i),
            };
            return obj;
        });
        this.setState({ queryData });
    }
    componentWillMount() {
        this.onLoadData();
    }
    handleSubmit() {
        const fields = this.state.queryData.filter(i => i.Show).map(i => i.InternalName);
        this.props.onQuery && this.props.onQuery(fields);
    }
    onOrderChange(oldSeq, newSeq) {
        let { queryData } = this.state;
        if (oldSeq !== newSeq) {
            if (newSeq > oldSeq) {
                let count = newSeq - oldSeq;
                queryData[oldSeq - 1].SortNum = newSeq;
                for (let i = 0; i < count; i++) {
                    queryData[oldSeq + i].SortNum -= 1;
                }
            } else {
                let count = (newSeq - oldSeq) * -1;
                for (let i = 0; i < count; i++) {
                    queryData[(newSeq - 1) + i].SortNum += 1;
                }
                queryData[oldSeq - 1].SortNum = newSeq;
            }
        }
        let Data = queryData.sort((a, b) => a.SortNum - b.SortNum);
        this.setState({ queryData: Data });
    }
    renderOrderColumn(text, record, index) {
        const total = this.state.queryData.filter(item => item.Show).length;
        function getOptions(length) {
            let rs = [];
            for (var i = 0; i < length; i++) {
                rs.push(<AkSelect.Option key={i + ""} value={i + 1 + ""}>{i + 1}</AkSelect.Option>)
            }
            return rs;
        }
        return record.Show
            ?
            <AkSelect value={record.SortNum + ""} onChange={v => { this.onOrderChange(record.SortNum, Number(v)) }}
                getPopupContainer={(trigger) => trigger.closest(".ant-table-row") as HTMLElement}>
                {getOptions(total)}
            </AkSelect>
            :
            null;
    }
    renderList() {
        const columns = [{
            title: 'Order',
            dataIndex: "SortNum",
            key: "SortNum",
            width: "20%",
            render: (text, record, index) => this.renderOrderColumn(text, record, index)
        }, {
            title: 'Field names',
            dataIndex: "DisplayName",
            key: "DisplayName",
            className: "ak-sider-table"
        }];
        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                let newData = this.state.queryData.map((item, index) => {
                    if (item.FieldID === record.FieldID) {
                        item.Show = selected;
                    }
                    return item;
                });
                this.setState({
                    queryData: newData
                });
                if (!selected) {
                    this.onOrderChange(record.SortNum, this.state.queryData.length)
                } else {
                    const total = this.state.queryData.filter((item, index) => item.Show === true).length;
                    this.onOrderChange(record.SortNum, total);
                }
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                let newData = this.state.queryData.map((item, index) => {
                    item.Show = selected;
                    return item;
                });
                this.setState({
                    queryData: newData
                });
            },
            selectedRowKeys: this.state.queryData.filter((v, index) => {
                if (!v.Show) {
                    return false;
                }
                return true;
            }).map(i => i.FieldID)
        };
        return <AkTable
            rowSelection={rowSelection}
            columns={columns}
            rowKey="FieldID"
            dataSource={this.state.queryData}
            pagination={false}
        />;
    }

    renderFooter() {
        return <AkRow>
            <AkButton key={1} type="primary" size="large" className="btn-footer btn-search"
                onClick={this.handleSubmit.bind(this)}>Ok</AkButton>
            <AkButton key={3} size="large" className="btn-footer btn-cancel"
                onClick={() => this.props.onClose()}>Cancel</AkButton>
        </AkRow>;
    }

    render() {
        let isMobile = document.body.clientWidth < 768;
        return <AkModal
            visible={true}
            maskClosable={false}
            title='Select Fields'
            wrapClassName="aiib-adv-search-modal"
            okText="Ok"
            cancelText="Cancel"
            onOk={this.handleSubmit.bind(this)}
            footer={this.renderFooter()}
            onCancel={() => this.props.onClose()}>
            <div className={isMobile ? '' : 'aiib-report-modal'}>
                {this.renderList()}
            </div>
        </AkModal>;
    }
}
