import * as React from "react";
import * as moment from 'moment';

export const convertDate = (date?: string, isShowDay?: boolean)=> {
    const mDate = moment(date);
    if (mDate.isValid()) {
        const year = mDate.year();
        const month = mDate.month() + 1;
        const day = mDate.date();
        let str = "";
        switch (month) {
            case 1:
                str = 'January';
                break;
            case 2:
                str = 'February';
                break;
            case 3:
                str = 'March';
                break;
            case 4:
                str = 'April';
                break;
            case 5:
                str = 'May';
                break;
            case 6:
                str = 'June';
                break;
            case 7:
                str = 'July';
                break;
            case 8:
                str = 'August';
                break;
            case 9:
                str = 'September';
                break;
            case 10:
                str = 'October';
                break;
            case 11:
                str = 'November';
                break;
            case 12:
                str = 'December';
                break;
        }
        return `${str} ${isShowDay ? day + ' , ' : ''}${year}`;
    }
    return '';
}
export enum PrintPageType{
    proposalpage,
    contactspage,
    proposalsheet,
    projectsheet
}