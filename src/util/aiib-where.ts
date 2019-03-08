import { ContentListWhereModel, ContentListWhereType } from 'akmii-yeeoffice-common';
import * as moment from 'moment';

export interface WhereModel {
    PageWhere: ContentListWhereModel[];
    SimpleWhere: ContentListWhereModel[];
    TabWhere: ContentListWhereModel[];
    AdvancedWhere: ContentListWhereModel[];

}
export interface AiibWhereMethod {
    /**页面本身的查询条件 */
    setPageWhere(): void;
    /**搜索框查询条件,下拉查询条件 */
    setSimpleWhere(value: ContentListWhereModel[]): void;
    /**切换tab查询条件 */
    setTabWhere(value: string): void;
    /**高级搜索查询条件 */
    setAdvancedWhere(value: ContentListWhereModel[]): void;
    /**合并上述查询条件 */
    setWheresFileds(): ContentListWhereModel[];
}
export const whereTransform = (
    WhereName: string,
    Value: string,
    Type: ContentListWhereType = ContentListWhereType.Eq,
    Pre: 'and' | 'or' = "and",
    Child?: ContentListWhereModel[]) => {
    let defaultWhere = { WhereName, Value, Type, Pre };
    if (Child) {
        defaultWhere['Child'] = Child;
        return defaultWhere;
    } else {
        return defaultWhere;
    }
};

export const decodeWhere = (wheres: ContentListWhereModel[]) => {
    let resultObj = {};
    for (const where of wheres) {
        if (where.Child) {
            const value1 = where.Child[0];
            const value2 = where.Child[1];
            if (value1.WhereName === 'Subsector') {
                resultObj["Subsector"] = where.Child.map(i => i.Value);
            } else if (value1.WhereName === value2.WhereName) {
                resultObj[value1.WhereName] = [moment(value1.Value), moment(value2.Value)];
            } else if (value1.WhereName === 'ProjectID' && value2.WhereName === 'ProposalID') {
                resultObj['ProjectProposalID'] = value1.Value;
            } else if (value1.WhereName === 'ProposalID' && value2.WhereName === 'ProjectName') {
                resultObj['keyword'] = value1.Value;
            } else if (value1.WhereName === 'Members' && value2.WhereName === 'Approvers') {
                resultObj['Members'] = value1.Value;
            }
        } else if((where.WhereName === "SCRecommend" || where.WhereName === "ExComApprove") && where.Value === "") {
            resultObj[where.WhereName] = "Pending";
        }else{
            let key = where.WhereName;
            resultObj[key] = where.Value;
        }
    }
    return resultObj;
};
