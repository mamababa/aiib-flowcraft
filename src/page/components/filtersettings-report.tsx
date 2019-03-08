import * as React from "react";
import { Component } from "react";
import {
    IntlProps,
    AkModal,
    AkGlobal,
    AkSelect,
    AkRow,
    AkCol,
    AkButton,
    AkNotification,
    AkCheckbox,
    AkTable,
    AkDatePicker,
    AkLocationSelect,
    AkInput,
    AkInputNumber,
    AkFormCostCenterPicker,
    AkFormIdentityPicker,
    AkUtil,
    AkIdentityType,
    AkColumnLayout,
    AkMetadataTreeSelect,
    FlowcraftCommon,
    AkDatetimeUtil,
    AkCheckboxGroup,
    AkContext,
    AkInputGroup
} from "akmii-yeeoffice-common";
import { ProcessReportPageLocale, CommonLocationLocale } from "../../locales/localeid";
import { ReportAPI } from "../../api/report";
import { withRouter } from "react-router";
import { injectIntl } from "react-intl";
import * as moment from 'moment';


interface FilterSettingsReportModalProps extends IntlProps {
    getReportlist?: {};
    onOk: () => void;
    onCancel: () => void;
}
interface FilterSettingsReportModalStates {
    /**已过滤出的所有的数据*/
    FilterData?: any;
    /**选中的value值*/
    selectedValue?: any;
    loading?: boolean;
}

