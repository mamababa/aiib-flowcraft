import * as React from "react";
import {
    AkGlobal,
    AkForm,
    AkFormComponentProps,
    AkModal,
    AkModalProps,
    AkTable,
    AkColumnProps,
    AkColumnLayout,
    AkRow,
    AkCol,
    AkTree,
    AkInput,
    AkNotification,
    AkDropDown,
    AkMenu,
    AkButton,
    AkIcon,
    CommonLocale,
    ComparisonOperator as op,
    FormHelper as helper,
    AkMessage,
} from "akmii-yeeoffice-common";
import MetaDataMain from './meta-data-main';
import { MetaDataPageLocale as locale, ProcDefStatusLocale, AIIBLocale } from '../../locales/localeid';
import { AdminMetadataAPI } from "../../api/aiib-metadata";
import MetaDataLayout from "./meta-data-layout";
import { ProcDefStatusEnum } from '../../api/procdefs';
import { ApplicationStatusColor } from "../../api/procinst";
import { MetaDataReport } from './mata-data-report';
import MetaDataRatings from "./meta-data-ratings";

class MetaDataTable extends AkTable<MetadataModel> { }
interface MetaDataColumn extends AkColumnProps<MetadataModel> { }
interface MetadataTreeNode extends MetadataModel {
    _children?: MetadataTreeNode[];
}

interface MetaDataPageState {
    isRight?: boolean;
    loading?: boolean;
    treeSubData?: MetadataTreeNode[];
    showCategoryModal?: boolean;
    showMetaModel?: boolean;
    isEdit?: boolean;
    selectedNode?: MetadataTreeNode;
    metaDataMenu?: MetadataTreeNode[];
    isRatings: boolean;
    isReport: boolean;
    sectorData: MetadataTreeNode;
    expandedKeys: string[];
}
class MetaDataPage extends React.Component<AkFormComponentProps, MetaDataPageState> {
    loading?: boolean;
    columns?: MetaDataColumn[];
    updatingNode?: MetadataTreeNode;

    constructor(props, context) {
        super(props, context);

        this.state = {
            treeSubData: [],
            metaDataMenu: [],
            isRatings: false,
            isReport: false,
            sectorData: undefined,
            expandedKeys: []
        };

        const { formatMessage } = AkGlobal.intl;

        this.columns = [
            {
                title: formatMessage({ id: locale.ColumnCode }),
                key: locale.ColumnCode,
                layout: AkColumnLayout.LeftTop,
                dataIndex: "Code",
                render: (text, record) => {
                    return <div style={{ color: record.Status === 1 ? "black" : "red" }}>{text}</div>
                }
            }, {
                title: formatMessage({ id: locale.ColumnName }),
                key: locale.ColumnName,
                layout: AkColumnLayout.LeftBottom,
                dataIndex: "Name",
                render: (text, record) => {
                    return <div style={{ color: record.Status === 1 ? "black" : "red" }}>{text}</div>
                }
            },
            // {
            //     title: formatMessage({ id: locale.ColumnExt1 }),
            //     key: locale.ColumnExt1,
            //     dataIndex: "Ext",
            //     render: (text, record) => {
            //         return <div style={{ color: record.Status === 1 ? "black" : "red" }}>{text}</div>
            //     }
            // },
            // {
            //     title: formatMessage({ id: locale.ColumnSort }),
            //     key: locale.ColumnSort,
            //     layout: AkColumnLayout.RightBottom,
            //     dataIndex: "Order",
            //     render: (text, record) => {
            //         return <div style={{ color: record.Status === 1 ? "black" : "red" }}>{text}</div>
            //     }
            // }, {
            //     title: formatMessage({ id: locale.MetaLeftModalDescription }),
            //     key: "Description",
            //     dataIndex: "Description",
            //     render: (text, record) => {
            //         return <div style={{ color: record.Status === 1 ? "black" : "red" }}>{text}</div>
            //     }
            // },
            {
                dataIndex: "",
                className: "ak_align_r",
                render: (text, record) => {
                    const isEnableNode = record.Status === 0;
                    const menuChild = <AkMenu className="ak-tree-ul">
                        <AkMenu.Item>
                            <a onClick={() => this.onEditNodeHandler(record)}>
                                <AkIcon type="edit"></AkIcon>
                                {AkGlobal.intl.formatMessage({ id: locale.PropsHeaderTitleEdit })}
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a onClick={() => this.onUpdateStatusHandler(record)}>
                                <AkIcon type={isEnableNode ? "check-circle" : "minus-circle"}></AkIcon>
                                {AkGlobal.intl.formatMessage({
                                    id: ProcDefStatusLocale + (isEnableNode ? ProcDefStatusEnum.Enable : ProcDefStatusEnum.Disbale)
                                })}
                            </a>
                        </AkMenu.Item>
                    </AkMenu>

                    return <AkDropDown trigger={['click']} overlay={menuChild}>
                        <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
                    </AkDropDown>
                }
            }
        ];
    }

