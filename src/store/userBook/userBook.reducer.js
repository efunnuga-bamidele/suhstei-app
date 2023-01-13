
import { USERBOOK_ACTION_TYPE } from "./userBook.type";

export const USERBOOK_INITIAL_STATE = {
    userBookMap: []
}

export const userBookReducer = (state = USERBOOK_INITIAL_STATE, action ={}) => {
    const { type, payload } = action;

    switch(type) {
        case USERBOOK_ACTION_TYPE.SET_USERBOOK_MAP:
            return { ...state, userBookMap: payload};
        default:
            return state;
    }
}