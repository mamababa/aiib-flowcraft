import * as React from "react";
import { ContentListApi, AkNotification, CustonDataGetTitleRequest, AkLayout, AkTable } from 'akmii-yeeoffice-common';
import { ContentListCraftStates } from 'akmii-yeeoffice-crafts';
import { connect } from 'react-redux';
import { AkRow, AkCol, ContentListWhereType } from 'akmii-yeeoffice-common/lib';
import { AIIBGeneralSearch, AiibProjectImport } from "../aiib/index";
interface MetaDataRatingsProps {
}
interface MetaDataRatingsStatus {
    listData?: any[];
    totalCount?: number;
    loading?: boolean;
    listCraft?: ContentListCraftStates;
    inputSearch?: string;
}

@connect(state => ({ listCraft: state.listCraft, isAppAdmin: state.admin.isAppAdmin }))
export default class MetaDataRatings extends React.Component<MetaDataRatingsProps, MetaDataRatingsStatus>{
    title: string;
    columns: any[];
    pageSize?: number;
    pageIndex?: number;
    listID?: string;
    constructor(props, context) {
        super(props, context);
        this.title = "Ratings";
        this.pageSize = 15;
        this.pageIndex = 1;
        this.state = {
            inputSearch: ''
        };
        this.columns = [{
            title: "Country Name",
            key: "Country",
            dataIndex: "Country",
            width: "50%"
        }, {
            title: "Region",
            key: "Region1",
            dataIndex: "Region2",
            width: "50%"
        }];
    }
    componentWillMount() {
        // this.loadListCraft();
        this.loadData();
    }

    // componentWillReceiveProps(nextProps) {
    //     if ("listCraft" in nextProps && nextProps.listCraft.listId !== this.state.listCraft.listId) {
    //         this.setState({ listCraft: nextProps.listCraft }, () => {
    //             this.loadData();
    //         });

    //     }
    // }
    // loadListCraft() {
    //     ContentListApi.GetListData({ Title: this.title }).then(data => {
    //         if (data.Status === 0) {
    //             this.listID = data.Data.ListID;
    //             AkGlobal.store.dispatch(TaskAction.listCraftRequest(data.Data.ListID, null));
    //         }
    //     });
    // }
    // columnTitle(listlayout) {
    //     if (!listlayout || !listlayout.layout) return;
    //     let fields = listlayout.layout.filter(i => i.Show);

    //     this.columns = [];
    //     fields.map((item, index) => {
    //         const def = this.props.listCraft.fields.find(i => i.FieldID === item.FieldID);
    //         if (!def) return;

    //         this.columns[item.Order - 1] = {
    //             title: def.DisplayName,
    //             key: def.InternalName,
    //             dataIndex: def.InternalName,
    //         }
    //     });
    // }
    loadData() {
        this.setState({ loading: true });
        const { inputSearch } = this.state;
        // const listFieldNames = this.props.listCraft.fields.map(i => i.InternalName);
        let where1 = [];
        if (inputSearch) {
            where1 = [{
                WhereName: "Country",
                Value: inputSearch,
                Type: ContentListWhereType.Eq,
                Pre: "and"
            }];
        }
        const request: CustonDataGetTitleRequest = {
            Title: this.title,
            Wheres: where1,
            Columns: ["Country", "Region2"],
            PageIndex: inputSearch ? 1 : this.pageIndex,
            PageSize: this.pageSize,
            FilterValue: "",
            Verification: false
        };
        let sorterparam = null;
        const params = Object.assign({}, request, sorterparam);
        ContentListApi.GetDataByTitle(params).then(data => {
            if (data.Status === 0) {
                this.setState({ listData: data.Data, totalCount: data.TotalCount, loading: false });
            } else {
                AkNotification.error({
                    message: "Tip",
                    description: "Get Error!"
                });
            }
        });
    }

    onSearch(val) {
        this.loadData();
    }
    render() {
        const { inputSearch } = this.state;
        return <AkLayout className="aiib-content">
            <AkLayout.Header className="ak-header ak-header-title">
                <div>
                    <span className="ak-header-title-sub1">Data Maintenance</span>
                    <span className="ak-header-title-line">/</span>
                    <span className="ak-header-title-sub2">Country Data</span>
                </div>
            </AkLayout.Header>
            <AkLayout.Content>
                <AkRow type="flex" align="middle" justify="space-between" className="ak-tab-actions">
                    <AkCol className="mr10">
                        <AIIBGeneralSearch
                            placeholder="Country Name"
                            value={inputSearch}
                            onChange={(value) => this.setState({ inputSearch: value })}
                            onSearch={(value) => {
                                this.onSearch(value);
                            }} />
                    </AkCol>
                    <AkCol>
                        <AiibProjectImport template="ratings" btnText={"Upload From Excel"} loadData={() => {
                            this.loadData();
                        }} />
                    </AkCol>
                </AkRow>;
                    <AkTable
                    rowKey="ListDataID"
                    columns={this.columns}
                    loading={this.state.loading}
                    pagination={{
                        total: this.state.totalCount,
                        pageSize: this.pageSize,
                        current: this.pageIndex,
                        onChange: (current) => {
                            this.pageIndex = current;
                            this.loadData();
                        }
                    }}
                    dataSource={this.state.listData} />
            </AkLayout.Content>
        </AkLayout>;
    }
}
