import * as React from 'react';
import { AkModal, AkRow, AkButton, RouterProps, ContentListAddDatasRequest, ContentListApi, ContentListEditBatchRequest } from 'akmii-yeeoffice-common';
import { withRouter } from 'react-router';
import { ProjectContentList } from '../../api/aiibworkflow/content-list';
import { AiibProjectResponse, AiibCommonFun } from './index';
import { AIIBLocale } from '../../locales/localeid';
export interface AiibContrastModalProps extends RouterProps {
    activeKey?: string;
    values: any;
    listData?: any;
    onSaveClick?: () => void;
    onNotSaveClick?: () => void;
    onCancelClick?: () => void;
    onCloseSaveClick?: () => void;
    listDataID?: string;
    visible?: boolean;
    isClose?: boolean;
    loading?: boolean;
}

export interface AiibContrastModalStates {
    loading?: boolean;
}

@withRouter
export class AiibContrastModal extends React.Component<AiibContrastModalProps, AiibContrastModalStates>{
    CONTACT_TEMP = 'Contact_';
    SPONSOR_TEMP = 'Sponsor_';
    BORROWER_TEMP = 'Borrower_';
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: props.loading ? props.loading : false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("loading" in nextProps && nextProps.loading !== this.props.loading) {
            this.setState({ loading: nextProps.loading });
        }
    }

    onSaveHandle() {
        const { activeKey } = this.props;
        if (activeKey === "contacts") {
            this.onSaveContactList();
        } else {
            this.beforeProjectSave();
        }

    }

    beforeProjectSave() {
        const { values } = this.props;
        if (this.props.activeKey === "members") {
            let approvers = [];
            for (const key in values) {
                if (key !== "ProjectLeader" && values[key]) {
                    if (Array.isArray(values[key])) {
                        values[key].forEach(i => {
                            if (approvers.indexOf(i) === -1)
                                approvers.push(i);
                        });
                    } else if (approvers.indexOf(values[key]) === -1) {
                        approvers.push(values[key]);
                    }
                }
            }
            values.Approvers = approvers;
            const variables = AiibCommonFun.setValuesStringfy(values);
            this.onSaveProjectList(variables);
        } else if (values.ProjectName) {
            let Approvers = [];
            if (values.ManagerIO) {
                Approvers = [values.ManagerIO];
            }
            if (values.DGIO && Approvers.indexOf(values.DGIO) === -1 && values.ManagerIO !== values.DGIO) {
                Approvers = [values.ManagerIO, values.DGIO];
            }
            values.Approvers = Approvers;
            const variables = AiibCommonFun.setValuesStringfy(values);
            this.onSaveProjectList(variables);
        } else {
            AiibProjectResponse.errorStringTip("Please fill in the Project Name field!");
        }
    }

    onSaveProjectList(values) {
        const { listData, listDataID } = this.props;
        this.setState({ loading: true });
        let request = {
            Title: "Project",
            ListDataID: listDataID,
            RowVersion: listData.RowVersion,
            Dic: {
                ...values
            }
        };
        ProjectContentList.editContentList(request).then(data => {
            if (data.Status === 0) {
                AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                this.setState({ loading: false });
                this.props.onSaveClick();
            } else if (data.Status === 101) {
                AiibProjectResponse.errorStringTip(data.Message);
                this.setState({ loading: false });
            } else {
                AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
                this.setState({ loading: false });
            }
        });
    }

    onSaveContactList() {
        const { listData } = this.props;
        this.setState({ loading: true });
        if (listData.length === 0) {
            const saveRequest: ContentListAddDatasRequest = {
                Title: "Contact",
                DicList: this.setValues(),
            };
            ContentListApi.AddBatchDataByTitle(saveRequest).then(d => {
                if (d.Status === 0) {
                    this.setState({ loading: false });
                    AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                    this.props.onSaveClick();
                } else {
                    this.setState({ loading: false });
                    AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
                }
            });
        } else {
            const items = this.setValues();
            const saveRequest: ContentListEditBatchRequest = {
                Title: "Contact",
                ParList: items.map(i => {
                    return {
                        ListDataID: listData.find(j => j.Code === i.Code).ListDataID,
                        Dic: i
                    };
                })
            };
            ContentListApi.EditBatchByTitle(saveRequest).then(d => {
                if (d.Status === 0) {
                    this.setState({ loading: false });
                    AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                    this.props.onSaveClick();
                } else {
                    this.setState({ loading: false });
                    AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
                }
            });
        }

    }

    setValues() {
        let datas: any[] = [];
        const { listDataID, values } = this.props;
        let Contact = { ProjectListDataID: listDataID, Code: 'Contact' };
        let Sponsor = { ProjectListDataID: listDataID, Code: 'Sponsor' };
        let Borrower = { ProjectListDataID: listDataID, Code: 'Borrower' };
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                if (key.startsWith(this.CONTACT_TEMP)) {
                    Contact[key.replace(this.CONTACT_TEMP, '')] = values[key];
                }
                if (key.startsWith(this.SPONSOR_TEMP)) {
                    Sponsor[key.replace(this.SPONSOR_TEMP, '')] = values[key];
                }
                if (key.startsWith(this.BORROWER_TEMP)) {
                    Borrower[key.replace(this.BORROWER_TEMP, '')] = values[key];
                }
            }
        }
        datas = [Contact, Sponsor, Borrower];
        return datas;
    }

    renderTabChangeModalFooter() {
        const { state: { loading }, props: { } } = this;
        return <AkRow>
            <AkButton loading={loading} type="primary" icon="check-circle-o" size="large" className="btn-footer btn-search"
                onClick={() => {
                    if (this.props.isClose) {
                        this.props.onCloseSaveClick();
                    } else {
                        this.onSaveHandle();
                    }

                }}>Save</AkButton>
            <AkButton type="primary" icon="retweet" size="large" className="btn-footer btn-search"
                onClick={() => {
                    this.props.onNotSaveClick();
                }}>Don't Save</AkButton>
            <AkButton type="primary" icon="close-circle-o" size="large" className="btn-footer btn-cancel"
                onClick={() => {
                    this.props.onCancelClick();
                }}>Cancel</AkButton>
        </AkRow>;
    }

    render() {
        return <AkModal
            visible={true}
            wrapClassName="aiib-adv-search-modal"
            title="Confirm"
            okText="Ok"
            footer={this.renderTabChangeModalFooter()}
            onCancel={() => {
                this.props.onCancelClick();
            }}>


            <div>{
                this.props.isClose ? "Please confirm that it has been saved?" : "Switching may result in data loss, please confirm that it has been saved?"
            }</div>
        </AkModal >;
    }



}
