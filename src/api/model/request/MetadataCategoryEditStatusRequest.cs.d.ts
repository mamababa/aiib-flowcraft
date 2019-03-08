
interface MetadataCategoryEditStatusRequest extends AkRequest{
	/** 类别 */
	CategoryID?: string;
	/** 状态 */
	Status?: boolean;
}
interface ImportMetadataRequest extends AkRequest{
	AppID?:number;
	ListID?:string;
	uniqueKeyName?:string;
}