import * as React from 'react';
import { Component } from 'react';
import { AkSelect } from 'akmii-yeeoffice-common';
const Option = AkSelect.Option;
interface AiibAdvancedFormSelectProps {
	data?: string[];
	value?: string;
	onChange?: (value?: string) => void;
	filterValue?: string[];
}
interface AiibAdvancedFormSelectStatus {}
export default class AiibAdvancedFormSelect extends Component<
	AiibAdvancedFormSelectProps,
	AiibAdvancedFormSelectStatus
> {
	constructor(props, context) {
		super(props, context);
	}
	getFilter(newData: string[]) {
		const { filterValue } = this.props;
		if (filterValue) {
			for (let i = 0; i < filterValue.length; i++) {
				let value = filterValue[i];
				let index = newData.findIndex((i) => i === value);
				if (index !== -1) {
					newData.splice(index, 1);
				}
			}
		}
		return newData;
	}
	render() {
		const { data, onChange, value } = this.props;
		let newData: string[] = [ ...data ];
		if (newData) {
			newData.unshift('All');
		}
		const options = this.getFilter(newData).map((i) => {
			return (
				<Option key={i} value={i}>
					{i}
				</Option>
			);
		});
		return (
			<AkSelect
				defaultValue={newData[0]}
				value={value || newData[0]}
				onChange={(value: string) => onChange && onChange(value)}
			>
				{options}
			</AkSelect>
		);
	}
}