/** 流程报表 */
class FilterSettingsReportModal extends Component<FilterSettingsReportModalProps,
    FilterSettingsReportModalStates> {
    // 获取字段列表
    getReportlist?: GetReportsVariableByKeyRequest;
    columns?: any;
    /**可选择的数变量*/
    filterSelectData?: any;
    /**模版数据*/
    dataModal?: any;
    /**默认Name */
    defaultName?: string;
    /**多选的多语言*/
    checkName?: string;
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            FilterData: [],
            selectedValue: {}
        }
        this.getReportlist = this.props.getReportlist;
        this.defaultName = "page.report.modal.reportfilter.";
        this.checkName = "page.report.modal.reportfilter.checkbox.";
        this.filterSelectData = [];
        const { formatMessage } = AkGlobal.intl;
        this.dataModal = {
            ID: null,
            Name: null,
            Type: null
        };
        this.columns = [{
            width: 80,
            dataIndex: 'Name',
            render: (text, record, index) => {
                return text ? text :
                    formatMessage({ id: ProcessReportPageLocale.ChooseFilterVariables });
            },
        }, {
            width: 120,
            dataIndex: 'DisplayName',
            render: (value, record, index) => {
                let { FilterData, selectedValue } = this.state;
                return record.Name ? <AkInput defaultValue={value}
                    placeholder={formatMessage({ id: ProcessReportPageLocale.ReportShowName })}
                    maxLength={100}
                    onBlur={(e) => {
                        FilterData[index].DisplayName = e ? e.target['value'] : null;
                        this.setState({ FilterData });
                    }} /> : <AkSelect style={{ minWidth: 150 }}
                        value={selectedValue.ID}
                        onChange={(value) => {
                            let basicData = this.filterSelectData.find(d => d.ID === value);
                            selectedValue = {
                                ID: value,
                                Name: basicData.Name,
                                Type: basicData.Type,
                                Ext2: basicData.Ext2
                            };
                            this.setState({ selectedValue });
                        }}>{this.changeOption(this.filterSelectData, "Variable")}</AkSelect>
            }
        }, {
            width: 75,
            dataIndex: 'IsHide',
            render: (text, record, index) => {
                return record.Name ?
                    <AkCheckbox value={text}
                        onChange={(e) => {
                            let { FilterData } = this.state;
                            FilterData[index].IsHide = e.target["checked"];
                            if (e.target["checked"]) {
                                FilterData[index].Order = null;
                            }
                            this.changeOrder(FilterData, false);
                        }}>
                        {formatMessage({ id: ProcessReportPageLocale.FilterHide })}
                    </AkCheckbox> : null;
            }
        }, {
            width: 60,
            dataIndex: 'Sort',
            render: (text, record, index) => {
                let { FilterData } = this.state;
                return record.Name && !record.IsHide ?
                    <AkInputGroup style={{ width: 40 }}>
                        <AkSelect value={index + 1 + ""}
                            onChange={(e) => this.selectSort(FilterData, index, e)}>
                            {this.changeOption(FilterData, "sort")}
                        </AkSelect>
                    </AkInputGroup> : null;
            }
        }, {
            width: 120,
            dataIndex: 'IsContant',
            render: (text, record, index) => {
                let { FilterData } = this.state;
                return record.Name && record.ID !== "flowno" ?
                    <AkCheckbox value={text}
                        style={{ marginLeft: 10 }}
                        onChange={(e) => {
                            if (e.target["checked"]) {
                                switch (record.ID) {
                                    case "created":
                                    case "modified":
                                        FilterData[index].Compare = 11; break;
                                    default:
                                        FilterData[index].Compare = 1;
                                        if (record.Type === "boolean") {
                                            FilterData[index].Value = "false";
                                        }
                                }
                            } else {
                                delete FilterData[index].Value;
                                delete FilterData[index].Ext1;
                                delete FilterData[index].Compare;
                            }
                            FilterData[index].IsContant = e.target["checked"];
                            this.setState({ FilterData });
                        }}>
                        {formatMessage({ id: ProcessReportPageLocale.FilterFixedValue })}
                    </AkCheckbox> : null;
            },
        }, {
            width: 100,
            dataIndex: 'Compare',
            render: (text, record, index) => {
                return record.IsContant ? this.showCompare(record, index, text) : null;
            }
        }, {
            width: 200,
            dataIndex: 'Value',
            render: (text, record, index) => {
                let isShow = record.Compare !== 7 && record.Compare !== 8 && record.Compare !== 12;
                let result = record.IsContant && isShow ? this.renderControl(record, index, "Value", text) : null;
                return <div style={{ minWidth: 150 }}>{result}</div>;
            }
        }, {
            width: 60,
            dataIndex: 'operation',
            render: (text, record, index) => {
                let { FilterData } = this.state;
                let isModal = FlowcraftCommon.minSM ? { float: "right", marginTop: 3 } : null;
                let isHidden = this.filterData(record.ID);
                return !isHidden ?
                    record.Name ?
                        <a style={isModal ? Object.assign(isModal, { marginRight: 8 }) : null}
                            onClick={() => this.removeFilterData(FilterData, index)}>
                            {formatMessage({ id: ProcessReportPageLocale.FilterRemove })}
                        </a> :
                        <AkButton style={isModal} onClick={() => this.addFilterData(FilterData, index)}>
                            {formatMessage({ id: ProcessReportPageLocale.AddVariables })}
                        </AkButton> : null;

            }
        }];
    }

    componentDidMount() {
        this.loadGetFilterData();
    }

    /**改变value */
    onchangeValue(index, key, value) {
        let { FilterData } = this.state;
        FilterData[index][key] = value;
        this.setState({ FilterData });
    }

    /**添加 */
    addFilterData(FilterData, index) {
        let newFilterData = [];
        if ("ID" in this.state.selectedValue) {
            newFilterData = AkUtil.insert(FilterData, this.state.selectedValue, index);
            AkUtil.remove(newFilterData, (v, i) => i === index + 1);
            if (index < 10) {
                newFilterData.push(this.dataModal);
            }
            this.changeOrder(newFilterData, false, { selectedValue: {} });
        }
    }

    /**删除*/
    removeFilterData(FilterData, index) {
        AkUtil.remove(FilterData, (v, i) => i === index);
        let dataLength = FilterData.length;
        if (dataLength < 11 && FilterData[dataLength - 1].Name) {
            FilterData.push(this.dataModal);
        }
        this.setState({ FilterData });
    }

    /**筛选数据*/
    filterData(p) {
        let YesOrNo = p === "created" || p === "modified" || p === "applicantuserid" || p === "departmentid" || p === "flowno" || p === "applicationstatus";
        return YesOrNo;
    }

    /** 获取data */
    loadGetFilterData() {
        let topThis = this;
        let { FilterData } = this.state;
        ReportAPI.getReportVariableByKey(this.getReportlist).then(data => {
            if (data.Status === 0) {
                let alldata = data.Data["Variables"],
                    variableExt1 = JSON.parse(data.Data.Ext1),
                    variableExt2 = JSON.parse(data.Data.Ext2) || [];
                FilterData = variableExt1 || [];
                alldata.forEach(d => {
                    let value = {
                        ID: d.ID,
                        Name: d.Name,
                        Type: d.Type,
                        IsHide: false
                    };
                    if (topThis.filterData(d.ID) && !variableExt1) {
                        FilterData.push(value);
                    } else {
                        let tp = d.Type;
                        if (!(tp === "file" || tp === "lookup" || tp === "dict" || tp === "img" || tp === "budget" ||
                            tp === "vacation" || tp === "vacation-confirmation" || tp === "signature") && (d.ID).startsWith("v_")) {
                            if (tp === "metadata") {
                                value = Object.assign(value, { Ext2: d.Value });
                            }
                            topThis.filterSelectData.push(value);
                        }
                    }
                });
                variableExt2.length > 0 && variableExt2.forEach(e => {
                    const remove = alldata.findIndex(d => d.ID === e.ID);
                    if ((e.ID).startsWith("v_") && (remove > -1)) {
                        FilterData.push(e);
                    }
                });
                FilterData.length < 11 && FilterData.push(this.dataModal);
                topThis.changeOrder(FilterData, true, { loading: false });
            } else {
                AkNotification.warning({
                    message: '',
                    description: data.Message
                });
            }
        });
    };

    disabledStartDate(startValue, record) {
        let endDate = record.Ext1;
        if (!startValue || !endDate) {
            return false;
        }
        endDate = new Date(endDate);
        return startValue.valueOf() > endDate.valueOf();
    }

    disabledEndDate(endValue, record) {
        let startDate = record.Value;
        if (!endValue || !startDate) {
            return false;
        }
        startDate = new Date(startDate);
        return endValue.valueOf() <= startDate.valueOf();
    }

    /**根据变量类型显示相应的设置value的控件*/  //GO TO 时区
    renderControl(record, index, attr, value) {
        const { formatMessage } = AkGlobal.intl;
        switch (record.Type) {
            case "date":
                let p = record.ID;
                if (p === "created" || p === "modified") {
                    return <div>
                        <AkDatePicker style={{ width: "50%" }}
                            format="MM-DD-YYYY"
                            onChange={(value) => this.onchangeValue(index, attr, AkDatetimeUtil.toCSTValue(moment(value)))}
                            value={value}
                            disabled={record.disabled}
                            disabledDate={(startValue) => this.disabledStartDate(startValue, record)}
                            placeholder={formatMessage({ id: ProcessReportPageLocale.FilterStartDate })} />
                        <AkDatePicker style={{ width: "50%" }}
                            format="MM-DD-YYYY"
                            disabled={record.disabled}
                            onChange={(value) => this.onchangeValue(index, "Ext1", AkDatetimeUtil.toCSTValue(moment(value)))}
                            value={record.Ext1}
                            disabledDate={(endValue) => this.disabledEndDate(endValue, record)}
                            placeholder={formatMessage({ id: ProcessReportPageLocale.FilterEndDate })} />
                    </div>;
                } else {
                    return <AkDatePicker onChange={(value) => this.onchangeValue(index, attr, AkDatetimeUtil.toCSTValue(moment(value)))}
                        value={value}
                        format="MM-DD-YYYY"
                        disabled={record.disabled}
                        placeholder={record.Name} />;
                }
            case "groupselect":
            case "organization":
                return <AkFormIdentityPicker identityTypes={[AkIdentityType.Organization]}
                    onChange={(value) => this.onchangeValue(index, attr, value)}
                    value={value}
                    placeholder={record.Name} />;
            case "text":
            case "string":
                return <AkInput onChange={(value) => this.onchangeValue(index, attr, value)}
                    value={value}
                    maxLength={50}
                    placeholder={record.Name} />;
            case "number":
                if (record.ID === "applicationstatus") {
                    let result;
                    const { All, Running, Approval, Rejected, Recalled, Terminated, Errors } = ReportCheckeEnum;
                    const multiOptions = [
                        { label: formatMessage({ id: this.checkName + Running }), value: String(Running) },
                        { label: formatMessage({ id: this.checkName + Approval }), value: String(Approval) },
                        { label: formatMessage({ id: this.checkName + Rejected }), value: String(Rejected) },
                        { label: formatMessage({ id: this.checkName + Recalled }), value: String(Recalled) },
                        { label: formatMessage({ id: this.checkName + Terminated }), value: String(Terminated) },
                        { label: formatMessage({ id: this.checkName + Errors }), value: String(Errors) }
                    ];
                    const defaultValue = value && value !== "" ? value.split(",") : null;
                    return <div>
                        <AkCheckbox value={defaultValue && defaultValue.length === 6}
                            onChange={(e) => {
                                result = e.target["checked"] ? "1,2,3,4,5,6" : "";
                                this.onchangeValue(index, attr, result);
                            }}>{formatMessage({ id: this.checkName + All })}</AkCheckbox>
                        <AkCheckboxGroup
                            options={multiOptions}
                            value={defaultValue}
                            onChange={(value) => {
                                result = value && value.length > 0 ? value.join(",") : "";
                                this.onchangeValue(index, attr, result);
                            }} />
                    </div>;
                }
                return <AkInputNumber onChange={(value) => this.onchangeValue(index, attr, value)}
                    value={value}
                    placeholder={record.Name} />;
            case "metadata":
                return <AkMetadataTreeSelect categoryID={record.Ext2}
                    parentID={record.Ext2}
                    showSearch={true}
                    value={value}
                    onChange={(id: string, code: string) => {
                        this.onchangeValue(index, attr, id);
                    }}
                    placeholder={record.Name} />;
            case "user":
                return <AkFormIdentityPicker onChange={(value) => this.onchangeValue(index, attr, value)}
                    value={value}
                    placeholder={record.Name} />;
            case "costcenter":
                return <AkFormCostCenterPicker onChange={(value) => this.onchangeValue(index, attr, value)}
                    value={value}
                    placeholder={record.Name} />;
            case "location":
                return <AkLocationSelect onChange={(value) => this.onchangeValue(index, attr, value)}
                    value={value}
                    placeholder={record.Name} />;
        }
    }

    /**根据变量类型显示相应的比较符*/
    renderCompare(item) {
        switch (item.Type) {
            case "organization":
                return ["Eq", "In"];
            case "boolean":
                return ["IsTrue", "IsFalse"];
            case "location":
            case "costcenter":
            case "groupselect":
                return ["Eq", "IsNull", "IsNotNull"];
            case "metadata":
                return ["Eq", "Neq", "IsNull", "IsNotNull"];
            case "user":
                if (item.ID === "applicantuserid") {
                    return ["Eq", "Me"];
                }
                return ["Eq", "IsNull", "IsNotNull", "Me"];
            case "text":
            case "string":
                return ["Eq", "Neq", "IsNull", "IsNotNull", "LikeLast"];
            case "date":
            case "number":
                return ["Eq", "Leq", "Geq", "Gt", "Lt", "Neq", "IsNull", "IsNotNull"];
        }
    }

    /**改变option数量*/
    changeOption(data, optionType) {
        let result = [];
        switch (optionType) {
            case "Variable":
                const { FilterData } = this.state;
                data.forEach((d, index) => {
                    const counter = FilterData && FilterData.find(v => v.ID === d.ID);
                    if (!counter)
                        result.push(<AkSelect.Option key={d.ID}> {d.Name} </AkSelect.Option>);
                });
                break;
            case "Compare":
                const { formatMessage } = AkGlobal.intl;
                data.forEach((d, index) => {
                    result.push(<AkSelect.Option key={d}> {formatMessage({ id: this.defaultName + ReportFilterCompare[d] })} </AkSelect.Option>)
                });
                break;
            default:
                data.forEach((d, index) => {
                    if (d.ID && !d.IsHide) {
                        result.push(<AkSelect.Option key={index + 1}> {index + 1} </AkSelect.Option>)
                    }
                });
        }
        return result;
    }

    /**更改顺序 */
    changeOrder(data: Array<any>, isInit: boolean, setStateElement?: any) {
        const order = data.findIndex(d => "Order" in d && d.Order);
        let result = [];
        let lth = data.length;
        let indexs = 0;
        if (order > -1 && isInit) {
            for (let i = 0; i < lth; i++) {
                const d = data[i];
                if (d.ID) {
                    if (!("IsHide" in d) || !d['IsHide']) {
                        if ("Order" in d && d.Order) {
                            result = AkUtil.insert(result, d, Number(d.Order) - 1);
                        } else {
                            const maxSortBy = p => (a, b) => a[p] < b[p] ? 1 : -1;
                            const maxOrder = data.sort(maxSortBy("Order"))[0].Order;
                            result.push(d);
                        }
                    } else {
                        result.push(d);
                    }
                }
            }
            !data[lth - 1].Name && result.push(data[lth - 1])
        } else {
            let indexs = 0;
            for (let i = 0; i < lth; i++) {
                let d = data[i];
                if (d.ID && (!("IsHide" in d) || !d['IsHide'])) {
                    AkUtil.remove(data, v => v.ID === d.ID);
                    d.Order = indexs + 1;
                    data = AkUtil.insert(data, d, indexs);
                    indexs++;
                }
            }
            result = data;
        }
        this.setState({ FilterData: result, ...setStateElement });
    }

    /** 选择排序 */
    selectSort(data, index, e) {
        let value = data[index];
        AkUtil.remove(data, v => v.ID === data[index].ID);
        data = AkUtil.insert(data, value, Number(e - 1));
        this.changeOrder(data, false);
    }

    /**比较符的显示*/
    showCompare(item, index, text) {
        const { formatMessage } = AkGlobal.intl;
        switch (item.ID) {
            case "created":
            case "modified":
                return formatMessage({ id: this.defaultName + "11" });
            case "applicationstatus":
                return formatMessage({ id: this.defaultName + "1" });
            default:
                const result = this.renderCompare(item);
                let CompareValue = item.Type === "boolean" ? text === 1 ? item.Value !== "true" ? 14 : 13 : text : text;
                return <AkSelect value={ReportFilterCompare[CompareValue] || ReportFilterCompare[1]}
                    style={{ minWidth: 60 }}
                    onChange={(value) => {
                        const Compare = value === "IsTrue" || value === "IsFalse" ? "Eq" : value;
                        switch (item.Type) {
                            case "boolean":
                                const booleanData = value !== "IsTrue" ? value === "IsFalse" ? "false" : null : "true";
                                this.onchangeValue(index, "Value", booleanData);
                                break;
                            case "user":
                                const userValue = value === "Me" ? null : null;
                                this.onchangeValue(index, "Value", userValue);
                                break;
                            default:
                                this.onchangeValue(index, "Value", null);
                        }
                        this.onchangeValue(index, "Compare", ReportFilterCompare[Compare as string]);
                    }}>{this.changeOption(result, "Compare")}</AkSelect>;
        }
    }

    /**创建modalContent*/
    renderFileterElement() {
        const { formatMessage } = AkGlobal.intl;
        const { FilterData } = this.state;
        return <AkRow>
            <AkRow>
                <AkCol>{formatMessage({ id: ProcessReportPageLocale.FilterDescriptions }).split('\n').map((p, i) => <p key={i}>{p}</p>)}</AkCol>
            </AkRow>
            <AkRow>
                {this.renderTable(FilterData)}
            </AkRow>
        </AkRow>;
    }

    /**创建表格*/
    renderTable(data) {
        return <AkTable columns={this.columns}
            rowKey={(d) => d['ID'] || "nullID"}
            showHeader={false}
            pagination={false}
            dataSource={data}
            autoWrapColumn={false}
            scroll={{ x: 875, y: false }}
            loading={this.state.loading}></AkTable>
    }

    /**校验必填 */
    validateRequire() {
        let { FilterData } = this.state;
        const { formatMessage } = AkGlobal.intl;
        const { IsNull, IsNotNull, Me } = ReportFilterCompare;
        for (let i = 0, lt = FilterData.length; i < lt; i++) {
            let d = FilterData[i];
            if (d.IsContant && !d.Value && d.Compare !== IsNull && d.Compare !== IsNotNull && d.Compare !== Me) {
                if (d.Type === "date" && d.Ext1) {
                    continue;
                }
                AkNotification.warning({
                    message: '',
                    description: formatMessage({
                        id: CommonLocationLocale.ValidaMessage
                    }, { name: d.Name })
                });
                return true;
            }
        }
        return false;
    }

    onOK() {
        let putReportFiltersData: ReportFilterSettingRequest;
        const { FilterData } = this.state;
        let buildinData = [];
        let customizedData = [];
        if (this.validateRequire()) {
            return;
        }
        FilterData.map(d => {
            d.DisplayName = "DisplayName" in d && d.DisplayName && d.DisplayName !== "" ? d.DisplayName : d.Name;
            if (this.filterData(d.ID)) {
                buildinData.push(d);
            } else {
                if (d.ID) {
                    customizedData.push(d);
                }
            }
        });
        putReportFiltersData = {
            ReportID: this.getReportlist.reportID,
            Ext1: JSON.stringify(buildinData),
            Ext2: JSON.stringify(customizedData),
        };
        ReportAPI.putReportFilters(putReportFiltersData).then(data => {
            if (data.Status === 0) {
                this.props.onOk();
            } else {
                AkNotification.warning({
                    message: '',
                    description: data.Message
                });
            }
        })
    }

    render() {
        const { formatMessage } = AkGlobal.intl;
        let reportTitle = formatMessage({ id: ProcessReportPageLocale.FilterSettings });
        return <AkModal
            maskClosable={false}
            visible
            title={reportTitle}
            width={910}
            onCancel={() => {
                this.props.onCancel();
            }}
            onOk={() => {
                this.onOK();
            }}>
            {this.renderFileterElement()}
        </AkModal>
    }
}

export enum ReportFilterCompare {
    Eq = 1,//等于
    Leq = 2,//小于等于
    Geq = 3,//大于等于
    Gt = 4,//大于
    Lt = 5,//小于
    Neq = 6,//不等于
    IsNull = 7,//为空
    IsNotNull = 8,//不为空
    LikeLast = 9,//模糊or开始于
    In = 10,//包含
    Between = 11,//之间
    Me = 12,//当前用户
    // 前端定义
    IsTrue = 13,//为真
    IsFalse = 14 //为假
}
export enum ReportCheckeEnum {
    // 全部-默认
    All = 0,
    // 运行中
    Running = 1,
    // 已通过
    Approval = 2,
    // 已拒绝
    Rejected = 3,
    // 出错
    Errors = 4,
    // 已撤回
    Recalled = 5,
    // 已终止
    Terminated = 6,
}
export default injectIntl(withRouter(FilterSettingsReportModal));
