interface FlowNoRuleRequest extends AkRequest {
    /** 流程Key */
    DefKey?: string;
    /** 开始索引 */
    StartIndex?: string;
    /** 自定义长度 */
    CustomLength?: number;
    /** 增量 */
    AutoIncrement?: number;
    /** 前缀 */
    Prefix?: string;
}