    componentDidMount() {
        this.loadTree();
    }
    onReport() {
        this.setState({
            isReport: true,
            isRatings: false
        });
    }
    onRating() {
        this.setState({ isRatings: true, isReport: false });
    }

    loadTree() {
        this.loading = true;
        this.setState({ loading: true });

        AdminMetadataAPI.GetMetadataCategoryList({ status: -1 }).then(data => {
            this.loading = false;
            if (data.Status === 0) {
                let sectorData = null;
                if (this.state.sectorData) {
                    sectorData = data.Data.find(i => i.Code === this.state.sectorData.Code);
                } else {
                    sectorData = data.Data.find(i => i.Code === 'MemberRole');
                }
                this.setState({ loading: false, metaDataMenu: data.Data, sectorData, expandedKeys: [] });
                this.loadNode(sectorData);
                this.onSelectNodeHandler(sectorData);
            } else {
                this.setState({ loading: false });
            }
        });
    }

    loadNode(node: MetadataTreeNode) {
        return new Promise(resolve => {
            AdminMetadataAPI.getMetadataList({ status: -1, categoryID: node.CategoryID, parentID: node.ID }).then(data => {
                if (data.Data) {
                    this.setState({ treeSubData: data.Data });
                } else {
                    AkNotification.error({
                        message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                        description: AkGlobal.intl.formatMessage({ id: CommonLocale.GetInfoError })
                    });
                }
                resolve();
            });
        });
    }
    loadSubNode(node: MetadataTreeNode) {
        const { state: { treeSubData } } = this;
        return new Promise(resolve => {
            AdminMetadataAPI.getMetadataList({ status: -1, categoryID: node.CategoryID, parentID: node.ID }).then(data => {
                if (data.Data) {
                    node._children = data.Data;
                    this.setState({ treeSubData });
                } else {
                    AkNotification.error({
                        message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
                        description: AkGlobal.intl.formatMessage({ id: CommonLocale.GetInfoError })
                    });
                }
                resolve();
            });
        });
    }
    onChangeNode(node: MetadataTreeNode) {
        if (node) {
            this.setState({
                isReport: false,
                isRatings: false,
                sectorData: node
            }, () => {
                this.onSelectNodeHandler(node);
            });
        }
    }
    onSelectNodeHandler(node: MetadataTreeNode) {
        if (!node._children) {
            this.loading = true;
            this.loadNode(node).then(() => {
                this.loading = false;
                this.setState({ loading: false });
            });
        }
    }
    onSelectSubNodeHandler(node: MetadataTreeNode) {
        if (!node._children) {
            this.loading = true;
            this.setState({ selectedNode: node, loading: true });
            this.loadSubNode(node).then(() => {
                this.loading = false;
                this.setState({ selectedNode: node, loading: false });
            });
        } else {
            this.setState({ selectedNode: node });
        }
    }

    onAddSubHandler(node: MetadataTreeNode) {
        this.setState({ showMetaModel: true, isEdit: false });
        this.updatingNode = node;
        setTimeout(() => this.props.form.setFieldsValue({ Status: 1, CategoryID: node.CategoryID, ParentID: node.ID }));
    }

    onEditNodeHandler(node: MetadataTreeNode) {
        if (node.ParentID) {
            this.updatingNode = node;
            this.setState({ showMetaModel: true, isEdit: true });
            setTimeout(() => {
                const { CategoryID, Code, Name, Description, Status, ParentID, ID, Order } = node;
                this.props.form.setFieldsValue({ CategoryID, Code, Name, Description, Status, ParentID, ID, Order });
            });
        } else {
            this.setState({ showCategoryModal: true, isEdit: true });
            setTimeout(() => {
                const { CategoryID, Code, Name, Description, Status } = node;
                this.props.form.setFieldsValue({ CategoryID, Code, Name, Description, Status });
            });
        }
    }

