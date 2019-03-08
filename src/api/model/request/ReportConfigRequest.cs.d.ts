interface ReportConfigRequest extends AkRequest {
    ProcDefKey?: string;
    IconUrl?: string;
    LinkUrl?: string;
    Name?: string;
    Description?: string;
    Localization?: string;
    DefName?: string;
    Status?: number;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    /** 是否设置权限 */
    IsItemPerm?: boolean;
    /** 权限列表 {1:[12,3,4],2:[3,4,5],3:[4,56,8]} */
    PermTypeIDs?: server.IdentityModelResponse[];
    VarDisplay?: string;
    Type?: number;
    VExt1?: string;
    VExt2?: string;
    VExt3?: string;
}
