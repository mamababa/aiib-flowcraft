import * as React from 'react';
import { AkRow, AkCol, AkButton } from 'akmii-yeeoffice-common';

interface DocumentPaginationProps {
	pageIndex: number;
	totalCount: number;
	pageSize: number;
	onChange: (pageIndex: number) => void;
}
interface DocumentPaginationStatus {}

export class DocumentPagination extends React.Component<DocumentPaginationProps, DocumentPaginationStatus> {
	constructor(props, context) {
		super(props, context);
	}
	onChange(type: 'Previous' | 'Next') {
		const { pageIndex } = this.props;
		if (type === 'Previous') {
			this.props.onChange(pageIndex - 1);
		}
		if (type === 'Next') {
			this.props.onChange(pageIndex + 1);
		}
	}
	render() {
		const { pageIndex, totalCount, pageSize } = this.props;
		let count = 0;
		if(totalCount !== 0){
			count = Math.ceil(totalCount / pageSize);
		}
        const previousDisabled = pageIndex === 1 || count === 0;
        const nextDisabled = pageIndex === count || count === 0;
		return (
			<AkRow className="aiib-document-pagination">
				<AkCol style={{textAlign:'right'}}>
                    <AkButton 
                        disabled={previousDisabled} 
                        onClick={() => this.onChange('Previous')}
						className={`aiib-button ${previousDisabled?'disabled':'dark'}`}
						style={{marginRight:10}}
                    >
							&lt;
					</AkButton>
					{/* <span>{pageIndex}</span>
					<span>/</span>
					<span>{count}</span> */}
                    <AkButton 
                        disabled={nextDisabled} 
                        onClick={() => this.onChange('Next')}
                        className={`aiib-button ${nextDisabled?'disabled':'dark'}`}
                    >
							&gt;
					</AkButton>
				</AkCol>
			</AkRow>
		);
	}
}
