import * as React from "react";
import AiibReportPage from '../report/report';

export interface MetaDataReportProps {

}

export interface MetaDataReportStatus {

}

export class MetaDataReport extends React.Component<MetaDataReportProps, MetaDataReportStatus>{
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return <AiibReportPage isMetadata={true} />;
    }

}