    onUpdateStatusHandler(node: MetadataTreeNode) {
        const { formatMessage } = AkGlobal.intl;
        const { state: { treeSubData } } = this;
        const isEnable = node.Status === 1;

        AkModal.confirm({
            title: formatMessage({ id: locale.ModalTip }),
            content: formatMessage({ id: locale.TipUpdateStatus }, {
                name: node.Name,
                status: formatMessage({
                    id: ProcDefStatusLocale + (isEnable ?
                        ProcDefStatusEnum.Disbale : ProcDefStatusEnum.Enable)
                }).toLowerCase()
            }),
            onOk: () => {
                this.loading = true;
                this.setState({ loading: true });
                const action = node.ParentID ? AdminMetadataAPI.putMetadataStatus : AdminMetadataAPI.putMetadataCategoryStatus;
                action({ CategoryID: node.CategoryID, ID: node.ID, Status: node.Status === 0 }).then(data => {
                    this.loading = false;
                    if (data.Status === 0) {
                        node.Status = isEnable ? 0 : 1;
                        this.setState({ loading: false, treeSubData });
                        this.loadNode(node);
                        AkMessage.success(AkGlobal.intl.formatMessage({ id: isEnable ? CommonLocale.DisabledSuccess : CommonLocale.EnabledSuccess }))
                    } else {
                        this.setState({ loading: false });
                        AkNotification.error({
                            message: formatMessage({ id: CommonLocale.Tip }),
                            description: formatMessage({
                                id: isEnable ? CommonLocale.DisabledFail : CommonLocale.EnabledFail
                            })
                        });
                    }
                    this.loadTree();
                });
            }
        });
    }

    executeUpdateCategory() {
        if (this.loading) return;
        const { formatMessage } = AkGlobal.intl;
        const { state: { isEdit, treeSubData }, props: { form: { validateFieldsAndScroll } } } = this;

        validateFieldsAndScroll(null, {}, (errors, values) => {
            if (!errors) {
                this.loading = true;
                this.setState({ loading: true });
                const actions = isEdit ? AdminMetadataAPI.PutMetadataCategoryList : AdminMetadataAPI.PostMetadataCategoryList;
                actions(values).then(data => {
                    this.loading = false;
                    if (data.Status === 0) {
                        if (isEdit) {
                            let current = treeSubData.find(i => i.CategoryID === values.CategoryID);
                            current = Object.assign(current, values);
                        } else {
                            treeSubData.unshift(Object.assign(values, { ID: data.Data, CategoryID: data.Data }));
                        }

                        this.setState({ loading: false, showCategoryModal: false, treeSubData });
                        AkMessage.success(AkGlobal.intl.formatMessage({ id: isEdit ? CommonLocale.EditSuccess : CommonLocale.AddSuccess }))
                    } else {
                        let description = CommonLocale.AddFail;
                        if (data.Status === 500000) {
                            description = AIIBLocale.CodeUnique;
                        }

                        this.setState({ loading: false });
                        AkNotification.error({
                            message: formatMessage({ id: CommonLocale.Tip }),
                            description: formatMessage({
                                id: isEdit ? CommonLocale.EditFail : description
                            })
                        });
                    }
                });
            }
        });
    }

    executeUpdateMeta() {
        if (this.loading) return;
        const { formatMessage } = AkGlobal.intl;
        const { state: { isEdit, treeSubData }, props: { form: { validateFieldsAndScroll } }, updatingNode } = this;

        validateFieldsAndScroll(null, {}, (errors, values) => {
            if (!errors) {
                this.loading = true;
                this.setState({ loading: true });
                const actions = isEdit ? AdminMetadataAPI.putMetadataList : AdminMetadataAPI.postMetadataList;
                values.Code = values.Name;
                actions(values).then(data => {
                    this.loading = false;
                    if (data.Status === 0) {
                        if (isEdit) {
                            updatingNode.Code = values.Code;
                            updatingNode.Name = values.Name;
                            // updatingNode.Ext = values.Ext;
                            updatingNode.Order = values.Order || 0;
                            updatingNode.Description = values.Description;
                        } else {
                            updatingNode._children = updatingNode._children || [];
                            updatingNode._children.unshift(Object.assign(values, { ID: data.Data, Order: values.Order || 0 }));
                        }
                        this.setState({ loading: false, showMetaModel: false, treeSubData });
                        AkMessage.success(AkGlobal.intl.formatMessage({ id: isEdit ? CommonLocale.EditSuccess : CommonLocale.AddSuccess }))
                    } else {
                        this.setState({ loading: false });
                        let description = CommonLocale.AddFail;
                        if (data.Status === 500000) {
                            description = AIIBLocale.CodeUnique;
                        }
                        AkNotification.error({
                            message: formatMessage({ id: CommonLocale.Tip }),
                            description: formatMessage({
                                id: isEdit ? CommonLocale.EditFail : description
                            })
                        });
                    }
                    this.loadTree();
                });
            }
        });
    }

