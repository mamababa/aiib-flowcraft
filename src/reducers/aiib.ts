import { GETPROJECT_LISTDATA, ISAIIB_ADMINISTRATOR } from '../actions/ActionTypes';
import { AkContext } from 'akmii-yeeoffice-common';

const initialState = {
    listData: [],
    isAIIBAdmin: AkContext.getUser().IsAdmin
}

export const aiib = (state = initialState, action) => {
    switch (action.type) {
        case GETPROJECT_LISTDATA:
            return {
                ...state,
                listData: action.payload
            };
        case ISAIIB_ADMINISTRATOR:
            return {
                ...state,
                isAIIBAdmin: AkContext.getUser().IsAdmin || action.payload
            };
        default:
            return state;
    }
}
