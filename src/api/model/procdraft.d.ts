/**分页获取用户所有流程草稿 */

interface GetProcDraftRequest extends AkRequest {
    pageIndex?: number;
    pageSize?: number;
}

interface GetProcDraftByIDRequest extends AkRequest {
    procDraftID?: string;
}

// /**保存草稿 */
// interface PostProcDraftRequest extends AkRequest {
//     ProcDefID?: string;
//     FormData?: string;
// }
//
// /** 更新草稿*/
// interface PutProcDraftRequest extends AkRequest {
//     ProcDraftID?: string;
//     ProcDefID?: string;
//     FormData?: string;
// }

/**刪除草稿 */
interface DeleteProcDraftRequest extends AkRequest {
    procDraftID?: string;
}
