import {CATEGORY_LOADED, ADMIN_CATEGORY_LOADED} from "../actions/ActionTypes";

const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    switch (action.type) {
        /** 普通用户流程定义分类 */
        case CATEGORY_LOADED:
        /** Admin流程定义分类 */
        case ADMIN_CATEGORY_LOADED:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}
