import { MOUDLEDATE_LOADED} from "../actions/ActionTypes";
const initialState = {
    moudleYear: null,
    moudleMonth: null,
    moudleDay: null
}

export const chart = (state = initialState, action) => {
    switch (action.type) {
        case MOUDLEDATE_LOADED:
            return {
                moudleYear: action.payload.moudleYear,
                moudleMonth: action.payload.moudleMonth,
                moudleDay: action.payload.moudleDay
            }
        default:
            return state;
    }
}
