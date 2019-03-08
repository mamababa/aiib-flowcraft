import { AIIBPermissionEnum } from "../../../api/aiibworkflow/common"

export class AIIBCommon {
    /** 获取所有的Permission*/
    static getPermissionData(): Map<AIIBPermissionEnum, any> {
        const { View, Edit } = AIIBPermissionEnum;
        let result = new Map();
        result.set(View, { permission: View, permissionName: "View" })
        result.set(Edit, { permission: Edit, permissionName: "Edit" })
        return result;
    }

}
