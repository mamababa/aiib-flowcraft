interface FlowNoRule extends BaseModel {
    /** 流程标识 */
    DefKey?: string;
    /** 编号前缀 */
    Prefix?: string;
    /** 初始编号 */
    StartIndex?: string;
    /** 编号长度 */
    CustomLength?: number;
    /** 编号增量 */
    AutoIncrement?: number;
    /** 当前编号 */
    CurrentNo?: string;
}

interface FlowNoRuleResponse extends AkResponse {
    Data?: FlowNoRule;
}

interface FlowNoRuleListResponse extends AkResponse {
    Data?: FlowNoRule[];
}
