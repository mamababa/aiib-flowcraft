/**新增 */
interface PostFlowRulesRequest extends AkRequest {
    defKey?: string;
    startIndex?: string;
    customLength?: string;
    autoIncrement?: string;
    prefix?: string;
}

/**编辑 */
interface PutFlowRulesRequest extends AkRequest {
    defKey?: string;
    startIndex?: string;
    customLength?: string;
    autoIncrement?: string;
    prefix?: string;
}

interface DeleteFlowRulesRequest extends AkRequest {
    defKey?: string;
}

/**根据key查询 */
interface GetFlowRulesByKeyRequest extends AkRequest {
    defKey?: string;
}

/**查询所有流程编号规则 */
interface GetAllFlowRulesRequest extends AkRequest {
    defKey?: string;
    pageIndex?: string;
    pageSize?: string;
}
