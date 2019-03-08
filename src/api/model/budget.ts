import * as moment from 'moment';
export interface getBudgetTemplateListRequest extends AkRequest {
    templateName?: string;
    templateCode?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string | number;
}

export interface BudgetTemplateRequest extends AkRequest {
    templateID?: string;
}

export interface BudgetTemplateSaveRequest extends AkRequest {
    TemplateID: string;
    TemplateName: string;
    TemplateCode: string;
    SubjectList: Array<BudgetTemplateSubjectList>;
}

export interface BudgetTemplateSubjectList {
    SubjectID: 0;
    SubjectName: string;
    SubjectCode: string;
}

export interface BudgetBase {
    Created?: string;
    Modified?: string;
    CreatedBy?: string;
    ModifiedBy?: string;
}

export interface BudgetTempleteItem extends BudgetBase {
    TenantID?: string;
    TemplateID?: string;
    SubjectID?: string;
    SubjectName?: string;
    SubjectCode?: string;
    Total?: number;
    BudgetMonth?: string;
    Amount?: string;
}

export interface BudgetInfo {
    ID?: string;
    EntityType?: number;
    EntityID?: string;
    EntityID1?: any;
    EntityName?: string;
    Year?: string;
    BeginTime?: string;
    EndTime?: string;
    TemplateID?: string;
    TemplateCode?: string;
    TemplateName?: string;
    ControlCycle?: number;
    ControlMode?: number;
    Amount?: string;
}

export interface BudgetViewModal {
    AdjustDetailList?: Array<any>;
    BudgetDetailList?: Array<any>;
    TotalCount?: number;
}

export interface BudgetGetViewDataModal {
    budgetID?: string | number;
    pageIndex?: number;
    pageSize?: number;
}

export interface BudgetDetail {
    EntityID?: string;
    SubjectID?: string;
    SubjectName?: string;
    SubjectCode?: string;
    Amount?: string;
    BudgetMonth?: string;
    hasError?: boolean;
}

export interface BudgetDetailBalance extends AkRequest {
    budgetID?: string;
    subjectID?: string;
    startTime?: string;
    endTime?: string;
    source?: string;
    createdBy?: string;
    pageIndex?: number;
    pageSize?: number;
}

export interface BudgetDetailAddBalance extends AkRequest {
    SubjectID?: string;
    BudgetMonth?: string;
    BudgetID?: string;
    EnitityID?: string;
    EntityType?: string;
    Monetary?: string;
    Direction?: string | number;
    Type?: 1;
    Remark?: string;
}

export interface BudgetSubjectDetails extends AkRequest {
    budgetID?: string;
    subjectID?: string;
}

export interface BudgetPlanSubItem extends BudgetDetail {
    ID?: string;
}

export interface BudgetRequest extends AkRequest {
    BudgetInfo?: BudgetInfo;
    BudgetDetailList?: Array<BudgetDetail>;
}

export interface BudgetList {
    EntityName?: string;
    TemplateName?: string;
    BeginTime?: string;
    EndTime?: string;
    Status?: number;
    Created?: string;
    PublishDate?: string;
    Modified?: string;
    Year?: string;
    BudgetID?: string;
}

export interface BudgetDetails {
    budgetID?: string;
    subjectID?: string;
    startTime?: string;
    endTime?: string;
    source?: string;
    createdBy?: string;
    pageIndex?: number;
    pageSize?: number;
    parentSearch?: any;
}

export interface BudgetAdjustRequest {
    BudgetID?: string;
    ModifiedTotal?: number;
    DetailList?: Array<BudgetAdjustDetail>;
    Comment?: string;
    EndTime?: string;
}
export interface BudgetAdjustDetail {
    BudgetDetailID?: string;
    ModifiedValue?: number;
}

export interface BudgetListSearch {
    entityType?: string;
    entityID?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
    pageIndex?: string;
    pageSize?: string;
}

export class InitBudgetModel {
    EntityType?: number;
    EntityID?: string;
    BeginTime?: moment.Moment;
    EndTime?: moment.Moment;
    ControlCycle?: number;
    ControlMode?: number;
    Year?: string;
    TemplateID?: string;
    Amount?: number;

    constructor() {
        const thisYear = new Date().getFullYear().toString();
        this.EntityType = EntityEnum.Default;
        this.BeginTime = moment();
        this.EndTime = moment().add(11, 'M');
        this.ControlCycle = undefined;
        this.ControlMode = ControlModeEnum.NoControl;
        this.Year = thisYear;
        this.TemplateID = undefined;
        this.Amount = 0;
    }
}

export enum BudgetHandleEnum{
    Update = '0',
    Submit = '1',
    Delete = '2',
    See = '3',
    Detail = '4',
    Adjust = '5',
    Finish = '6',
    Add = '7'
}


export enum EntityEnum{
    All = -1,
    Department = 0,
    CostCenter = 1,
    Default = undefined
}

/*控制方式*/
export enum ControlModeEnum {
    NoControl = -1,
    Total = 0,
    Range = 1,
    Accumulative = 2,
}

/*控制周期*/
export enum ControlCycleEnum{
    Month = 1,
    Bimonthly = 2,
    Quarter = 3,
    HalfYear = 6,
    Year = 12,
}


