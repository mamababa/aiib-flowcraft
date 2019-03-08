import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import {
    IntlProps,
    AkTable,
    AkColumnProps,
    AkRow,
    AkCol,
    AkInput,
    AkModal,
    AkNotification,
    AkMenu,
    AkIcon,
    AkDropDown,
    AkSwitch,
    AkDatePicker,
    AkIdentityPicker,
    AkIdentity,
    AkGlobal,
    AkIdentityType,
    CommonLocale,
    AkColumnLayout,
    AkDateLabel,
    AkAvatar,
    AkDatetimeUtil,
    AkButton,
    AkLookupFlowName,
    AkContext,
    AkUtil,
    AkConstants
} from "akmii-yeeoffice-common";
import { DelegatesPageLocale, CommonLocationLocale, NavLocale } from "../locales/localeid";
import { DelegatesAPI } from "../api/delegate";
import { MainContent } from "./components/maincontent";
import { FlowcraftCommon } from "../util/common";
import * as moment from "moment";
import { AkMessage } from 'akmii-yeeoffice-common';
import { ProjectAPI } from "../api/aiibworkflow/project";
import { isNullOrUndefined } from "util";

class DelegateTable extends AkTable<TaskDelegateModel> { }
interface DelegateAkColumn extends AkColumnProps<TaskDelegateModel> { }

/** 委托*/
interface DelegatesProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> { }
interface DelegatesStates {
    totalCount?: number;
    delegateData?: TaskDelegateModel[];
    loading?: boolean;
    visibleEdit?: boolean;
    visibleBatchEdit?: boolean;
    visibleAdd?: boolean;
    /**时间相关*/
    startValue?: any;
    endValue?: any;
    endOpen?: boolean;
    /**时间相关 End*/

    /**批量操作 */
    batchVisible?: boolean;
    /**批量选择 */
    selectedRowKeys?: string[];
    /**批量选择的数据*/
    selectedRows?: TaskDelegateModel[];
    delegateInfo: AkIdentity;
    isReadOnly?:boolean;
}

