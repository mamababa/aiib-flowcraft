import * as React from 'react';
import { AkInput, AkSearch } from 'akmii-yeeoffice-common';
interface DocumentSearchProps {
    onSearch?: (value?: string) => void;
    searchKeyword?: string;
}
interface DocumentSearchStates {
    value?: string;
}
export default class DocumentSearch extends React.Component<DocumentSearchProps, DocumentSearchStates>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.searchKeyword
        }
    }
    componentWillReceiveProps(nextProps: DocumentSearchProps) {
        if ('searchKeyword' in nextProps && nextProps.searchKeyword !== this.props.searchKeyword) {
            this.setState({ value: nextProps.searchKeyword });
        }
    }
    onChange(e) {
        const { value } = e.target;
        if (value !== this.state.value) {
            this.setState({ value });
        }
    }
    render() {
        return <AkSearch
            placeholder="Input search text"
            onSearch={value => this.props.onSearch(value)}
            onChange={this.onChange.bind(this)}
            value={this.state.value} />;
    }
}