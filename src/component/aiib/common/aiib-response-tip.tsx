import { AkMessage, CommonLocale } from 'akmii-yeeoffice-common';
import { AkNotification } from 'akmii-yeeoffice-common/lib';
import { AkGlobal } from 'akmii-yeeoffice-common/lib/util';
export class AiibProjectResponse {
    static successTip(message: string) {
        return AkMessage.success(AkGlobal.intl.formatMessage({ id: message }));
    }

    static errorTip(message: string) {
        return AkNotification.error({
            message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
            description: AkGlobal.intl.formatMessage({ id: message }),
        });
    }

    static errorStringTip(message: string) {
        return AkNotification.error({
            message: AkGlobal.intl.formatMessage({ id: CommonLocale.Tip }),
            description: message,
        });
    }
}
