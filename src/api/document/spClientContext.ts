import { AkContext, SpRequest, AkNotification} from 'akmii-yeeoffice-common';
export class SPClientContext {
	//     public static getSPClientContext():SP.ClientContext {
	//         let context:SP.ClientContext = null;
	//         if(AkContext.isNetSPDocument()){
	//             context = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
	//             context.add_executingWebRequest((sender,e)=>{
	//                 e.get_webRequest().get_headers()['Authorization'] = 'Bearer ' + AkContext.getNetSPToken();
	//             });
	//             context.add_requestFailed((render,e)=>{
	//                 new SpRequest().post(_spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo").then(data=>{
	//                     (window.document.getElementById("__REQUESTDIGEST") as HTMLInputElement)
	//                     .value = data.d.GetContextWebInformation.FormDigestValue;
	//                 },sender=>{
	//                     console.log('X-RequestDigest Token 刷新错误:' + sender);
	//                 });
	//             });
	//         }else{
	//             // context = SP.ClientContext.get_current();
	//             context = new SP.ClientContext(_spPageContextInfo.siteAbsoluteUrl);
	//         }
	//         return context;
	//     }
	//     public static async refreshToken(response) {
	//         return await new Promise((resolve, reject) => {
	//            if (response.status === 403||response.status === 401) {
	//                console.log('X-RequestDigest Token过期等待刷新Token，请等待....');
	//                 new SpRequest().get("/o365/GetSPOToken").then((data) => {
	//                        if(data.IsSuccess){
	//                            window[AkContext.Keys.SPOToken]=data.Data;
	//                            AkNotification.success({
	//                                message: 'Tip',
	//                                description: 'Refresh token success,please reexecute your operation!',
	//                            });
	//                            resolve(true);
	//                        }else{
	//                            AkNotification.error({
	//                                message: 'Tip',
	//                                description: 'Refresh token error,please login in again!',
	//                            });
	//                            resolve(false);
	//                        }
	//                        resolve(true);
	//                    }, (sender) => {
	//                        console.log('X-RequestDigest Token 刷新错误:' + sender);
	//                        resolve(false);
	//                    });
	//                }
	//        });
	//    }
	public static getSPClientContext(): SP.ClientContext {
		var context = null;
		if (AkContext.isNetSPDocument()) {
			context = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
			context.add_executingWebRequest((sender, e) => {
				e.get_webRequest().get_headers()['Authorization'] = 'Bearer ' + AkContext.getNetSPToken();
			});
		} else {
            // context = SP.ClientContext.get_current();
            context = new SP.ClientContext(_spPageContextInfo.siteAbsoluteUrl);
		}
		return context;
	}
	public static async refreshToken(sender) {
		return await new Promise((resolve, reject) => {
			console.log('X-RequestDigest Token过期等待刷新Token，请等待....');
			if (sender.status === 403 && (sender.response.body.error.code.indexOf("-213057525")>=0||sender.response.body.error.message.value.indexOf("security validation for this page")>=0)) {
				if (AkContext.isNetSPDocument()) {
					new SpRequest().get('/o365/GetSPOToken').then(
						(data) => {
							if (data.IsSuccess) {
								window[AkContext.Keys.SPOToken] = data.Data;
								AkNotification.success({
									message: 'Tip',
									description: 'Refresh token success,please reexecute your operation!',
								});
								resolve(true);
							} else {
								AkNotification.error({
									message: 'Tip',
									description: 'Refresh token error,please login in again!',
								});
								resolve(false);
							}
						},
						(sender) => {
							console.log('X-RequestDigest Token 刷新错误:' + sender);
							resolve(false);
						}
					);
				} else {
					new SpRequest().post(_spPageContextInfo.webAbsoluteUrl + '/_api/contextinfo').then(
						(data) => {
							(window.document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value =
								data.d.GetContextWebInformation.FormDigestValue;
								resolve(true);
						},
						(sender) => {
							resolve(false);
							console.log('X-RequestDigest Token 刷新错误:' + sender);
						}
					);
				}
			}else{
				resolve(false);
			}
		});
	}
}
