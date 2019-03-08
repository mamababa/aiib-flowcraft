import * as React from "react";
import { Component } from "react";
import { ContentListWhereModel, AkButton } from 'akmii-yeeoffice-common';
import { AiibContentListDefs } from '../../api/aiibworkflow/aiib-content-list';
import AiibAdvancedModal, { SearchType } from './aiib-advanced-modal';
import { AiibCommonFun } from "./index";

interface AiibAdvancedSearchProps {
    value?: ContentListWhereModel[];
    onChange?: (value?: ContentListWhereModel[]) => void;
    type: SearchType;
}
interface AiibAdvancedSearchStatus {
    showModal?: boolean;
    listDefs: AiibContentListDefs[];
    loading?: boolean;
}

export default class AiibAdvancedSearch extends Component<AiibAdvancedSearchProps, AiibAdvancedSearchStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            listDefs: AiibCommonFun.getlocalStorageListDefsData(),
        }
    }


    onShowModel(e) {
        this.setState({
            showModal: true
        });
        e.target.blur();
        e.preventDefault();
    }
    onCloseModal() {
        this.setState({
            showModal: false
        });
    }
    onChange(value) {
        this.props.onChange && this.props.onChange(value);
    }

    render() {
        const { showModal, listDefs } = this.state;
        if (!listDefs) return null;
        return <div style={{display:'inline-block'}}> <AkButton
            className='aiib-button dark'
            icon='search'
            onClick={this.onShowModel.bind(this)}>
            Advanced Search
    </AkButton>
            {
                showModal
                    ?
                    <AiibAdvancedModal
                        onCloseModal={this.onCloseModal.bind(this)}
                        listDefs={listDefs}
                        onChange={this.onChange.bind(this)}
                        type={this.props.type}
                        value={this.props.value}
                    />
                    :
                    null
            }

        </div>;
    }
}
