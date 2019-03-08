import * as React from "react";
import { Component } from "react";
import { AkGlobal, AkRow, AkCol, AkDatePicker, AkButton, AkInput, AkInputNumber, AkFormIdentityPicker, AkSelect, AkFormCostCenterPicker, AkLocationSelect, AkIdentityType, AkMetadataTreeSelect, AkDatetimeUtil, AkCheckbox, AkUtil } from 'akmii-yeeoffice-common';
import { ReportPageLocale, ProcessReportPageLocale } from '../../locales/localeid';
import { ReportFilterCompare, ReportCheckeEnum } from './filtersettings-report';
import * as moment from 'moment';


interface CustomSearchVariable {
    ID?: string;
    Type?: string;
    Name?: string;
    DisplayName?: string;
    Value?: any;
    Checked?: boolean;
    Compare?: number;
    IsContant?: boolean;
    IsExpression?: boolean;
    IsHide?: boolean;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    Disabled?: false;
    DisabledExt1?: false;
}

interface CustomSearchProps {
    /** 筛选变量list*/
    list?: CustomSearchVariable[];
    /** 点击搜索返回list*/
    onSearch?: (data: CustomSearchVariable[]) => void;
}

interface CustomSearchStates {
    filter?: CustomSearchVariable[];
    list?: CustomSearchVariable[];
    checkedList?: number[];
    checkAll?: boolean;
}

