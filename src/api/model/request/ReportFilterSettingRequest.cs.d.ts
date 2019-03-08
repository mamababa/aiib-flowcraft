interface ReportFilterSettingRequest extends AkRequest {
  ReportID: string,
  Type?: 1,
    /**内置*/
  Ext1: string,
  /**自定义*/
  Ext2: string,
  Ext3?: string
}
