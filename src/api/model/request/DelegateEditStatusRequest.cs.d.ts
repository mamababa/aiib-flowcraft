interface DelegateEditStatusRequest extends AkRequest {
    /** 流程Key */
    Key ?: string;
    /** 状态 */
    Status ?: boolean;
}