    renderTreeNodes(nodes: MetadataTreeNode[]) {
        return nodes.map(node => {
            const isEnableNode = node.Status === 0;
            const menuChild = <AkMenu className="ak-tree-ul">
                <AkMenu.Item>
                    <a onClick={() => this.onAddSubHandler(node)}>
                        <AkIcon type="plus"></AkIcon>
                        {AkGlobal.intl.formatMessage({ id: locale.PropsHeaderTitleAdd })}
                    </a>
                </AkMenu.Item>
                <AkMenu.Item>
                    <a onClick={() => this.onEditNodeHandler(node)}>
                        <AkIcon type="edit"></AkIcon>
                        {AkGlobal.intl.formatMessage({ id: locale.PropsHeaderTitleEdit })}
                    </a>
                </AkMenu.Item>
                <AkMenu.Item>
                    <a onClick={() => this.onUpdateStatusHandler(node)}>
                        <AkIcon type={isEnableNode ? "check-circle" : "minus-circle"}></AkIcon>
                        {AkGlobal.intl.formatMessage({
                            id: ProcDefStatusLocale + (isEnableNode ? ProcDefStatusEnum.Enable : ProcDefStatusEnum.Disbale)
                        })}
                    </a>
                </AkMenu.Item>
            </AkMenu>

            const childTitle = <AkRow justify="space-between" type="flex" align="middle">
                <AkCol span={22}>
                    <div className="text-overflow" title={node.Name}
                        onClick={() => this.setState({ isRight: true })}>
                        {!isEnableNode ? <span>{node.Name}</span> :
                            <span style={{ color: ApplicationStatusColor.Rejected }}>{node.Name}</span>}
                    </div>
                </AkCol>
                <AkCol span={2}>
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <AkDropDown trigger={['click']} overlay={menuChild}>
                            <AkIcon type="ellipsis-v" className="ak-ellipsis"></AkIcon>
                        </AkDropDown>
                    </div>
                </AkCol>
            </AkRow>

            return <AkTree.TreeNode isLeaf={!node.HasChild} title={childTitle} key={node.ID} data={node}>
                {node._children && node._children.length ? this.renderTreeNodes(node._children) : null}
            </AkTree.TreeNode>;
        });
    }

    renderAddCategory() {
        const { sectorData } = this.state;
        if (!sectorData) return;
        return <AkButton icon="plus" className={sectorData.Code === "Sector" ? "ak-header-button" : "aiib-button dark"} style={{
            marginRight: sectorData.Code === "Sector" ? 0 : 15
        }} onClick={() => {
            this.setState({ showMetaModel: true, isEdit: false });
            this.updatingNode = this.state.sectorData;
            this.updatingNode._children = this.state.treeSubData;
            setTimeout(() => this.props.form.setFieldsValue({ Status: 1, CategoryID: this.state.sectorData.CategoryID, ParentID: this.state.sectorData.CategoryID }));
        }}>
            {sectorData.Code === "Sector" ? "" : AkGlobal.intl.formatMessage({ id: locale.PropsHeaderRightBtn })}
        </AkButton>;
    }

    renderRightHeader() {
        return <AkRow>
            <AkCol className="ak-header-title">
                {this.state.selectedNode ? this.state.selectedNode.Name : null}
            </AkCol>
        </AkRow>;
    }

