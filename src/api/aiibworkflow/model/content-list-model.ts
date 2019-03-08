import { ContentListWhereModel } from 'akmii-yeeoffice-common';
export interface EditByTitleWhereRequest extends AkRequest{
    AppID?: number;
    ListID?: string;
    Title?: string;
    Par: EditByTitlePar;
    Verification?: boolean;
}

export interface EditByTitleWhereBatchRequest{
    AppID?: number;
    ListID?: string;
    Title?: string;
    ParList: EditByTitlePar[];
    Verification?: boolean;
}

interface EditByTitlePar {
    ListDataID?: string;
    RowVersion?: string;
    Dic?: any;
    Wheres?: ContentListWhereModel[];
}
