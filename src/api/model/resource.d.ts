import { AkResponse } from 'akmii-yeeoffice-common';

/**根据ID获取资源内容 */
interface GetResourceByIdRequest extends AkRequest {
    resourceID?: string;
}

/**添加资源  */
interface PostResourceRequest extends AkRequest {
    Name?: string;
    Resource?: string;
}

interface PutResourceRequest extends AkRequest {}

interface DeleteResourceRequest extends AkRequest {}
