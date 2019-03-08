import * as React from "react";
import {Component} from "react";
import { IntlProps, AkTable, AkColumnProps, AkRow, AkButton, AkCol, AkUtil } from "akmii-yeeoffice-common";
import {withRouter} from "react-router";
import {injectIntl, FormattedMessage} from "react-intl";
import {MetaDataPageLocale} from "../locales/localeid";
import {ParameterManagerAPI} from "../api/parameter-manager";
import {MainContent} from "../page/components/maincontent";

class ParameterTable extends AkTable < Parameter > {}
interface ParameterColumn extends AkColumnProps < Parameter > {}

interface ParameterManagerProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface ParameterManagerStates {
    DataList?: Parameter[];
    loading?: boolean
}
/** 参数管理 */
class ParameterManager extends Component < ParameterManagerProps,
ParameterManagerStates > {
    columns : ParameterColumn[];

    searchRequest : GetParameterManagerListRequest;
    addRequest : AddParameterRequest;
    editRequest : EditParameterRequest;
    deleteRequest : DeleteParameterRequest;
    /** 消息格式化 */
    format = this.props.intl.formatMessage;

    constructor(props, context) {
        super(props, context);

        this.state = {
            DataList: []
        }
        this.columns = [
            {
                title: this.format({id: MetaDataPageLocale.ColumnCode}),
                key: MetaDataPageLocale.ColumnCode,
                dataIndex: "Encoded"
            }, {
                title: this.format({id: MetaDataPageLocale.ColumnMode}),
                key: MetaDataPageLocale.ColumnMode,
                dataIndex: "PayType"
            }, {
                title: this.format({id: MetaDataPageLocale.ColumnExt1}),
                key: MetaDataPageLocale.ColumnExt1,
                dataIndex: "Ext1"
            }, {
                title: this.format({id: MetaDataPageLocale.ColumnExt2}),
                key: MetaDataPageLocale.ColumnExt2,
                dataIndex: "Ext2"
            }, {
                title: this.format({id: MetaDataPageLocale.ColumnSort}),
                key: MetaDataPageLocale.ColumnSort,
                dataIndex: "Sort"
            }, {
                key: "children",
                dataIndex: "TaskID",
                render: (txt, recode) => {
                    return <AkRow>
                        <AkCol>
                            <AkButton type="primary">
                                <FormattedMessage id={MetaDataPageLocale.ColumnBtnEdit}></FormattedMessage>
                            </AkButton>
                            <AkButton type="ghost">
                                <FormattedMessage id={MetaDataPageLocale.ColumnBtnDelete}></FormattedMessage>
                            </AkButton>
                        </AkCol>
                    </AkRow>
                }
            }
        ]
        this.searchRequest = {
            pageIndex: "1",
            pageSize: "20"
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        this.loadData();
    }
    /**
     * 加载全部流程数据
     */
    loadData() {
        ParameterManagerAPI
            .getParameterManagerList(this.searchRequest)
            .then(data => {
                this.setState({loading: false, DataList: data.Data})
            })
    }

    /**头部右上角 Search 部分 */
    renderHeaderSearch() {
        return <AkButton icon="add">
            <FormattedMessage id={MetaDataPageLocale.PropsHeaderRightBtn}></FormattedMessage>
        </AkButton>
    }

    render() {
        let topThis = this;

        let leftHeader = <span style={ParameterManagerStyle.leftHeaderStyle}>
            <FormattedMessage id={MetaDataPageLocale.PropsHeaderTitle}></FormattedMessage>
        </span>;

        return <MainContent Header={leftHeader} Search={topThis.renderHeaderSearch()}>
            <ParameterTable
                rowKey="Encoded"
                loading={this.state.loading}
                pagination={{
                total: this.state.DataList.length,
                pageSize:20,
                current:Number(topThis.searchRequest.pageIndex),
                onChange: (current) => {
                    topThis.searchRequest.pageIndex = current + "";
                    this.loadData();
                    AkUtil.ScrollToTop();
                }
            }}
                columns={this.columns}
                dataSource={this.state.DataList}></ParameterTable>
        </MainContent>
    }
}
class ParameterManagerStyle {
    static leftHeaderStyle : React.CSSProperties = {
        fontSize: '18px',
        marginLeft: '20px'
    }
}

export default injectIntl(withRouter(ParameterManager))