class DelegatesPage extends Component<DelegatesProps,
    DelegatesStates> {
    columns: DelegateAkColumn[];
    /**委托详情*/
    itemInfo?: TaskDelegateModel;
    /** 获取委托列表 */
    getRequest?: GetDelegateListRequest;
    /**新增委托 */
    postRequest?: BatchRequest;
    /**新增委托 */
    putRequest?: BatchRequest;
    /**删除委托*/
    deleteRequest?: DeleteDelegateRequest;
    /**批量 删除委托*/
    batchDeleteRequest?: DeleteDelegateBatchRequest;
    /**更新委托状态 */
    putStatusRequest?: DelegateEditStatusRequest;
    /**添加时验证流程定义是否被使用过 */
    validateKeyRequest?: ValidateKeyCanUseRequest;
    /**key是否可用 */
    canUseKey?: boolean;
    /**流程定义数据 */
    defDataList?: ProcDefBrief[];
    /**Aiib流程定义数据 */
    procdefDataList?: ProcDefDelegate[];
    /**已存在的流程定义Keys */
    existKeys?: string[];
    /***不可用时间 */
    disableTimes?: number[];

    /**默认时间 */
    defaultTime?: moment.Moment;

    constructor(props, context) {
        super(props, context);
        const { formatMessage } = AkGlobal.intl;
        this.columns = [
            // {
            //     title: formatMessage({ id: DelegatesPageLocale.ColumnProcessName }),
            //     key: DelegatesPageLocale.ColumnProcessName,
            //     layout: AkColumnLayout.LeftTop,
            //     dataIndex: "ProcDefName"
            // },
            {
                title: formatMessage({ id: DelegatesPageLocale.ColumnDelegate }),
                key: DelegatesPageLocale.ColumnDelegate,
                // layout: AkColumnLayout.RightTop,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "DelegateID",
                render: (txt, record) => {
                    return <AkAvatar value={txt} type="text" />;
                }
            }, {
                title: formatMessage({ id: DelegatesPageLocale.ColumnStartTime }),

                layout: AkColumnLayout.LeftBottom,
                key: DelegatesPageLocale.ColumnStartTime,
                dataIndex: "StartDateStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY" />;
                }
            }, {
                title: formatMessage({ id: DelegatesPageLocale.ColumnEndTime }),
                layout: AkColumnLayout.RightBottom,
                key: DelegatesPageLocale.ColumnEndTime,
                dataIndex: "EndDateStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY" />;
                }
            }, {
                title: formatMessage({ id: DelegatesPageLocale.ColumnCreated }),
                key: DelegatesPageLocale.ColumnCreated,
                hidden: FlowcraftCommon.minSM,
                dataIndex: "CreatedStr",
                render: (txt, record) => {
                    return <AkDateLabel value={txt} format="MM-DD-YYYY" />;
                }
            }, {
                title: formatMessage({ id: DelegatesPageLocale.ColumnStatus }),
                key: DelegatesPageLocale.ColumnStatus,
                dataIndex: "Status",
                layout: AkColumnLayout.RightTop,
                // hidden: FlowcraftCommon.minSM,
                render: (txt, record) => {
                    return <AkSwitch
                        checked={record.Status}
                        checkedChildren={'ON'}
                        unCheckedChildren={'OFF'}
                        onChange={() => {
                            this.changeRowStatus(record)
                        }}></AkSwitch>;
                }
            }, {
                title: "",
                key: "",
                dataIndex: "",
                className: "ak_align_r",
                render: (txt, record) => {
                    if (this.existKeys.length > 0) {
                        if (this.existKeys.findIndex(f => f === record.ProcdefKey.toString()) === -1) {
                            this.existKeys.push(record.ProcdefKey.toString());
                        }
                    } else {
                        this.existKeys.push(record.ProcdefKey.toString());
                    }

                    let akmenu = <AkMenu>
                        <AkMenu.Item>
                            <a
                                onClick={() => {
                                    this.itemInfo = record;
                                    this.putRequest = {
                                        Keys: AkUtil.isArray(record.ProcdefKey) ? record.ProcdefKey : AkUtil.toArray(record.ProcdefKey),
                                        Status: record.Status,
                                        StartDate: moment(record.StartDateStr).format("MM-DD-YYYY HH:mm"),
                                        EndDate: moment(record.EndDateStr).format("MM-DD-YYYY HH:mm"),
                                        DelegateID: record.DelegateID,
                                        Comment: record.Comment
                                    }
                                    this.setState({ visibleEdit: true, startValue: moment(record.StartDateStr), endValue: moment(record.EndDateStr) });
                                }}>
                                <AkIcon type="edit"></AkIcon>
                                <FormattedMessage id={DelegatesPageLocale.RowOperationEdit}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a
                                onClick={() => { this.delData(record); }}>
                                <AkIcon type="delete"></AkIcon>
                                <FormattedMessage id={DelegatesPageLocale.RowOperationDelete}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                    </AkMenu>
                    return <AkDropDown trigger={['click']} overlay={akmenu}>
                        <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
                    </AkDropDown>
                }
            }
            // , {
            //     title: "",
            //     key: "",
            //     dataIndex: "",
            //     className: "ak_align_r",
            //     render: (txt, record) => {
            //         this
            //             .existKeys
            //             .push(record.ProcdefKey);
            //         let akmenu = <AkMenu>
            //             <AkMenu.Item>
            //                 <a
            //                     onClick={() => {
            //                         this.itemInfo = record;
            //                         this.putRequest = {
            //                             Key: record.ProcDefName,
            //                             Status: record.Status,
            //                             StartDate: moment(record.StartDateStr).format("YYYY-MM-DD HH:mm:ss"),
            //                             EndDate: moment(record.EndDateStr).format("YYYY-MM-DD HH:mm:ss"),
            //                             DelegateID: record.DelegateID,
            //                             Comment: record.Comment
            //                         }
            //                         this.setState({ visibleEdit: true, startValue: moment(record.StartDateStr), endValue: moment(record.EndDateStr) });
            //                     }}>
            //                     <AkIcon type="edit"></AkIcon>
            //                     <FormattedMessage id={DelegatesPageLocale.RowOperationEdit}></FormattedMessage>
            //                 </a>
            //             </AkMenu.Item>
            //             <AkMenu.Item>
            //                 <a
            //                     onClick={() => {
            //                         this.delData(record);
            //                     }}>
            //                     <AkIcon type="delete"></AkIcon>
            //                     <FormattedMessage id={DelegatesPageLocale.RowOperationDelete}></FormattedMessage>
            //                 </a>
            //             </AkMenu.Item>
            //         </AkMenu>
            //         return <AkDropDown trigger={['click']} overlay={akmenu}>
            //             <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
            //         </AkDropDown>
            //     }
            // }
        ];
        this.state = {
            delegateInfo: null,
            delegateData: [],
            batchVisible: false,
            selectedRowKeys: [],
            selectedRows: [],
            visibleBatchEdit: false,
            isReadOnly:false
        };
        this.getRequest = {
            pageSize: 9999,
            pageIndex: 1
        };
        this.postRequest = { Keys: ['0'] };
        this.putRequest = { Keys: ['0'] };
        this.deleteRequest = {};
        this.batchDeleteRequest = {};
        this.putStatusRequest = {};
        this.validateKeyRequest = {};
        this.canUseKey = true;
        this.itemInfo = {};
        this.defDataList = [];
        this.procdefDataList = [];
        this.existKeys = [];

        let rangesNumber = (this.range(0, 60) as [number, number]);
        this.disableTimes = rangesNumber.filter(x => x !== 0).filter(x => x !== 30);

        let tempTime = moment().format("HH:mm").split(':');
        this.defaultTime = Number(tempTime[1]) > 30 ? moment('' + tempTime[0] + ':30', 'HH:mm') : moment('' + tempTime[0] + ':00', 'HH:mm');
    }
    componentWillMount() {
        this.loadData();
        ProjectAPI.getUserGroups({ userID: "" }).then(d=> {
            if(d.Status === 0) {
                const userGrops = d.Data.filter(item => item && item.Ext1 === "UserGroup");
                const isReadOnly = userGrops.find(item => item.Code === "Readonly");
               this.setState({isReadOnly:!isNullOrUndefined(isReadOnly)});
            }
        });
    }
    /**加载全部数据*/
    loadData() {
        const { formatMessage } = AkGlobal.intl;
        this.setState({ loading: true })
        DelegatesAPI.getDelegateList(this.getRequest).then(data => {
            if (data.Status === 0) {
                this.setState({ loading: false, totalCount: data.TotalCount, delegateData: data.Data });
            } else {
                AkNotification.warning({
                    message: formatMessage({ id: CommonLocationLocale.Tip }),
                    description: data.Message // formatMessage({id: CommonLocationLocale.GetInfoError})
                });
                this.setState({ loading: false });
            }
        });
    }
    /**更改委托状态*/
    changeRowStatus(item?: TaskDelegateModel) {
        const { formatMessage } = AkGlobal.intl;
        this.setState({ loading: true });
        this.putStatusRequest = {
            Key: item.ProcdefKey.toString(),
            Status: !item.Status
        }
        DelegatesAPI.putDelegateStatus(this.putStatusRequest).then(data => {
            if (data.Status === 0) {
                this.loadData();
            } else {
                AkNotification.warning({
                    message: formatMessage({ id: CommonLocationLocale.Tip }),
                    description: data.Message // formatMessage({id: CommonLocationLocale.EditFail})
                });
                this.setState({ loading: false, visibleEdit: false, visibleAdd: false });
            }
        });
    }
    /**删除后更新 selectKes SelectRows */
    removeFromSelect(deleteKe: string) {
        const { selectedRowKeys, selectedRows } = this.state;
        let keys = selectedRowKeys.filter(f => deleteKe.indexOf(f) === -1);
        let rows = selectedRows.filter(f => f.ProcdefKey.toString() !== deleteKe);
        this.setState({ selectedRowKeys: keys, selectedRows: rows });
    }
    /**删除委托*/
    delData(item?: TaskDelegateModel) {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        AkModal.confirm({
            title: formatMessage({ id: CommonLocale.Delete }),
            content: formatMessage({
                id: CommonLocationLocale.DeleteConfirm
            }, { name: item.ProcDefName }),
            onOk() {
                topThis.setState({ loading: true })
                topThis.deleteRequest.key = item.ProcdefKey.toString();
                DelegatesAPI
                    .deleteDelegate(topThis.deleteRequest)
                    .then(data => {
                        if (data.Status === 0) {
                            topThis.existKeys = [];
                            topThis.loadData();
                            topThis.removeFromSelect(item.ProcdefKey.toString());
                        } else {
                            AkNotification.warning({
                                message: formatMessage({ id: CommonLocationLocale.Tip }),
                                description: data.Message // formatMessage({id: CommonLocationLocale.DeleteFail})
                            });
                        }
                        topThis.setState({ loading: false });
                    });
            },
            onCancel() { }
        });
    }
    /**批量 删除委托*/
    batchDelData() {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        const { selectedRowKeys, selectedRows } = topThis.state;
        let arryNames = selectedRows.map(item => {
            return item.ProcDefName
        });
        let names = AkContext.getLanguage() === "en" ? arryNames.join(", ") : arryNames.join("、");

        AkModal.confirm({
            title: formatMessage({ id: CommonLocale.Delete }),
            content: formatMessage({
                id: CommonLocationLocale.DeleteConfirm
            }, { name: names }),
            onOk() {
                topThis.setState({ loading: true })
                topThis.batchDeleteRequest.keys = selectedRowKeys;
                DelegatesAPI
                    .deleteDelegateBatch(topThis.batchDeleteRequest)
                    .then(data => {
                        if (data.Status === 0) {
                            topThis.existKeys = [];
                            topThis.loadData();
                            AkMessage.success(formatMessage({ id: CommonLocationLocale.DeleteSuccess }));
                        } else {
                            AkNotification.warning({
                                message: formatMessage({ id: CommonLocationLocale.Tip }),
                                description: data.Message // formatMessage({id: CommonLocationLocale.DeleteFail})
                            });
                        }
                        topThis.setState({ loading: false, selectedRowKeys: [], selectedRows: [] });
                    });
            },
            onCancel() { }
        });
    }
    /**添加时验证流程定义是否被使用过*/
    addValidateKey(value) {
        value = value ? value : "";
        const { formatMessage } = AkGlobal.intl;
        const { visibleEdit, visibleBatchEdit } = this.state;
        this.setState({ loading: true });
        this.validateKeyRequest = { key: value }
        DelegatesAPI.validatekey(this.validateKeyRequest).then(data => {
            if (data.Data == null) {
                this.canUseKey = true;
                this.postRequest.Keys = value;
                this.putRequest.Keys = value;
            } else {
                this.canUseKey = false;
                this.postRequest.Keys = value;
                let msg = data.Status != 0 ? data.Message : formatMessage({ id: DelegatesPageLocale.TipHasUsed });
                AkNotification.warning({
                    message: formatMessage({ id: CommonLocationLocale.Tip }),
                    description: msg
                });
            }
            this.setState({ loading: false });
        });
    }
    /**保存新增*/
    saveAdd() {
        const { formatMessage } = AkGlobal.intl;
        const { delegateInfo } = this.state;
        // this.postRequest.Keys=['0'];
        if (!this.canUseKey && this.postRequest.Keys) {
            AkNotification.warning({
                message: formatMessage({ id: CommonLocationLocale.Tip }),
                description: formatMessage({ id: DelegatesPageLocale.TipHasUsed })
            });
            return;
        }
        //aiib all
        // this.postRequest.Keys ='all';

        // if (!this.postRequest.Keys||this.postRequest.Keys.length===0) {
        //     AkNotification.warning({
        //         message: formatMessage({ id: CommonLocationLocale.Tip }),
        //         description: formatMessage({id: DelegatesPageLocale.TipWorkFlow})
        //     });
        //     return;
        // }
        if (delegateInfo && delegateInfo.ID === AkContext.getUser().AccountID) {
            AkNotification.error({
                message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                description: AkGlobal.intl.formatMessage({ id: NavLocale.DelegatesTips }),
            });
            return;
        }
        if (!this.postRequest.StartDate) {
            let _name = formatMessage({ id: DelegatesPageLocale.AddModalStartDay });
            this.NotificationValidate(_name);
            return;
        }
        if (!this.postRequest.EndDate) {
            let _name = formatMessage({ id: DelegatesPageLocale.AddModalEndDay });
            this.NotificationValidate(_name);
            return;
        }
        if (!this.postRequest.DelegateID) {
            let _name = formatMessage({ id: DelegatesPageLocale.AddModalDelegate });
            this.NotificationValidate(_name);
            return;
        }
        if (!this.postRequest.Comment) {
            let _name = formatMessage({ id: DelegatesPageLocale.AddModalReason });
            this.NotificationValidate(_name);
            return;
        }
        if (this.canUseKey) {
            this.setState({ loading: true });

            DelegatesAPI.postDelegateBatch(this.postRequest).then(data => {
                if (data.Status === 0) {
                    this.loadData();
                    this.setState({ loading: false, visibleAdd: false });
                } else {
                    AkNotification.warning({
                        message: formatMessage({ id: CommonLocationLocale.Tip }),
                        description: data.Message // formatMessage({id: CommonLocationLocale.AddFail})
                    });
                    this.setState({ loading: false });
                }
            });
        } else {
            AkNotification.warning({
                message: formatMessage({ id: CommonLocationLocale.Tip }),
                description: formatMessage({ id: DelegatesPageLocale.TipHasUsed })
            });
            return;
        }
    }
    /**保存编辑*/
    saveEdit() {
        const { formatMessage } = AkGlobal.intl;
        const { visibleEdit, visibleBatchEdit, delegateInfo } = this.state;
        //aiib all
        this.putRequest.Keys = ['0'];
        // if (this.putRequest.Keys.length===0) {
        //     AkNotification.warning({
        //         message: formatMessage({ id: CommonLocationLocale.Tip }),
        //         description: formatMessage({id: DelegatesPageLocale.TipWorkFlow})
        //     });
        //     return;
        // }
        if (delegateInfo && delegateInfo.ID === AkContext.getUser().AccountID) {
            AkNotification.error({
                message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                description: AkGlobal.intl.formatMessage({ id: NavLocale.DelegatesTips }),
            });
            return;
        }
        if (!this.putRequest.StartDate) {
            let _name = formatMessage({ id: DelegatesPageLocale.EditModalStartDay });
            this.NotificationValidate(_name);
            return;
        }
        if (!this.putRequest.EndDate) {
            let _name = formatMessage({ id: DelegatesPageLocale.EditModalEndDay });
            this.NotificationValidate(_name);
            return;
        }
        if (!this.putRequest.DelegateID) {
            let _name = formatMessage({ id: DelegatesPageLocale.EditModalDelegate });
            this.NotificationValidate(_name);
            return;
        }
        if (!this.putRequest.Comment) {
            let _name = formatMessage({ id: DelegatesPageLocale.EditModalReason });
            this.NotificationValidate(_name);
            return;
        }
        this.setState({ loading: true });
        DelegatesAPI.putDelegateBatch(this.putRequest).then(data => {
            if (data.Status === 0) {
                AkMessage.success(formatMessage({ id: CommonLocationLocale.EditSuccess }));
                this.loadData();
                if (visibleBatchEdit) {
                    this.setState({ loading: false, visibleBatchEdit: false, selectedRowKeys: [], selectedRows: [] });
                } else {
                    this.setState({ loading: false, visibleEdit: false });
                }
            } else {
                AkNotification.warning({
                    message: formatMessage({ id: CommonLocationLocale.Tip }),
                    description: data.Message // formatMessage({id: CommonLocationLocale.EditFail})
                });
                this.setState({ loading: false });
            }
        });
    }
    /***Notification.Warning**/
    NotificationValidate(paramterName) {
        const { formatMessage } = AkGlobal.intl;
        AkNotification.warning({
            message: formatMessage({ id: CommonLocationLocale.Tip }),
            description: formatMessage({
                id: CommonLocationLocale.ValidaMessage
            }, { name: paramterName })
        });
    }
    /***时间相关**/
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({ [field]: value });
    }
    onStartChange = (dataString, data) => {
        dataString = AkDatetimeUtil.toCSTValue(moment(dataString));
        if (this.state.visibleAdd) {
            this.postRequest.StartDate = dataString;
        } else {
            this.putRequest.StartDate = dataString;
        }
        this.onChange('startValue', data);
    }
    onEndChange = (dataString, data) => {
        dataString = AkDatetimeUtil.toCSTValue(moment(dataString));
        if (this.state.visibleAdd) {
            this.postRequest.EndDate = dataString;
        } else {
            this.putRequest.EndDate = dataString;
        }
        this.onChange('endValue', data);
    }
    // handleStartOpenChange = (open) => {     if (!open) { this.setState({endOpen:
    // true});     } }
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    /***时间相关 End**/
    range(start, end): number[] {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledEndDateTime(startValue) {
        let time = moment(startValue).format("HH:mm").split(':');
        return {
            disabledHours: () => (this.range(0, Number(time[0])) as [number, number]),
            disabledMinutes: () => this.disableTimes
        };
    }


    disabledStartDateTime(endValue) {
        const hours = moment(endValue).get('hour');
        return {
            disabledHours: () => {
                if (hours && endValue) {
                    return Array.from({ length: 24 - hours }, (v, k) => k + hours)
                } else {
                    return [];
                }
            },
            disabledMinutes: () => this.disableTimes
        }

    }

    /** 批量时获取选择行的Key */
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }
    /**新增委托*/
    renderAddModal() {
        let topThis = this;
        const { startValue, endValue, endOpen } = this.state;
        const { formatMessage } = AkGlobal.intl;

        return topThis.state.visibleAdd
            ? <AkModal
                wrapClassName="aiib-adv-search-modal"
                visible={topThis.state.visibleAdd}
                width={AkConstants.minSM ? '' : 1200}
                maskClosable={false}
                title={formatMessage({ id: DelegatesPageLocale.AddModalPropsTitle })}
                onOk={() => { topThis.saveAdd(); }}
                onCancel={() => {
                    topThis.itemInfo = {};
                    topThis.setState({ visibleAdd: false });
                }}>
                <AkRow align="middle" justify="space-around" type="flex">
                    {/* <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.AddModalProcDef}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkLookupFlowName exclusions={topThis.existKeys} onChange={(id: string | string[], obj?: any | any[]) => {
                            topThis.addValidateKey(id);
                        }}></AkLookupFlowName>
                        <FormattedMessage id={DelegatesPageLocale.AddModalProcDefExplain}></FormattedMessage>
                    </AkCol> */}
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.AddModalStartDay}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkDatePicker
                            style={{ width: '100%' }}
                            showToday={false}
                            placeholder={formatMessage({ id: DelegatesPageLocale.AddModalChooseStartDay })}
                            format="MM-DD-YYYY HH:mm"
                            showTime={{ hideDisabledOptions: true, format: 'MM-DD-YYYY HH:mm', defaultValue: topThis.defaultTime }}
                            disabledDate={this.disabledStartDate}
                            disabledTime={(curr) => topThis.disabledStartDateTime(endValue)}
                            defaultValue={null}
                            onChange={this.onStartChange}></AkDatePicker>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.AddModalEndDay}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkDatePicker
                            style={{ width: '100%' }}
                            showToday={false}
                            placeholder={formatMessage({ id: DelegatesPageLocale.AddModalChooseEndDay })}
                            showTime={{ hideDisabledOptions: true, format: 'MM-DD-YYYY HH:mm', defaultValue: topThis.defaultTime }}
                            format="MM-DD-YYYY HH:mm"
                            disabledDate={topThis.disabledEndDate}
                            disabledTime={(curr) => topThis.disabledEndDateTime(startValue)}
                            defaultValue={null}
                            onChange={topThis.onEndChange}
                            open={endOpen}
                            onOpenChange={topThis.handleEndOpenChange}></AkDatePicker>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.AddModalDelegate}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkIdentityPicker
                            multiple={false}
                            onChange={(v) => {
                                let value = v as AkIdentity;
                                this.setState({ delegateInfo: value });
                                topThis.postRequest.DelegateID = v ? (v as AkIdentity).ID : "";
                            }} />
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.AddModalEnable}></FormattedMessage>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkSwitch
                            checkedChildren={'ON'}
                            unCheckedChildren={'OFF'}
                            defaultChecked={false}
                            onChange={(checked: boolean) => {
                                topThis.postRequest.Status = checked;
                            }}></AkSwitch>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.AddModalReason}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkInput.TextArea
                            onChange={(v) => {
                                topThis.postRequest.Comment = v.currentTarget.value;
                            }} />
                    </AkCol>
                </AkRow>
            </AkModal>
            : null;
    }
    /**编辑委托*/
    renderEditModal() {
        let topThis = this;
        let itemInfo = topThis.itemInfo;
        let identity: AkIdentity = null;
        const { startValue, endValue, endOpen } = this.state;
        const { formatMessage } = AkGlobal.intl;
        if (itemInfo.DelegateID) {
            identity = {
                ID: itemInfo.DelegateID,
                Name: itemInfo.DelegateName,
                Type: AkIdentityType.User
            }
        } else {
            return null;
        }

        return topThis.state.visibleEdit
            ? <AkModal
                wrapClassName="aiib-adv-search-modal"
                width={AkConstants.minSM ? '' : 1200}
                visible={topThis.state.visibleEdit}
                maskClosable={false}
                title={formatMessage({ id: DelegatesPageLocale.EditModalPropsTitle })}
                onOk={() => {
                    topThis.saveEdit();
                }}
                onCancel={() => {
                    topThis.itemInfo = {};
                    topThis.putRequest = {};
                    topThis.setState({ visibleEdit: false, startValue: null, endValue: null });
                }}>
                <AkRow align="middle" justify="space-around" type="flex">
                    {/* <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalProcDef}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkLookupFlowName displayInput={false} defaultValue={topThis.putRequest.Keys} onChange={(id: string | string[], obj?: any | any[]) => {
                            this.putRequest.Keys=id as any[];
                            this.setState({selectedRowKeys:id as any[]});
                            // topThis.addValidateKey(id);
                        }}></AkLookupFlowName>
                        <FormattedMessage id={DelegatesPageLocale.AddModalProcDefExplain}></FormattedMessage>
                    </AkCol> */}
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalStartDay}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkDatePicker
                            style={{ width: '100%' }}
                            showToday={false}
                            placeholder={formatMessage({ id: DelegatesPageLocale.EditModalChooseStartDay })}
                            format="MM-DD-YYYY HH:mm"
                            showTime={{ hideDisabledOptions: true, format: 'MM-DD-YYYY HH:mm', defaultValue: topThis.defaultTime }}
                            defaultValue={topThis.putRequest.StartDate}
                            disabledDate={topThis.disabledStartDate}
                            disabledTime={(curr) => { return { disabledMinutes: () => this.disableTimes } }}
                            onChange={topThis.onStartChange}></AkDatePicker>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalEndDay}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkDatePicker
                            style={{ width: '100%' }}
                            showToday={false}
                            placeholder={formatMessage({ id: DelegatesPageLocale.EditModalChooseEndDay })}
                            showTime={{ hideDisabledOptions: true, format: 'MM-DD-YYYY HH:mm', defaultValue: topThis.defaultTime }}
                            format="MM-DD-YYYY HH:mm"
                            defaultValue={topThis.putRequest.EndDate}
                            disabledDate={topThis.disabledEndDate}
                            // disabledTime={(curr) => topThis.disabledDateTime(startValue, endValue)}
                            onChange={topThis.onEndChange}
                            open={endOpen}
                            onOpenChange={topThis.handleEndOpenChange}></AkDatePicker>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalDelegate}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkIdentityPicker
                            multiple={false}
                            defaultValue={identity}
                            onChange={(v) => {
                                let value = v as AkIdentity;
                                this.setState({ delegateInfo: value });
                                topThis.putRequest.DelegateID = v ? (v as AkIdentity).ID : "";
                            }} />
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalEnable}></FormattedMessage>
                        {/* <span className="ant-form-item-required"></span> */}
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkSwitch
                            checkedChildren={'ON'}
                            unCheckedChildren={'OFF'}
                            defaultChecked={topThis.putRequest.Status}
                            onChange={(checked: boolean) => {
                                topThis.putRequest.Status = checked;
                            }}></AkSwitch>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalReason}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkInput.TextArea
                            defaultValue={topThis.putRequest.Comment}
                            onChange={(v) => {
                                topThis.putRequest.Comment = v.currentTarget.value;
                            }} />
                    </AkCol>
                </AkRow>
            </AkModal>
            : null;
    }
    /**批量 编辑委托*/
    renderBatchEditModal() {
        let topThis = this;
        let itemInfo = topThis.itemInfo;
        let identity: AkIdentity = null;
        const { startValue, endValue, endOpen, selectedRowKeys, selectedRows } = topThis.state;
        const { formatMessage } = AkGlobal.intl;
        topThis.putRequest.Keys = selectedRowKeys.length > 0 ? selectedRowKeys : topThis.putRequest.Keys;

        return topThis.state.visibleBatchEdit
            ? <AkModal
                visible={topThis.state.visibleBatchEdit}
                maskClosable={false}
                title={formatMessage({ id: DelegatesPageLocale.EditModalPropsTitle })}
                onOk={() => { topThis.saveEdit(); }}
                onCancel={() => {
                    topThis.itemInfo = {};
                    topThis.putRequest = {};
                    topThis.setState({ visibleBatchEdit: false, });
                }}>
                <AkRow align="middle" justify="space-around" type="flex">
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalProcDef}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkLookupFlowName displayInput={false} defaultValue={selectedRowKeys} onChange={(id: string | string[], obj?: any | any[]) => {
                            this.putRequest.Keys = id as any[];
                            this.setState({ selectedRowKeys: id as any[] });
                            // topThis.addValidateKey(id);
                        }}></AkLookupFlowName>
                        <FormattedMessage id={DelegatesPageLocale.AddModalProcDefExplain}></FormattedMessage>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalStartDay}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkDatePicker
                            style={{ width: '100%' }}
                            showToday={false}
                            placeholder={formatMessage({ id: DelegatesPageLocale.EditModalChooseStartDay })}
                            format="MM-DD-YYYY HH:mm"
                            showTime={{ hideDisabledOptions: true, format: 'MM-DD-YYYY HH:mm', defaultValue: topThis.defaultTime }}
                            disabledDate={topThis.disabledStartDate}
                            disabledTime={(curr) => { return { disabledMinutes: () => this.disableTimes } }}
                            onChange={topThis.onStartChange}></AkDatePicker>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalEndDay}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkDatePicker
                            style={{ width: '100%' }}
                            showToday={false}
                            placeholder={formatMessage({ id: DelegatesPageLocale.EditModalChooseEndDay })}
                            showTime={{ hideDisabledOptions: true, format: 'MM-DD-YYYY HH:mm', defaultValue: topThis.defaultTime }}
                            format="MM-DD-YYYY HH:mm"
                            disabledDate={topThis.disabledEndDate}
                            // disabledTime={(curr) => topThis.disabledDateTime(startValue, endValue)}
                            onChange={topThis.onEndChange}
                            open={endOpen}
                            onOpenChange={topThis.handleEndOpenChange}></AkDatePicker>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalDelegate}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkIdentityPicker
                            multiple={false}
                            onChange={(v) => {
                                topThis.putRequest.DelegateID = v ? (v as AkIdentity).ID : "";
                            }} />
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalEnable}></FormattedMessage>
                        {/* <span className="ant-form-item-required"></span> */}
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkSwitch
                            checkedChildren={'ON'}
                            unCheckedChildren={'OFF'}
                            defaultChecked={false}
                            onChange={(checked: boolean) => {
                                topThis.putRequest.Status = checked;
                            }}></AkSwitch>
                    </AkCol>
                    <AkCol span={5} className="mb20">
                        <FormattedMessage id={DelegatesPageLocale.EditModalReason}></FormattedMessage>
                        <span className="ant-form-item-required"></span>
                    </AkCol>
                    <AkCol span={19} className="mb20">
                        <AkInput.TextArea
                            onChange={(v) => {
                                topThis.putRequest.Comment = v.currentTarget.value;
                            }} />
                    </AkCol>
                </AkRow>
            </AkModal>
            : null;
    }
    renderSearch() {
        let topThis = this;
        const { batchVisible, selectedRowKeys } = topThis.state;
        const { formatMessage } = AkGlobal.intl;
        let search = <AkRow type="flex" align="middle" justify="end">
            <AkCol>
                <a
                    href="javascript:;"
                    className="ak-basebtn-text"
                    onClick={() => {
                        topThis.setState({ batchVisible: true });
                    }}>
                    <AkIcon type="check-circle-o"></AkIcon>
                    {formatMessage({ id: DelegatesPageLocale.OperationBatch })}
                </a>
            </AkCol>
            <AkCol>
                <a
                    href="javascript:;"
                    className="ak-basebtn-text"
                    onClick={() => {
                        topThis.itemInfo = {};
                        topThis.putRequest = {};
                        topThis.existKeys = [];
                        // topThis.loadProcModal();
                        this.postRequest.Status = false;
                        topThis.setState({ visibleAdd: true, startValue: null, endValue: null });
                    }}>
                    <AkIcon type="plus"></AkIcon>
                    {formatMessage({ id: DelegatesPageLocale.OperationAdd })}
                </a>
            </AkCol>
        </AkRow>;

        if (batchVisible) {
            search = <AkRow type="flex" align="middle" justify="end">
                <AkCol>
                    <AkButton icon="edit"
                        disabled={selectedRowKeys.length === 0} onClick={() => {
                            topThis.putRequest = { Keys: topThis.putRequest.Keys };
                            topThis.setState({ visibleBatchEdit: true, startValue: null, endValue: null });
                        }}
                        className={selectedRowKeys.length > 0 ? "ak-delete-enablebtn" : "ak-delete-disablebtn"}>
                        {formatMessage({ id: CommonLocale.Edit })}
                    </AkButton>
                </AkCol>
                <AkCol>
                    <AkButton icon="delete" disabled={selectedRowKeys.length === 0} onClick={() => topThis.batchDelData()}
                        className={selectedRowKeys.length > 0 ? "ak-delete-enablebtn" : "ak-delete-disablebtn"}>
                        {formatMessage({ id: CommonLocale.Delete })}
                    </AkButton>
                </AkCol>
                <AkCol>
                    <AkButton icon="close" className="ak-delete-enablebtn" onClick={() => {
                        topThis.setState({ batchVisible: false, selectedRowKeys: [], selectedRows: [] });
                    }}>{formatMessage({ id: CommonLocale.Cancel })}</AkButton>
                </AkCol>
            </AkRow>;
        }
        return search;
    }
    renderTitle() {
        return <div>
            <span>Workflow Center</span> / <span>Authorise Additional Access</span>
        </div>
    }
    renderButton() {
        const {delegateData,isReadOnly} = this.state;
        return <div className='ak-tab-actions' style={{ textAlign: 'right',overflow:"hidden" }}>
            <span className="aiib-delegate-tip">Managers may authorise their assistant to have the same rights on the IPM Workflow system as they themselves have.</span>
            {isReadOnly || (delegateData && delegateData.length) > 0 ? null : <AkButton className='aiib-button dark' icon='plus' onClick={() => {
                this.itemInfo = {};
                this.putRequest = {};
                this.existKeys = [];
                this.postRequest.Status = false;
                this.setState({ visibleAdd: true, startValue: null, endValue: null });
            }}>Add Alternate</AkButton>}
        </div>;
    }
    render() {
        let topThis = this;
        const { formatMessage } = AkGlobal.intl;
        const { batchVisible, selectedRowKeys } = topThis.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return <MainContent Header={this.renderTitle()}>
            <div className="aiib-content">
                {this.renderButton()}
                <DelegateTable
                    pagination={false}
                    rowKey="ProcdefKey"
                    columns={this.columns}
                    loading={this.state.loading}
                    rowSelection={batchVisible ? rowSelection : null}
                    dataSource={this.state.delegateData} />
            </div>
            {topThis.renderAddModal()}
            {topThis.renderEditModal()}
            {/* {topThis.renderBatchEditModal()} */}
        </MainContent>
    }
}
class DelegatesPageStyle { }

export default injectIntl(withRouter(DelegatesPage))
