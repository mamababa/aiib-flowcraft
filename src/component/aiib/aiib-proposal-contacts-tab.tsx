
import * as React from 'react';
import {
    AkRow,
    AkCol,
    AkButton,
    AkFormComponentProps,
    AkForm,
    ContentListApi,
    ContentListAddDatasRequest,
    ContentListEditBatchRequest,
    AkSpin,
    AkModal, RouterProps
} from 'akmii-yeeoffice-common';
import { AiibPromissionControl, AiibProposalContactsRow, AiibContrastModal } from './index';
import { withRouter } from 'react-router';
import { PathConfig } from '../../config/pathconfig';
import { PrintPageType } from './print/aiib-print-util';
import { AiibProjectResponse } from './common/aiib-response-tip';
import { AIIBLocale } from '../../locales/localeid';
import { isNullOrUndefined } from 'util';

interface AiibProposalContactsProps extends AkFormComponentProps, RouterProps {
    disable?: boolean;
    listData?: any;
    loadData?: () => void;
    contactsData?: any[];
    isReadOnly?:boolean;
}
interface AiibProposalContactsState {
    contactsData?: any[];
    modalValues?: any;
    loading?: boolean;
    showChangeTabModal?: boolean;
    isClose?: boolean;
}
interface AiibProposalContactsContext {
    disabled?: boolean;
}
@AkForm.create()
@withRouter
export class AiibProposalContacts extends React.Component<AiibProposalContactsProps, AiibProposalContactsState>{
    Title = 'Contact';
    CONTACT_TEMP = 'Contact_';
    SPONSOR_TEMP = 'Sponsor_';
    BORROWER_TEMP = 'Borrower_';
    constructor(props, context) {
        super(props, context);
        this.state = {
            contactsData: props.contactsData,
            loading: false,
            showChangeTabModal: false,
            isClose: false
        };
    }
    static contextTypes = {
        disabled: React.PropTypes.bool.isRequired,
        onOpenPrint: React.PropTypes.func,
    }
    componentDidMount() {
        this.getValues();
    }

    componentWillReceiveProps(nextProps) {
        if ("contactsData" in nextProps && JSON.stringify(nextProps.contactsData) !== JSON.stringify(this.props.contactsData)) {
            this.setState({ contactsData: nextProps.contactsData }, () => {
                this.getValues();
            });
        }
    }

    onSave() {
        const { contactsData } = this.state;
        this.setState({ loading: true });
        if (contactsData.length === 0) {
            const saveRequest: ContentListAddDatasRequest = {
                Title: this.Title,
                DicList: this.setValues(),
            };
            ContentListApi.AddBatchDataByTitle(saveRequest).then(d => {
                if (d.Status === 0) {

                    this.props.loadData();
                    AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                    this.setState({ loading: false });
                    if (this.state.isClose) {
                        this.afterSave();
                    }
                } else {
                    AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
                    this.setState({ loading: false });
                }
            });
        } else {
            const items = this.setValues();
            const saveRequest: ContentListEditBatchRequest = {
                Title: this.Title,
                ParList: items.map(i => {
                    return {
                        ListDataID: contactsData.find(j => j.Code === i.Code).ListDataID,
                        Dic: i
                    };
                })
            };
            ContentListApi.EditBatchByTitle(saveRequest).then(d => {
                if (d.Status === 0) {
                    this.props.loadData();
                    AiibProjectResponse.successTip(AIIBLocale.SaveSuccess);
                    this.setState({ loading: false });
                    if (this.state.isClose) {
                        this.afterSave();
                    }
                } else {
                    this.setState({ loading: false });
                    AiibProjectResponse.errorTip(AIIBLocale.SaveFail);
                }
            });
        }

    }

