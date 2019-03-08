import * as React from "react";
import { AkDateLabel } from 'akmii-yeeoffice-common';
import * as moment from 'moment';
export const AiibFormatDate = (value: string, format?: string) => {
    return <AkDateLabel value={value} format={format ? format : "MM-DD-YYYY"} />;
};
export const AiibGeneralFormatDate = (value: string, format?: string) => {
    return moment(value).format(format);
};
