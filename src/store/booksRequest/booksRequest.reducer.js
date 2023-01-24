import { BOOKREQUEST_ACTION_TYPE } from "./booksRequest.type";

export const BOOKREQUEST_INITIAL_STATE = {
    bookRequestMap: []
}

export const bookRequestReducer = ( state = BOOKREQUEST_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type) {
        case BOOKREQUEST_ACTION_TYPE.SET_BOOKREQUEST_MAP:
            return { ...state, bookRequestMap: [...payload]};
        default:
            return state;
    }
}