    renderAddMeta() {
        if (!this.state.selectedNode) return;
        return <AkButton icon="plus" className="aiib-button dark" style={{ marginRight: 15 }} onClick={() => this.onAddSubHandler(this.state.selectedNode)}>
            {AkGlobal.intl.formatMessage({ id: locale.PropsHeaderRightBtn })}
        </AkButton>;
    }

    renderCategoryModalFooter() {
        return <AkRow>
            <AkButton icon="check-circle-o" className="aiib-button dark"
                onClick={this.executeUpdateCategory.bind(this)}>Ok</AkButton>
            <AkButton icon="close-circle-o" className="btn-footer btn-cancel"
                onClick={() => this.setState({ showCategoryModal: false })}>Cancel</AkButton>
        </AkRow>;
    }

    renderCategoryModal() {
        const { formatMessage } = AkGlobal.intl;
        const { props, state: { showCategoryModal, isEdit, treeSubData, loading } } = this;
        if (!showCategoryModal) return;

        const modalProps: AkModalProps = {
            maskClosable: false,
            visible: showCategoryModal,
            title: formatMessage({ id: isEdit ? locale.PropsModalTitleEditCategory : locale.PropsModalTitleNewCategory }),
            confirmLoading: loading,
            wrapClassName: "aiib-adv-search-modal",
            onCancel: () => this.setState({ showCategoryModal: false }),
            footer: this.renderCategoryModalFooter()
            // onOk: () => this.executeUpdateCategory()
        };

        return <AkModal {...modalProps}>
            <AkForm className="ak-form">
                {props.form.getFieldDecorator("CategoryID", {})}
                {props.form.getFieldDecorator("Status", {})}
                {helper.renderFormItemInModal(props, locale.MetaLeftModalCode, "Code", <AkInput disabled={isEdit} />, true,
                    [helper.ruleForRequire(props, locale.MetaLeftModalCode),
                    helper.ruleForComparisonLength(props, locale.MetaLeftModalCode, op.LessOrEqualsThan, 50),
                    {
                        validator: (rule, value, callback) => {
                            if (isEdit) callback();
                            if (treeSubData.map(i => i.Code).indexOf(value) === -1) callback();
                            else callback(AkGlobal.intl.formatMessage({ id: locale.TipkeyExist }));
                        }
                    }])}
                {helper.renderFormItemInModal(props, locale.MetaLeftModalName, "Name", <AkInput maxLength={250} />, true,
                    [helper.ruleForComparisonLength(props, locale.MetaLeftModalName, op.LessOrEqualsThan, 200),
                    helper.ruleForRequire(props, locale.ColumnName)])}
                {helper.renderFormItemInModal(props, locale.MetaLeftModalDescription, "Description", <AkInput.TextArea />, false,
                    [helper.ruleForComparisonLength(props, locale.MetaLeftModalDescription, op.LessOrEqualsThan, 200)])}
            </AkForm>
        </AkModal>;
    }

    renderMetaModalFooter() {
        return <AkRow>
            <AkButton icon="check-circle-o" className="aiib-button dark"
                onClick={this.executeUpdateMeta.bind(this)}>Ok</AkButton>
            <AkButton icon="close-circle-o" className="btn-footer btn-cancel"
                onClick={() => this.setState({ showMetaModel: false })}>Cancel</AkButton>
        </AkRow>;
    }

