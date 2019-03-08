import { ContentListApi } from 'akmii-yeeoffice-common';
import { ProjectAPI } from './project';
export class ProjectContentList {
	// 编辑Project列表
	public static editContentList(request) {
		let parmas = {
			Title: request.Title ? request.Title : 'Project',
			...request
		};
		return ContentListApi.EditDataByTitle(parmas);
	}
}

export class AiibSendEmailCommom {
	public static sendEmail(
		code: string,
		to?: string[],
		listDataId?: string,
		listDataIDs?: string[],
		ToGroups?: string[]
	) {
		let request: SendEmailRequest = {
			Title: 'Project',
			EmailCode: code,
			ListDataID: listDataId,
			To: to,
            ListDataIDs: listDataIDs,
            ToGroups:ToGroups
		};
		ProjectAPI.sendEmail(request);
	}
}