    setValues() {
        let datas: any[] = [];
        const values = this.props.form.getFieldsValue();
        const { ListDataID } = this.props.listData;
        let Contact = { ProjectListDataID: ListDataID, Code: 'Contact' };
        let Sponsor = { ProjectListDataID: ListDataID, Code: 'Sponsor' };
        let Borrower = { ProjectListDataID: ListDataID, Code: 'Borrower' };
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

    getValues() {
        const { contactsData } = this.state;
        let obj = {};
        contactsData.forEach(i => {
            for (const key in i) {
                if (i.hasOwnProperty(key)) {
                    obj[`${i.Code}_${key}`] = i[key];
                }
            }
        });
        this.props.form.setFieldsValue(obj);
        this.props.form.validateFields(null, { force: true }, null);
    }

    onContrastValues(values, allData) {
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                if (Object.keys(allData).length > 0) {
                    if (JSON.stringify(values[key]) !== JSON.stringify(allData[key])) {
                        return true;
                    }
                } else if (values[key]) {
                    return true;
                }

            }
        }
        return false;
    }

    onCloseHandle() {
        const { contactsData } = this.state;
        const values = this.props.form.getFieldsValue();
        let isChange: boolean = false;

        let obj = {};
        contactsData.forEach(i => {
            for (const key in i) {
                if (i.hasOwnProperty(key)) {
                    obj[`${i.Code}_${key}`] = i[key];
                }
            }
        });

        isChange = this.onContrastValues(values, obj);
        if (isChange) {
            this.setState({ showChangeTabModal: true, modalValues: values, isClose: true });
        } else {
            this.props.router.replace({
                pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
            });
        }
    }

    afterSave() {
        this.setState({ showChangeTabModal: false }, () => {
            this.props.router.replace({
                pathname: this.props.location.query['backUrl'] || PathConfig.NewProposal
            });
        });
    }

    render() {
        const { showChangeTabModal, modalValues } = this.state;
        const listid = this.props.listData.ListID;
        const url = window.location.hash.replace(`#${PathConfig.ProposalPage}`, `#${PathConfig.AiibPrint}`) + '&listid=' + listid + '&type=contactspage';
        return <div className='aiib-tab-contacts ak-tab-actions'>
        {
            this.props.isReadOnly ? null :
       <AkRow>
                <AkCol style={{ textAlign: 'right' }}>
                    {
                        AiibPromissionControl.hasProposalElements('save', null,
                            <AkButton onClick={this.onSave.bind(this)} icon='save' className='aiib-button green'>Save</AkButton>,
                            this.context)
                    }
                    <AkButton icon="close-circle-o" onClick={() => {
                        this.onCloseHandle();
                    }} className='aiib-button grey'>Close</AkButton>
                    <AkButton
                        icon='printer'
                        style={{ marginRight: 10 }}
                        className='aiib-button dark'
                        onClick={() => this.context.onOpenPrint(PrintPageType.contactspage)}
                    >Print Contacts</AkButton>
                    {/* </a> */}
                </AkCol>
            </AkRow>
        }
            
            <AkForm>
                <AkSpin spinning={this.state.loading}>
                    <AkRow>
                        <AiibProposalContactsRow
                            type='Contact'
                            {...this.props} />
                    </AkRow>
                    <AkRow>
                        <AiibProposalContactsRow
                            type='Sponsor'
                            {...this.props} />
                    </AkRow>
                    <AkRow>
                        <AiibProposalContactsRow
                            type='Borrower'
                            {...this.props} />
                    </AkRow>
                </AkSpin>
            </AkForm>

            {
                showChangeTabModal ?
                    <AiibContrastModal
                        loading={this.state.loading}
                        values={this.state.modalValues}
                        listData={this.state.contactsData}
                        listDataID={this.props.listData.ListDataID}
                        isClose={this.state.isClose}
                        onCloseSaveClick={() => {
                            this.onSave();
                        }}
                        onNotSaveClick={() => {
                            this.afterSave();
                        }}
                        onCancelClick={() => {
                            this.setState({ showChangeTabModal: false, isClose: false });
                        }}
                    />
                    : null
            }
        </div>;
    }

}