    renderMetaModal() {
        const { formatMessage } = AkGlobal.intl;
        const { props, state: { showMetaModel, loading, isEdit, sectorData }, updatingNode } = this;
        if (!showMetaModel) return;

        const modalProps: AkModalProps = {
            maskClosable: false,
            visible: showMetaModel,
            title: formatMessage({ id: isEdit ? CommonLocale.Edit : CommonLocale.Add }),
            confirmLoading: loading,
            wrapClassName: "aiib-adv-search-modal",
            onCancel: () => this.setState({ showMetaModel: false }),
            footer: this.renderMetaModalFooter()
        };

        return <AkModal {...modalProps}>
            <AkForm className="ak-form">
                {props.form.getFieldDecorator("ID", {})}
                {props.form.getFieldDecorator("ParentID", {})}
                {props.form.getFieldDecorator("CategoryID", {})}
                {props.form.getFieldDecorator("Status", {})}
                {/* {helper.renderFormItemInModal(props, locale.ColumnCode, "Code", <AkInput disabled={isEdit} />, true,
                    [helper.ruleForRequire(props, locale.ColumnCode),
                    helper.ruleForComparisonLength(props, locale.ColumnCode, op.LessOrEqualsThan, 50),
                    {
                        validator: (rule, value, callback) => {
                            if (isEdit) callback();
                            if ((updatingNode._children || []).map(i => i.Code).indexOf(value) === -1) callback();
                            else callback(AkGlobal.intl.formatMessage({ id: locale.TipkeyExist }));
                        }
                    }])} */}
                {helper.renderFormItemInModal(props, locale.ColumnName, "Name", <AkInput maxLength={250} />, true,
                    [helper.ruleForComparisonLength(props, locale.ColumnName, op.LessOrEqualsThan, 200),
                    helper.ruleForRequire(props, locale.ColumnName)])}
                {/* {helper.renderFormItemInModal(props, locale.ColumnExt1, "Ext", <AkInput />, false)} */}
                {/* {helper.renderFormItemInModal(props, locale.ColumnSort, "Order", <AkInputNumber digit={0} min={0} />, false)}
                {helper.renderFormItemInModal(props, locale.MetaLeftModalDescription, "Description", <AkInput.TextArea />, false,
                    [helper.ruleForComparisonLength(props, locale.MetaLeftModalDescription, op.LessOrEqualsThan, 200)])} */}


            </AkForm>
        </AkModal>;
    }

    renderHeader() {
        const { sectorData } = this.state;
        if (!sectorData) return;
        return <div className="ak-header-title ak-header-sectortitle">
            <span className="ak-header-title-sub1">Data Maintenance</span>
            <span className="ak-header-title-line">/</span>
            <span className="ak-header-title-sub2">{sectorData.Name}</span>
        </div>;
    }

    render() {
        const { state: { isRight, isReport, isRatings, treeSubData, selectedNode, loading, metaDataMenu, sectorData }, columns } = this;

        return <div className="aiib-metadata">
            {/* <AkSpin spinning={loading}> */}
            <MetaDataMain
                metaDataMenu={metaDataMenu}
                onChangeNode={this.onChangeNode.bind(this)}
                onRatings={this.onRating.bind(this)}
                onReport={this.onReport.bind(this)}>
                {
                    isReport
                        ?
                        <MetaDataReport />
                        :
                        isRatings ? <MetaDataRatings /> :
                            <div>
                                {sectorData && sectorData.Code === "Sector" ? <AkRow>
                                    <AkCol lg={5} md={9} xs={isRight ? 0 : 24} className="ak-left-content">
                                        <MetaDataLayout header={this.renderHeader()} actions={this.renderAddCategory()}>
                                            <div style={{ minHeight: "calc(100vh - 130px)" }}>
                                                <AkTree loadData={n => this.loadSubNode(n.props.data)}
                                                    expandedKeys={this.state.expandedKeys}
                                                    onExpand={(expandedKeys) => this.setState({ expandedKeys })}
                                                    selectedKeys={selectedNode ? [selectedNode.ID] : []}
                                                    onSelect={(keys, e) => this.onSelectSubNodeHandler(e.node.props.data)}>
                                                    {this.renderTreeNodes(treeSubData)}
                                                </AkTree>
                                            </div>
                                        </MetaDataLayout>
                                    </AkCol>
                                    <AkCol lg={19} md={15} xs={isRight ? 24 : 0} className="ak-right-content">
                                        <MetaDataLayout titleBack={() => this.setState({ isRight: false })}
                                            header={this.renderRightHeader()} actions={this.renderAddMeta()}>
                                            <MetaDataTable rowKey="ID" loading={loading} columns={columns}
                                                dataSource={selectedNode && selectedNode._children ? selectedNode._children : []} />
                                        </MetaDataLayout>
                                    </AkCol>

                                </AkRow> : <MetaDataLayout titleBack={() => this.setState({ isRight: false })}
                                    header={this.renderHeader()} actions={this.renderAddCategory()}>
                                        <MetaDataTable rowKey="ID" loading={loading} columns={columns}
                                            dataSource={treeSubData} />
                                    </MetaDataLayout>}
                                {this.renderCategoryModal()}
                                {this.renderMetaModal()}
                            </div>
                }
            </MetaDataMain>
            {/* </AkSpin> */}
        </div>;
    }
}

export default AkForm.create()(MetaDataPage);