export default class CustomSearchPanel extends Component<CustomSearchProps, CustomSearchStates> {
    plainOptions: object[];
    checkName: string;
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: [],
            list: [],
            checkAll: false,
        };
        this.checkName = "page.report.modal.reportfilter.checkbox.";
        const { Running, Approval, Rejected, Recalled, Terminated, Errors } = ReportCheckeEnum;
        this.plainOptions = [
            { label: AkGlobal.intl.formatMessage({ id: this.checkName + Running }), value: String(Running) },
            { label: AkGlobal.intl.formatMessage({ id: this.checkName + Approval }), value: String(Approval) },
            { label: AkGlobal.intl.formatMessage({ id: this.checkName + Rejected }), value: String(Rejected) },
            { label: AkGlobal.intl.formatMessage({ id: this.checkName + Recalled }), value: String(Recalled) },
            { label: AkGlobal.intl.formatMessage({ id: this.checkName + Terminated }), value: String(Terminated) },
            { label: AkGlobal.intl.formatMessage({ id: this.checkName + Errors }), value: String(Errors) }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if ("list" in nextProps) {
            this.setState({ list: nextProps.list });
            if (nextProps.list.length > 0) {
                nextProps.list.forEach(element => {
                    if ("Disabled" in element) {
                        element.Disabled = element.Disabled;
                    } else {
                        if ((element.Value !== null) && (element.Value !== "")) {
                            element.Disabled = true;
                        } else {
                            element.Disabled = false;

                        }
                    };
                    if ("DisabledExt1" in element) {
                        element.DisabledExt1 = element.DisabledExt1;
                    } else {
                        if ((element.Ext1 !== null) && (element.Ext1 !== "")) {
                            element.DisabledExt1 = true;
                        } else {
                            element.DisabledExt1 = false;
                        }
                    }

                    if (element.ID === "applicationstatus" && element.Value && element.Value.split(",").length === 6) {
                        this.setState({ checkAll: true });
                    }
                });
            }
        }
    }

    onSearch = () => {
        const { props: { onSearch, list } } = this;
        const value = list.filter(item => ((item.Value !== null) && (item.Value !== "")) || ((item.Ext1 !== null) && (item.Ext1 !== "")) || (item.Compare === ReportFilterCompare.IsNotNull) || (item.Compare === ReportFilterCompare.IsNull));
        const searchList = value.map(item => {
            let value = {
                Compare: item.Compare === 0 ? 1 : item.Compare,
                Ext1: item.Ext1 ? moment(item.Ext1).add(1, 'days').format("MM-DD-YYYY") : null,
                ID: item.ID,
                Type: item.Type,
                Value: item.Value ? item.Value : null,
            }
            return value;
        });

        if (onSearch)
            onSearch(searchList);
    }

    /** Value变更后重组List*/
    onChange = (index, key, value, isArray?: boolean) => {
        const { state: { list, filter } } = this;
        let checkAll: boolean;
        if (isArray) {
            list[index][key] = value ? value.join(",") : null;
            checkAll = (value.length === 6) ? true : false;
        } else {
            list[index][key] = value ? value : null;
        }
        filter[index] = list[index];

        if (filter[index].Compare === 0) {
            filter[index].Compare = 1;
        }
        this.setState({ list, filter, checkAll });
    }

    onCheckAllChange(index, key, e) {
        const { state: { list, filter } } = this;

        list[index][key] = e.target.checked ? "1,2,3,4,5,6" : "";
        filter[index] = list[index];
        if (filter[index].Compare === 0) {
            filter[index].Compare = 1;
        }
        this.setState({
            list, filter,
            checkAll: e.target.checked,
        });
    }

    /** 获取List变量控件 */
    getVariableControl() {
        const topThis = this;
        const { state: { list } } = topThis;
        return list.map(function (item, index) {
            return topThis.renderControl(item, index, "Value");
        });
    }

    selectOption() {
        const { formatMessage } = AkGlobal.intl;
        let str = [];
        const selectDate = [{
            ID: 0,
            value: "true",
            Name: formatMessage({ id: ProcessReportPageLocale.FilterBooleanOptionTrue })
        }, {
            ID: 1,
            value: "false",
            Name: formatMessage({ id: ProcessReportPageLocale.FilterBooleanOptionFalse })
        }];
        selectDate.map(d => {
            str.push(<AkSelect.Option value={d.value} key={d.ID}> {d.Name} </AkSelect.Option>);
        });
        return str;
    }

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

    renderControl(record: CustomSearchVariable, index, name) {
        const colLayout = {
            lg: 4,
            md: 12,
            sm: 12,
            xs: 24,
            style: {
                paddingLeft: "15px",
                paddingRight: "15px",
                marginBottom: "8px"
            }
        };
        const { formatMessage } = AkGlobal.intl;
        const { IsNotNull, IsNull } = ReportFilterCompare;
        let p = record.ID;
        let message = "";
        if (p === "created" || p === "modified") {
            //GO TO 时区
            message = p === "created" ? ProcessReportPageLocale.Create : ProcessReportPageLocale.Modified;
            return ((record.Compare === IsNull) || (record.Compare === IsNotNull)) ? null : <AkCol key={index} {...colLayout}>
                <div className="report-name" title={record.DisplayName ? record.DisplayName : record.Name}>{record.DisplayName ? record.DisplayName : record.Name}</div>
                <div><AkDatePicker
                    style={{
                        width: "50%",
                        paddingRight: "5px"
                    }}
                    disabledDate={(startValue) => this.disabledStartDate(startValue, record)}
                    disabled={record.Disabled}
                    format="MM-DD-YYYY"
                    onChange={(value) => this.onChange(index, name, value)}
                    value={record.Value}
                    placeholder={formatMessage({ id: ProcessReportPageLocale.FilterStartDate })} />
                    <AkDatePicker
                        style={{ width: "50%" }}
                        format="MM-DD-YYYY"
                        disabledDate={(endValue) => this.disabledEndDate(endValue, record)}
                        disabled={record.DisabledExt1}
                        onChange={(value) => this.onChange(index, "Ext1", AkDatetimeUtil.toCSTValue(moment(value)))}
                        value={record.Ext1}
                        placeholder={formatMessage({ id: ProcessReportPageLocale.FilterEndDate })} /></div>
            </AkCol>;
        } else if (p === "applicationstatus") {
            const value = record.Value ? record.Value.split(",") : [];
            return <AkCol key={index}
                lg={8}
                md={24}
                sm={24}
                xs={24}
                style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    marginBottom: "8px",
                }}>
                <div className="report-name-checkbox" title={record.DisplayName ? record.DisplayName : record.Name}>{record.DisplayName ? record.DisplayName : record.Name}</div>
                <div className="report-value-checkbox">
                    <AkCheckbox
                        disabled={record.Disabled}
                        checked={this.state.checkAll}
                        onChange={(value) => this.onCheckAllChange(index, name, value)}>{formatMessage({ id: this.checkName + ReportCheckeEnum.All })}</AkCheckbox>
                    <AkCheckbox.Group
                        className="report-checkbox"
                        disabled={record.Disabled}
                        options={this.plainOptions}
                        onChange={(value) => this.onChange(index, name, value, true)}
                        value={value} />
                </div>
            </AkCol >;
        }
        else {
            let control = null;
            switch (record.Type) {
                case "date":
                    control = <AkDatePicker onChange={(value) => this.onChange(index, name, AkDatetimeUtil.toCSTValue(moment(value)))}
                        value={record.Value}
                        format="MM-DD-YYYY"
                        disabled={record.Disabled}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "organization":
                case "groupselect":
                    control = <AkFormIdentityPicker identityTypes={[AkIdentityType.Organization]}
                        onChange={(value) => this.onChange(index, name, value)}
                        value={record.Value}
                        readonly={record.Disabled}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "string":
                case "text":
                    control = <AkInput onChange={(value) => this.onChange(index, name, value)}
                        disabled={record.Disabled}
                        value={record.Value}

                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "number":
                    control = <AkInputNumber onChange={(value) => this.onChange(index, name, value)}
                        disabled={record.Disabled}
                        style={{
                            width: "100%"
                        }}
                        value={record.Value}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "boolean":
                    control = <AkSelect onChange={(value) => this.onChange(index, name, value)}
                        disabled={record.Disabled}
                        allowClear
                        className={((record.Value !== null) && (record.Value !== "")) ? "placeholder-hidden" : "placeholder-visiable"}
                        value={record.Value}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name}>
                        {this.selectOption()}
                    </AkSelect>;
                    break;
                case "metadata":
                    control = <AkMetadataTreeSelect parentID={record.Ext2} categoryID={record.Ext2} onChange={(value) => this.onChange(index, name, value)}
                        value={record.Value}
                        disabled={record.Disabled}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "user":
                    control = <AkFormIdentityPicker onChange={(value) => this.onChange(index, name, value)}
                        readonly={record.Disabled}
                        value={record.Value}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "costcenter":
                    control = <AkFormCostCenterPicker onChange={(value) => this.onChange(index, name, value)}
                        readonly={record.Disabled}
                        value={record.Value}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
                case "location":
                    control = <AkLocationSelect allowClear onChange={(value) => this.onChange(index, name, value)}
                        disabled={record.Disabled}
                        value={record.Value}
                        className={((record.Value !== null) && (record.Value !== "")) ? "placeholder-hidden" : "placeholder-visiable"}
                        placeholder={record.DisplayName ? record.DisplayName : record.Name} />;
                    break;
            }
            return <AkCol key={index} {...colLayout}>
                <div className="report-name" title={record.DisplayName ? record.DisplayName : record.Name}>{record.DisplayName ? record.DisplayName : record.Name}</div>
                {(record.Compare === IsNull) || (record.Compare === IsNotNull) ? <div><AkInput
                    disabled
                    value={ReportFilterValue[record.Compare]}
                    placeholder={record.DisplayName ? record.DisplayName : record.Name} /></div> : <div>{control}</div>}
            </AkCol>;
        }
    }

    render() {
        const topThis = this;
        const { formatMessage } = AkGlobal.intl;
        return <AkRow
            type="flex"
            justify="start"
            align="bottom"
            style={{
                padding: ' 10px 10px 0px'
            }}
            className="report-search">
            {topThis.getVariableControl()}
            <AkCol style={{ marginLeft: "8px", marginBottom: "8px" }}>
                {this.props.list.length > 0 ? <AkButton
                    type="primary"
                    style={{
                        marginLeft: "15px"
                    }}
                    onClick={topThis.onSearch.bind(this)}>
                    {formatMessage({ id: ReportPageLocale.SearchButtonTitle })}</AkButton> : null}
            </AkCol>
        </AkRow >;
    }
}


export enum ReportFilterValue {
    "为空" = 7,//为空
    "不为空" = 8,//不为空
}

