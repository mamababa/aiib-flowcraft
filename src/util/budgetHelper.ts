import * as moment from 'moment';
import { AkGlobal, CommonLocale } from 'akmii-yeeoffice-common';
import { BudgetLocale } from '../locales/localeid';
export class BudgetHelper {
    static errorMessage(status: number, model?: any): string {
        let message: string = '';
        switch (status) {
            case 120001:
                message = BudgetLocale.BudgetErrorTemplateIsNotExist;
                break;
            case 120002:
                message = BudgetLocale.BudgetErrorNotEditable;
                break;
            case 120003:
                message = BudgetLocale.BudgetErrorDoesNotSupportRemoving;
                break;
            case 120004:
                message = BudgetLocale.BudgetErrorTemplateCodeIsExist;
                break;
            case 120005:
                message = BudgetLocale.BudgetErrorCanNotPublish;
                break;
            case 120006:
                message = BudgetLocale.BudgetErrorCanNotBeDisabled;
                break;
            case 120007:
                message = BudgetLocale.BudgetErrorCanNotBeDraft;
                break;
            case 120008:
                message = BudgetLocale.BudgetErrorAdjustAmountNotLessActual;
                break;
            case 120009:
                message = BudgetLocale.BudgetErrorBugetDetailIsNotExist;
                break;
            case 120010:
                message = BudgetLocale.BudgetErrorBudgetIsNotExist;
                break;
            case 120011:
                message = BudgetLocale.BudgetErrorAdjustTimeNotLessCurrent;
                break;
            case 120012:
                message = BudgetLocale.BudgetErrorCanNotBeAdjust;
                break;
            case 120013:
                message = BudgetLocale.BudgetErrorTemplateSubjectIsNotNull;
                break;
            case 120014:
                message = BudgetLocale.BudgetErrorSubjectRepeat;
                break;
            case 120015:
                message = BudgetLocale.BudgetErrorCanNotBeRemove;
                break;
            case 120016:
                message = BudgetLocale.BudgetErrorDoesNotSupportTheEnd;
                break;
            case 120017:
                message = BudgetLocale.BudgetErrorUseAmountExceedsTheCurrentLimit;
                break;
            case 120018:
                message = BudgetLocale.BudgetErrorEndTimeNotLessCurrent;
                break;
            case 120019:
                message = BudgetLocale.BudgetErrorTransationNotExist;
                break;
            case 120020:
                message = BudgetLocale.BudgetErrorBalanceNotExist;
                break;
            case 120021:
                message = BudgetLocale.BudgetErrorFreezeNotExist;
                break;
            case 120022:
                message = BudgetLocale.BudgetErrorSubjectIsExist;
                break;
            case 120023:
                message = BudgetLocale.BudgetErrorFreezeIsExist;
                break;
            case 120024:
                message = BudgetLocale.BudgetErrorNoBudgetAvailable;
                break;
            case 120025:
                message = BudgetLocale.BudgetErrorBalanceAmountNotEnough;
                break;
            case 120026:
                message = BudgetLocale.BudgetErrorAdjustError;
                break;
            case 120027:
                message = BudgetLocale.BudgetErrorDetailNotLegal;
                break;
            case 120028:
                message = BudgetLocale.BudgetErrorEntityNotExist;
                break;
            case 120029:
                message = BudgetLocale.BudgetErrorEndTimeCanNotGreaterLastTime;
                break;
            case 120030:
                message = BudgetLocale.BudgetErrorCorrectAmountExceedsBalancePlanSum;
                break;
            case 120033:
                message = BudgetLocale.BudgetErrorTemplateNotAvailable;
                break;
            default:
                message = CommonLocale.ResponseError;
                break;
        }
        if (model)
            return AkGlobal.intl.formatMessage({ id: message }, {
                ProjectName: model.SubjectName,
                MonthName: moment(model.BudgetMonth).format('YYYY-MM')
            });
        else
            return AkGlobal.intl.formatMessage({ id: message });
    }

    /*预算列转行
     * SubItems:科目预算明细集合
     * Months：去重月份集合
     */
    static ConvertBudgetModelToTable(data: any, notInitData?: boolean) {
        let detailArray = [], monthArray = [];
        data.forEach((item, index) => {
            const monthName = moment(item.BudgetMonth).format('YYYY-MM');
            if (monthArray.filter(x => {//收集月份集合,获得去重的月份集合
                return x === monthName;
            }).length === 0)
                monthArray.push(monthName);
            if (!notInitData) {
                item[monthName] = item.Amount;
                if (detailArray.filter(x => {
                    return x.SubjectID === item.SubjectID;
                }).length === 0)
                    detailArray.push(item);
                else
                    detailArray.forEach(detail => {
                        if (detail.SubjectID === item.SubjectID) {
                            if (detail[monthName] === undefined) {
                                detail[monthName] = item.Amount;
                                detail.Amount += item.Amount;
                            }
                        }
                    });
            }
        });
        return { SubItems: detailArray, Months: monthArray };
    }

    /*重置预算*/
    static InitBudgetDetailModel(data: any, begin, end, MonthArray) {
        if (!MonthArray)
            return data;
        let nextMonthArray: Array<string> = [];
        var thisDate = begin;
        //获得更改后的月份集合
        while (thisDate <= end) {
            nextMonthArray.push(thisDate.format('YYYY-MM'));
            thisDate = moment(thisDate).add(1, 'M');
        }
        //重置预算期间之外的月份数据,每个科目的总计
        data.forEach(item => {
            let count: number = 0;
            MonthArray.forEach(fieldName => {
                if (nextMonthArray.filter(x => {
                    return x === fieldName;
                }).length > 0) {
                    count += item[fieldName] ? item[fieldName] : 0;
                } else {
                    item[fieldName] = null;
                }
            });
            item.Amount = count.toFixed(2);
        });
        return data;
    }

    /*修改结束月份重置科目明细*/
    static InitBudgetEndDetailModel(data: any[], newData: any[], begin, end) {
        var thisDate = begin;
        var callBack: any[];
        newData = newData.filter(item => {//筛选小于结束月份的数据
            return this.BudgetMonthToMoment(item.BudgetMonth).valueOf() <= this.BudgetMonthToMoment(end).valueOf();
        });
        callBack = newData;
        while (thisDate <= end) {
            const hasData = callBack.filter(item => {
                return moment(item.BudgetMonth).format('YYYY-MM') === moment(thisDate).format('YYYY-MM');
            });
            if (hasData.length === 0) {//如果找不到这个月份的数据，则去元数据中挖掘
                const Metadata = data.filter(item => {
                    return moment(item.BudgetMonth).format('YYYY-MM') === moment(thisDate).format('YYYY-MM');
                });
                callBack = JSON.parse(JSON.stringify(callBack.concat(Metadata)));
            }
            thisDate = moment(thisDate).add(1, 'M');
        }
        return callBack;
    }

    /*重新计算元数据中跟操作项重叠的月份数据,并且将改变过的字段标记
     * metadata:元数据
     * thisdata:操作中的数据
     * */
    static RefreshBudgetEndDetailModel(metadata, thisdata) {
        var ValidData: any[] = [];
        metadata.forEach(met => {
            thisdata.forEach(now => {
                if (this.BudgetMonthToMoment(met.BudgetMonth).valueOf() === this.BudgetMonthToMoment(now.BudgetMonth).valueOf()
                    && met.SubjectID === now.SubjectID) {
                    if (met.Amount !== now.Amount) {
                        now.hasChange = true;
                        ValidData.push(now);
                    } else
                        now.hasChange = false;
                }
            });
        });
        return ValidData;
    }

    //表格总合计算
    static GetTableAmount(data: any) {
        let Amount: number = 0
        data.forEach(item => {
            Amount += item.Amount ? Number(item.Amount) : 0;
        });
        return parseFloat(Amount.toFixed(2));
    }

    //单行总和计算
    static BudgetRowPlus(MonthArray, model, fieldIndex, val) {
        let count: number = 0;
        MonthArray.forEach(fieldName => {
            if (fieldName === fieldIndex)
                model[fieldName] = val ? val : 0;
            count += model[fieldName] ? model[fieldName] : 0;
        });
        return count.toFixed(2);
    }

    //默认月份
    static InitBudgetMonth(date: any): moment.Moment {
        return moment(moment(date).format('YYYY-MM') + '-01');
    }

    /*转为月份标准Moment类型*/
    static BudgetMonthToMoment(month) {
        return moment(moment(month).format('YYYY-MM'));
    }

    /*计算两个时间的月份差*/
    static getMonthDiff(begin, end) {
        var len: number = -1;
        if (begin && end) {
            len = (moment(end).year() - moment(begin).year()) * 12 + (moment(end).month() - moment(begin).month());
        }
        return len;
    }
}
